import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../comp/page_header';
import useAppState from '../../hooks/useAppState';
import state from '../../state';
import { super_affilite_page_cfg } from '../../utils/super_affiliate_pages_cfg';
import './Dashboard.css';
import dashboardAPI from '../../API/superAffiliatesLinkManager';
import _num from '../../utils/numberFormat';
import { WalletContext } from '../../utils/game';
import ConnectWalletModal from '../TradePage/ConnectWalletModal';
import { useDispatch, useSelector } from 'react-redux';
import Symbol from '../../comp/shape/playblock_symbol';


const imagePath = '/media/images/super_affiliate_program';

const EarnedTodayBox = ({ earning }) => {

    return (
        <div className="earnings-box today">
            <img className="icon" src="/media/images/coins_stack.png" />
            <div className="amount"><Symbol /><span>{_num.addCommas(parseFloat(earning).toFixed(state.sap_digits))}</span></div>
            <div className="title"><span>{APP.term('sap_dashboard_earn_today')}</span></div>
        </div>
    );
};

const EarnedTotalBox = ({ earning }) => {

    return (
        <div className="earnings-box total">
            <img className="icon" src="/media/images/earning_stats.png" />
            <div className="amount"><Symbol /><span>{add_commas(earning || 0, 2)}</span></div>
            <div className="title"><span>{APP.term('sap_dashboard_earn_total')}</span></div>
        </div>
    );
};

const EarnedFriendsBox = ({ todayPlayers, totalPlayers, todayPlayerEarnings, totalPlayerEarnings }) => {

    return (
        <div className="earnings-box friends">
            <div className="main-image-set">
                <div className="left-image-box"><img className="icon" src={`${imagePath}/step1-left-image.svg`} /></div>
                <div className="arrow-image-box"><img className="icon" src={`${imagePath}/step1-arrow-image.svg`} /></div>
                <div className="middle-image-box"><img className="icon" src={`${imagePath}/step1-middle-image.svg`} /></div>
                <div className="arrow-image-box"><img className="icon" src={`${imagePath}/step1-arrow-image.svg`} /></div>
                <div className="right-image-box"><img className="icon" src={`${imagePath}/step1-right-image.svg`} /></div>
            </div>
            <div className="title"><span>{APP.term('sap_dashboard_players')}</span></div>
            <div className="earnings-sub-boxes">
                <div className="earnings-sub-box today">
                    <div className="total"><span>{todayPlayers}</span></div>
                    <div className="amount"><Symbol /><span>{_num.addCommas(parseFloat(todayPlayerEarnings).toFixed(state.sap_digits))}</span></div>
                    <div className="title"><span>{APP.term('sap_dashboard_today')}</span></div>
                </div>
                <div className="earnings-sub-box total">
                    <div className="total"><span>{totalPlayers}</span></div>
                    <div className="amount"><Symbol /><span>{_num.addCommas(parseFloat(totalPlayerEarnings).toFixed(state.sap_digits))}</span></div>
                    <div className="title"><span>{APP.term('sap_dashboard_total_payed')}</span></div>
                </div>
            </div>
        </div>
    );
};

const TopNavigationBar = ({ currentPage }) => {

    // Set special tab for FAQ page
    const faqTab = (page) => {
        if (page !== 'faq') return;
        APP.state.set('special_tab', 'affiliate')
    }

    return (
        <div className="top_link right">
            {state?.super_affiliate_pages?.map((itm, i) => (
                <Link key={i} to={{ pathname: itm?.pathName }} className="link_btn" onClick={() => faqTab(itm?.page)}>
                    <div className={currentPage === itm?.page ? "link_btn_img_box_active" : "link_btn_img_box"}>
                        <img src={'/media/images/affiliate/' + itm?.src} data-img={i} />
                    </div>
                    <p className={currentPage === itm?.page ? "link_btn_content_active" : "link_btn_content"}>
                        {super_affilite_page_cfg(itm?.content)}
                    </p>
                </Link>
            ))}
        </div>
    );

};

const Dashboard = () => {

    const wallet_address = useAppState('wallet_address');
    const currentPage = 'dashboard';
    const dispatch = useDispatch();
    const { wallet, authenticate } = useContext(WalletContext);
    const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);
    const partnerRef = (APP.state.get('partnerRef') == null) ? 'playnance' : APP.state.get('partnerRef');
    const [stats, setStats] = useState({
        currentEarnings: 0,
        totalEarnings: 0,
        currentContributors: 0,
        totalContributors: 0,
        currentContributorsEarnings: 0,
        totalContributorsEarnings: 0
    });

    // api for getting stats
    const getStats = async () => {
        const res = await dashboardAPI.getDashboard();

        if (res.error) return;
        setStats(res?.data?._data);
    };

    useEffect(() => {
        if (wallet_address)
            getStats(partnerRef);
    }, [wallet_address]);

    return (

        <div className="page sap-page sap-dashboard">

            <PageHeader
                title={APP.term('sap_dashboard_title')}
                skipHistory={true}
                text_scale={.6}
                goldTxtstyles={{ marginTop: '.6em' }}
            />

            {connect_wallet_popup && (<ConnectWalletModal
                openModal={() => connect(dispatch)}
                wallet={wallet}
                authenticate={authenticate}
            />)}

            <TopNavigationBar currentPage={currentPage} />

            {/* BOXES CONTENT */}
            <div className="earnings-boxes">
                <div className="top-earnings-boxes">
                    <EarnedTodayBox earning={stats?.currentEarnings} />
                    <EarnedTotalBox earning={stats?.totalEarnings} />
                </div>
                <EarnedFriendsBox
                    todayPlayers={stats?.currentContributors}
                    totalPlayers={stats?.totalContributors}
                    todayPlayerEarnings={stats?.currentContributorsEarnings}
                    totalPlayerEarnings={stats?.totalContributorsEarnings} />
            </div>
        </div>
    );
};

export default Dashboard;