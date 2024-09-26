import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';

// import SETTINGS from '../../settings';

import useAppState from '../../hooks/useAppState';
import APP from '../../app';
import contactUsAPI from '../../API/contactUs';
import { set_loader, set_alert_msg, set_chosen_partner_program } from '../../REDUX/actions/main.actions';

import HeaderWrap from './header/HeaderWrap';
import BackButton from './header/BackButton';
import CloseButton from './header/CloseButton';
import LogoButton from './header/LogoButton';
// import Loader from '../main/Loader';
import IconBox from './IconBox';

const IMAGE_DIR = '/media/images/partner-program/';
const MESSAGE_LIMIT = 500;

const validateContactUsForm = ({ name, email, phone, message }) => {

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

/* SLIDE 1 */
const StartProgram = ({ settings, next }) => {

    const logo = APP?.controller?.cfg;

    let descList = [
		{desc: 'AFFILIATE/ INFLUENCER'},
		{desc: 'GAMING/ EXCHANGE OPERATOR'},
		{desc: 'ENTREPRENEUR/ INVESTOR'}
	];

	return (

		// <motion.main {...FRAMER_MOTION_TRANSITION}>

			<div className="partners-slide partner_slide_opening-screen">

                <div className="main-bg"></div>

				<div className="slide-inner">

					<HeaderWrap>
                        {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) &&
                        <LogoButton logoUrl={logo.partnerInfo.logoUrl} />}
                        <CloseButton />
					</HeaderWrap>

					<div className="inner-top">
						<div className="text-dear"><span>DEAR</span></div>
						<div className="boxes-row">
							{descList.map((itm, i) => (
								<div key={i} className="box">
									<p className="box-title"><span>{itm?.desc}</span></p>
								</div>
							))}
						</div>
						<p className="text-convert">
							<span>Convert your traffic to cash money with our new Web3 DAPP</span>
						</p>
					</div>

					<div className="start-btn" onClick={next}>
							<span>Start your partner program</span>
					</div>

				</div>

			</div>

		// </motion.main>

	);

};

/* SLIDE 2 */
const JoinTradingGame = ({ settings, next }) => {

    const logo = APP?.controller?.cfg;

	return (

		// <motion.main {...FRAMER_MOTION_TRANSITION}>

			<div className="partners-slide partner_slide_decentralized">

                <div className="main-bg"></div>

				<div className="slide-inner">

					<HeaderWrap>
                        {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) &&
                        <LogoButton logoUrl={logo.partnerInfo.logoUrl} />}
                        <CloseButton />
					</HeaderWrap>

					<p className="slide-title">
						<span>Join the Decentralized Web3 Social Pool Trading Game</span>
					</p>

					<div className="slide-middle">
						<div className="decentralized-image-box">
							<div></div>
						</div>
					</div>

					<div className="slide-bottom">
						<div className="tech-box">
							<p className="tech-desc"><span>TECHNOLOGY</span></p>
							<div className="tech-row">
								<img alt="" src={`${IMAGE_DIR}chain.png`} />
								<img alt="" src={`${IMAGE_DIR}web3.png`} />
								<img alt="" src={`${IMAGE_DIR}dapp.png`} />
							</div>
						</div>
						<div className="next-btn" onClick={next}>
							<span>Next</span>
						</div>
					</div>

				</div>

			</div>

		// </motion.main>

	);

};

/* SLIDE 3 */
const YouBringWeBring = ({ settings, next }) => {

    const logo = APP?.controller?.cfg;

	return (

		// <motion.main {...FRAMER_MOTION_TRANSITION}>

			<div className="partners-slide partner_slide_partner-program" id="parteners-slide-3">

                <div className="main-bg"></div>

				<div className="slide-inner">

					<HeaderWrap>
                        {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) &&
                        <LogoButton logoUrl={logo.partnerInfo.logoUrl} />}
                        <CloseButton />
					</HeaderWrap>

					<div className="slide-title">
						<span>PARTNER PROGRAM</span>
					</div>

					<div className="slide-middle">

						<div className="middle-box">

							<div className="rocket-bg"></div>

							<div className="top-image-box">
								<img alt="" src={`${IMAGE_DIR}goldPartner.png`} className="gold-partner" />
							</div>

							<div className="profit-box left">
								<div className="profit-wrap">
									<p className="profit-top-desc"><span>YOU BRING THE</span></p>
									<p className="profit-bottom-desc"><span>TRAFFIC</span></p>
								</div>
							</div>

							<div className="profit-box right">
								<div className="profit-wrap">
									<p className="profit-top-desc"><span>WE BRING THE</span></p>
									<p className="profit-bottom-desc"><span>TECH</span></p>
								</div>
							</div>
							
						</div>

						<div className="rocket-wrap">
							<img alt="" src={`${IMAGE_DIR}rocketPower.png`} />
						</div>

					</div>

					<div className="slide-bottom">
						<div className="next-btn" onClick={next}>
							<span>Next</span>
						</div>
					</div>

				</div>

			</div>

		// </motion.main>

	);

};

/* SLIDE 4 */
const WhatYouGet = ({ settings, next }) => {

    const logo = APP?.controller?.cfg;

    const contentList = [
		{ src: '1', header: 'Start Earning from Day 1', desc: 'Partners can start earning from the first day they join the platform.' },
		{ src: '2', header: 'Plug and Play Software', desc: 'The platform is easy to set up and use, allowing partners to start earning quickly.' },
		{ src: '3', header: 'Lifetime Earnings', desc: 'Partners can earn lifetime earnings from their referrals, providing them with a long-term income stream.' },
		{ src: '4', header: 'Fully Branded WebSite', desc: 'Partners will have the ability to have a fully branded website that is customized to their needs. This will allow them to have a professional looking platform that aligns with their branding and image.' },
		{ src: '5', header: 'Cross-Platform Mobile and Desktop', desc: 'The UpvsDown platform is available on both mobile and desktop devices, allowing partners to reach a wide range of players.' },
		{ src: '6', header: 'Daily Payments', desc: 'Partners will receive daily payments directly to their digital wallet, providing them with a steady stream of income.' },
		{ src: '7', header: 'BI System', desc: 'A Business Intelligence system is available to partners, which allows them to track key metrics and make informed business decisions.' },
		{ src: '8', header: 'All Legal Agreements', desc: 'All necessary legal agreements are provided to partners, ensuring that the platform is fully compliant and that partners are protected.' },
		{ src: '9', header: '17 Language Localization', desc: 'The UpvsDown platform is available in 17 different languages, allowing partners to reach a global audience.' },
		{ src: '10', header: 'Multi-Level Affiliate Program', desc: 'Partners can earn commissions from multiple levels of referrals, providing them with additional income streams.' },
		{ src: '11', header: 'Internal Chat', desc: 'An internal chat system is available for partners to communicate with their players and other partners.' },
		{ src: '12', header: '24/7 Liquidity', desc: 'The platform has 24/7 liquidity, ensuring that players can trade at any time.' },
		{ src: '13', header: '24/7 Support', desc: 'Partners have access to 24/7 support, ensuring that they have assistance when they need it.' },
		{ src: '14', header: '24/7 Security', desc: 'The platform has 24/7 security, protecting partners and players from fraud and other security threats.' },
		{ src: '15', header: 'Strong Roadmap', desc: 'The UpvsDown platform has a strong roadmap for future development, ensuring that partners can continue to grow and evolve with the platform.' },
		{ src: '16', header: 'Auto Payment to Affiliates', desc: 'Affiliate commissions are paid out automatically to partners digital wallets.' },
		{ src: '17', header: 'Auto Calculation System', desc: 'The platform has an automatic calculation system, which ensures that all earnings and commissions are accurately calculated and paid out.' },
		{ src: '18', header: 'Full Crypto Payment', desc: 'The platform accepts full crypto payment, allowing partners to receive payments in a variety of cryptocurrencies.' },
		{ src: '19', header: 'Audited Smart Contract', desc: "The platform's smart contract has been audited by a third-party (\"Certik\") , ensuring its security and reliability." },
		{ src: '20', header: 'Viral Software', desc: "The platform has viral software built-in, which helps to attract new players and increase earnings for partners." },
		{ src: '21', header: 'Risk-Free', desc: "The platform is risk-free, ensuring that partners can earn income without any risk to their capital." },
		{ src: '22', header: 'Auto-Managed Software', desc: "The platform is fully auto-managed, allowing partners to focus on growing their business without worrying about the technical details." },
		{ src: '23', header: 'Cutting-edge technology utilizing web 3 and decentralized finance (DeFi) principles', desc: "The UpvsDown partner plan offers cutting-edge web 3 decentralized technology for secure and transparent trading, investing, and earning cryptocurrency. With higher returns, lower fees, and increased control over assets, it's a revolutionary way to benefit from defi technology. Plus, with no intermediaries, the risk of fraud and hacking is greatly reduced. Partner with UpvsDown to offer your clients an innovative and secure way to trade and earn crypto." },
	];

	return (

		// <motion.main {...FRAMER_MOTION_TRANSITION}>

			<div className="partners-slide partner_slide_what-you-get">

                <div className="main-bg"></div>
				
				<div className="slide-inner">

					<HeaderWrap>
                        {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) &&
                        <LogoButton logoUrl={logo.partnerInfo.logoUrl} />}
                        <CloseButton />
					</HeaderWrap>

					<p className="slide-title"><span>What You Get?</span></p>

					<div className="center-flex">
						{contentList.map((itm, i) => (
							<div key={i} className="desc-box">
								<img alt="" src={`${IMAGE_DIR}content_${i + 1}.png`} />
								<div className="desc-row">
									<p className="desc-header"><span>{itm?.header}</span></p>
									<p className="desc"><span>{itm?.desc}</span></p>
								</div>
							</div>
						))}
					</div>

					<div className="slide-bottom-background"></div>

					<div className="slide-bottom">
						<div className="next-btn" onClick={next}>
							<span>Next</span>
						</div>
					</div>

				</div>

			</div >

        // </motion.main>
		
	);

};

/* SLIDE 5 */
const TopHighlights = ({ settings, next }) => {

    const logo = APP?.controller?.cfg;

    const descList = [
		{id: 1, desc: 'START EARNING FROM DAY 1'},
		{id: 2, desc: 'GET YOUR PROFIT AUTOMATICALLY EVERY DAY DIRECT TO YOUR DIGITAL WALLET'},
		{id: 3, desc: 'LIFETIME EARNINGS'},
		{id: 4, desc: 'HIGHEST SELF CONVERSION & RETENTION RATE IN THE INDUSTRY' },
		{id: 5, desc: '100% TRANSPARENCY ,ALL ON THE BLOCKCHAIN!'},
	];

	return (

		// <motion.main {...FRAMER_MOTION_TRANSITION}>
			
			<div className="partners-slide partner_slide_partnership-highlights">

                <div className="main-bg"></div>

				<div className="slide-inner">

					<HeaderWrap>
                        {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) &&
                        <LogoButton logoUrl={logo.partnerInfo.logoUrl} />}
						<CloseButton />
					</HeaderWrap>

					<p className="slide-title">
						<span>TOP 5 PARTNERSHIP HIGHLIGHTS</span>
					</p>

					<div className="slide-middle">
						<div className="center-flex">
							<div className="desc-list">
								{descList.map(itm => (
									<div key={itm.id} className="desc-row">
										<img alt="" src={`${IMAGE_DIR}brownArrow.png`} />
										<p className="desc"><span>{itm.desc}</span></p>
									</div>
								))}
							</div>
							<img alt="" src={`${IMAGE_DIR}partners.png`} className="side-image" />
						</div>
					</div>

					<div className="slide-bottom">
						<div className="next-btn" onClick={next}>
							<span>Next</span>
						</div>
					</div>

				</div>

			</div>

		// </motion.main>

	);

};

/* SLIDE 6 */
const ChooseProgram = ({ settings, next }) => {

    const dispatch = useDispatch();
    const logo = APP?.controller?.cfg;

    const onClickProgramButton = (program) => {
        dispatch(set_chosen_partner_program(program));
        next();
    };

	return (

        <div className="partners-slide partner_slide_choose-program" id="parteners-slide-4">

            <div className="main-bg"></div>

            <div className="slide-inner">

                <HeaderWrap>
                    {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) &&
                    <LogoButton logoUrl={logo.partnerInfo.logoUrl} />}
                    <CloseButton />
                </HeaderWrap>

                <div className="slide-middle">

                    <div className="program-options">

                        <div className="option option-whitelabel">
                            <div className="top-text"><span>GET YOUR BRANDED</span></div>
                            <div className="bottom-text"><span>WHITELABEL</span></div>
                            <div className="continue-button" onClick={() => {onClickProgramButton('whitelabel')}}>
                                <span>Continue as whitelabel</span>
                            </div>
                        </div>

                        <div className="option option-affiliate">
                            <div className="top-text"><span>BECOME SUPER</span></div>
                            <div className="bottom-text"><span>AFFILIATE</span></div>
                            <div className="continue-button" onClick={() => {onClickProgramButton('affiliate')}}>
                                <span>Continue as super affiliate</span>
                            </div>
                        </div>
                        
                    </div>

                    </div>

            </div>

        </div>

	);

};

const ContactUs = ({ settings, next, back }) => {

    const dispatch = useDispatch();
    const chosenProgram = useSelector(state => state.mainReducer.chosen_partner_program);
    const logo = APP?.controller?.cfg;
    const walletAddress = useAppState('wallet_address');

    const [nicknameVal, setNickname] = useState('');
    const [emailVal, setEmail] = useState('');
    const [phoneVal, setPhone] = useState('');
    const [messageVal, setMessage] = useState('');

    const [formError, setFormError] = useState(null);
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
        const formError = validateContactUsForm(data);

        if (formError) {
            dispatch(set_loader(false));
            setProcessing(null);
            return setFormError(formError);
        }

        try {
            // Attach additional data before sending request
            data.country = APP.state.get('customer.countryCode');
            data.wallet = walletAddress || '';
            const res = await contactUsAPI.sendContactData(data);
            if (res.status !== 201) { throw new Error() };
            // dispatch(set_alert_msg({ type: 'success', content: 'form_submit_success' }));
            next();
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

            <div className="partners-slide partner_slide_contact-us default-web-view-block" id="parteners-slide-4">

                <div className="main-bg"></div>

                <div className="slide-inner">

                    <HeaderWrap>
                        {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) &&
                        <LogoButton logoUrl={logo.partnerInfo.logoUrl} />}
                        <CloseButton />
                    </HeaderWrap>

                    <div className="slide-middle">

                        <div className="contact-flex">

                            <div className="content-box">
                                
                                {(chosenProgram === 'whitelabel') && <p className="main-title"><span>GET YOUR BRANDED WHITE LABEL WEB3 DAPP</span></p>}
                                {(chosenProgram === 'affiliate') && <p className="main-title"><span>BECOME SUPER AFFILIATE PARTNER</span></p>}
                                
                                <p className="contact-you"><span>Please provide your contact details and one of our sales managers will contact you shortly</span></p>
                                
                                <IconBox />

                                <a className="telegram-link" href="https://t.me/themistergreen" target="_blank">
                                    <span>Chat with us on Telegram</span>
                                </a>

                            </div>

                            <div className="form-box">

                                <div className="form-wrap">

                                    <form className="tutorial-form" onSubmit={onSubmitForm}>

                                        <div className="tutorial-form-row nickname-row">
                                            <label hidden htmlFor="nickname">Your Nickname</label>
                                            <input placeholder="Your Nickname" type="text" name="nickname" id="nickname" value={nicknameVal} onChange={(e) => { setNickname(e.target.value) }} />
                                        </div>

                                        <div className="tutorial-form-row email-row">
                                            <label hidden htmlFor="email">Your Email</label>
                                            <input placeholder="Your Email" type="email" name="email" id="email" value={emailVal} onChange={(e) => { setEmail(e.target.value) }} />
                                        </div>

                                        <div className="tutorial-form-row phone-row">
                                            <label hidden htmlFor="phone">Your Phone</label>
                                            <input placeholder="Your Phone" type="text" name="phone" id="phone" value={phoneVal} onChange={(e) => { setPhone(e.target.value) }} />
                                        </div>

                                        <div className="tutorial-form-row message-row">
                                            <label hidden htmlFor="message">Your Message</label>
                                            <textarea placeholder="Your Message" name="message" id="message" value={messageVal} onChange={(e) => { limitMessage(e.target.value) }} />
                                            <div className="message-limit"><span>{messageLimitString}</span></div>
                                        </div>

                                        {formError && <div className="message validation-error"><span>{formError}</span></div>}

                                        {isProcessing && <button disabled className="apply-button processing-request"><span>Send</span></button>}
                                        {!isProcessing && <button className="apply-button"><span>Apply and Continue</span></button>}

                                    </form>

                                </div>

                            </div>

                        </div>

                    </div>

                    <div className="slide-bottom">
                        <BackButton handler={back} />
					</div>

                </div>

            </div>

            <div className="partners-slide partner_slide_contact-us mobile-view-block">

                <div className="main-bg"></div>

                <div className="slide-inner">

                    <HeaderWrap>
                        {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) &&
                        <LogoButton logoUrl={logo.partnerInfo.logoUrl} />}
                        <CloseButton />
                    </HeaderWrap>

                    <div className="slide-middle">

                        <div className="contact-flex">

                            <div className="content-box">
                                {(chosenProgram === 'whitelabel') && <p className="main-title"><span>GET YOUR BRANDED WHITE LABEL WEB3 DAPP</span></p>}
                                {(chosenProgram === 'affiliate') && <p className="main-title"><span>BECOME SUPER AFFILIATE PARTNER</span></p>}
                                <p className="contact-you"><span>Please provide your contact details and one of our sales managers will contact you shortly</span></p>
                            </div>

                            <div className="form-box">

                                <div className="form-wrap">

                                    <form className="tutorial-form" onSubmit={onSubmitForm}>

                                        <div className="tutorial-form-row nickname-row">
                                            <label hidden htmlFor="nickname">Your Nickname</label>
                                            <input placeholder="Your Nickname" type="text" name="nickname" id="nickname" value={nicknameVal} onChange={(e) => { setNickname(e.target.value) }} />
                                        </div>

                                        <div className="tutorial-form-row email-row">
                                            <label hidden htmlFor="email">Your Email</label>
                                            <input placeholder="Your Email" type="email" name="email" id="email" value={emailVal} onChange={(e) => { setEmail(e.target.value) }} />
                                        </div>

                                        <div className="tutorial-form-row phone-row">
                                            <label hidden htmlFor="phone">Your Phone</label>
                                            <input placeholder="Your Phone" type="text" name="phone" id="phone" value={phoneVal} onChange={(e) => { setPhone(e.target.value) }} />
                                        </div>

                                        <div className="tutorial-form-row message-row">
                                            <label hidden htmlFor="message">Your Message</label>
                                            <textarea placeholder="Your Message" name="message" id="message" value={messageVal} onChange={(e) => { limitMessage(e.target.value) }} />
                                            <div className="message-limit"><span>{messageLimitString}</span></div>
                                        </div>

                                        {formError && <div className="message validation-error"><span>{formError}</span></div>}

                                        {isProcessing && <button disabled className="apply-button processing-request"><span>Send</span></button>}
                                        {!isProcessing && <button className="apply-button"><span>Apply and Continue</span></button>}

                                    </form>

                                </div>

                            </div>

                            <IconBox />

                        </div>

                    </div>

                    <div className="slide-bottom">
                        <BackButton handler={back} />
					</div>

                </div>

            </div>

        </>

    );

};

const WillContactSoon = ({ settings, next, back }) => {

    const logo = APP?.controller?.cfg;

    return (

        <div className="partners-slide partner_slide_will-contact-soon" id="parteners-slide-5">

            <div className="main-bg"></div>
            
            <div className="slide-inner">

                <div className="slide-middle">

                    <div className="brand-logo">
                        {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) &&
                        <img src={logo.partnerInfo.logoUrl} />}
                    </div>

                    <div className="text">
                        <span>DEAR PARTNER, ONE OF OUR MANAGERS WILL CONTACT YOU SHORTLY!</span>
                    </div>

                </div>

                <div className="slide-bottom">
                    <CloseButton />
                </div>

            </div>

        </div>

        

    );

};

const slides = [
	{SlideComponent: StartProgram,    settings: {position: 1}},
	{SlideComponent: JoinTradingGame, settings: {position: 2}},
	{SlideComponent: YouBringWeBring, settings: {position: 3}},
    {SlideComponent: WhatYouGet,      settings: {position: 4}},
    {SlideComponent: TopHighlights,   settings: {position: 5}},
	// {SlideComponent: ChooseProgram,   settings: {position: 6}},
    {SlideComponent: ContactUs,       settings: {position: 6}},
    {SlideComponent: WillContactSoon, settings: {position: 7}}
];

export default slides;
