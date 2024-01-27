function InfoPopup(props) {
    
    return (
        <div className={`popup popup_type_InfoTooltip ${props.isOpen}`}>
            <div className="popup__body">
                <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                <div className='popup__info' >
                <img className='popup__img' src={props.img}/>    
                <h2 className="popup__title ">{props.text}</h2>
                </div>
            </div>
        </div>
    );
}
export default InfoPopup;