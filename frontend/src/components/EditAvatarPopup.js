import React from "react";
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatarRef.current
        });
    }

    /* const childAvatar = (
        <>
            <input className="popup__text popup__text_type_description" id="popup-url-avatar" type="url"
                placeholder="Ссылка на картинку" name="popupDescription" required ref={avatarRef} />
            <span className="popup__text-error popup-url-avatar-error"></span>
        </>
    ) */

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить Аватар'
            //children={childAvatar}
            onSubmit={handleSubmit}
            onClose={props.onClose}
            isOpen={props.isOpen ? 'popup_is-opened' : ''} >
            <input className="popup__text popup__text_type_description" id="popup-url-avatar" type="url"
                placeholder="Ссылка на картинку" name="popupDescription" required ref={avatarRef} />
            <span className="popup__text-error popup-url-avatar-error"></span>
        </PopupWithForm>


    )
}
export default EditAvatarPopup