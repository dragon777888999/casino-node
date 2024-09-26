import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import APP from '../app';
import PageHeader from '../comp/page_header';
import LeaderboardWinsPaidTableHeader from './LeaderBoard/LeaderboardWinsPaidTableHeader';
import LeaderboardWinsPaidTableRow from './LeaderBoard/LeaderboardWinsPaidTableRow';
import leaderboard from '../API/leaderboard';
import { set_alert_msg } from '../REDUX/actions/main.actions';
import yesterday from './LeaderBoard/filters/yesterday';
import today from './LeaderBoard/filters/today';
import thisWeek from './LeaderBoard/filters/thisWeek';
import thisMonth from './LeaderBoard/filters/this.month';
import ga4Event from '../utils/ga4.event';
import DemoHeader from '../comp/demo/DemoHeader';
import useIsDemoModeActive from '../utils/demo/useIsDemoModeActive';
import HelmetManager from '../comp/HelmetManager';
import ConnectWalletModal from './TradePage/ConnectWalletModal';
import { WalletContext } from '../utils/game';

// (Column ids vs record props)
const mapping = {
	rank: 'rank',
	trades: 'tradesCount',
	wins: 'winningsCount',
	winrate: 'winRate',
	winsPaids: 'winsPaid'
};

// Sorting functions (asc/desc)
const sortingFunctions = {
	asc: (col) => (a, b) => (a[mapping[col]] - b[mapping[col]]),
	desc: (col) => (a, b) => (b[mapping[col]] - a[mapping[col]])
};

// Add bgPercent & winRate data props
const attachExtraData = (list) => {
	for (let i = 0; i < list.length; i++) {
		const { winsPaid, winningsCount, tradesCount } = list[i];
		list[i].bgPercent = parseInt((winsPaid / list[0].winsPaid) * 100);
		list[i].winRate = parseInt((winningsCount / tradesCount) * 100);
	};
};

const LeaderboardTableBody = ({ listData, sorting: [column, order] }) => {
    const sortedList = [...listData];
    sortedList.sort(sortingFunctions[order](column));
    return <>{sortedList.map((user, i) =>
        <LeaderboardWinsPaidTableRow key={i} {...user} />)}</>;
};

export default function LeaderboardWinsPaidPage() {

	const dispatch = useDispatch();
	const isDemoModeActive = useIsDemoModeActive();
	const [sortingSettings, setSortingSettings] = useState(['rank', 'asc']);
	const [loadedList, setLoadedList] = useState(null);
	const [partnerRef, setPartnerRef] = useState(false);

	const [loaderVisible, setLoaderVisible] = useState(false);

	const { wallet, authenticate } = useContext(WalletContext);
    const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);

	const [currentList, setCurrentList] = useState({ type: 2, name: APP.term('leaderboard_today') });
	const [dropDown, setDropDown] = useState(false);
	const filter_options = [
		{ type: 1, name: APP.term('leaderboard_yesterday') },  // Yesterday
		{ type: 2, name: APP.term('leaderboard_today') }, 	   // Today
		{ type: 3, name: APP.term('leaderboard_thisweek') },   // This week
		{ type: 4, name: APP.term('leaderboard_thismonth') },  // This month
		{ type: 5, name: APP.term('leaderboard_alltime') }];   // All time

	// to = new Date()?.toISOString().split("T")[0];

	function leaderboardDate(date) {

		// yesterday
		if (date === 1) return yesterday();
		// today
		else if (date === 2) return today();
		// this week
		if (date === 3) return thisWeek();
		// this month
		else if (date === 4) return thisMonth();
		// all time
		else if (date === 5) return { from: 0, to: 0 };
	}

	const getLeaderboardData = async (type, partnerRef, isDemoModeActive) => {

		let ranges = leaderboardDate(type);

		setLoaderVisible(true);

		try {
			const response = await leaderboard.getLeaderboardWinsPaid(partnerRef, ranges?.from, ranges?.to, isDemoModeActive);

			dispatch(set_alert_msg({ type: '', content: '' }))

			// data was received 
			if (Object.values(response?.data).length && !response?.error) {
				attachExtraData(response.data);
				setLoadedList(response.data);
			}

			// data is empty
			else {
				setLoadedList(null);
				dispatch(set_alert_msg({
					type: 'info', content: "alert_msg_no_leaderboard_stats"
				}));
			}

		}

		catch (error) {
			dispatch(set_alert_msg({
				type: 'error', content: "failed_loading_data"
			}));
		}

		// clear loader
		finally {
			setLoaderVisible(false);
		}
	};


	useEffect(() => {
		const ref = APP?.controller?.cfg?.partnerInfo?.partnerRef;

		// prevent sending req without valid partnerRef
		// if (partnerRef || !ref) return;
		setPartnerRef(ref);
		getLeaderboardData(currentList?.type, ref, isDemoModeActive);
	}, [APP?.controller?.cfg?.partnerInfo?.partnerRef, isDemoModeActive])

	// update to selected list
	function updateList(itm, ref) {
		setCurrentList(itm)
		getLeaderboardData(itm?.type, ref, isDemoModeActive)
	}

	useEffect(() => {
		ga4Event('all ways opening player leaderboard', 'leaderboard_page')
	}, [])

	return (
		<div className={`page leaderboard_page table_page${isDemoModeActive ? ' demo' : ''}`}>

			<HelmetManager
				title="LeaderBoard"
				description="Leaderboard: See Who's Leading in Crypto Trading. Compete for Top Honors, Prizes, and Enjoy Real-Time Rewards."
				keywords="leaderboard, top players, game stats, UpvsDown, daily winners, weekly winners, monthly winners, all-time winners, crypto trading"
				canonical="/leaderboard"
			/>

			<DemoHeader pathName="/leaderboard" />

			<PageHeader title={APP.term('leaderboard_title')} text_scale={.7} />

			{connect_wallet_popup && (<ConnectWalletModal
                openModal={() => connect(dispatch)}
                wallet={wallet}
                authenticate={authenticate}
            />)}

			<LeaderboardWinsPaidTableHeader sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} />
			<div className="leaderboard_current_filter" onClick={() => setDropDown(!dropDown)}>
				<p>{currentList?.name}</p>
				<div className="arr" dropdown={dropDown ? 'open' : 'close'} />
				{dropDown && (<div className="leaderboard_dropdown">
					{filter_options.map((itm, i) => (
						<p key={i}
							current={itm?.name === currentList?.name ? 'true' : 'false'}
							onClick={() => updateList(itm, partnerRef, isDemoModeActive)}>
							{itm?.name}
						</p>
					))}
				</div>)}
			</div>
			<div className="users_list table_body">
				{loadedList && <LeaderboardTableBody sorting={sortingSettings} listData={loadedList} />}
				{loaderVisible && <div className="leaderboard_loader_wrap">
					<img src="/media/images/loaders/loader.gif" />
				</div>}
			</div>
		</div>
	);

};

