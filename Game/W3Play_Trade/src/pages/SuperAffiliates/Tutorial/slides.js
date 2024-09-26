import React, { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavButton from './NavButton';
import IconBox from './IconBox';
import ConnectWalletModal from '../../TradePage/ConnectWalletModal';
import { WalletContext } from '../../../utils/game';

import { set_loader, set_connect_wallet_popup, set_alert_msg, set_last_sap_tutorial_slide } from '../../../REDUX/actions/main.actions';
import useAppState from '../../../hooks/useAppState';
import API from '../../../API/superAffiliates';
import APP from '../../../app';

const imagePath = '/media/images/super_affiliate_program';
const MESSAGE_LIMIT = 500;

const EntrySuperAffiliate = ({ next, skipNext }) => {

    const currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool);
    const route = currentPoolDetails?.route;
    const logo = APP?.controller?.cfg,

        onClickNext = () => {
            // if (!walletAddress) return next();
            // skipNext();
            next();
        };

    return (
        <div className="page sap-tutorial sap-tutorial-entry-screen-main">

            <div className="logo-box">
                {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
            </div>

            <div className="main-flex">

                <div className="top-buttons-row">
                    <NavButton text={APP.term('sap_tutorial_close_button')} to={route} addClass="button-close" />
                </div>

                <img className="title-image" src={`${imagePath}/entry-title-image.png`} />
                <p className="desc1"><span>{APP.term('sap_entry_tutorial_desc1')}</span></p>
                <p className="desc2"><span>{APP.term('sap_entry_tutorial_desc2')}</span></p>
                <p className="desc3"><span>{APP.term('sap_entry_tutorial_desc3')}</span></p>

                <div className="nav-buttons-row">
                    <NavButton text={APP.term('next_step')} callback={onClickNext} addClass="button-next" />
                </div>

            </div>

        </div>
    )
};

const AffiliateRevShare = ({ next, skipNext, back }) => {

    const currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool);
    const route = currentPoolDetails?.route;
    const logo = APP?.controller?.cfg,

        onClickNext = () => {
            // if (!walletAddress) return 
            next();
            // skipNext();
        };

    return (
        <div className="page sap-tutorial sap-tutorial-entry-screen-revshare">

            <div className="logo-box">
                {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
            </div>

            <div className="main-flex">

                <div className="top-buttons-row">

                    <div className="back-mobile" onClick={back}>
                        <p><span>{APP.term('sap_tutorial_back')}</span></p>
                    </div>

                    <NavButton text={APP.term('sap_tutorial_close_button')} to={route} addClass="button-close" />
                
                </div>

                <p className="desc1"><span>{APP.term('sap_tutorial_revshare_desc1')}</span></p>

                <div className="revshare-desc-box">
                    <img className="image1" src={`${imagePath}/rev-share-title-image.png`} />
                    <img className="image2" src={`${imagePath}/rev-share-35-percent.png`} />
                </div>

                <p className="desc2"><span>{APP.term('sap_tutorial_revshare_desc2')}</span></p>

                <img className="image3" src={`${imagePath}/rev-share-rocket.png`} />

                <div className="nav-buttons-row">
                    <NavButton text="Back" callback={back} addClass="button-back" />
                    <NavButton text={APP.term('next_step')} callback={onClickNext} addClass="button-next" />
                </div>

            </div>

        </div>
    )
};
const Partnership = ({ next, skipNext, back }) => {

    const currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool);
    const route = currentPoolDetails?.route;
    const logo = APP?.controller?.cfg,

        onClickNext = () => {
            // if (!walletAddress) return 
            next();
            // skipNext();
        },

        descArr = [
            'sap_tutorial_partnership_arr_desc1',
            'sap_tutorial_partnership_arr_desc2',
            'sap_tutorial_partnership_arr_desc3',
            'sap_tutorial_partnership_arr_desc4',
            'sap_tutorial_partnership_arr_desc5'
        ]

    return (
        <div className="page sap-tutorial sap-tutorial-entry-screen-partnership">

            <div className="logo-box">
                {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
            </div>

            <div className="main-flex">

                <div className="top-buttons-row">
                    <div className="back-mobile" onClick={back}>
                        <p><span>{APP.term('sap_tutorial_back')}</span></p>
                    </div>
                    <NavButton text={APP.term('sap_tutorial_close_button')} to={route} addClass="button-close" />
                </div>

                <img src={`${imagePath}/partnership-image.png`} className="mobile-title-image" />
                <p className="desc1"><span>{APP.term('sap_tutorial_partnership_desc1')}</span></p>

                <div className="partnership-desc-box">
                    <div className="left">
                        {descArr.map((itm, i) => (
                            <div key={i}>
                                <img className="icon" src={`${imagePath}/brown-arrow.png`} />
                                <p><span>{APP.term(itm)}</span></p>
                            </div>
                        ))}
                    </div>
                    <div className="right">
                        <img src={`${imagePath}/partnership-image.png`} />
                    </div>

                </div>

                <div className="nav-buttons-row">
                    <NavButton text="Back" callback={back} addClass="button-back" />
                    <NavButton text={APP.term('next_step')} callback={onClickNext} addClass="button-next" />
                </div>

            </div>

        </div>
    )
};

const SuperAffiliateProgram = ({ back, next, skipNext }) => {

    const currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool);
    const route = currentPoolDetails?.route;
    const walletAddress = useAppState('wallet_address');

    const onClickNext = () => {
        // if (walletAddress) skipNext();
        // else 
        next();
    };

    return (

        <div className="page sap-tutorial sap-tutorial-entry-screen">

            <div className="main-flex">

                <div className="top-buttons-row">
                    <div className="back-mobile" onClick={back}>
                        <p>{APP.term('sap_tutorial_back')}</p>
                    </div>
                    <NavButton text={APP.term('sap_tutorial_close_button')} to={route} addClass="button-close" />
                </div>

                <div className="title-image-box">
                    <img className="icon" src={`${imagePath}/step1-title-image.svg`} />
                </div>

                <div className="main-image-set">
                    <div className="left-image-box"><img className="icon" src={`${imagePath}/step1-left-image.svg`} /></div>
                    <div className="arrow-image-box"><img className="icon" src={`${imagePath}/step1-arrow-image.svg`} /></div>
                    <div className="middle-image-box"><img className="icon" src={`${imagePath}/step1-middle-image.svg`} /></div>
                    <div className="arrow-image-box"><img className="icon" src={`${imagePath}/step1-arrow-image.svg`} /></div>
                    <div className="right-image-box"><img className="icon" src={`${imagePath}/step1-right-image.svg`} /></div>
                </div>

                <div className="text-box">
                    <p><span>{APP.term('sap_introducing')}</span></p>
                </div>

                <div className="nav-buttons-row">
                    <NavButton text="Back" callback={back} addClass="button-back" />
                    <NavButton text={APP.term('next_step')} callback={onClickNext} addClass="button-next" />
                </div>

            </div>

        </div>

    );

};

const ConnectYourWallet = ({ back, next }) => {

    const dispatch = useDispatch();
    const { wallet, authenticate } = useContext(WalletContext);
    const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);
    const walletAddress = useAppState('wallet_address');
    const logo = APP?.controller?.cfg;
    const mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

    const toggleWalletModal = () => {
        dispatch(set_connect_wallet_popup(!connect_wallet_popup));
    };

    useEffect(() => {
        dispatch(set_last_sap_tutorial_slide({ last_slide: 4 }))
    }, []);

    return (
        <>
            {/* <div className="sap-modal-wrap"> */}
            {connect_wallet_popup && (<ConnectWalletModal
                openModal={() => connect(dispatch)}
                wallet={wallet}
                authenticate={authenticate}
            />)}
            {/* </div> */}

            <div className="page sap-tutorial sap-tutorial-connect-wallet">

                <div className="logo-box">
                    {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
                </div>

                <div className="main-flex">

                    <div className="top-buttons-row">
                        <div className="back-mobile" onClick={back}>
                            <p>{APP.term('sap_tutorial_back')}</p>
                        </div>
                        {/* <NavButton text={APP.term('sap_tutorial_close_button')} addClass="button-close" /> */}
                    </div>

                    <div className="top-image-box">
                        <img className="icon" src={`${imagePath}/step4-top-image.svg`} />
                    </div>

                    <div className="top-caption-box">
                        <p><span>{APP.term('sap_connect_wallet_exc')}</span></p>
                    </div>

                    <div className="text-box">
                        <p><span>{APP.term('sap_your_wallet_serves')}</span></p>
                    </div>

                    <div className="connect-box">
                        <div onClick={toggleWalletModal}><span>{APP.term('sap_connect_wallet')}</span></div>
                    </div>

                    <div className="nav-buttons-row">
                        <NavButton text="Back" callback={back} addClass="button-back" />
                    </div>

                </div>

            </div>

        </>

    );

};

const CreateAccount = ({ next, back }) => {

    const currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool);
    const route = currentPoolDetails?.route;
    const dispatch = useDispatch();
    const logo = APP?.controller?.cfg;
    const walletAddress = useAppState('wallet_address');

    const [nicknameVal, setNickname] = useState('');
    const [emailVal, setEmail] = useState('');
    const [phoneVal, setPhone] = useState('');
    const [messageVal, setMessage] = useState('');

    const [isFormError, setFormError] = useState(null);
    const [isProcessing, setProcessing] = useState(null);
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

            // Terminate process in case !token or !partnerRef
            const token = localStorage.getItem("auth-token");
            const partnerRef = localStorage.getItem('partnerRef') || 'playnance';
            if (!partnerRef || !token || !walletAddress) { throw new Error() };

            // Attach additional data before sending request
            data.uri = window.location.href;
            data.partnerRef = partnerRef;
            data.wallet = walletAddress;
            data.role = 'sap';

            const res = await API.createAccount(token, data);
            if (res.status !== 201) { throw new Error() }

            dispatch(set_last_sap_tutorial_slide({ submitted_form: true }))
            next();

        }

        catch (error) {
            dispatch(set_alert_msg({ type: 'error', content: 'failed_loading_data' }));
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

            <div className="page sap-tutorial sap-tutorial-create-account default-web-view-block">

                <div className="logo-box">
                    {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
                </div>

                <div className="main-flex">

                    <div className="top-buttons-row">
                        <NavButton text={APP.term('sap_tutorial_close_button')} to={route} addClass="button-close" />
                    </div>

                    <div className="inner-flex">

                        <div className="content-box">

                            <p className="main-title"><span>{APP.term('sap_create_account')}</span></p>
                            <p className="sub-title"><span>{APP.term('sap_provide_details')}</span></p>

                            <IconBox />

                            {/* <p className="contact-you"><span>{APP.term('sap_will_contact')}</span></p> */}
                            {/* <p className="brand-email-caption"><span>{APP.term('sap_our_email')}</span></p> */}
                            {/* <p className="brand-email-address"><span>Affiliate@brand.com</span></p> */}

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
                                        <label hidden htmlFor="message">{APP.term('sap_your_message')}</label>
                                        <textarea placeholder={APP.term('sap_your_message')} name="message" id="message" value={messageVal} onChange={(e) => { limitMessage(e.target.value) }} />
                                        <div className="message-limit"><span>{messageLimitString}</span></div>
                                    </div>

                                    {isFormError && <div className="message validation-error"><span>{isFormError}</span></div>}

                                    {isProcessing && <button disabled className="apply-button processing-request"><span>{APP.term('sap_apply_continue')}</span></button>}
                                    {!isProcessing && <button className="apply-button"><span>{APP.term('sap_apply_continue')}</span></button>}

                                </form>

                            </div>

                        </div>

                        {/* <div className="nav-buttons-row">
                            <NavButton text={APP.term('next_step')} callback={next} addClass="button-next" />
                        </div> */}

                    </div>

                </div>

            </div>

            <div className="page sap-tutorial sap-tutorial-create-account mobile-view-block">

                <div className="logo-box">
                    {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
                </div>

                <div className="main-flex">

                    <div className="top-buttons-row">
                        <NavButton text={APP.term('sap_tutorial_close_button')} to={route} addClass="button-close" />
                    </div>

                    <div className="inner-flex">


                        <p className="main-title"><span>{APP.term('sap_create_account')}</span></p>
                        <p className="sub-title"><span>{APP.term('sap_provide_details')}</span></p>

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
                                    <label hidden htmlFor="message">{APP.term('sap_your_message')}</label>
                                    <textarea placeholder={APP.term('sap_your_message')} name="message" id="message" value={messageVal} onChange={(e) => { limitMessage(e.target.value) }} />
                                    <div className="message-limit"><span>{messageLimitString}</span></div>
                                </div>

                                {isFormError && <div className="message validation-error"><span>{isFormError}</span></div>}

                            </form>

                        </div>

                        <IconBox />

                        {/* <p className="contact-you"><span>{APP.term('sap_will_contact')}</span></p> */}

                        {isProcessing && <button disabled className="apply-button processing-request"><span>{APP.term('sap_apply_continue')}</span></button>}
                        {!isProcessing && <button className="apply-button" onClick={onSubmitForm}><span>{APP.term('sap_apply_continue')}</span></button>}

                        {/* <div className="nav-buttons-row">
                            <NavButton text={APP.term('next_step')} callback={next} addClass="button-next" />
                        </div> */}

                    </div>

                </div>

            </div>

        </>

    );

};

const AccountCreated = ({ next, back }) => {

    const logo = APP?.controller?.cfg;

    return (

        <div className="page sap-tutorial sap-tutorial-account-created">

            <div className="logo-box">
                {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
            </div>

            <div className="main-flex">

                <div className="top-image-box">
                    <img className="icon" src={`${imagePath}/step3-top-image.svg`} />
                </div>

                <div className="top-caption-box"><p><span>{APP.term('sap_thank_you_submit')}</span></p></div>

                <div className="top-text-box">
                    <p><span>{APP.term('sap_we_have_received')}</span></p>
                </div>

                <div className="bottom-text-box">
                    <p><span>{APP.term('sap_while_we_process')}</span></p>
                </div>

                <div className="nav-buttons-row">
                    <NavButton text={APP.term('next_step')} to="/sap_links" addClass="button-next" />
                </div>

            </div>

        </div>

    );

};

const CreateAffiliateLink = ({ next, back }) => {

    const logo = APP?.controller?.cfg;

    const onClickNext = () => {
        next();
    }

    return (

        <div className="page sap-tutorial sap-tutorial-create-link">

            <div className="logo-box">
                {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
            </div>

            <div className="main-flex">

                <div className="top-image-box">
                    <img className="icon" src={`${imagePath}/step5-top-image.svg`} />
                </div>

                <div className="top-caption-box">
                    <p><span>{APP.term('sap_create_link')}</span></p>
                </div>

                <div className="text-box">
                    <p><span>{APP.term('sap_ensure_separate')}</span></p>
                </div>

                <div className="nav-buttons-row">
                    <NavButton text="Back" callback={back} addClass="button-back" />
                    <NavButton text={APP.term('next_step')} callback={onClickNext} addClass="button-next" />
                </div>

            </div>

        </div>

    );

};

const validateForm = ({ name, email, phone, message }) => {

    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const phonePattern = /^[\d ()+]+$/;

    if (!name) return APP.term('sap_enter_nickname');
    if (!email) return APP.term('sap_enter_email');
    if (!emailPattern.test(email)) return APP.term('sap_valid_email');
    if (!phone) return APP.term('sap_enter_phone');
    if (!phonePattern.test(phone)) return APP.term('sap_valid_phone');
    // if(!message) return APP.term('sap_enter_message');

    return false;

};

const slides = [
    { SlideComponent: EntrySuperAffiliate, settings: { position: 1 } },
    { SlideComponent: AffiliateRevShare, settings: { position: 2 } },
    { SlideComponent: Partnership, settings: { position: 3 } },
    // { SlideComponent: SuperAffiliateProgram, settings: { position: 4 } },
    { SlideComponent: ConnectYourWallet, settings: { position: 4 } },
    { SlideComponent: CreateAffiliateLink, settings: { position: 5 } },
    { SlideComponent: CreateAccount, settings: { position: 6 } },
    { SlideComponent: AccountCreated, settings: { position: 7 } },
];

export default slides;