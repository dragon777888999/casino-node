import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { set_magic_auth } from '../../REDUX/actions/main.actions';
import emailLogin from '../../utils/login/login.email';
import APP from '../../app';

let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const MagicAuth = () => {

    const dispatch = useDispatch(),
        [email, setEmail] = useState(''),
        [isValid, setIsValid] = useState(false);

    // close popup by clicking on bg
    function handleBackgroundClick(event) {
        if (event.target.className === "connect_magic_wrap_background") {
            dispatch(set_magic_auth(false))
        }
    }

    // email validation
    const validateEmail = (input) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(input);
    };

    // update email + validation
    const handleChange = (email) => {
        setEmail(email);
        setIsValid(validateEmail(email));
    };

    return (
        <div className="connect_magic_wrap_background" onClick={handleBackgroundClick}>

            <div className="connect_magic_container">
                <button className="connect_magic_close_btn" onClick={() => dispatch(set_magic_auth(false))} />

                <p className="connect_magic_header">{APP.term('connect_magic_email_header')}</p>
                <p className="connect_magic_subheader">{APP.term('connect_magic_email_desc')}</p>
                <input
                    className="connect_magic_input"
                    placeholder={APP.term('connect_magic_placeholder')}
                    onChange={(e) => handleChange(e.target.value)} />

                <button onClick={() => isValid && emailLogin(email, dispatch)}
                    validtosubmit={isValid && "true"}
                    className="connect_magic_email_submit">
                    <p>{APP.term('connect_magic_submit')}</p>
                </button>
            </div>
        </div>
    )
}

export default MagicAuth;

