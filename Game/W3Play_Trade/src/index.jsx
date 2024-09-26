"use strict";
require("regenerator-runtime/runtime")

import React from "react"
import { createRoot } from "react-dom/client"
//import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider
import { UpVsDown } from './utils/game'
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk'

import './styles/pages/tradePage/poolsReturn.scss';
import './styles/main.scss';
import './styles/pages/entryScreens/tutorial.scss';
import './styles/pages/tradePage/bettingTutorial.scss';
import './styles/topup.scss';
import './styles/p2p.scss';
import './styles/utorg.scss';
import './styles/maintenance.scss';
import './styles/bubblesTutorial.scss';
import './styles/pages/userProfile.scss';
import './pages/Home/Home.css';

import rootReducer from '../src/REDUX/rootReducer/rootReducer'
import Root from "./Root";
import PopupsMgr from "./comp/popups_mgr"
import AudioManager from "./comp/audio_manager"

import SiteMenu from "./comp/site_menu"

import state from './state';

import ReactGA from "react-ga4";

// ReactGA.initialize("G-WGFHVKHHVZ");

// TESING INTEGRATION_TEST
ReactGA.initialize("G-XD1G02BT6B");


// Setup instructions
// Set the right network: LOCAL, TESTNET or MAINNET
const NETWORK = APP.state.get('active_network').toString().toUpperCase();

// You need a websockets connection to a node. You can create an account and get one for free here: quicknode.com
const ETH_WS_URI = APP.state.get('eth_ws_uri');

//Get the game contract address from the current route
// const currentPool = APP.state.get('tables').find(pool => pool.route === location.pathname);
// let CONTRACT_GAME_ADDRESS;

// if (currentPool === undefined)
// 	CONTRACT_GAME_ADDRESS = APP.state.get('tables')[0].contract_adderess; //default contract is the first contract
// else
// 	CONTRACT_GAME_ADDRESS = currentPool.contract_adderess;

// For a full documentation of the @upvsdown/webapp library, go to https://upvsdown.gitlab.io/upvsdown/

const container = document.querySelector('#page_content');
const root = createRoot(container); // For TypeScript
root.render
	(<Provider store={rootReducer}>
		<HelmetProvider>
		<UpVsDown
			// gameContractAddress={CONTRACT_GAME_ADDRESS}
			network={NETWORK}
			wsUrl={ETH_WS_URI}>
			<BrowserRouter>
				<Root />
				<SiteMenu />
				<PopupsMgr />
				<AudioManager />
			</BrowserRouter>
		</UpVsDown>
		</HelmetProvider>
	</Provider>);

// ReactDOM.render(
// 	<Provider store={rootReducer}>
// 		<UpVsDown
// 			gameContractAddress={CONTRACT_GAME_ADDRESS}
// 			network={METAMASK_NETWORK}
// 			wsUrl={ETH_WS_URI}>
// 			<BrowserRouter>
// 				<Root />
// 				<SiteMenu />
// 				<PopupsMgr />
// 				<AudioManager />
// 			</BrowserRouter>
// 		</UpVsDown>
// 	</Provider>
// 	, document.querySelector('#page_content'));

// ReactDOM.render(
// 	<Provider store={rootReducer}>
// 		<UpVsDown
// 			gameContractAddress={CONTRACT_GAME_ADDRESS}
// 			network={METAMASK_NETWORK}
// 			wsUrl={ETH_WS_URI}>
// 			<BrowserRouter>
// 				<Root />
// 				<SiteMenu />
// 				<PopupsMgr />
// 				<AudioManager />
// 			</BrowserRouter>
// 		</UpVsDown>
// 	</Provider>
// 	, document.querySelector('#page_content'));