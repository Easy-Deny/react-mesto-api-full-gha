import logo from '../images/header__logo.svg';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип" />
            <div className="header__description">
                <p className="header__description-name">{props.loggedIn ? props.email : ''}</p>
                <p className="header__description-button" onClick={props.onClick}>{props.buttonText}</p>
            </div>
        </header>
    );
}
export default Header;