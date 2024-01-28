import Header from './Header';
import Footer from './Footer';
import { Main } from './Main';
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import { checkToken } from './Auth';
import ProtectedRouteElement from "./ProtectedRoute";
import InfoPopup from './InfoTooltip';
import imgOK from '../images/iconOK.svg'
import imgNO from '../images/iconStop.svg'
import { authorize } from './Auth';
import { register } from './Auth';

import React, { useState } from 'react';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useTimeout } from 'usehooks-ts'

const popupAddCard = document.querySelector('.popup_type_add-card');
const popupAvatar = document.querySelector('.popup_type_avatar');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');

export function authorization(formValue, setFormValue) {
    authorize(formValue.email, formValue.password)
        .then((data) => {
           // console.log(data);
            if (data) {
                setFormValue({ email: '', password: '' });
                window.location.assign('/mesto');
            }
        })
        .catch(err => console.log(err));
}



function App() {
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
    const [selectedCard, handleCardClick] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard
    const [loggedIn, setLoggedIn] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [userData, setUserData] = useState();
    const navigate = useNavigate();

    React.useEffect(() => {
        tokenCheck();
    }, [])

    function tokenCheck() {
        const token = localStorage.getItem('token');
        //console.log(token)
        if (token) {
            checkToken(token).then((res) => {
                if (res) {
                    const userData = {
                        email: res.email
                    }
                    //console.log(userData)
                    setLoggedIn(true);
                    setUserData(userData)
                    navigate("/mesto", { replace: true })
                }
            })
                .catch((err) => console.log(err));
        }
    }
   
    
    function registration(email, password, setRegistrationSuccess) {
        register(email, password, setRegistrationSuccess)

            .then(() => {
                setRegistrationSuccess(true)
                console.log('пользователь зарегистрирован')  
            })
            .then(() => setTimeout(()=>window.location.assign('/sign-in'),1500) )
            .catch(() => {
                setRegistrationSuccess(false)
                console.log('ошибка регистрации')
            })

        .finally(() =>  setIsInfoPopupOpen(true))

    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function closeAllPopups() {
        setIsAddPlacePopupOpen(false)
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsInfoPopupOpen(false);
        handleCardClick(null);
    }

    function handleCardLike(card) {
        //const isLiked = card.likes.some(i => i._id === currentUser._id);
        const isLiked = card.likes.some(i => i === currentUser._id);
        //console.log(card.likes)
        //console.log(isLiked)
        //console.log(currentUser._id)
        if (!isLiked) {
            api.addLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => { console.log(`не удалось поставить лайк, Ошибка: ${err}`) });
        } else {
            api.deleteLike(card._id)
                .then((newCard) => {
                    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
                })
                .catch((err) => { console.log(`не удалось убрать лайк, Ошибка: ${err}`) });
        }
    }
    function handleCardDelete(card) {
        api.deleteElement(card._id).then((data) => {
            setCards((state) => state.filter((c) => c._id != card._id));
        });
    }
    function handleSetCards(cards) {
        setCards(cards)
    }

    function getUserInfo() {
        api.getAllElements().then((data) => {
            console.log(data);
            setCurrentUser(data);
        })
            .catch((err) => { console.log(`не загрузить данные профиля, Ошибка: ${err}`) })
    }

    function handleUpdateUser({
        name,
        about: description,
    }) {
        api.editProfile({ name, description })
            .then((data) => { setCurrentUser(data) })
            .then(() => { closeAllPopups() })
            .catch((err) => { console.log(`не удалось сохранить новый профиль, Ошибка: ${err}`) })
    }

    function handleUpdateAvatar(avatar) {
        api.editAvatar(avatar.avatar.value)
            .then((data) => { setCurrentUser(data) })
            .then(() => closeAllPopups())
            .catch((err) => { console.log(`не удалось сохранить новый аватар, Ошибка: ${err}`) })
    }

    function refreshCards() {
        api.getAllCards().then((data) => {
            //console.log(data);
            setCards(data)
        })
            .catch((err) => { console.log(`не удалось обновить карточки, Ошибка: ${err}`) })
    }

    function handleAddPlace(newCard) {
        api.addElement(newCard)
            .then((data) => setCards([data, ...cards]))
            .then(() => closeAllPopups())
            .catch((err) => { console.log(`Ошибка загрузки карты на сервер ${err}`) })
    }
    function loginSubmit() {
        console.log('enter')
    }



    React.useEffect(() => {
        getUserInfo()
    },
        [])

    React.useEffect(() => {
        refreshCards()
    },
        [])


    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])
    function handleLogout() {
        localStorage.removeItem('token');
        goLogin();
    }
    function goLogin() {
        window.location.assign('/sign-in')
    }
    function goRegistration() {
        window.location.assign('/sign-up')
    }

    return (
        <div style={{ backgroundColor: 'black' }}>
            <div className="page">

                <CurrentUserContext.Provider value={currentUser}>
                    <Header
                        email={userData ? userData.email : ''}
                        loggedIn={loggedIn}
                        onClick={loggedIn ? handleLogout : window.location.href === 'http://localhost:3000/sign-in' ? goRegistration : goLogin}
                        buttonText={loggedIn ? 'Выход' : window.location.href === 'http://localhost:3000/sign-in' ? 'Регистрация' : 'Войти'}
                    />
                    <Routes>
                        <Route path="/sign-in" element={<Login onSubmit={loginSubmit} />} />
                        <Route path="/sign-up" element={<Register setRegistrationSuccess={setRegistrationSuccess} registration={registration} />} />
                        <Route path="/mesto" element={<ProtectedRouteElement
                            element={Main}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick} onCardLike={handleCardLike}
                            setCards={handleSetCards}
                            cards={cards}
                            onCardDelete={handleCardDelete}
                            refreshCards={refreshCards}
                            loggedIn={loggedIn} />} />
                        <Route path='*' element={<Login onSubmit={loginSubmit} />} />
                    </Routes >
                    <Footer />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser} />
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        onAddPlace={handleAddPlace} />
                    <PopupWithForm
                        name='message'
                        title='Вы уверены?'
                        onClose={closeAllPopups} />
                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                        isOpen={selectedCard ? 'popup_is-opened' : ''} />
                    <InfoPopup
                        isOpen={isInfoPopupOpen ? 'popup_is-opened' : ''}
                        onClose={closeAllPopups}
                        img={registrationSuccess ? imgOK : imgNO}
                        text={registrationSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
                    />
                </CurrentUserContext.Provider>

            </div>
        </div>
    );
}





function childMessage() {
    return (
        <>

        </>
    )
}

export default App;
