import React, { useEffect, useState } from 'react';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import { Link, useLocation } from 'react-router-dom';
import './JackpotWinners.css';
import APP from '../../../app';
import WinnerBox from './WinnerBox';
import JackpotHistory from './History';
import { set_loader } from '../../../REDUX/actions/main.actions';
import useJackpotState from '../../../state/useJackpotState';
import { useDispatch, useSelector } from 'react-redux';
import handleShare from '../../../utils/jackpot/share';
import WinnerBoxMobile from './WinnerBox.mobile';
import poolSwitch from '../../../utils/poolSwitcher';
import DemoHeader from '../../../comp/demo/DemoHeader';
import HelmetManager from '../../../comp/HelmetManager';

const openMenu = () => {
	APP.state.set('menu_open', true);
};

const JackpotWinners = () => {

	const [historyVisible, setHistoryVisible] = useState(false),
		{ weeklyWinners, getWinnersList } = useJackpotState(),
		demoState = useSelector(state => state.mainRememberReducer.demo_mode),
		currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool),
		metamaskBrowser = navigator.userAgent.includes("MetaMaskMobile"),
		location = useLocation(),
		dispatch = useDispatch(),

		toggleJackpotHistory = () => {
			setHistoryVisible((prev) => !prev);
		};

	useEffect(() => {
		dispatch(set_loader(true));
		getWinnersList();
	}, [demoState?.active])

	return (

		<div className="page jackpot_winners_page jackpot_winners">

			<HelmetManager
				title="Jackpot Winners"
				description="Jackpot Winners: See the Lucky Crypto Cash Prize Winners for the Jackpot. Play now for your chance to win too!"
				keywords="jackpot winners, crypto cash prize, lucky winners, UpvsDown, play to win"
				canonical="/jackpot_winners"
			/>


			<DemoHeader pathName="/jackpot_winners" />

			<div className="base-bg"></div>{/* REPLACE BG DEPENDS ON REFFERER */}
			<div className="lights-bg"></div>

			<div className="jackpot-winners-header">

				<div className="header-top">

					<Link to={location?.key === 'default' ? poolSwitch(currentPoolDetails) : -1} className="back_btn"></Link>

					<div className="header-links">
						<Link to="/faq" className="header-link faq">
							<div className="image"></div>
							<div className="text"><span>{APP.term('jackpot_winners_faq')}</span></div>
						</Link>
						<Link to="/jackpot_monthly_winners" className="header-link history">
							{window.location.pathname !== '/jackpot_winners' &&
								<>
									<div className="image"></div>
									<div className="text"><span>{APP.term('jackpot_winners_history')}</span></div>
								</>}
						</Link>
					</div>

					<div className="jackpot-page-title">
						<span className="title">
							{APP.term('jackpot_weekly_winners_title')} {weeklyWinners?.startDate ? `${new Date(weeklyWinners?.startDate)?.getDate()}-${new Date(weeklyWinners?.endDate)?.getDate()}/${new Date(weeklyWinners?.endDate)?.getMonth() + 1}/${new Date(weeklyWinners?.endDate)?.getFullYear()?.toString()?.slice(-2)}` : null}
						</span>
					</div>

					{/* mobile header */}
					<div className="winnersbox_title">
						<span className="winnersbox_title_head">{APP.term('jackpot_weekly_winners_title')}</span>
						<span className="winnersbox_title_subhead">
							{weeklyWinners?.startDate ?
								`${new Date(weeklyWinners?.startDate)?.getDate()}-${new Date(weeklyWinners?.endDate)?.getDate()}/${new Date(weeklyWinners?.endDate)?.getMonth() + 1}/${new Date(weeklyWinners?.endDate)?.getFullYear()?.toString()?.slice(-2)}`
								: null}
						</span>
					</div>

					<Link className="monthly-winners-button" to="/jackpot_monthly_winners"></Link>

					<button className="menu_btn" onClick={openMenu}>
						<img src="/media/images/menu.svg" />
					</button>

				</div>

			</div>

			<div className="winners-wrap">

				{/* web */}
				<div className="weekly-winners">

					<div className="winner-2-4-wrap">
						<WinnerBox type="weekly" rank={4} winners={weeklyWinners?.winners} />
						<WinnerBox type="weekly" rank={2} winners={weeklyWinners?.winners} />
					</div>

					<WinnerBox type="weekly" rank={1} winners={weeklyWinners?.winners} />

					<div className="winner-3-5-wrap">
						<WinnerBox type="weekly" rank={3} winners={weeklyWinners?.winners} />
						<WinnerBox type="weekly" rank={5} winners={weeklyWinners?.winners} />
					</div>

				</div>

			</div>


			{/* mobile */}
			<div className="weekly-winners_mobile">
				<div className="weekly_winners_mobile_scroll">

					<div className={"first " + (metamaskBrowser ? 'metamask' : '')}>
						<WinnerBoxMobile type="weekly" rank={1} winners={weeklyWinners?.winners} />
					</div>

					<div className={"second " + (metamaskBrowser ? 'metamask' : '')}>
						<div className="double_winners_row">
							<WinnerBoxMobile type="weekly" rank={2} winners={weeklyWinners?.winners} />
							<WinnerBoxMobile type="weekly" rank={3} winners={weeklyWinners?.winners} />
						</div>
					</div>

					<div className={"third " + (metamaskBrowser ? 'metamask-third' : '')}>
						<div className="double_winners_row">
							<WinnerBoxMobile type="weekly" rank={4} winners={weeklyWinners?.winners} />
							<WinnerBoxMobile type="weekly" rank={5} winners={weeklyWinners?.winners} />
						</div>
					</div>

				</div>
			</div>

			<div className="btns-bottom">
				<div className="btn-bottom btn-share-results" onClick={() => handleShare(dispatch, window.location.href)}>
					<span>{APP.term('jackpot_winners_btn_share')}</span>
				</div>

				<div className="btn-bottom btn-history-winners" onClick={toggleJackpotHistory}>
					<span>{APP.term('jackpot_winners_btn_history')}</span>
				</div>
			</div>

			<div className="bottom-nav">

				<div className="bottom-nav-links header-links">

					<Link to="/faq" className="bottom-nav-link header-link faq"
						onClick={() => APP.state.set('special_tab', 'about')}>
						<div className="image"></div>
						<div className="text"><span>{APP.term('jackpot_winners_faq')}</span></div>
					</Link>

					<Link to="/jackpot_monthly_winners" className="bottom-nav-link header-link weekly-jackpot"></Link>

					<div className="bottom-nav-link header-link history" onClick={toggleJackpotHistory}>
						<div className="image"></div>
						<div className="text"><span>{APP.term('jackpot_winners_history')}</span></div>
					</div>

				</div>

			</div>

			<JackpotHistory isVisibe={historyVisible} toggleJackpotHistory={toggleJackpotHistory} />

		</div>

	);

};

export default JackpotWinners;

