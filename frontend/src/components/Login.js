import AuthPopup from "./AuthPopup"
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorize } from "./Auth";
import { authorization } from "./App";

function Login() {
    const navigate = useNavigate();
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formValue.email || !formValue.password) {
            return;
        }
        authorization(formValue,setFormValue);
       /*  authorize(formValue.email, formValue.password)
            .then((data) => {
                if (data.token) {
                    setFormValue({ email: '', password: '' });
                    //navigate('/mesto', { replace: true });
                    window.location.assign('/mesto');
                }
            })
            .catch(err => console.log(err)); */
    }

    return (
        <AuthPopup
            title='Вход'
            buttonTitle='Войти'
            description=''
            onSubmit={handleSubmit}
            handleChange={handleChange}
            password={formValue.password}
            email={formValue.email}
        />
    )
}
export default Login