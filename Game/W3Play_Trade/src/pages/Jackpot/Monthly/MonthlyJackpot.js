import React, { useState, useEffect, useLayoutEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import AnimatedNumber from 'react-animated-number';
import APP from '../../../app';
import JackpotMeter from './JackpotMeter';
import JackpotRow from './JackpotRow';
import useJackpot from '../../../state/useJackpotState';
// import '../Weekly/WeeklyJackpot.css';
import './MonthlyJackpot.css';
import CountdownTimer from '../CountDownTimer';
import useAppState from '../../../hooks/useAppState';
import state from '../../../state';
import { useDispatch, useSelector } from 'react-redux';
import { set_loader } from '../../../REDUX/actions/main.actions';
import ga4Event from '../../../utils/ga4.event';
import numberFormat from '../../../utils/numberFormat';
import useWebSocket from '../../../hooks/useWebSocket';
import DemoHeader from '../../../comp/demo/DemoHeader';
import HelmetManager from '../../../comp/HelmetManager';
import isWallet from '../../../utils/isWallet';

const openMenu = () => {
	APP.state.set('menu_open', true);
};

const AnimatdPrize = React.memo(({ prize = 0 }) => {

	const [amt, setAmt] = useState(0)

	useEffect(() => {
		if (amt == Number(prize)) return;

		let timeout = setTimeout(() => {
			setAmt(Number(prize))
		}, 1000);

		return () => clearTimeout(timeout)
	}, [prize])

	// memoize the AnimatedNumber component
	const animatedNumberComponent = useMemo(() => (
		prize && <AnimatedNumber
			component="text"
			value={amt || 0}
			duration={2000}
			formatValue={(value) => numberFormat.addCommas(value.toFixed(2))}
		/>
	), [amt]);

	return animatedNumberComponent;
});

// update pools array with new update pools object
const updateArrayWithNewValues = (oldArray, newArray) => {
	const updatedArray = [...oldArray];

	newArray.forEach(newItem => {
		const index = updatedArray.findIndex(oldItem => oldItem?.pool === newItem?.pool);

		if (index !== -1) {
			// updating the existing obj with the new vals
			updatedArray[index] = { ...updatedArray[index], ...newItem };
		} else {
			// new obj is added to the arr
			updatedArray.push(newItem);
		}
	});
	return updatedArray;
};

// //abbreviation for wallet address
// function cutWallet(wallet) {
// 	if (!wallet) return;
// 	return wallet.substring(0, 10) + '...' + wallet.substring(wallet.length, wallet.length - 10)
// }

const MonthlyJackpot = () => {

	const [activeRowId, setActiveRowId] = useState(null);
	const wallet_address = useAppState('wallet_address');
	const jackpot_balance = useAppState('jackpot_balance');
	const { getMonthly, monthlyPoolsStats, setOwnMonthlyTrades } = useJackpot();
	const [pools, setPools] = useState([]);
	const dispatch = useDispatch();

	// Socket URLs
	const demoState = useSelector(state => state.mainRememberReducer.demo_mode);
	const socketUrl = !demoState.active ? state.jackpot_monthly_ws : state.jackpot_monthly_demo_ws;
	const socketSelfUrl = !demoState.active ? state.jackpot_monthly_self_ws : state.jackpot_monthly_demo_self_ws;

	// Socket connection
	const { disconnect: dcGlobal, message: msgGlobal } = useWebSocket(isWallet(socketUrl));
	const ws = useWebSocket(isWallet(socketSelfUrl + '_' + wallet_address));
	const defaultWs = { disconnect: () => { }, message: () => { } };
	const { disconnect: dcOwn, message: msgOwn } = wallet_address ? ws : defaultWs;

	// initialize monthly data (req)
	useLayoutEffect(() => {
		let timeout;
		setTimeout(() => {
			getMonthly();
		}, 1500);

		return () => {
			clearTimeout(timeout);
			APP.state.unset('last_monthly_jackpot_msg');
		}
	}, [wallet_address])

	useEffect(() => {
		dispatch(set_loader(true));
		ga4Event('all ways opening all jackpot pages', 'jackpot_pages');

		return () => {
			if (wallet_address) dcOwn();
			dcGlobal();
		}
	}, [])

	useEffect(() => {
		if (!monthlyPoolsStats?.loaded) return;
		if (!pools.length) setPools(monthlyPoolsStats?.pools)

		function updatePool(msg) {
			if (!msg) return;
			setPools(updateArrayWithNewValues(monthlyPoolsStats?.pools, JSON.parse(msg)?.pools));
		}

		updatePool(msgGlobal)

	}, [monthlyPoolsStats?.loaded, msgGlobal])

	// connect to own channel once got one
	useEffect(() => {
		if (!monthlyPoolsStats?.ownChannel) return;
		if (!msgOwn) return;

		let parsedData = JSON.parse(msgOwn);

		if (parsedData) {
			if (Number(monthlyPoolsStats?.ownTrades) == Number(parsedData?.tickets)) return;
			setOwnMonthlyTrades(parsedData?.tickets)
		}

	}, [monthlyPoolsStats?.ownChannel, msgOwn])

	// handle demoState changes
	useEffect(() => {
		// Perform necessary updates when demoState changes
		dispatch(set_loader(true));
		getMonthly();

		return () => {
			if (wallet_address) dcOwn();
			dcGlobal();
		};
	}, [demoState?.active]);

	return (

		<div className="page monthly_jackpot_page monthly_jackpot">

			<HelmetManager
				title="Monthly Jackpot"
				description="Monthly Jackpot: Aim for Top Spot in Monthly Trading Challenges. Win Huge Crypto Giveaway Rewards Every Month."
				keywords="monthly jackpot, trading challenges, crypto giveaway, monthly rewards,  crypto trading competition ,UpvsDown"
				canonical="/monthly_jackpot"
			/>


			<DemoHeader pathName="/monthly_jackpot" />

			<div className="monthly-jackpot-header">

				<div className="header-top">

					<Link to={`${APP.state.get('active_table').route}`} className="back_btn"></Link>

					<div className="header-links">
						<Link to="/faq" className="header-link faq" onClick={() => APP.state.set('special_tab', 'monthly')}>
							<div className="image"></div>
							<div className="text"><span>{APP.term('monthly_faq')}</span></div>
						</Link>
						<Link to="/jackpot_monthly_winners" className="header-link history">
							<div className="image"></div>
							<div className="text"><span>{APP.term('monthly_history')}</span></div>
						</Link>
					</div>

					<div className="jackpot-page-title">
						<span>{APP.term('monthly_jackpot')}</span>
					</div>

					{state.enable_monthly_jackpot && (<Link className="weekly-jackpot-button" to="/weekly_jackpot"></Link>)}

					<button className="menu_btn" onClick={openMenu}>
						<img src="/media/images/menu.svg" />
					</button>

				</div>

				<div className="header-bottom">

					<div className="header-bottom-left">
						<div className="player-avatar">
							<img src={APP.state.get('customer.avatar')} />
						</div>
						<div className="player-monthly-status">
							<JackpotMeter
								ownTrades={monthlyPoolsStats?.principal?.tickets || 0}
								pools={pools}
							/>
							<div className="title">
								<span>{APP.term('monthly_jackpot_status')}</span>
							</div>
						</div>
					</div>

					<div className="trades-wallet-timer-wrap">

						<div className="player-monthly-trades">
							<div className="amount">
								<span>
									<AnimatedNumber component="text" value={Number(monthlyPoolsStats?.principal?.tickets || 0)}
										style={{ transition: '.8s ease-out' }}
										duration={3000}
										formatValue={(value) => value.toFixed(0)}
									/>
								</span>
							</div>
							<div className="title"><span>{APP.term('monthly_jackpot_trades')}</span></div>
						</div>

						<div className="jackpot-amt">
							<div className="amt">
								<span>
									{jackpot_balance?.amt ? <AnimatdPrize prize={jackpot_balance?.amt} /> : '0.00'}
									{/* <a href={network + monthlyPoolsStats?.jackpotWallet} target='_blank'> */}
									{/* {cutWallet(monthlyPoolsStats?.jackpotWallet)} */}
									{/* </a> */}
								</span>
							</div>
							<div className="title"><span>{APP.term('monthly_jackpot_wallet')}</span></div>
						</div>

						<div className="jackpot-timer">
							<div className="timer-wrap">
								<div className="hours">
									<span>
										{monthlyPoolsStats?.secondsLeft && <CountdownTimer
											startTime={parseInt(monthlyPoolsStats?.secondsLeft < 0 ? 0 : monthlyPoolsStats?.secondsLeft * 1000) || 0}
											onStop={() => console.log('monthly timer was stopped')}
											onReset={() => console.log('monthly timer reset')} />}
									</span>
								</div>
							</div>
							<div className="title"><span>{APP.term('monthly_timer_desc')}</span></div>
						</div>

					</div>

				</div>

			</div>

			<div className="rows-wrap">
				{pools?.sort((a, b) => a.pool - b.pool).map((rowData, i) => (
					<JackpotRow
						key={i}
						setActiveRowId={setActiveRowId}
						activeRowId={activeRowId}
						ownTrades={monthlyPoolsStats?.ownTrades}
						participantsCount={rowData?.participants}
						prize={rowData?.prize}
						participantsList={rowData?.participantsList}
						poolNumber={rowData?.pool}
						threshold={rowData?.threshold}
					/>
				))}

			</div>

			<div className="bottom-nav">

				<div className="bottom-nav-links header-links">

					<Link to="/faq" className="bottom-nav-link header-link faq" onClick={() => APP.state.set('special_tab', 'monthly')}>
						<div className="image"></div>
						<div className="text"><span>{APP.term('monthly_faq')}</span></div>
					</Link>

					<Link to="/weekly_jackpot" className="bottom-nav-link header-link weekly-jackpot"></Link>

					<Link to="/jackpot_monthly_winners" className="bottom-nav-link header-link history">
						<div className="image"></div>
						<div className="text"><span>{APP.term('monthly_history')}</span></div>
					</Link>

				</div>

			</div>

		</div>

	);

};

export default MonthlyJackpot;