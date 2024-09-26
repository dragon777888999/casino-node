import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../../comp/page_header';
import MainTableHeader from './MainTableHeader';
import MainTableRow from './MainTableRow';
import NewCampaignForm from './NewCampaignForm';
import APP from '../../../app';
// import API from '../../../API/superAffiliates';
import useAppState from '../../../hooks/useAppState';
import state from '../../../state';
import { super_affilite_page_cfg } from '../../../utils/super_affiliate_pages_cfg';
import { set_loader, set_alert_msg } from '../../../REDUX/actions/main.actions';
// import countryCodeToName from '../../../utils/countryCodeToName.json';

import './LinksManager.css';
import superAffiliatesLinkManager from '../../../API/superAffiliatesLinkManager';
import yesterday from '../../LeaderBoard/filters/yesterday';
import today from '../../LeaderBoard/filters/today';
import thisWeek from '../../LeaderBoard/filters/thisWeek';
import thisMonth from '../../LeaderBoard/filters/this.month';
import ConnectWalletModal from '../../TradePage/ConnectWalletModal';
import { WalletContext } from '../../../utils/game';

const styles = `
  body .golden-title span {
    position: relative;
    transform: translateX(50%);
    margin-top: .8em;
    top: .1em;
    font-size: 2.5em;
  }
  .page .page_header {
    height: 12em;
  }
`;

// Column IDs vs data props
const mapping = {
    'date': 'createdAt',
    'link': 'link',
    'clicks': 'hits',
    'wallet': 'connections',
    'players': 'activeUsers',
    'conversion': 'conversionRate',
    'revenue': 'revenueTotal'
};

// Sorting functions (asc/desc)
const MAIN_TABLE_SORTERS = {
    asc: (column) => (a, b) => (a[mapping[column]] - b[mapping[column]]),
    desc: (column) => (a, b) => (b[mapping[column]] - a[mapping[column]])
};

const GenerateLinkButton = () => {

    const showNewCampaignPopup = () => {
        if (window.innerWidth < 480) {
            APP.state.set('popupSpecialClass', 'sap_generate_link_mobile');
        }
        APP.add_popup('add_campaign', { content: <NewCampaignForm /> });
    };

    return (
        <div className="generate-link-button" onClick={showNewCampaignPopup}>
            <span>{APP.term('add_campaign_link')}</span>
        </div>
    );
};

const FilterDropbox = React.memo(({ isOpen, currentFilter, dateOptions, setFilter, setOpen }) => {

    return (
        <div className={"dropbox-button " + (isOpen ? 'remove-bottom-border' : '')} onClick={setOpen}>
            <p>{APP.term(currentFilter?.name)}</p>
            <i className="fa fa-angle-down"></i>
            {isOpen && (
                <div className={"dropbox-list-box " + (isOpen ? 'remove-top-border' : '')}>
                    {dateOptions.map((itm, i) => (
                        <p key={i} onClick={() => setFilter(itm)}>{APP.term(itm?.name)}</p>
                    ))}
                </div>
            )}
        </div>
    );
});

const NoRecordsMessage = () => {
    return (
        <div className="no_links_content">
            <p className="no_links_desc">
                {APP.term('linkmanager_desc1')}<br />
                {APP.term('linkmanager_desc2')}
            </p>
        </div>
    );
};

const LinksCreatedCount = () => {
    const linksCount = useAppState('sap_user_campaigns').length;
    return (
        <div className="counter_row">
            <div className="links_count">
                <span>{linksCount} {APP.term('campaign_links_created')}</span>
            </div>
        </div>
    );
};

const TopNavigationBar = ({ currentPage }) => {

    // Set special tab for FAQ page
    const faqTab = (page) => {
        if (page !== 'faq') return;
        APP.state.set('special_tab', 'super');
    };

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

const MainTableBody = ({ sorting: [column, order], loading, walletAddress }) => {

    const stored = useAppState('sap_user_campaigns');
    const records = [...stored].sort(MAIN_TABLE_SORTERS[order](column));

    return (
        <div className="records">
            {(!records.length && !loading && walletAddress) && <NoRecordsMessage />}
            {!!records.length && records.map(record => <MainTableRow {...record} key={record.code} />)}
        </div>
    );

};

const LinksManager = () => {

    const dispatch = useDispatch();
    const [sorting, setSorting] = useState(['time', 'desc']);
    const walletAddress = useAppState('wallet_address');
    const currentPage = 'linksmanager';
    const { wallet, authenticate } = useContext(WalletContext);
    const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);
    const [loading, setLoading] = useState(true);
    const updatedSapLinksManager = useAppState('updateSapLinksManager');
    const authToken = localStorage.getItem("auth-token");
    const dateOptions = [
        { type: 1, name: APP.term('sap_yesterday') },  // Yesterday
        { type: 2, name: APP.term('sap_today') },      // Today
        { type: 3, name: APP.term('sap_thisweek') },   // This week
        { type: 4, name: APP.term('sap_thismonth') },  // This month
        { type: 5, name: APP.term('sap_alltime') }],   // All time,

    [isOpen, setOpen] = useState(false),
    [currentFilter, setFilter] = useState(dateOptions[1]);

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

    // Get list manager data
    const getLinksList = async (type) => {

        const ranges = leaderboardDate(type);

        try {
            dispatch(set_loader(true));
            const response = await superAffiliatesLinkManager.getList(ranges?.from, ranges?.to);

            // Calculate additional values dynamically
            response?.data?.campaigns.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).forEach(record => {

                record.conversionRate = (record.activeUsers && record.connections)
                    ? Math.min(parseInt((record.activeUsers / record.connections) * 100), 100) : 0;

                record.avgTradesPerPlayer = (record.tradesTotal && record.activeUsers)
                    ? (record.tradesTotal / record.activeUsers) : 0;

                record.avgRevPerPlayer = (record.revenueTotal && record.activeUsers)
                    ? (record.revenueTotal / record.activeUsers) : 0;

                record.geoData.forEach(item => {

                    // item.country = countryCodeToName['dex'];
                    // item.country = countryCodeToName[item?.country];
                    item.country = [item?.country];

                    item.conversionRate = (item.activeUsers && item.connections)
                        ? Math.min(parseInt((Number(item.activeUsers) / Number(item.connections)) * 100), 100) : 0;

                    item.avgTradesPerPlayer = (item.tradesTotal && item.activeUsers)
                        ? (Number(item.tradesTotal) / Number(item.activeUsers)) : 0;

                    item.avgRevPerPlayer = (item.revenueTotal && item.activeUsers)
                        ? (Number(item.revenueTotal) / Number(item.activeUsers)) : 0;

                });

            });

            // Store data
            APP.state.set(
                'sap_user_campaigns',
                [...response?.data?.campaigns]
                    .sort(MAIN_TABLE_SORTERS['desc']('date'))
            );
        }

        catch (error) {
            // dispatch(set_alert_msg({ type: 'error', content: 'failed_loading_data' }));
        }

        finally {
            setLoading(false);
            dispatch(set_loader(false));
        }

    };

    // Update list when creating new link
    useEffect(() => {
        if (updatedSapLinksManager && authToken) {
            getLinksList(currentFilter?.type);
            APP.state.set('updateSapLinksManager', false);

            // update to today's stats, once a new one was generated right now
            setFilter({ type: 2, name: APP.term('sap_today') });

        }
    }, [updatedSapLinksManager]);

    // Initial loading
    useEffect(() => {
        if (walletAddress && currentFilter?.name) getLinksList(currentFilter?.type);
    }, [walletAddress, currentFilter?.name]);

    // update new filtering date
    function updateTimeFilter(data) {
        setFilter(data);
    }

    return (

        <div className="page sap-page sap-links-page table_page">
            <style dangerouslySetInnerHTML={{ __html: styles }} />

            {connect_wallet_popup && (<ConnectWalletModal
                openModal={() => connect(dispatch)}
                wallet={wallet}
                authenticate={authenticate}
            />)}

            <PageHeader
                title={APP.term('sap_links_title')}
                skipHistory={true}
                text_scale={.6}
                goldTxtstyles={{ marginTop: '.6em' }}
            />


            <TopNavigationBar currentPage={currentPage} />
            <GenerateLinkButton />
            <FilterDropbox
                dateOptions={dateOptions}
                isOpen={isOpen} setOpen={() => setOpen(!isOpen)}
                currentFilter={currentFilter} setFilter={updateTimeFilter}
            />
            <LinksCreatedCount />
            <MainTableHeader sorting={sorting} setSorting={setSorting} />
            <MainTableBody sorting={sorting} loading={loading} walletAddress={walletAddress} />

        </div>

    );

};

export default LinksManager;
