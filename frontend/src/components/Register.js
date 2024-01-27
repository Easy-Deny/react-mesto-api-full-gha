import AuthPopup from "./AuthPopup"
import { register } from "./Auth"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register(props) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        console.log(formValue)
        e.preventDefault();
        const { email, password } = formValue;
        props.registration(email, password, props.setRegistrationSuccess)   
    }

    return (
        <AuthPopup
            title='Регистрация'
            buttonTitle='Зарегистрироваться'
            description='Уже зарегистрированы? Войти'
            onSubmit={handleSubmit}
            password={formValue.password}
            email={formValue.email}
            handleChange={handleChange}
        />
    )
}
export default Register