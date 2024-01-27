import { Link } from 'react-router-dom';

function AuthPopup(props) {
    return (
        <div >
            <div className="popup__body popup-auth__body">
                <h2 className="popup__title popup-auth__title">{props.title}</h2>
                <form className="popup__content" action="#" onSubmit={props.onSubmit}>
                    <input className="popup__text popup__text_type_name popup-auth__text" name="email"  type="email" placeholder="Email"
                        required minLength="2" maxLength="40" value={props.email} onChange={props.handleChange} />
                    <span className="popup__text-error popup-name-error"></span>
                    <input className="popup__text popup__text_type_description popup-auth__text" name="password"  type="password"
                        placeholder="Пароль" required minLength="2" maxLength="200" value={props.password}  onChange={props.handleChange}/>
                    <span className="popup__text-error popup-description-error"></span>
                    <button className="popup__save-button popup-auth__save-button" title="Войти" type="submit">{props.buttonTitle}</button>
                    <Link to="/sign-in" className="popup-auth__description">{props.description}</Link>
                </form>
            </div>
        </div>
    )
}
export default AuthPopup