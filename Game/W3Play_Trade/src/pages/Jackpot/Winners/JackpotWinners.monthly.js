import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './JackpotWinners.monthly.css';
import APP from '../../../app';
import WinnerBox from './WinnerBox';
// import JackpotHistory from './History';
import { set_loader } from '../../../REDUX/actions/main.actions';
import useJackpotState from '../../../state/useJackpotState';
import { useDispatch, useSelector } from 'react-redux';
import handleShare from '../../../utils/jackpot/share';
import WinnerBoxMobile from './WinnerBox.mobile';
import MonthlyJackpotHistory from './History.monthly';
import poolSwitch from '../../../utils/poolSwitcher';
import DemoHeader from '../../../comp/demo/DemoHeader';
import HelmetManager from '../../../comp/HelmetManager';

const openMenu = () => {
	APP.state.set('menu_open', true);
};

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

const JackpotWinnersMonthly = () => {

	const [historyVisible, setHistoryVisible] = useState(false),
		{ monthlyWinners, getMonthlyList } = useJackpotState(),
		demoState = useSelector(state => state.mainRememberReducer.demo_mode),
		currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool),
		metamaskBrowser = navigator.userAgent.includes("MetaMaskMobile"),
		location = useLocation(),
		dispatch = useDispatch(),

		toggleJackpotHistory = () => {
			setHistoryVisible((prev) => !prev);
		};

	useEffect(() => {
		dispatch(set_loader(true))
		getMonthlyList();
	}, [demoState?.active])

	return (

		<div className="page jackpot_winners_page jackpot_winners">
			<HelmetManager
				title="Jackpot Monthly Winners"
				description="Jackpot Monthly Winners: Recognizing Monthly Top Performers in Trading with Huge Crypto Giveaway Rewards."
				keywords="Jackpot Crypto casino,jackpot lottery winners, progressive jackpot,crypto airdrop, crypto giveaway, UpvsDown"
				canonical="/jackpot_monthly_winners"
			/>

			<div className="base-bg"></div>{/* REPLACE BG DEPENDS ON REFFERER */}
			<div className="lights-bg"></div>

			<DemoHeader pathName="/jackpot_monthly_winners" />

			<div className="jackpot-winners-header">

				<div className="header-top">

					<Link to={location?.key === 'default' ? poolSwitch(currentPoolDetails) : -1} className="back_btn"></Link>

					<div className="header-links">
						<Link to="/faq" className="header-link faq">
							<div className="image"></div>
							<div className="text"><span>{APP.term('jackpot_winners_faq')}</span></div>
						</Link>
						<Link to="/jackpot_monthly_winners" className="header-link history">
							{window.location.pathname !== '/jackpot_monthly_winners' &&
								<>
									<div className="image"></div>
									<div className="text"><span>{APP.term('jackpot_winners_history')}</span></div>
								</>}
						</Link>
					</div>

					<div className="jackpot-monthly-page-title-monthly">
						<span className="title">
							{APP.term('jackpot_monthly_winners_title')} {monthlyWinners?.startDate ? `${months[new Date(monthlyWinners?.startDate)?.getMonth()]}` : null}
						</span>
					</div>

					{/* mobile header */}
					<div className="winnersbox_title_monthly">
						<span className="winnersbox_title_monthly_head">{APP.term('jackpot_monthly_winners_title')}</span>
						<span className="winnersbox_title_monthly_subhead">
							{monthlyWinners?.startDate ? `${months[new Date(monthlyWinners?.startDate)?.getMonth()]}` : null}
						</span>
					</div>

					<Link className="weekly-winners-button" to="/jackpot_winners"></Link>

					<button className="menu_btn" onClick={openMenu}>
						<img src="/media/images/menu.svg" />
					</button>

				</div>

			</div>

			<div className="winners-wrap">

				{/* web */}
				<div className="weekly-winners">

					<div className="winner-2-4-wrap">
						<WinnerBox type="weekly" rank={4} winners={monthlyWinners?.winners} monthly={true} />
						<WinnerBox type="weekly" rank={2} winners={monthlyWinners?.winners} monthly={true} />
					</div>

					<WinnerBox type="weekly" rank={1} winners={monthlyWinners?.winners} monthly={true} />

					<div className="winner-3-5-wrap">
						<WinnerBox type="weekly" rank={3} winners={monthlyWinners?.winners} monthly={true} />
						<WinnerBox type="weekly" rank={5} winners={monthlyWinners?.winners} monthly={true} />
					</div>

				</div>

			</div>


			{/* mobile */}
			<div className="weekly-winners_mobile">
				<div className="weekly_winners_mobile_scroll">

					<div className={"first " + (metamaskBrowser ? 'metamask' : '')}>
						<WinnerBoxMobile type="weekly" rank={1} winners={monthlyWinners?.winners} monthly={true} />
					</div>

					<div className={"second " + (metamaskBrowser ? 'metamask' : '')}>
						<div className="double_winners_row">
							<WinnerBoxMobile type="weekly" rank={2} winners={monthlyWinners?.winners} monthly={true} />
							<WinnerBoxMobile type="weekly" rank={3} winners={monthlyWinners?.winners} monthly={true} />
						</div>
					</div>

					<div className={"third " + (metamaskBrowser ? 'metamask-third' : '')}>
						<div className="double_winners_row">
							<WinnerBoxMobile type="weekly" rank={4} winners={monthlyWinners?.winners} monthly={true} />
							<WinnerBoxMobile type="weekly" rank={5} winners={monthlyWinners?.winners} monthly={true} />
						</div>
					</div>
				</div>
			</div>

			<div className="btns-bottom-monthly">
				<div className="btn-bottom-monthly btn-share-results" onClick={() => handleShare(dispatch, window.location.href)}>
					<span>{APP.term('jackpot_winners_btn_share')}</span>
				</div>

				<div className="btn-bottom-monthly btn-history-winners" onClick={toggleJackpotHistory}>
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

					<Link to="/jackpot_winners" className="bottom-nav-link header-link monthly-jackpot"></Link>

					<div className="bottom-nav-link header-link history" onClick={toggleJackpotHistory}>
						<div className="image"></div>
						<div className="text"><span>{APP.term('jackpot_winners_history')}</span></div>
					</div>

				</div>

			</div>

			<MonthlyJackpotHistory isVisibe={historyVisible} toggleJackpotHistory={toggleJackpotHistory} />

		</div>

	);

};

export default JackpotWinnersMonthly;

