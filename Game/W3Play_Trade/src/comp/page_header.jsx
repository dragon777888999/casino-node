import React from 'react';
import ReactPixel from 'react-facebook-pixel';
import useWindowSize from './../hooks/useWindowSize';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { vw } from './../utils/document'
import APP from './../app';
import GoldenText from './golden_text';
import UserBalance from './user_balance';
import useAppState from '../hooks/useAppState';
import { useDispatch, useSelector } from 'react-redux';
import { set_connect_wallet_popup } from '../REDUX/actions/main.actions';
import state from '../state';
import ga4Event from '../utils/ga4.event';
import GameModeSwitch from './demo/GameModeSwitch';

function open_menu() {
	APP.state.set('menu_open', true)
}

export default function PageHeader({ title, text_scale = 1, goldTxtstyles, skipHistory, onNavBack, topup }) {

	const _ = useWindowSize();
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const walletAdress = useAppState('wallet_address');
	const currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool);
	const defaultRoute = currentPoolDetails?.route || "/trade";
	const isTopup = location.pathname.includes('topup');

	// Check if the current domain is in the noDemoSwitchDomains array
	const noDemoSwitchDomains = APP.state.get('noDemoSwitchDomains');
	const currentDomain = window.location.hostname;
	const shouldShowDemoSwitch = !noDemoSwitchDomains.includes(currentDomain);

	// close connect wallet popup 
	const openConnectWallet = () => {
		// window?.fbq('trackCustom', 'connectWallet');

		// send click on connect btn event (pixel)
		let wh_details = APP.state.get('pixels').find(itm => {
			if (itm?.params?.searchedByHostname) {
				return itm.target.includes(window.location.hostname);
			}
			else {
				return itm.target === window.location.href;
			}
		})

		if (wh_details?.params?.connectBtnleadEvt) ReactPixel.track('Lead')
		ga4Event('user click on connect wallet button', 'Connect_wallet_click')

		APP.state.set('menu_open', false);
		// navigate(`${APP.state.get('active_table').route}`);

		dispatch(set_connect_wallet_popup(true));
	};

	return (

		<div className="page_header">
			<Link
				onClick={topup && onNavBack}
				to={(topup || skipHistory) ? `${defaultRoute}` : location?.key === 'default' ? `${defaultRoute}` : -1}
				className="back_btn"></Link>

			<div className="header_center">

				<div className="balance">
					{walletAdress
						? <UserBalance />
						: <div onClick={() => openConnectWallet()} className="balance_amount_wallet_connect">
							<img src="/media/images/wallet_btn.png" alt='connect_wallet_button'/>
							<p><span>{APP.term('header_connect_wallet')}</span></p>
						</div>
					}
				</div>

				<GoldenText width={vw(100)} height={vw(8)} scale={text_scale} style={goldTxtstyles}>
					{title}
				</GoldenText>

			</div>

			{isTopup && shouldShowDemoSwitch && (
				<div className="topup_demo_header">
					<p className="topup_demo_header_text"><span>{APP.term('topup_header_mode')}</span></p>
					<GameModeSwitch />
				</div>
			)}			

			<button className="menu_btn" onClick={open_menu}>
				<img src="/media/images/menu.svg" />
			</button>

		</div>

	);

};