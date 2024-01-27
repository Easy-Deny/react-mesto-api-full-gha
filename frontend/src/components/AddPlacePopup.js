import React from "react";
import PopupWithForm from './PopupWithForm'

function AddPlacePopup(props) {
    const cardNameRef = React.useRef();
    const cardLinkRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({ name: cardNameRef.current.value, link: cardLinkRef.current.value });
    }

    /*  const childAddCard = (
       
           <>
               <input className="popup__text popup__text_type_name" id="popup-place" type="text" placeholder="Название"
                   name="popupName" required minLength="2" maxLength="30" ref={cardNameRef}/>
               <span className="popup__text-error popup-place-error"></span>
               <input className="popup__text popup__text_type_description" id="popup-url" type="url"
                   placeholder="Ссылка на картинку" name="popupDescription" required ref={cardLinkRef}/>
               <span className="popup__text-error popup-url-error"></span>
           </>
       ) */

    return (
        <PopupWithForm
            name='add-card'
            title='Новое место'
            //children={childAddCard}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen ? 'popup_is-opened' : ''} >
            <input className="popup__text popup__text_type_name" id="popup-place" type="text" placeholder="Название"
                name="popupName" required minLength="2" maxLength="30" ref={cardNameRef} />
            <span className="popup__text-error popup-place-error"></span>
            <input className="popup__text popup__text_type_description" id="popup-url" type="url"
                placeholder="Ссылка на картинку" name="popupDescription" required ref={cardLinkRef} />
            <span className="popup__text-error popup-url-error"></span>
        </PopupWithForm>
    )
}
export default AddPlacePopup