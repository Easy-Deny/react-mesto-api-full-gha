import { useEffect, useRef, useContext } from 'react';
import React from "react";
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = useContext(CurrentUserContext)
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

  /*   const childEditProfile = (
        <>
            <input className="popup__text popup__text_type_name" id="popup-name" type="text" placeholder="Введите Имя"
                name="popupName" required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} />
            <span className="popup__text-error popup-name-error"></span>
            <input className="popup__text popup__text_type_description" id="popup-description" type="text"
                placeholder="Введите описание" name="popupDescription" required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription} />
            <span className="popup__text-error popup-description-error"></span>
        </>
    ) */
    return (
        <PopupWithForm
            name='edit-profile'
            title='Редактировать профиль'
            //children={childEditProfile}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen ? 'popup_is-opened' : ''} >
            <input className="popup__text popup__text_type_name" id="popup-name" type="text" placeholder="Введите Имя"
                name="popupName" required minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName} />
            <span className="popup__text-error popup-name-error"></span>
            <input className="popup__text popup__text_type_description" id="popup-description" type="text"
                placeholder="Введите описание" name="popupDescription" required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription} />
            <span className="popup__text-error popup-description-error"></span>
        </PopupWithForm>
    )
}
export default EditProfilePopup