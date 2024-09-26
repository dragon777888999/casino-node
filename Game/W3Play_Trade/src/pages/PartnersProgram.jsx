import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import partnerPlan from '../API/partnerPlan';
import APP from '../app';
import TermsAndConditions from '../comp/modals/Terms';
import useAppState from '../hooks/useAppState';
import { set_alert_msg, set_new_partner, set_terms_popup } from '../REDUX/actions/main.actions';
import '../styles/pages/partners.css';
import { base64_img } from '../utils/base64_img';
import { WalletContext } from '../utils/game';
import { add_commas } from '../utils/number';
import poolSwitch from '../utils/poolSwitcher';
import { PositionsHeader } from './PartnersProgram/PositionsHeader';
import ConnectWalletModal from './TradePage/ConnectWalletModal';
import HelmetManager from '../comp/HelmetManager';

function Slide1({ next }) {

	let descList = [
		{ desc: APP.term('pp_slide1_list1') },
		{ desc: APP.term('pp_slide1_list2') },
		{ desc: APP.term('pp_slide1_list3') },
		{ desc: APP.term('pp_slide1_list4') },
	];

	return (
		<div className="partners_slide1" id="parteners_slide_1">
			<img src="/media/images/partners/bg.png" className="partners_slide_1_bg" />
			<div className="partners_slide1_content">
				<div className="partners_slide1_header">{APP.term('pp_slide1_header')}</div>
				<div className="partners_slide1_header_row">
					{descList.map((itm, i) => (
						<div key={i} className="partners_slide1_header_box">
							<p className="partners_slide1_header_desc">{itm?.desc}</p>
						</div>
					))}
				</div>
				<p className="partners_slide1_desc">{APP.term('pp_slide1_desc1')}<br /> {APP.term('pp_slide1_desc2')}</p>
				<div className="partners_slide1_start_btn" onClick={next}>{APP.term('pp_slide1_start')}</div>
			</div>
		</div>
	)
}

function Slide2({ next }) {
	return (
		<div className="partners_slide2" id="parteners_slide_2">
			<img src="/media/images/partners/slide2_bg.png" />
			<div className="partners_slide_2_inner_box">
				<div className="partners_slide2_header">{APP.term('pp_slide2_header')}</div>
				<div className="partners_slide2_content">
					<div className="partners_slide2_profit_box">
						<img src="/media/images/partners/50percent.png" className="partners_slide2_percent_amt" />
						<p className="partners_slide2_profit_desc">{APP.term('pp_slide2_desc1')}</p>
					</div>
					<img src="/media/images/partners/goldPartner.png" className="partners_slide2_gold_partner" />
					<div className="partners_slide2_profit_box">
						<img src="/media/images/partners/50percent.png" className="partners_slide2_percent_amt" />
						<p className="partners_slide2_profit_desc">{APP.term('pp_slide2_desc2')}</p>
					</div>
				</div>
				<img src="/media/images/partners/rocketPower.png" className="partners_slide2_rocket" />
			</div>
			<div className="partners_next_btn" onClick={next}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide2_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide2_continue_arr" />
			</div>
		</div>
	)
}

function Slide3({ next }) {
	return (
		<div className="partners_slide3" id="partners_slide3">
			<div className="partners_slide3_content">
				<img src="/media/images/partners/hands.png" className="partners_slide3_img" />
				<p className="partners_slide3_header">{APP.term('pp_slide3_header')}</p>
				<p className="partners_slide3_desc">
					{APP.term('pp_slide3_desc1')}<br />
					{APP.term('pp_slide3_desc2')}<br />
					{APP.term('pp_slide3_desc3')}</p>
			</div>
			<div className="partners_next_btn" onClick={next}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide3_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide3_continue_arr" />
			</div>
		</div>
	)
}

function Slide4({ next }) {
	return (
		<div className="partners_slide4" id="parteners_slide_4">
			<div className="partners_slide4_header">{APP.term('pp_slide4_header')}</div>
			<div className="partners_slide4_content">
				<div className="partners_slide4_desc_box">
					<img src="/media/images/partners/dapp.png" className="partners_slide4_img1" />
					<p className="partners_slide4_desc">{APP.term('pp_slide4_desc1')}<br />{APP.term('pp_slide4_desc2')}</p>
				</div>
				<div className="partners_slide4_desc_box">
					<img src="/media/images/partners/chain.png" className="partners_slide4_img2" />
					<p className="partners_slide4_desc">{APP.term('pp_slide4_desc3')}<br />{APP.term('pp_slide4_desc4')}</p>
				</div>
				<div className="partners_slide4_desc_box">
					<img src="/media/images/partners/web3.png" className="partners_slide4_img3" />
					<p className="partners_slide4_desc">{APP.term('pp_slide4_desc5')}<br />{APP.term('pp_slide4_desc6')}<br />{APP.term('pp_slide4_desc7')}</p>
				</div>
			</div>
			<div className="partners_next_btn" onClick={next}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide4_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide4_continue_arr" />
			</div>
		</div>
	)
}

function Slide5({ next }) {
	const descList = [
		{ id: 1, desc: APP.term('pp_slide5_desc1') },
		{ id: 2, desc: APP.term('pp_slide5_desc2') },
		{ id: 3, desc: APP.term('pp_slide5_desc3') },
		{ id: 4, desc: APP.term('pp_slide5_desc4') },
		{ id: 5, desc: APP.term('pp_slide5_desc5') }
	];
	return (
		<div className="partners_slide5" id="partners_slide5">
			<p className="partners_slide5_header">{APP.term('pp_slide5_header')}</p>
			<div className="partners_slide5_content">
				<div className="partners_slide5_desc_list">
					{descList.map(itm => (
						<div key={itm.id} className="partners_slide5_des_row">
							<img src="/media/images/partners/brownArrow.png" className="partners_slide5_arr" />
							<p className="partners_slide5_desc">{itm.desc}</p>
						</div>
					))}
				</div>
				<img src="/media/images/partners/partners.png" className="partners_slide5_content_img" />
			</div>
			<div className="partners_next_btn" onClick={next}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide5_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide5_continue_arr" />
			</div>
		</div>
	)
}
function Slide6({ next }) {
	return (
		<div className="partners_slide6" id="partners_slide6">
			<div className="partners_slide6_content">
				<p className="partners_slide6_left_desc">24/7</p>
				<img src="/media/images/partners/clock.png" className="partners_slide6_img" />
				<div className="partners_slide6_desc_box">
					<p className="partners_slide6_desc1">{APP.term('pp_slide6_desc1')}</p>
					<p className="partners_slide6_desc2">{APP.term('pp_slide6_desc2')}</p>
					<p className="partners_slide6_desc3">{APP.term('pp_slide6_desc3')}</p>
				</div>
			</div>
			<div className="partners_next_btn" onClick={next}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide6_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide6_continue_arr" />
			</div>
			{/* <Link to={{ pathname: '/trade' }} className={"next_btn"}>Next</Link> */}
		</div>
	)
}
function Slide7({ next }) {
	return (
		<div className="partners_slide7" id="partners_slide7">
			<p className="partners_slide7_header">{APP.term('pp_slide7_header1')}<br />{APP.term('pp_slide7_header2')}</p>
			<img src="/media/images/partners/decentralizedpool.png" className="partners_slide7_content_img" />
			<div className="partners_slide7_tech_box">
				<p className="partners_slide7_tech_desc">{APP.term('pp_slide7_desc')}</p>
				<div className="partners_slide7_tech_row">
					<img src="/media/images/partners/chain.png" className="partners_slide7_tech_img" />
					<img src="/media/images/partners/web3.png" className="partners_slide7_tech_img2" />
					<img src="/media/images/partners/dapp.png" className="partners_slide7_tech_img" />
				</div>
			</div>
			<div className="partners_next_btn" onClick={next}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide7_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide7_continue_arr" />
			</div>
			{/* <Link to={{ pathname: '/trade' }} className={"next_btn"}>Next</Link> */}
		</div>
	)
}

function Slide8({ next }) {

	const contentList = [
		{ src: '1', header: APP.term('pp_slide8_list_header1'), desc: APP.term('pp_slide8_list_desc1') },
		{ src: '2', header: APP.term('pp_slide8_list_header2'), desc: APP.term('pp_slide8_list_desc2') },
		{ src: '3', header: APP.term('pp_slide8_list_header3'), desc: APP.term('pp_slide8_list_desc3') },
		{ src: '4', header: APP.term('pp_slide8_list_header4'), desc: APP.term('pp_slide8_list_desc4') },
		{ src: '5', header: APP.term('pp_slide8_list_header5'), desc: APP.term('pp_slide8_list_desc5') },
		{ src: '6', header: APP.term('pp_slide8_list_header6'), desc: APP.term('pp_slide8_list_desc6') },
		{ src: '7', header: APP.term('pp_slide8_list_header7'), desc: APP.term('pp_slide8_list_desc7') },
		{ src: '8', header: APP.term('pp_slide8_list_header8'), desc: APP.term('pp_slide8_list_desc8') },
		{ src: '9', header: APP.term('pp_slide8_list_header9'), desc: APP.term('pp_slide8_list_desc9') },
		{ src: '10', header: APP.term('pp_slide8_list_header10'), desc: APP.term('pp_slide8_list_desc10') },
		{ src: '11', header: APP.term('pp_slide8_list_header11'), desc: APP.term('pp_slide8_list_desc11') },
		{ src: '12', header: APP.term('pp_slide8_list_header12'), desc: APP.term('pp_slide8_list_desc12') },
		{ src: '13', header: APP.term('pp_slide8_list_header13'), desc: APP.term('pp_slide8_list_desc13') },
		{ src: '14', header: APP.term('pp_slide8_list_header14'), desc: APP.term('pp_slide8_list_desc14') },
		{ src: '15', header: APP.term('pp_slide8_list_header15'), desc: APP.term('pp_slide8_list_desc15') },
		{ src: '16', header: APP.term('pp_slide8_list_header16'), desc: APP.term('pp_slide8_list_desc16') },
		{ src: '17', header: APP.term('pp_slide8_list_header17'), desc: APP.term('pp_slide8_list_desc17') },
		{ src: '18', header: APP.term('pp_slide8_list_header18'), desc: APP.term('pp_slide8_list_desc18') },
		{ src: '19', header: APP.term('pp_slide8_list_header19'), desc: APP.term('pp_slide8_list_desc19') },
		{ src: '20', header: APP.term('pp_slide8_list_header20'), desc: APP.term('pp_slide8_list_desc20') },
		{ src: '21', header: APP.term('pp_slide8_list_header21'), desc: APP.term('pp_slide8_list_desc21') },
		{ src: '22', header: APP.term('pp_slide8_list_header22'), desc: APP.term('pp_slide8_list_desc22') },
		{ src: '23', header: APP.term('pp_slide8_list_header23'), desc: APP.term('pp_slide8_list_desc23') },
	]
	return (
		<div className="partners_slide8" id="partners_slide8">
			<p className="partners_slide8_header">{APP.term('pp_slide8_list_header')}</p>
			<div className="partners_slide8_content">
				{contentList.map((itm, i) => (
					<div key={i} className="partners_slide8_desc_box">
						<img src={`/media/images/partners/content_${i + 1}.png`} className="partners_slide8_desc_img" />
						<div className="partners_slide8_desc_row">
							<p className="partners_slide8_desc_header">{itm?.header}</p>
							<p className="partners_slide8_desc">{itm?.desc}</p>
						</div>
					</div>
				))}
			</div>
			<div className="partners_next_btn" onClick={next}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide8_list_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide8_continue_arr" />
			</div>
			{/* <Link to={{ pathname: '/trade' }} className={"next_btn"}>Next</Link> */}
		</div >
	)
}

function Slide9({ next, skipToConnectWallet }) {

	const [val, setVal] = useState(1000),
		[activeVal, setActiveVal] = useState(50),
		wallet_address = useAppState('wallet_address'),
		isDemo = APP.state.get('currentToken') === 'demo',
		desc_txt2 = isDemo ? 'pp_slide9_desc2_demo' : 'pp_slide9_desc2',

		[stats, setStats] = useState(
			{
				dailyEarning: 0,
				dailyIncome: 0,
				affiliateFees: 0,
			}
		),
		options = [
			{ amt: 10 }, { amt: 25 }, { amt: 50 }, { amt: 100 }, { amt: 250 }
		],

		handleChange = (e) => {
			const value = e.target.value.replace(/\D/g, "");
			setVal(value)
		};

	function calcStats(val) {
		const calcStats = {
			dailyEarning: Number((activeVal * val) / 2) - Number(((activeVal * val) / 2) * 0.25),
			dailyIncome: (activeVal * val) / 2,
			affiliateFees: ((activeVal * val) / 2) * 0.25,
		}
		setStats(calcStats)
	};

	//skip step 10 if user has already a connected wallet
	function checkWallet(connected) {
		if (connected) skipToConnectWallet()
		else next();
	}

	return (
		<div className="partners_slide9" id="partners_slide9">
			<img src="/media/images/partners/goldrectangle.png" className="partners_slide_9_top_bg" />
			<div className="partners_slide9_header_content">
				<img src="/media/images/partners/dailyEarningCalc.png" className="partners_slide9_header" />
				<p className="partners_slide9_header_desc">{APP.term('pp_slide9_desc1')}<br /> {APP.term(desc_txt2)}</p>
				<div className="partners_slide9_input_box">
					<input className="partners_slide9_input"
						value={val}
						onChange={handleChange} />
					<img src="/media/images/partners/friends.png" className="partners_slide9_input_img" />
				</div>
				<div className="partners_slide9_options_row">
					{options.map((itm, i) => (
						<div key={i} className="partners_slide9_options_box"
							style={{
								border: activeVal === itm?.amt ? 'solid .17em #f4d56f' : '',
								backgroundColor: activeVal === itm?.amt ? '#27282f' : ''
							}}
							onClick={() => setActiveVal(itm?.amt)}>
							{/* Matic sign */}
							<p className="partners_slide9_option_amt">{itm?.amt}</p>
						</div>
					))}
				</div>
				<div className="partners_slide9_btn" onClick={() => calcStats(val)}>
					<p className="partners_slide9_btn_desc">{APP.term('pp_slide9_desc3')}</p>
				</div>
			</div>
			<div className="partners_slide9_res_box">
				<p className="partners_slide9_res_header">{APP.term('pp_slide9_desc4')}</p>
				<div className="partners_slide9_res_amt_row">
					{/* Matic sign */}
					<p className="partners_slide9_res_amt">{add_commas(stats?.dailyEarning)}</p>
				</div>
				<p className="partners_slide9_res_desc">{APP.term('pp_slide9_desc5')} <span className="partners_slide9_res_desc_span">{APP.term('pp_slide9_desc6')}</span> {APP.term('pp_slide9_desc7')}</p>
				<div className="partners_slide9_res_earnings_row">
					<div className="partners_slide9_res_dailyincome_box">
						<p className="partners_slide9_res_earnings_amt">{add_commas(stats?.dailyIncome)}</p>
						<p className="partners_slide9_res_earnings_desc">{APP.term('pp_slide9_desc8')}</p>
						<p className="partners_slide9_res_earnings_desc">{APP.term('pp_slide9_desc9')}</p>
					</div>
					<div className="partners_slide9_res_dailyincome_box">
						<p className="partners_slide9_res_earnings_amt">{add_commas(stats?.affiliateFees)}</p>
						<p className="partners_slide9_res_earnings_desc">{APP.term('pp_slide9_desc10')}</p>
						<p className="partners_slide9_res_earnings_desc">{APP.term('pp_slide9_desc11')}</p>
					</div>
				</div>
			</div>
			<div className="partners_next_btn" onClick={() => checkWallet(wallet_address)}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide9_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide9_continue_arr" />
			</div>
			{/* <Link to={{ pathname: '/trade' }} className={"next_btn"}>Next</Link> */}
		</div>
	)
}

function Slide10({ skipToConnectWallet }) {

	const { wallet, authenticate } = useContext(WalletContext),
		currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool),
		wallet_address = useAppState('wallet_address'),

		[isWalletsModalOpen, setIsWalletModalOpen] = useState(false);

	const skipStep = useCallback(() => {
		if (wallet_address) {
			skipToConnectWallet();
		}
	}, [wallet_address]);

	useEffect(() => {
		if (wallet_address) {
			skipStep();
		}
	}, [wallet_address])

	return (
		<div className="partners_slide10" id="partners_slide10">
			<ConnectWalletModal openModal={isWalletsModalOpen} closeModal={setIsWalletModalOpen} wallet={wallet} authenticate={authenticate}></ConnectWalletModal>
			<Link to={{ pathname: poolSwitch(currentPoolDetails) }}>
				<div className="partners_slide10_closebtn">
					<p className="partners_slide10_closebtn_txt">{APP.term('pp_slide10_close')}</p>
				</div>
			</Link>
			<div className="partners_slide10_content">
				<p className="partners_slide10_header">{APP.term('pp_slide10_header1')}<br />{APP.term('pp_slide10_header2')}</p>
				<img src="/media/images/wallet_btn.png"
					className="partners_slide10_wallet"
					onClick={() => setIsWalletModalOpen(true)} />
				<div className="partners_slide10_bottom">
					<p className="partners_slide10_desc">{APP.term('pp_slide10_desc')}</p>
					<img src="/media/images/partners/wallets.png" className="partners_slide10_bottom_wallets" />
				</div>
			</div>
		</div>
	)
}

function Slide11({ next, back }) {

	const wallet_address = useAppState('wallet_address'),
		currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool),
		dispatch = useDispatch();

	function logout_click() {
		APP.state.unset('wallet_address')
		localStorage.removeItem('wallet');
		localStorage.removeItem('chat-token');
		localStorage.removeItem('auth-token');
		localStorage.removeItem('avatar')
		back();
	}

	function updatePartnerWallet(wallet) {
		dispatch(set_new_partner({ wallet }))
		next();
	}

	useEffect(() => {
		if (!wallet_address) back();
	}, [wallet_address])

	return (
		<div className="partners_slide11" id="partners_slide11">
			<div className="partners_slide11_disconnectbtn" onClick={logout_click}>
				<p className="partners_slide11_disconnectbtn_txt">{APP.term('pp_slide11_dc_wallet')}</p>
			</div>
			<Link to={{ pathname: poolSwitch(currentPoolDetails) }}>
				<div className="partners_slide11_closebtn" onClick={next}>
					<p className="partners_slide11_closebtn_txt">{APP.term('pp_slide11_close')}</p>
				</div>
			</Link>
			<div className="partners_slide11_content">
				<p className="partners_slide11_header">{APP.term('pp_slide11_header')}</p>
				<p className="partners_slide11_desc1">{APP.term('pp_slide11_desc1')}</p>
				<p className="partners_slide11_desc2">{APP.term('pp_slide11_desc2')}</p>
				<div className="partners_slide11_inputbox">
					<img src="/media/images/partners/inputBG.png" className="partners_slide11_input_bg" />
					<p className="partners_slide11_address">{Web3.utils.toChecksumAddress(wallet_address)}</p>
				</div>
				<div className="partners_slide11_alert_box">
					<p className="partners_slide11_alert_desc">{APP.term('pp_slide11_desc3')}<br />
						{APP.term('pp_slide11_desc4')}</p>
				</div>
				{wallet_address ? <div className="partners_slide11_continue_btn" onClick={() => updatePartnerWallet(Web3.utils.toChecksumAddress(wallet_address))}>
					<p className="partners_slide11_continue_desc">{APP.term('pp_slide11_continue')}</p>
					<img src="/media/images/partners/arrow.svg" className="partners_slide11_continue_arr" />
					<img src="/media/images/partners/goldbtn.svg" className="partners_slide11_continue_img" />
				</div> : null}
			</div>
		</div >
	)
}

function Slide12({ next, back }) {

	let [url, setUrl] = useState(''),
		dispatch = useDispatch();

	//validation for url
	function checkValidUrl(url) {

		let urlExpression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
			regex = new RegExp(urlExpression);

		if (url && url.match(regex)) {
			return true;
		}
		else return false;
	}

	// valid url => can move next step
	function goNext(validUrl, url) {
		if (validUrl) {
			dispatch(set_new_partner({ url }))
			return next();
		}
		else return;
	}


	function clearText() {
		document.querySelector('.partners_slide12_input').value = "";
	}

	return (
		<div className="partners_slide12" id="partners_slide12">
			<PositionsHeader next={next} currentPageIdx={1} back={back} />
			<div className="partners_slide12_content">
				<p className="partners_slide12_header_desc">{APP.term('pp_slide12_header')}</p>
				<div className="partners_slide12_input_box">
					<input className="partners_slide12_input"
						placeholder='Your URL'
						onChange={(e) => setUrl(e.target.value)} />
					<div className="partners_slide12_input_delete" onClick={() => clearText()}>&#10005;</div>
				</div>
				<div className="partners_slide12_alert_box">
					<p className="partners_slide12_alert_msg">{APP.term('pp_slide12_alert')}</p>
				</div>
			</div>
			<div className="partners_next_btn" onClick={() => goNext(checkValidUrl(url), url)} style={{ opacity: checkValidUrl(url) ? 1 : .5 }}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide12_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide12_continue_arr" />
			</div>
		</div>
	)
}

function Slide13({ next, back }) {

	const [image, setImage] = useState(false),
		// state = useSelector(state => state.mainRememberReducer.new_partner),
		[error, setError] = useState(true),
		dispatch = useDispatch(),

		// convert to base64
		getBase64 = (file) => {
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(reader.result);
				reader.onerror = error => reject(error);
				reader.readAsDataURL(file);
			});
		};

	// get uploaded user pic or last one he has
	function currentImg(image) {
		if (image?.file) return base64_img(image);
		else return '/media/images/partners/upload.png'
	}

	// valid img => can move next step
	function goNext(img, error, _base64_img) {
		if (img && !error) {
			dispatch(set_new_partner({ logo: _base64_img }))
			return next();
		}
		else return;
	}

	// logic for uploading pic using base64
	const uploadButton = useCallback(() => {

		const button = document.getElementById('uploadButton');
		button.click();

		button.addEventListener('change', (e) => {
			e.preventDefault();

			const file = e.target.files[0];
			if (!imageType(file)) return;
			handleReqs(file)
		})
	})

	// check for other reqs needed for upload
	function handleReqs(file) {

		let img = new Image();
		img.src = window.URL.createObjectURL(file)
		img.onload = () => {

			//reqs for image dimensions => 500X15 px - image dimensions
			// if (parseInt(img.width) == 500 && parseInt(img.height) == 150) {

			// prevent image file 
			if (!imageSize(file)) return;

			//convert to file base64 
			getBase64(file).then(base64 => {
				const indexOfComma = Array.from(base64).indexOf(',');

				if (base64 === '') setImage(false);
				else setImage({ file: base64.substring(indexOfComma + 1), type: file.type });
			})
			// }
			// else {
			// 	dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_img_dimensions' }));
			// 	setError(true)
			// 	setImage(false);
			// 	return false;
			// }
		}
	}

	// max img size should be 1MB
	function imageSize(file) {

		let res;
		if (!file) return;

		let size = file?.size / 1024 / 1024;
		if (file?.type.indexOf("image") == -1) {
			dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_img_type' }));
			setError(true)
			setImage(false);
			res = false;
		}
		else if (size > 1) {
			dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_img_size' }));
			setError(true)
			setImage(false);
			res = false;
		}
		else {
			setError(false)
			res = true;
		}
		return res;
	}

	// img should be jpeg/png
	function imageType(file) {

		if (!file) return;

		let regex = new RegExp("(.*?)\.(png|jpg|jpeg)$");
		if (!(regex.test(file?.type))) {
			dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_img_format' }));
			setError(true)
			setImage(false);
			return false;
		}
		else {
			setError(false)
			return true;
		}
	}

	return (
		<div className="partners_slide13" id="partners_slide13">
			<PositionsHeader next={next} back={back} currentPageIdx={2} />
			<div className="partners_slide13_content">
				<p className="partners_slide13_header_desc">{APP.term('pp_slide13_header')}</p>
				<div className="partners_slide13_upload_btn" onClick={() => uploadButton()}>
					<img src={currentImg(image)} className="partners_slide13_upload" />
					<p className="partners_slide13_upload_desc">{APP.term('pp_slide13_desc')}</p>
					<input style={{ display: 'none' }} id="uploadButton" type="file" />
				</div>
				<div className="partners_slide13_alert_box">
					<p className="partners_slide13_alert_box">
						{APP.term('pp_slide13_alert1')}<br />
						{APP.term('pp_slide13_alert2')}
					</p>
				</div>
			</div>
			<div className="partners_next_btn" onClick={() => goNext(image, error, currentImg(image))} style={{ opacity: image && !error ? 1 : .5 }}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide13_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide13_continue_arr" />
			</div>
		</div>
	)
}

function Slide14({ next, back }) {

	let [email, setEmail] = useState(''),
		dispatch = useDispatch();

	function clearText() {
		document.querySelector('.partners_slide14_input').value = "";
	}

	//validation for email
	function validEmail(email) {
		let emailRegex = /\S+@\S+\.\S+/,
			regex = new RegExp(emailRegex);

		if (email && email.match(regex)) {
			return true;
		}
		else return false;
	}

	//valid email => can move next step
	function goNext(mail, email) {
		if (mail) {
			dispatch(set_new_partner({ email }))
			next();
		}
		else return;
	}

	return (
		<div className="partners_slide14" id="partners_slide14">
			<PositionsHeader next={next} back={back} currentPageIdx={3} />
			<div className="partners_slide14_content">
				<p className="partners_slide14_header_desc">{APP.term('pp_slide14_header')}</p>
				<div className="partners_slide14_input_box">
					<input className="partners_slide14_input"
						placeholder='Enter Your Email'
						onChange={(e) => setEmail(e.target.value)} />
					<div className="partners_slide14_input_delete" onClick={() => clearText()}>&#10005;</div>
				</div>
				<div className="partners_slide14_alert_box">
					<p className="partners_slide14_alert_msg">{APP.term('pp_slide14_alert1')}<br />
						{APP.term('pp_slide14_alert2')}</p>
				</div>
			</div>
			<div className="partners_next_btn"
				onClick={() => goNext(validEmail(email), email)}
				style={{ opacity: validEmail(email) ? 1 : .5 }}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide14_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide14_continue_arr" />
			</div>
		</div>
	)
}

function Slide15({ next, back }) {

	const [marked, serMarked] = useState(false),
		dispatch = useDispatch(),
		termsPopup = useSelector(state => state.mainRememberReducer.terms_popup);

	function moveNext(marked) {
		if (marked) next();
		else return;
	}


	return (
		<div className="partners_slide15" id="partners_slide15">
			<PositionsHeader next={next} back={back} currentPageIdx={4} />
			<div className="partners_slide15_content">
				{termsPopup ? <TermsAndConditions /> : null}
				<p className="partners_slide15_header_desc">{APP.term('pp_slide15_header1')}<br /> {APP.term('pp_slide15_header2')}</p>
				<div className="partners_slide15_terms_box">
					<div className="partners_slide15_checkmark"
						style={{ border: marked ? 'none' : '' }}
						onClick={() => serMarked(!marked)}>
						{marked ?
							<img src="/media/images/partners/goldCheckmark.png" className="partners_slide15_checkmark_img" />
							: null}
					</div>
					<p className="partners_slide15_terms">
						{APP.term('pp_slide15_term1')} <span className="partners_slide15_terms_span" onClick={() => dispatch(set_terms_popup(true))}>{APP.term('pp_slide15_term2')}</span>
					</p>
				</div>
				<div className="partners_slide15_alert_box">
					<p className="partners_slide15_alert_msg">
						{APP.term('pp_slide15_alert1')} <br />
						{APP.term('pp_slide15_alert2')}</p>
				</div>
			</div>
			<div className="partners_next_btn" onClick={() => moveNext(marked)} style={{ opacity: marked ? 1 : .5 }}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide15_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide15_continue_arr" />
			</div>
		</div>
	)
}

function Slide16({ next, back }) {
	return (
		<div className="partners_slide16" id="partners_slide16">
			<PositionsHeader next={next} back={back} currentPageIdx={5} />
			<div className="partners_slide16_content">
				<p className="partners_slide16_header_desc">{APP.term('pp_slide16_header')}</p>
				<p className="partners_slide16_header_desc2">{APP.term('pp_slide16_subheader')}</p>
				<div className="partners_slide16_copycode_row">
					<img src="/media/images/partners/borderedArr.svg" className="partners_slide16_left_arr" />
					<div className="partners_slide16_copycode_btn">
						<p className="partners_slide16_copycode_btn_desc">{APP.term('pp_slide16_copy')}</p>
					</div>
					<img src="/media/images/partners/borderedArr.svg" className="partners_slide16_right_arr" />
				</div>
				<p className="partners_slide16_bottom_desc">
					{APP.term('pp_slide16_desc1')}<br />
					{APP.term('pp_slide16_desc2')}
				</p>
			</div>
			<div className="partners_next_btn" onClick={next}>
				<p className="partners_next_btn_desc">{APP.term('pp_slide16_next')}</p>
				<img src="/media/images/partners/arrow.svg" className="partners_slide16_continue_arr" />
			</div>
		</div>
	)
}

function Slide17() {

	const partnerDetails = useSelector(state => state.mainRememberReducer.new_partner),
		dispatch = useDispatch(),
		currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool),
		navigate = useNavigate();

	// endpoint for generating new partner
	async function createNewPartner(partnerDetails) {

		dispatch(set_alert_msg({ type: 'info', content: 'alert_msg_error_partner_process' }));
		let res = await partnerPlan.generatePartner(partnerDetails)

		if (!res.error) {
			dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_partner_partner' }));
			navigate(poolSwitch(currentPoolDetails));
		}
		else dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_partner_submit' }));
	}

	return (
		<div className="partners_slide17" id="partners_slide17">
			<div className="partners_slide17_content">
				<p className="partners_slide17_header_desc">{APP.term('pp_slide17_header')}</p>
				<div onClick={() => createNewPartner(partnerDetails)} style={{ cursor: 'pointer' }}>
					<div className="partners_slide17_start_btn">
						<p className="partners_slide17_start_btn_desc">{APP.term('pp_slide17_start')}</p>
					</div>
				</div>
				<p className="partners_slide17_bottom_desc">{APP.term('pp_slide17_desc1')}<br />
					{APP.term('pp_slide17_desc2')}</p>
			</div>
		</div>
	)
}


var slides = [
	Slide1, Slide2, Slide3, Slide4,
	Slide5, Slide6, Slide7, Slide8,
	Slide9,
	Slide10, Slide11, Slide12,
	Slide13, Slide14, Slide15, Slide16,
	Slide17
];

export default function PartnersProgram() {
	var [slide_id, set_slide_id] = useState(0);
	var Slide = slides[slide_id];
	
	return (
		<div className="parteners_wrap">
			<HelmetManager
				title="Partners"
				description="Partner with Us: Collaborate to get your branded version of the Up vs Down prediction game."
				keywords="start crypto business, white label crypto DeFi, Web3, iGaming, white-label Products, Up vs Down prediction game, UpvsDown"
				canonical="/partners"
			/>

			<Slide next={() => set_slide_id(slide_id + 1)}
				skipToConnectWallet={() => set_slide_id(10)}
				back={() => set_slide_id(slide_id - 1)} />
		</div>
	)
}