import React, { useContext, useEffect, useState } from 'react';
import APP from '../../app';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import PageHeader from '../../comp/page_header';
import { add_commas } from '../../utils/number';
import useAppState from '../../hooks/useAppState';
import { Link } from 'react-router-dom'
import dashboardAPI from '../../API/dashboard';
import state from '../../state';
import NewCampaignForm from './LinksMananger/NewCampaignForm';
import { affilite_page_cfg } from '../../utils/affiliate_pages_cfg';
import { WalletContext } from '../../utils/game';
import { useDispatch, useSelector } from 'react-redux';
import ConnectWalletModal from '../TradePage/ConnectWalletModal';
import Symbol from '../../comp/shape/playblock_symbol';
import HelmetManager from '../../comp/HelmetManager';
import truncNum from '../../utils/truncNum';


const isMetamask = navigator.userAgent.includes("MetaMaskMobile");

const TodayTotal = ({ earning }) => {
    // const amount = useAppState('affiliate_stats.today_payouts.total');
    return (
        <div className="total_block today" style={{ fontSize: isMetamask ? '1.35em' : '' }} data-type="today">
            <img className="icon" src="/media/images/coins_stack.png" />
            <div className="amount"><Symbol /><span>{add_commas(truncNum(earning || 0), 2)}</span></div>
            <div className="title"><span>{APP.term('affiliate_today_profit_total')}</span></div>
        </div>
    );
}

const PastTotal = ({ earning }) => {
    // const amount = useAppState('affiliate_stats.past_payouts.total');
    return (
        <div className="total_block today" style={{ fontSize: isMetamask ? '1.35em' : '' }} data-type="total">
            <img className="icon" src="/media/images/earning_stats.png" />
            <div className="amount"><Symbol /><span>{add_commas(truncNum(earning || 0), 2)}</span></div>
            <div className="title"><span>{APP.term('affiliate_past_profit_total')}</span></div>
        </div>
    );
}

const TierStat = ({ tier, stats }) => {

    return (

        <div className={'tier_block tier' + tier} style={{ fontSize: isMetamask ? '1.45em' : '' }}>

            <img className="icon" src={`/media/images/group_tier_${tier}.png`} />
            <div className="title"><span>{APP.term(`affiliate_dashboard_tier${tier}_title`)} ({truncNum(stats?.percentage)}%)</span></div>

            <div className="stats">

                <div className="stat_block today">
                    <div className="people"><span>{stats?.currentContributors || 0}</span></div>
                    <div className="amount"><Symbol /><span>{add_commas(truncNum(stats?.currentEarning || 0), 2)}</span></div>
                    <div className="text"><span>{APP.term('affiliate_stat_today')}</span></div>
                </div>

                <div className="stat_block past">
                    <div className="people"><span>{stats?.totalContributors || 0}</span></div>
                    <div className="amount"><Symbol /><span>{add_commas(truncNum(stats?.totalEarnings || 0), 2)}</span></div>
                    <div className="text"><span>{APP.term('affiliate_stat_past')}</span></div>
                </div>

            </div>

        </div>

    );

}

export default function Dashboard() {

    const wallet_address = useAppState('wallet_address');
    const currentPage = 'dashboard';
    const partnerRef = (APP.state.get('partnerRef') == null) ? 'playnance' : APP.state.get('partnerRef');
    const [stats, setStats] = useState();
    const dispatch = useDispatch();
    const { wallet, authenticate } = useContext(WalletContext);
    const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);

    const getStats = async (partnerRef) => {
        const res = await dashboardAPI.getDashboard(wallet_address, partnerRef);
        if (res.data) setStats(res?.data);
    };

    const show_new_campaign_popup = () => {
        APP.add_popup(
            'add_campaign',
            { content: <NewCampaignForm /> }
        )
    };

    //set special tab for FAQ page
    const faqTab = (page) => {
        if (page !== 'faq') return;
        APP.state.set('special_tab', 'affiliate');
    };

    useEffect(() => {
        if (wallet_address)
            getStats(partnerRef);
    }, [wallet_address])

    return (

        <div className="page affiliate_dashboard_page affiliate_page">

            <HelmetManager
                title="Affiliate Dashboard"
                description="Affiliate Dashboard: Access Real-Time Analytics and Lifetime Payouts for Your Referrals."
                keywords="affiliate dashboard, highest commissions, iGaming, real-time analytics, lifetime payouts, UpvsDown, up vs down "
                canonical="/dashboard"
            />

            <PageHeader title={APP.term('affiliate_dashboard_title')} text_scale={.6} skipHistory={true} goldTxtstyles={{ marginTop: '-.7em' }} />

            {connect_wallet_popup && (<ConnectWalletModal
                openModal={() => connect(dispatch)}
                wallet={wallet}
                authenticate={authenticate}
            />)}

            <div className="top_link right">
                {state?.affiliate_pages?.map((itm, i) => (
                    <Link key={i} to={{ pathname: itm?.pathName }} className="link_btn" onClick={() => faqTab(itm?.page)}>
                        <div className={currentPage === itm?.page ? "link_btn_img_box_active" : "link_btn_img_box"}>
                            <img src={'/media/images/affiliate/' + itm?.src} data-img={i} />
                        </div>
                        <p className={currentPage === itm?.page ? "link_btn_content_active" : "link_btn_content"}>{affilite_page_cfg(itm?.content)}</p>
                    </Link>
                ))}
            </div>

            <Link to={{ pathname: '/share_links' }}>
                <div className="add_link_btn" onClick={show_new_campaign_popup}>
                    <span>{APP.term('add_campaign_link')}</span>
                </div>
            </Link>

            <div className="totals" style={{ marginTop: isMetamask ? '2em' : '' }}>
                <TodayTotal earning={stats?.currentEarnings} />
                <PastTotal earning={stats?.totalEarnings} />
            </div>

            <div className="tiers">
                <TierStat tier={1} stats={stats?.tiers[0]} />
                <TierStat tier={2} stats={stats?.tiers[1]} />
                <TierStat tier={3} stats={stats?.tiers[2]} />
            </div>

        </div>

    );

};