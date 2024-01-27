function ImagePopup(props) {
    return (
        <div className={`popup popup-photo ${props.isOpen}`}>
            <div className="popup-photo__body">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <img className="popup-photo__img"
                    src={(props.card) ? (props.card.link) : ''} alt={(props.card) ? (props.card.name) : ' '} />
                <p className="popup-photo__name">{(props.card) ? (props.card.name) : ''}</p>
            </div>
        </div>
    )
}
export default ImagePopup