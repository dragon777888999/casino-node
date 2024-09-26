import React, { useEffect, useState } from 'react';
import '../styles/pages/affiliate_leaderboard.scss';
import APP from '../app';
import PageHeader from '../comp/page_header';
import num from '../utils/numberFormat';
// import NewCampaignForm from './Affiliates/LinksMananger/NewCampaignForm';
import AffiliateAPI from '../API/superAffiliatesDashboard';
import { useDispatch } from 'react-redux';
import { set_loader } from '../REDUX/actions/main.actions';
import state from '../state';
import useDimension from '../hooks/useDimension';
import { Link } from 'react-router-dom';
import yesterday from './LeaderBoard/filters/yesterday';
import today from './LeaderBoard/filters/today';
import thisWeek from './LeaderBoard/filters/thisWeek';
import thisMonth from './LeaderBoard/filters/this.month';
import ga4Event from '../utils/ga4.event';
import HelmetManager from '../comp/HelmetManager';

const styles = `
  body .golden-title span {
    position: relative;
    tranform: translateX(50%),
    margin-top: 1em;
	top: .1em;
    font-size: 2.5em;
  }
  .page .page_header{
	height: 12em;
  }
`;

//abbreviation for wallet address
function cutWallet(wallet, isMobile) {
	if (!wallet) return;
	else {
		if (isMobile) return wallet.substring(0, 3) + '...' + wallet.substring(wallet.length, wallet.length - 3);
		else return wallet.substring(0, 8) + '...' + wallet.substring(wallet.length, wallet.length - 9)
	}
}

const Header = () => (
	<div className="aff_leaderboard_table_header">
		<div><p>#</p></div>
		<div>
			<p></p>
			<p>{APP.term('aff_leaderboard_address')}</p>
		</div>
		<div><p>{APP.term('aff_leaderboard_tier1')}</p></div>
		<div><p>{APP.term('aff_leaderboard_tier2')}</p></div>
		<div><p>{APP.term('aff_leaderboard_tier3')}</p></div>
		<div><p>{APP.term('aff_leaderboard_paid_amt')}</p></div>
	</div>
),

	AffRow = ({ itm, isMobile, network }) => (
		<div className="aff_leaderboard_content_list_row">
			<div><p>{itm?.rank}</p></div>
			<div>
				<p>
					<img src={itm?.avatarUrl} />
					<div className="country_flag"><img src={`/media/images/flags/${itm?.countryCode.toLowerCase()}.svg`} /></div>
				</p>
				<a /*href={network + itm?.wallet} target="_blank"*/>
					{cutWallet(itm?.wallet, isMobile)}
				</a>
			</div>
			<div><p>{num.addCommas(parseFloat(itm?.perTiers[1]).toFixed(state.aff_leaderboard_decimal)) || 0}</p></div>
			<div><p>{num.addCommas(parseFloat(itm?.perTiers[2]).toFixed(state.aff_leaderboard_decimal)) || 0}</p></div>
			<div><p>{num.addCommas(parseFloat(itm?.perTiers[3]).toFixed(state.aff_leaderboard_decimal)) || 0}</p></div>
			<div><p>{num.addCommas(parseFloat(itm?.totalAmount).toFixed(state.aff_leaderboard_decimal)) || 0}</p></div>
		</div>
	);

export default function AffiliateLeaderboard() {

	const isMobile = useDimension(),
		[list, setList] = useState([]),
		network = state.active_network === 'testnet' ? state.mumbai_url : state.polygonscan_url,
		dispatch = useDispatch(),
		[currentList, setCurrentList] = useState({ type: 5, name: APP.term('leaderboard_alltime') }),
		[dropDown, setDropDown] = useState(false),
		filter_options = [
			{ type: 1, name: APP.term('leaderboard_yesterday') },  // Yesterday
			{ type: 2, name: APP.term('leaderboard_today') }, 	   // Today
			{ type: 3, name: APP.term('leaderboard_thisweek') },   // This week
			{ type: 4, name: APP.term('leaderboard_thismonth') },  // This month
			{ type: 5, name: APP.term('leaderboard_alltime') }];   // All time

	// show_new_campaign_popup = () => {
	// 	APP.add_popup(
	// 		'add_campaign',
	// 		{ content: <NewCampaignForm /> }
	// 	);
	// };

	// update to selected list
	function updateList(itm) {
		setCurrentList(itm)
		getList(itm.type)
	}

	// get 'from-to' format by types
	function leaderboardDate(date) {
		// yesterday
		if (date === 1) return yesterday(true);
		// today
		else if (date === 2) return today(true);
		// this week
		if (date === 3) return thisWeek(true);
		// this month
		else if (date === 4) return thisMonth(true);
		// all time
		else if (date === 5) return { from: 0, to: 0 };
	}

	// get affiliate leaderboard list
	async function getList(type) {
		let ranges = leaderboardDate(type);

		dispatch(set_loader(true))
		let res = await AffiliateAPI.getLeaderboard(ranges.from, ranges.to);

		if (res?.data && !res.error) {
			setList(res.data)
		}
		dispatch(set_loader(false))
	}

	useEffect(() => {
		// get today's stats
		getList(currentList.type)
		ga4Event('affiliate leaderboard page', 'affiliate_leaderboard')
	}, [])

	return (
		<div className="page affiliate_leaderboard">
			<HelmetManager
				title="Affiliate Leaderboard"
				description="Top Affiliates: Celebrating Top Performers in Our Affiliate Program. Earn Rewards, Recognition, and Benefit from Real-Time Rewards."
				keywords="affiliate leaderboard, top affiliates, affiliate program, top performers,the best crypto casino, defi trading, web3 games ,option trading, "
				canonical="/affiliate_leaderboard"
			/>
			<style dangerouslySetInnerHTML={{ __html: styles }} />
			<div className="aff_leaderboard_header">
				<PageHeader title={APP.term('aff_leaderboard_title')} text_scale={.7} />

				<div className="aff_leaderboard_current_filter" onClick={() => setDropDown(!dropDown)}>
					<p>{currentList?.name}</p>
					<div className="arr" dropdown={dropDown ? 'open' : 'close'} />
					{dropDown && (<div className="aff_leaderboard_dropdown">
						{filter_options.map((itm, i) => (
							<p key={i}
								current={itm?.name === currentList?.name ? 'true' : 'false'}
								onClick={() => updateList(itm)}>
								{itm?.name}
							</p>
						))}
					</div>)}
				</div>

				<Link to="/share_links" className="aff_leaderboard_aff_btn" /*onClick={show_new_campaign_popup}*/>
					<p>{APP.term('aff_leaderboard_aff_btn')}</p>
				</Link>
			</div>
			<div className="aff_leaderboard_content">

				<Header />

				<div className="aff_leaderboard_content_list">
					{list?.map(itm => (
						<AffRow key={itm?.rank}
							network={network}
							itm={itm}
							isMobile={isMobile} />
					))}
				</div>
			</div>

		</div>
	);
};