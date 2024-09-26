
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { isChrome, browserName } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import APP from '../app';
import GoldenText from '../comp/golden_text';
import useAppState from '../hooks/useAppState';
import { set_bg_music, set_first_load, set_sounds_popup, set_sound_effects, set_terms_popup, set_voiceover } from '../REDUX/actions/main.actions';
import TermsAndConditions from '../comp/modals/Terms';

function NavButtons({ next, back, skip, next_text }) {

	return (
		<div className="buttons">
			{next ? <div className="btn next_btn" onClick={next}>{APP.term('nav_next')}</div> : null}
			{skip ? <div className="btn skip_btn" onClick={skip}>{APP.term('nav_skip')}</div> : null}
			{back ? <div className="btn back_btn" onClick={back}>{APP.term('nav_back')}</div> : null}
		</div>
	);

};

function NavButtonsMobile({ next, back, skip, next_text }) {

	return (
		<div className="buttons_mobile">
			{/* {next ? <div className="next_btn" onClick={next}>{APP.term('nav_next')}</div> : null} */}
			{back ? <div className="back_btn" onClick={back}>{APP.term('nav_back')}</div> : null}
			{skip ? <div className="skip_btn" onClick={skip}>{APP.term('nav_skip')}</div> : null}
		</div>
	);

};

function Slide1({ isMobile, next, back, skip }) {

	const Web = ({ next }) => (
		<div className="tutorial_slide" id="tutorial_slide_1">
			<NavButtons next={next} />
			<div className="content">
				<div className="title">{APP.term('slide1_title')}</div>
				<div className="subtitle">{APP.term('slide1_subtitle1')}<br />{APP.term('slide1_subtitle2')}</div>
				<img src="/media/images/pool_example.png" className="pool_example"></img>
			</div>
		</div>
	);

	const Mobile = ({ next }) => (
		<div className="tutorial_slide" id="tutorial_slide_1_mobile">
			<div className="content">
				{/* <NavButtonsMobile skip={skip} /> */}
				<div className="title">{APP.term('slide1_title_mobile')}</div>
				<div className="subtitle">{APP.term('slide1_subtitle1_mobile')}<br />{APP.term('slide1_subtitle2_mobile')}<br />{APP.term('slide1_subtitle3_mobile')}</div>
				<img src="/media/images/tutorial_mobile/pool_example.png" className="pool_example"></img>
				<div className="next_btn_box" onClick={next}>
					<p>{APP.term('tutorial_next_mobile')}</p>
					<img src="/media/images/tutorial_mobile/gold_btn.png" className="next_btn"></img>
				</div>
			</div>
		</div>
	);

	return (isMobile ? <Mobile next={next} /> : <Web next={next} />);

};

function Slide2({ isMobile, back, skip, next }) {

	const Web = ({ next }) => (

		<div className="tutorial_slide" id="tutorial_slide_2">
			<NavButtons next={next} />
			<div className="content">
				<div className="title">{APP.term('slide2_title')}</div>
				<div className="points">
					<div className="point">{APP.term('slide2_point1')}</div>
					<div className="point">{APP.term('slide2_point2')}</div>
					<div className="point">{APP.term('slide2_point3')}</div>
					<div className="point">{APP.term('slide2_point4')}</div>
					<div className="point">{APP.term('slide2_point5')}</div>
				</div>
			</div>
		</div>

	);

	const Mobile = ({ back, skip, next }) => (

		<div className="tutorial_slide" id="tutorial_slide_2_mobile">
			<div className="content">
				<NavButtonsMobile back={back} skip={skip} />
				<div className="title">{APP.term('slide2_title_mobile')}</div>

				<div className="points">

					<div className="point">{APP.term('slide2_subtitle1_mobile')}</div>
					<div className="point_desc">{APP.term('slide2_subtitle2_mobile')}</div>

					<div className="point">{APP.term('slide2_subtitle3_mobile')}</div>
					<div className="point_desc">{APP.term('slide2_subtitle4_mobile')}</div>

					<div className="point">{APP.term('slide2_subtitle5_mobile')}</div>
					<div className="point_desc">{APP.term('slide2_subtitle6_mobile')}</div>

					<div className="point">{APP.term('slide2_subtitle7_mobile')}</div>
					<div className="point_desc">{APP.term('slide2_subtitle8_mobile')}</div>

					<div className="point">{APP.term('slide2_subtitle9_mobile')}</div>
					<div className="point_desc">{APP.term("slide2_subtitle10_mobile")}</div>

				</div>

				<div className="next_btn_box" onClick={next}>
					<p>{APP.term('tutorial_next_mobile')}</p>
					<img src="/media/images/tutorial_mobile/gold_btn.png" className="next_btn"></img>
				</div>
			</div>
		</div>

	);

	return (isMobile ? <Mobile back={back} skip={skip} next={next} /> : <Web back={back} skip={skip} next={next} />)
};

function Slide3({ isMobile, back, skip, next }) {

	const isDemo = APP.state.get('currentToken') === 'demo',
		info_txt = isDemo ? 'slide3_info_demo' : 'slide3_info',
		info_txt_mobile = isDemo ? 'slide3_info_mobile_demo' : 'slide3_info_mobile',
		title1_txt = isDemo ? 'slide3_title1_demo' : 'slide3_title1',
		title1_mobile_txt = isDemo ? 'slide3_title2_mobile_demo' : 'slide3_title2_mobile';

	const Web = () => (

		<div className="tutorial_slide" id="tutorial_slide_3">
			<NavButtons next={next} />
			<div className="content">
				<div className="title">{APP.term(title1_txt)} <br />{APP.term('slide3_title2')}</div>
				<img src="/media/images/poly_icon.svg" className="matic_image"></img>
				<div className="info">{APP.term(info_txt)}</div>
			</div>
		</div>

	);

	const Mobile = () => (

		<div className="tutorial_slide" id="tutorial_slide_3_mobile">
			<div className="content">
				<NavButtonsMobile back={back} skip={skip} />
				<div className="title">{APP.term(title1_mobile_txt)} <br />{APP.term('slide3_title2_mobile')}</div>
				<div className="subtitle">{APP.term('slide3_subtitle_mobile')}</div>
				<img src="/media/images/tutorial_mobile/polygon.png" className="matic_image"></img>
				<div className="info">{APP.term(info_txt_mobile)}</div>
				<div className="next_btn_box" onClick={next}>
					<p>{APP.term('tutorial_next_mobile')}</p>
					<img src="/media/images/tutorial_mobile/gold_btn.png" className="next_btn"></img>
				</div>
			</div>
		</div>

	);

	return (isMobile ? <Mobile back={back} skip={skip} next={next} /> : <Web back={back} skip={skip} next={next} />);
};

function Slide4({ isMobile, back, skip, next }) {

	const Web = () => (

		<div className="tutorial_slide" id="tutorial_slide_4">
			<div className="connect_btn">{APP.term('slide4_connect')}</div>
			<NavButtons next={next} skip={skip} />
			<div className="content">
				<div className="title">{APP.term('slide4_title')}</div>
				<img src="/media/images/tutorial_step_1.png" className="img_step step1"></img>
				<div className="wallets_title">{APP.term('slide4_desc')}</div>
				<div className="wallets">
					<img src="/media/images/metamask_logo.png" className="wallet_img metamask"></img>
					<img src="/media/images/coinbase_logo.png" className="wallet_img coinbase"></img>
				</div>
			</div>
		</div>

	);

	const Mobile = () => (

		<div className="tutorial_slide" id="tutorial_slide_4_mobile">
			<div className="content">
				<NavButtonsMobile back={back} skip={skip} />
				<div className="title">{APP.term('slide4_title_mobile')}</div>
				<div className="subtitle">{APP.term('slide4_subtitle_mobile')}</div>
				<img src="/media/images/tutorial_mobile/step1.png" className="img_step"></img>
				<div className="wallets_title">{APP.term('slide4_wallets_title')}</div>
				<div className="wallets">
					<img src="/media/images/metamask_logo.png" className="wallet_img"></img>
					<img src="/media/images/coinbase_logo.png" className="wallet_img"></img>
				</div>
				<div className="next_btn_box" onClick={next}>
					<p>{APP.term('tutorial_next_mobile')}</p>
					<img src="/media/images/tutorial_mobile/gold_btn.png" className="next_btn"></img>
				</div>
			</div>
		</div>

	);

	return (isMobile ? <Mobile back={back} skip={skip} next={next} /> : <Web back={back} skip={skip} next={next} />);

};

function Slide5({ isMobile, back, skip, next }) {

	const Web = () => (

		<div className="tutorial_slide" id="tutorial_slide_5">
			<NavButtons next={next} skip={skip} back={back} />
			<div className="content">
				<div className="title">{APP.term('slide5_title')}</div>
				<img src="/media/images/tutorial_step_2.png" className="img_step step2"></img>
				<img src="/media/images/invest_box.svg" className="invest_box"></img>
			</div>
		</div>

	);

	const Mobile = () => (

		<div className="tutorial_slide" id="tutorial_slide_5_mobile">
			<div className="content">
				<NavButtonsMobile back={back} skip={skip} />
				<div className="title">{APP.term('slide5_title_mobile')}</div>
				<div className="subtitle">{APP.term('slide5_subtitle_mobile')}</div>
				<img src="/media/images/tutorial_mobile/step2.png" className="img_step"></img>
				<img src="/media/images/tutorial_mobile/investment.png" className="img_invst"></img>
				<div className="next_btn_box" onClick={next}>
					<p>{APP.term('tutorial_next_mobile')}</p>
					<img src="/media/images/tutorial_mobile/gold_btn.png" className="next_btn"></img>
				</div>
			</div>
		</div>

	);

	return (isMobile ? <Mobile back={back} skip={skip} next={next} /> : <Web back={back} skip={skip} next={next} />);

};

function Slide6({ isMobile, back, skip, next }) {

	const Web = () => (

		<div className="tutorial_slide" id="tutorial_slide_6">
			<NavButtons next={next} skip={skip} back={back} />
			<div className="content">
				<div className="title">{APP.term('slide6_title')}</div>
				<div className="subtitle">{APP.term('slide6_subtitle')}</div>
				<img src="/media/images/tutorial_step_3.png" className="img_step step3"></img>
				<div className="bet_buttons">
					<div className="bet_btn up"></div>
					<div className="bet_btn down"></div>
				</div>
			</div>
		</div>

	);

	const Mobile = () => (

		<div className="tutorial_slide" id="tutorial_slide_6_mobile">
			<div className="content">
				<NavButtonsMobile back={back} skip={skip} />
				<div className="title">{APP.term('slide6_title_mobile')}</div>
				<div className="subtitle top">{APP.term('slide6_subtitle1_mobile')}</div>
				<img src="/media/images/tutorial_mobile/up.png" className="img_dir_up"></img>
				<img src="/media/images/tutorial_mobile/step3.png" className="img_step"></img>
				<img src="/media/images/tutorial_mobile/down.png" className="img_dir_down"></img>
				<div className="bet_buttons">
					<div className="bet_btn up"></div>
					<div className="bet_btn down"></div>
				</div>
				<div className="subtitle bottom">{APP.term('slide6_subtitle2_mobile')}</div>
				<div className="next_btn_box" onClick={next}>
					<p>{APP.term('tutorial_next_mobile')}</p>
					<img src="/media/images/tutorial_mobile/gold_btn.png" className="next_btn"></img>
				</div>
			</div>
		</div>

	);

	return (isMobile ? <Mobile back={back} skip={skip} next={next} /> : <Web back={back} skip={skip} next={next} />);

};

function Slide7({ isMobile, back, skip, next }) {

	const Web = () => (

		<div className="tutorial_slide" id="tutorial_slide_7">
			<NavButtons next={next} skip={skip} back={back} />
			<div className="content">
				<div className="title">{APP.term('slide7_title')}</div>
				<div className="image_contents">
					<div className="wallet_box">
						<img src="/media/images/metamask_logo.png" className="wallet_img metamask"></img>
						<div className="sign_btn">{APP.term('slide7_sign')}</div>
					</div>
					<img src="/media/images/tutorial_step_4.png" className="img_step step4"></img>
					<div className="wallet_box">
						<img src="/media/images/coinbase_logo.png" className="wallet_img coinbase"></img>
						<div className="sign_btn">{APP.term('slide7_sign')}</div>
					</div>
				</div>
			</div>
		</div>

	);

	const Mobile = () => (

		<div className="tutorial_slide" id="tutorial_slide_7_mobile">
			<div className="content">
				<NavButtonsMobile back={back} skip={skip} />
				<div className="title">{APP.term('slide7_title_mobile')}</div>
				<div className="subtitle">{APP.term('slide7_subtitle_mobile')}</div>
				<img src="/media/images/tutorial_mobile/step4.png" className="img_step"></img>
				<div className="image_contents">
					<img src="/media/images/tutorial_mobile/metamask_sign.png" className="wallet_img metamask"></img>
					<img src="/media/images/tutorial_mobile/coinbase_sign.png" className="wallet_img coinbase"></img>
				</div>
				<div className="next_btn_box" onClick={next}>
					<p>{APP.term('tutorial_next_mobile')}</p>
					<img src="/media/images/tutorial_mobile/gold_btn.png" className="next_btn"></img>
				</div>
			</div>
		</div>

	);

	return (isMobile ? <Mobile back={back} skip={skip} next={next} /> : <Web back={back} skip={skip} next={next} />);

};

function Slide8({ isMobile, back, skip, next }) {

	const Web = () => (

		<div className="tutorial_slide" id="tutorial_slide_8">
			<NavButtons next={next} skip={skip} back={back} />
			<div className="content">
				<div className="title">{APP.term('slide8_title')}</div>
				<div className="subtitle">{APP.term('slide8_subtitle')}</div>
				<div className="image_contents">
					<img src="/media/images/up_pool_example.png" className="pool_img up"></img>
					<img src="/media/images/tutorial_step_5.png" className="img_step step5"></img>
					<img src="/media/images/down_pool_example.png" className="pool_img down"></img>
				</div>
				<div className="bottom_text">{APP.term('slide8_bottom')}</div>
			</div>
		</div>

	);

	const Mobile = () => (

		<div className="tutorial_slide" id="tutorial_slide_8_mobile">
			<div className="content">
				<NavButtonsMobile back={back} skip={skip} />
				<div className="title">{APP.term('slide8_title_mobile')}</div>
				<div className="subtitle">{APP.term('slide8_subtitle_mobile')}</div>
				<div className="desc">{APP.term('slide8_desc_mobile')}</div>
				<div className="image_contents">
					<img src="/media/images/tutorial_mobile/winner_losers.png" className="pool_img"></img>
					<img src="/media/images/tutorial_mobile/step5.png" className="img_step"></img>
				</div>
				<div className="bottom_desc">{APP.term('slide8_bottom_desc_mobile')}</div>
				<div className="next_btn_box" onClick={next}>
					<p>{APP.term('tutorial_next_mobile')}</p>
					<img src="/media/images/tutorial_mobile/gold_btn.png" className="next_btn"></img>
				</div>
			</div>
		</div>

	);

	return (isMobile ? <Mobile back={back} skip={skip} next={next} /> : <Web back={back} skip={skip} next={next} />);

};

function Slide9({ isMobile, back, skip, next, browser_check_next_btn }) {

	const Web = () => (

		<div className="tutorial_slide" id="tutorial_slide_9">
			<NavButtons next={browser_check_next_btn} back={back} />
			<div className="content">
				<div className="title">{APP.term('slide9_title')}</div>
				<div className="arrow_instructions">
					<div className="bet_up">{APP.term('slide9_trade_up')}</div>
					<div className="middle">
						<div className="invest_text">{APP.term('slide9_down_invest')}</div>
						<img src="/media/images/arrows_img.png" className="arrows_img"></img>
						<div className="invest_text">{APP.term('slide9_up_invest')}</div>
					</div>
					<div className="bet_down">{APP.term('slide9_trade_down')}</div>
				</div>
			</div>
		</div>

	);

	const Mobile = ({ back }) => (

		<div className="tutorial_slide" id="tutorial_slide_9_mobile">
			<div className="content">
				<NavButtonsMobile back={back} />
				<div className="title">{APP.term('slide9_title_mobile')}</div>
				<img src="/media/images/tutorial_mobile/keyboard.png" className="keyboard_img"></img>
				<div className="next_btn_box" onClick={next}>
					<p>{APP.term('tutorial_start_mobile')}</p>
					<img src="/media/images/tutorial_mobile/gold_btn.png" className="next_btn"></img>
				</div>
			</div>
		</div>

	);

	return (isMobile ? <Mobile back={back} next={next} /> : <Web back={back} next={next} />);

};

// function Slide10({ isMobile, back, skip, next }) {

// 	return (

// 		<div className="tutorial_slide" id="tutorial_slide_10">
// 			<div className="content">
// 				<p className="alert">{APP.term('slide10_alert')}</p>
// 				<div className="title">{APP.term('slide10_title1')} <br /> {APP.term('slide10_title2')}</div>
// 				<img className="chrome_icon" src="/media/images/chrome.png" />
// 				<div>
// 					<div className="continue_btn" onClick={next}>
// 						<p>{APP.term('slide10_continue')}</p>
// 					</div>
// 				</div>
// 			</div>
// 		</div>

// 	);

// };

function Slide11({ isMobile, back, next }) {

	const list = [
		APP.term('slide11_list1'),
		APP.term('slide11_list2'),
		APP.term('slide11_list3'),
		APP.term('slide11_list4')

	];

	const mobile_list = [
		APP.term('slide11_list1_mobile'),
		APP.term('slide11_list2_mobile'),
		APP.term('slide11_list3_mobile'),
		APP.term('slide11_list4_mobile')
	];

	const [total, setTotal] = useState(0);
	const [conditions, setConditions] = useState(false);
	const dispatch = useDispatch();
	const termsPopup = useSelector(state => state.mainRememberReducer.terms_popup);
	const list_adjust = isMobile ? mobile_list : list;

	const checkMarks = list_adjust?.map((itm, i) => {

		const [marked, setMarked] = useState(false);

		//add checkmark to box
		function updateRow(val) {
			setMarked(!val)
			setTotal(val ? total => total - 1 : total => total + 1)
		}

		return (
			<div key={i} className="list_row">
				<div className="checkmark" style={{ border: marked ? 'none' : '' }} onClick={() => updateRow(marked)}>
					{marked ? <img src="/media/images/partners/goldCheckmark.png" className="checkmark_img" /> : null}
				</div>
				<p className="desc">{itm}</p>
			</div>
		);

	});

	//add checkmark to conditions
	function updateConditions(val) {
		setConditions(!val)
		setTotal(val ? total => total - 1 : total => total + 1)
	};

	const Web = () => (

		<div className="tutorial_slide" id="tutorial_slide_11">
			<NavButtons next={total === list.length + 1 ? next : false} />
			{termsPopup ? <TermsAndConditions /> : null}
			<div className="content">
				<div className="title">{APP.term('slide11_title')}</div>
				<div className="content_list">
					{checkMarks}
					<div className="list_row">
						<div className="checkmark" style={{ border: conditions ? 'none' : '' }}
							onClick={() => updateConditions(conditions)}>
							{conditions ? <img src="/media/images/partners/goldCheckmark.png" className="checkmark_img" /> : null}
						</div>
						<p className="desc">{APP.term('slide11_desc1')} <span className="terms" onClick={() => dispatch(set_terms_popup(true))}>{APP.term('slide11_desc2')}</span></p>
					</div>
				</div>
			</div>
		</div>

	);

	const Mobile = () => (

		<div className="tutorial_slide" id="tutorial_slide_11_mobile">

			{termsPopup ? <TermsAndConditions /> : null}

			<div className="content">

				<div className="title">{APP.term('Disclaimer')}</div>

				<div className="content_list">
					{checkMarks}
					<div className="list_row">
						<div className="checkmark" style={{ border: conditions ? 'none' : '' }}
							onClick={() => updateConditions(conditions)}>
							{conditions ? <img src="/media/images/partners/goldCheckmark.png" className="checkmark_img" /> : null}
						</div>
						<p className="desc">{APP.term('slide11_desc1_mobile')} <span className="terms" onClick={() => dispatch(set_terms_popup(true))}>{APP.term('slide11_desc2_mobile')}</span></p>
					</div>
				</div>

				{conditions && total === list_adjust.length + 1 ?
					<div className="next_btn_box"
						style={{ opacity: conditions && total === list_adjust.length + 1 ? '' : '.4' }}
						onClick={() => total === list_adjust.length + 1 ? next() : false}>
						<p>{APP.term('tutorial_next_mobile')}</p>
						<img src="/media/images/tutorial_mobile/gold_btn.png" className="next_btn"></img>
					</div> : null}

			</div>

		</div>

	);

	return (isMobile ? <Mobile back={back} next={next} /> : <Web back={back} next={next} />);

};

function Slide12({ isMobile, back, skip_enable_sounds, next }) {

	const dispatch = useDispatch();

	//enable all sounds effects bg/voiceover/sounds
	function enableSounds() {
		dispatch(set_bg_music(true));
		dispatch(set_voiceover(true));
		dispatch(set_sound_effects(true));
		dispatch(set_sounds_popup(false));
		dispatch(set_first_load(true));
		next();
	}

	//disable and reset all sounds effects bg/voiceover/sounds
	function closePopup() {
		dispatch(set_sounds_popup(false));
		dispatch(set_first_load(true));
		next();
	}

	const Web = () => (

		<div className="tutorial_slide" id="tutorial_slide_12">
			<div className="content">
				<div className="close" onClick={next}></div>
				<div className="dialog_box">
					<img src="/media/images/text/maximizeExp.png" className="header" />
					<p className="desc">{APP.term('slide12_desc1')}<br /> {APP.term('slide12_desc2')}<br /> {APP.term('slide12_desc3')}</p>
					<div className="confirm" onClick={skip_enable_sounds}><p>{APP.term('slide12_confirm')}</p></div>
				</div>
			</div>
		</div>

	);

	const Mobile = () => (

		<div className="tutorial_slide_12_mobile">
			<div className="content">
				<div className="tutorial_slide_12_mobile_close" onClick={() => closePopup()}></div>
				<div className="dialog_box">
					<img src="/media/images/tutorial_mobile/maximize_exp.png" className="tutorial_slide_12_mobile_header" />
					<p className="desc">{APP.term('sounds_popup_desc1')}<br /> {APP.term('sounds_popup_desc2')}<br /> {APP.term('sounds_popup_desc3')}</p>
					<div className="confirm" onClick={() => enableSounds()}><p>{APP.term('sounds_popup_confirm')}</p></div>
				</div>
			</div>
		</div>

	);

	return (isMobile ? <Mobile back={back} next={next} /> : <Web back={back} next={next} />);

};

var slides = [
	Slide1, Slide2, Slide3, Slide4,
	Slide5, Slide6, Slide7, Slide8,
	Slide9, /*Slide10,*/ Slide11, /*Slide12*/
];

const Tutorial = ({ onPress }) => {

	const [slide_id, set_slide_id] = useState(0);
	const Slide = slides[slide_id];
	const dispatch = useDispatch();

	//enable all sounds effects bg/voiceover/sounds
	function enableSounds() {
		let mobile = (navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPad/i));

		const promise = new Promise((resolve, reject) => {
			dispatch(set_bg_music(true))
			dispatch(set_voiceover(true))
			dispatch(set_sound_effects(true))

			APP.state.set('temp_bg', true);
			APP.state.set('temp_voiceover', true);
			APP.state.set('temp_sounds', true);

			resolve('success')
		});


		promise.then(() => {

			if (mobile) {

				let arr = ['distributing_down_payouts', 'distributing_payouts', 'distributing_up_payouts',
					'gained_profits', 'last_trade_chance', 'nearing_expiry', 'new_invest',
					'new_round', 'trade_started', 'voice_no_more_trades',
					'voice_place_your_trade', 'voice_you_won'];

				setTimeout(() => {
					for (let sound of arr) {
						APP.sounds[sound].play()
						APP.sounds[sound].stop()
					}
				}, 500);

				APP.sounds.ambience.play_forever();
			}
		})
	}

	//check for valid browser (chrome)
	function browserValidation() {
		// if (navigator.userAgent.includes("MetaMaskMobile")) {
		if (navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPad/i)) {
			set_slide_id(9);
		}
		else {
			if (isChrome) set_slide_id(9);
			else set_slide_id(8);
		}
	}

	// prevent moving next screen
	// only chrome browsers move next screen
	// function checkBrowser(slide_id, slides) {
	// 	if (navigator.userAgent.includes("MetaMaskMobile")) {
	// 		set_slide_id(10)
	// 	}
	// 	else {
	// 		if (!isChrome) {
	// 			if ((slide_id + 1) == slides.length) {
	// 				onPress();
	// 			}
	// 			else {
	// 				set_slide_id(10)
	// 			}
	// 		} else {
	// 			set_slide_id(9)
	// 		}
	// 	}
	// }

	//go next button
	function goNext(slide_id, slides) {

		if (slide_id == 8 && (navigator.userAgent.match(/Android/i) ||
			navigator.userAgent.match(/iPhone/i) ||
			navigator.userAgent.match(/iPad/i))) {
			set_slide_id(slide_id + 1)
		}
		else if ((slide_id + 1) == slides.length) {
			onPress();
		}
		else {
			set_slide_id(slide_id + 1)
		}
	}

	const isMobile = window.innerWidth <= 480;

	return (
		<div className="tutorial_wrap">
			<Slide next={() => goNext(slide_id, slides)}
				isMobile={isMobile}
				skip={() => browserValidation()}
				browser_check_next_btn={() => browserValidation()}
				skip_enable_sounds={() => {
					enableSounds();
					onPress();
				}}
				skipByTwo={() => set_slide_id(slide_id + 2)}
				back={() => set_slide_id(slide_id ? slide_id - 1 : 0)} />
		</div>
	)
};

export default React.memo(Tutorial, ({ prev }, { next }) => prev == next);