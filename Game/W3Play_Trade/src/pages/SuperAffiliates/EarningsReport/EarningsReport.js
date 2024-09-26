import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../../comp/page_header';
import TableHeader from './TableHeader';
import EarningRecord from './EarningRecord';
import APP from '../../../app';
import useAppState from '../../../hooks/useAppState';
import state from '../../../state';
import { super_affilite_page_cfg } from '../../../utils/super_affiliate_pages_cfg';
import superAffiliatesLinkManager from '../../../API/superAffiliatesLinkManager';
import './EarningsReport.css';
import { WalletContext } from '../../../utils/game';
import { useSelector } from 'react-redux';
import ConnectWalletModal from '../../TradePage/ConnectWalletModal';

// // (Column ids vs record props)
const mapping = {
    rank: 'rank',
    trades: 'tradesCount',
    wins: 'winningsCount',
    winrate: 'winRate',
    profits: 'profit'
};

// // Sorting functions (asc/desc)
const column_sorters = {
    asc: (column) => (a, b) => (a[mapping[column]] - b[mapping[column]]),
    desc: (column) => (a, b) => (b[mapping[column]] - a[mapping[column]])
};

const TopNavigationBar = ({ currentPage }) => {

    // Set special tab for FAQ page
    const faqTab = (page) => {
        if (page !== 'faq') return;
        APP.state.set('special_tab', 'super')
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

const RecordsList = ({ records, sorting: [column, order] }) => {

    records.sort(column_sorters[order](column));

    return (
        <div className="earnings_list table_body">
            {records.map(rec => <EarningRecord key={rec.id} {...rec} />)}
        </div>
    );

};

const EarningsReport = () => {

    const [sorting, setSorting] = useState(['time', 'desc']);
    const currentPage = 'earningreport';
    const wallet_address = useAppState('wallet_address');
    const { wallet, authenticate } = useContext(WalletContext);
    const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);
    const [records, setRecords] = useState([]);

    // get list of earnings
    const getList = async () => {
        const res = await superAffiliatesLinkManager.getEarningsReport();
        if (res.error) return;
        setRecords(res.data._data);
    };

    useEffect(() => {
        if (wallet_address) {
            getList();
        }
    }, [wallet_address]);

    return (

        <div className="page sap-page sap-earnings-report table_page">

            {connect_wallet_popup && (<ConnectWalletModal
                openModal={() => connect(dispatch)}
                wallet={wallet}
                authenticate={authenticate}
            />)}

            <PageHeader
                title="SUPER AFFILIATE PROGRAM EARNINGS REPORT"
                skipHistory={true}
                text_scale={.6}
                goldTxtstyles={{ marginTop: '.6em' }}
            />

            <TopNavigationBar currentPage={currentPage} />

            {/* <div className="generate-link-button" onClick={showNewCampaignPopup}>
                {APP.term('add_campaign_link')}
            </div> */}

            <TableHeader sorting={sorting} setSorting={setSorting} />
            <RecordsList sorting={sorting} records={records} />

        </div>

    );

};

export default EarningsReport;