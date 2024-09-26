import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import AnimatedNumber from 'react-animated-number';
import APP from '../../../app';
import JackpotMeter from './JackpotMeter';
import JackpotRow from './JackpotRow';
import useJackpot from '../../../state/useJackpotState';
import './WeeklyJackpot.css';
import CountdownTimer from '../CountDownTimer';
import useAppState from '../../../hooks/useAppState';
import state from '../../../state';
import { useDispatch, useSelector } from 'react-redux';
import { set_loader } from '../../../REDUX/actions/main.actions';
import ga4Event from '../../../utils/ga4.event';
import numberFormat from '../../../utils/numberFormat';
import useWebSocket from '../../../hooks/useWebSocket';
import { id } from 'ethers';
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

const WeeklyJackpot = () => {

	// const [activeRowId, setActiveRowId] = useState(null);
	const wallet_address = useAppState('wallet_address');
	const jackpot_balance = useAppState('jackpot_balance');
	const { getWeekly, weeklyPoolsStats, setOwnTrades } = useJackpot();
	const [pools, setPools] = useState([]);
	const dispatch = useDispatch();

	// Socket URLs
	const demoState = useSelector(state => state.mainRememberReducer.demo_mode);
	const socketUrl = !demoState.active ? state.jackpot_weekly_ws : state.jackpot_weekly_demo_ws;
	const socketSelfUrl = !demoState.active ? state.jackpot_weekly_self_ws : state.jackpot_weekly_demo_self_ws;

	// Socket connection
	const { disconnect: dcGlobal, message: msgGlobal } = useWebSocket(isWallet(socketUrl));
	const ws = useWebSocket(isWallet(socketSelfUrl + '_' + wallet_address));
	const defaultWs = { disconnect: () => { }, message: () => { } };
	const { disconnect: dcOwn, message: msgOwn } = wallet_address ? ws : defaultWs;

	// initialize weekly data (req)
	useLayoutEffect(() => {
		let timeout;
		setTimeout(() => {
			getWeekly();
		}, 1500);

		return () => {
			clearTimeout(timeout)
			APP.state.unset('last_weekly_jackpot_msg')
		}
	}, [wallet_address])

	useEffect(() => {
		dispatch(set_loader(true))
		ga4Event('all ways opening all jackpot pages', 'jackpot_pages')

		return () => {
			if (wallet_address) dcOwn();
			dcGlobal();
		}
	}, [])

	useEffect(() => {
		if (!weeklyPoolsStats?.loaded) return;
		if (!pools.length) setPools(weeklyPoolsStats?.pools)

		function updatePool(msg) {
			if (!msg) return;
			setPools(updateArrayWithNewValues(weeklyPoolsStats?.pools, JSON.parse(msg)?.pools));
		}

		updatePool(msgGlobal)

	}, [weeklyPoolsStats?.loaded, msgGlobal])

	useEffect(() => {
		if (!weeklyPoolsStats?.ownChannel || !msgOwn) return;

		let parsedData = JSON.parse(msgOwn);

		if (parsedData) {
			if (Number(weeklyPoolsStats?.ownTrades) == Number(parsedData?.tickets)) return;
			setOwnTrades(parsedData?.tickets)
		}

	}, [weeklyPoolsStats?.ownChannel, msgOwn])

	// handle demoState changes
	useEffect(() => {
		// Perform necessary updates when demoState changes
		dispatch(set_loader(true));
		getWeekly();

		return () => {
			if (wallet_address) dcOwn();
			dcGlobal();
		};
	}, [demoState?.active]);

	return (

		<div className="page weekly_jackpot_page weekly_jackpot">

			<HelmetManager
				title="Weekly Jackpot"
				description="Weekly Jackpot: Compete for Weekly Crypto Cash Prizes Based on Game Performance."
				keywords="trading competition, crypto cash prizes, crypto airdrop, crypto competition, UpvsDown"
				canonical="/weekly_jackpot"
			/>

			<DemoHeader pathName="/weekly_jackpot" />

			<div className="weekly-jackpot-header">

				<div className="header-top">

					<Link to={`${APP.state.get('active_table').route}`} className="back_btn"></Link>

					<div className="header-links">
						<Link to="/faq" className="header-link faq" onClick={() => APP.state.set('special_tab', 'weekly')}>
							<div className="image"></div>
							<div className="text"><span>{APP.term('weekly_faq')}</span></div>
						</Link>
						<Link to="/jackpot_winners" className="header-link history">
							<div className="image"></div>
							<div className="text"><span>{APP.term('weekly_history')}</span></div>
						</Link>
					</div>

					<div className="jackpot-page-title">
						<span>{APP.term('weekly_jackpot')}</span>
					</div>

					{state.enable_monthly_jackpot && (<Link className="monthly-jackpot-button" to="/monthly_jackpot"></Link>)}

					<button className="menu_btn" onClick={openMenu}>
						<img src="/media/images/menu.svg" />
					</button>

				</div>

				<div className="header-bottom">

					<div className="header-bottom-left">
						<div className="player-avatar">
							<img src={APP.state.get('customer.avatar')} />
						</div>
						<div className="player-weekly-status">
							<JackpotMeter
								ownTrades={weeklyPoolsStats?.ownTrades || 0}
								pools={pools}
							/>
							<div className="title">
								<span>{APP.term('weekly_jackpot_status')}</span>
							</div>
						</div>
					</div>

					<div className="trades-wallet-timer-wrap">

						<div className="player-weekly-trades">
							<div className="amount">
								<span>
									<AnimatedNumber component="text" value={Number(weeklyPoolsStats?.ownTrades || 0)}
										style={{ transition: '.8s ease-out' }}
										duration={3000}
										formatValue={(value) => value.toFixed(0)}
									/>
								</span>
							</div>
							<div className="title"><span>{APP.term('weekly_jackpot_trades')}</span></div>
						</div>

						<div className="jackpot-amt">
							<div className="amt">
								<span>
									{jackpot_balance?.amt ? <AnimatdPrize prize={jackpot_balance?.amt} /> : '0.00'}
								</span>
							</div>
							<div className="title"><span>{APP.term('weekly_jackpot_wallet')}</span></div>
						</div>

						<div className="jackpot-timer">
							<div className="timer-wrap">
								<div className="hours">
									<span>
										{weeklyPoolsStats?.secondsLeft && <CountdownTimer
											startTime={parseInt(weeklyPoolsStats?.secondsLeft < 0 ? 0 : weeklyPoolsStats?.secondsLeft * 1000)}
											onStop={() => {
												console.log('weekly timer was stopped')
												// setTimeout(() => {
												// 	if (aa > 0) {
												// 		console.log('getting new req data.....')
												// 		getWeekly();
												// 	}
												// }, 1000);
											}}
											onReset={() => console.log('weekly timer reset')} />}
									</span>
								</div>
							</div>
							<div className="title"><span>{APP.term('weekly_timer_desc')}</span></div>
						</div>

					</div>

				</div>

			</div>

			<div className="rows-wrap">
				{pools?.sort((a, b) => a.pool - b.pool).map((rowData, i) => (
					<JackpotRow
						key={i}
						// setActiveRowId={setActiveRowId}
						// activeRowId={activeRowId}
						ownTrades={weeklyPoolsStats?.ownTrades}
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

					<Link to="/faq" className="bottom-nav-link header-link faq"
						onClick={() => APP.state.set('special_tab', 'weekly')}>
						<div className="image"></div>
						<div className="text"><span>{APP.term('weekly_faq')}</span></div>
					</Link>

					<Link to="/monthly_jackpot" className="bottom-nav-link header-link monthly-jackpot"></Link>

					<Link to="/jackpot_winners" className="bottom-nav-link header-link history">
						<div className="image"></div>
						<div className="text"><span>{APP.term('weekly_history')}</span></div>
					</Link>

				</div>

			</div>

		</div>

	);

};

export default WeeklyJackpot;