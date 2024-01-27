
function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
            <div className="popup__body">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className="popup__content" action="#" name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__save-button" title="Сохранить" type="submit">Сохранить</button>
                </form>
            </div>
        </div>
    );
}
export default PopupWithForm;