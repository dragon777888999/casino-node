import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import useAppState from '../../hooks/useAppState';
import APP from '../../app';
import API from '../../API/contactUs';

import IconBox from './IconBox';

import { set_loader, set_alert_msg } from '../../REDUX/actions/main.actions';

const MESSAGE_LIMIT = 500;

import './ContactUs.css';
import { Link } from 'react-router-dom';
import ga4Event from '../../utils/ga4.event';
import poolSwitch from '../../utils/poolSwitcher';
import HelmetManager from '../../comp/HelmetManager';

const openMenu = () => {
    APP.state.set('menu_open', true);
};

const validateForm = ({ name, email, phone, message }) => {

    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phonePattern = /^[\d ()+]+$/;

    if (!name) return "Please enter your nickname.";
    if (!email) return "Please enter your email address.";
    if (!emailPattern.test(email)) return "Please enter a valid email address.";
    if (!phone) return "Please enter your phone number.";
    if (!phonePattern.test(phone)) return "Please enter a valid phone number.";
    // if(!message) return "Please enter a message.";

    return false;

};

const ContactUs = () => {

    const dispatch = useDispatch();
    const logo = APP?.controller?.cfg;
    const walletAddress = useAppState('wallet_address');

    const [nicknameVal, setNickname] = useState('');
    const [emailVal, setEmail] = useState('');
    const [phoneVal, setPhone] = useState('');
    const [messageVal, setMessage] = useState('');

    const [formError, setFormError] = useState(null);
    const [isProcessing, setProcessing] = useState(null);
    const currentPool = useSelector(state => state.mainRememberReducer.currentPool);
    const [messageLimitString, setMessageLimitString] = useState(`0 / ${MESSAGE_LIMIT}`);

    const onSubmitForm = async (e) => {

        if (e.type !== 'click') e.preventDefault();

        // Prepare states, show loader
        dispatch(set_loader(true));
        setProcessing(true);
        setFormError(null);

        // Gather trimmed form values
        const data = {
            name: nicknameVal.trim(),
            email: emailVal.trim(),
            phone: phoneVal.trim(),
            message: messageVal.trim()
        };

        // Validate form values
        const formError = validateForm(data);

        if (formError) {
            dispatch(set_loader(false));
            setProcessing(null);
            return setFormError(formError);
        }

        try {
            // Attach additional data before sending request
            data.country = APP.state.get('customer.countryCode');
            data.wallet = walletAddress || '';
            const res = await API.sendContactData(data);
            if (res.status !== 201) { throw new Error() };
            ga4Event('contact us form sent', 'contact_us')
            dispatch(set_alert_msg({ type: 'success', content: 'form_submit_success' }));
        }

        catch (error) {
            dispatch(set_alert_msg({ type: 'error', content: 'form_submit_failed' }));
        }

        finally {
            dispatch(set_loader(false));
            setProcessing(null);
        }

    };

    const limitMessage = (message) => {

        let limitString = `${message.length} / ${MESSAGE_LIMIT}`;

        if (message.length > MESSAGE_LIMIT) {
            message = message.substring(0, MESSAGE_LIMIT);
            limitString = `${MESSAGE_LIMIT} / ${MESSAGE_LIMIT}`;
        }

        setMessage(message);
        setMessageLimitString(limitString);

    };

    useEffect(() => {
        let socialMail = localStorage.getItem('email');
        if (socialMail) setEmail(socialMail)
    }, [])

    return (

        <>

            <div className="page contact_us default-web-view-block">

            <HelmetManager
                title="Contact Us"
                description="Contact Us: Reach Out for Any Inquiries or Assistance. Live Chat Available, 24/7 Support."
                keywords="contact us, inquiries, assistance, live chat, 24/7 support, UpvsDown, up vs down"
                canonical="/contact_us"
            />


                <div className="logo-box">
                    {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
                </div>

                {/* <button className="menu_btn" onClick={openMenu}>
				    <img src="/media/images/menu.svg" />
			    </button> */}
                <Link to={poolSwitch(currentPool)}>
                    <div className="contact_us_close_btn" />
                </Link>

                <div className="main-flex">

                    <div className="inner-flex">

                        <div className="content-box">

                            <p className="main-title"><span>{APP.term('contact_title')}</span></p>
                            <p className="sub-title"><span>{APP.term('contact_provide_details')}</span></p>

                            <IconBox />

                            <p className="contact-you"><span>{APP.term('contact_manager_will_contact')}</span></p>
                            {/* <p className="brand-email-caption"><span>Our email</span></p>
                            <p className="brand-email-address"><span>Affiliate@brand.com</span></p> */}

                        </div>

                        <div className="form-box">

                            <div className="form-wrap">

                                <form className="tutorial-form" onSubmit={onSubmitForm}>

                                    <div className="tutorial-form-row nickname-row">
                                        <label hidden htmlFor="nickname">{APP.term('sap_your_nickname')}</label>
                                        <input placeholder={APP.term('sap_your_nickname')} type="text" name="nickname" id="nickname" value={nicknameVal} onChange={(e) => { setNickname(e.target.value) }} />
                                    </div>

                                    <div className="tutorial-form-row email-row">
                                        <label hidden htmlFor="email">{APP.term('sap_your_email')}</label>
                                        <input placeholder={APP.term('sap_your_email')} type="email" name="email" id="email" value={emailVal} onChange={(e) => { setEmail(e.target.value) }} />
                                    </div>

                                    <div className="tutorial-form-row phone-row">
                                        <label hidden htmlFor="phone">{APP.term('sap_your_phone')}</label>
                                        <input placeholder={APP.term('sap_your_phone')} type="text" name="phone" id="phone" value={phoneVal} onChange={(e) => { setPhone(e.target.value) }} />
                                    </div>

                                    <div className="tutorial-form-row message-row">
                                        <label hidden htmlFor="message">{APP.term('contact_your_msg')}</label>
                                        <textarea placeholder={APP.term('contact_your_msg')} name="message" id="message" value={messageVal} onChange={(e) => { limitMessage(e.target.value) }} />
                                        <div className="message-limit"><span>{messageLimitString}</span></div>
                                    </div>

                                    {formError && <div className="message validation-error"><span>{formError}</span></div>}

                                    {isProcessing && <button disabled className="apply-button processing-request"><span>{APP.term('contact_submit_text')}</span></button>}
                                    {!isProcessing && <button className="apply-button"><span>{APP.term('contact_submit_text')}</span></button>}

                                </form>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="page contact_us mobile-view-block">

                <div className="logo-box">
                    {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
                </div>

                {/* <button className="menu_btn" onClick={openMenu}>
                    <img src="/media/images/menu.svg" />
                </button> */}
                <Link to={poolSwitch(currentPool)}>
                    <div className="contact_us_close_btn" />
                </Link>

                <div className="main-flex">

                    <div className="inner-flex">

                        <p className="main-title"><span>{APP.term('contact_title')}</span></p>
                        <p className="sub-title"><span>{APP.term('contact_provide_details')}</span></p>

                        <div className="form-wrap">

                            <form className="tutorial-form">

                                <div className="tutorial-form-row nickname-row">
                                    <label hidden htmlFor="nickname">{APP.term('sap_your_nickname')}</label>
                                    <input placeholder={APP.term('sap_your_nickname')} type="text" name="nickname" id="nickname" value={nicknameVal} onChange={(e) => { setNickname(e.target.value) }} />
                                </div>

                                <div className="tutorial-form-row email-row">
                                    <label hidden htmlFor="email">{APP.term('sap_your_email')}</label>
                                    <input placeholder={APP.term('sap_your_email')} type="email" name="email" id="email" value={emailVal} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>

                                <div className="tutorial-form-row phone-row">
                                    <label hidden htmlFor="phone">{APP.term('sap_your_phone')}</label>
                                    <input placeholder={APP.term('sap_your_phone')} type="text" name="phone" id="phone" value={phoneVal} onChange={(e) => { setPhone(e.target.value) }} />
                                </div>

                                <div className="tutorial-form-row message-row">
                                    <label hidden htmlFor="message">{APP.term('contact_your_msg')}</label>
                                    <textarea placeholder={APP.term('contact_your_msg')} name="message" id="message" value={messageVal} onChange={(e) => { limitMessage(e.target.value) }} />
                                    <div className="message-limit"><span>{messageLimitString}</span></div>
                                </div>

                                {formError && <div className="message validation-error"><span>{formError}</span></div>}

                            </form>

                        </div>

                        <IconBox />

                        <p className="contact-you"><span>{APP.term('contact_manager_will_contact')}</span></p>

                        {isProcessing && <button disabled className="apply-button processing-request"><span>{APP.term('contact_submit_text')}</span></button>}
                        {!isProcessing && <button className="apply-button" onClick={onSubmitForm}><span>{APP.term('contact_submit_text')}</span></button>}

                    </div>

                </div>

            </div>

        </>

    );

};

export default ContactUs;