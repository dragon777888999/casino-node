import React, { useContext, useEffect, useState } from 'react'
import APP from '../../app';
import PageHeader from '../../comp/page_header';
import { column_desc, column_asc } from '../../utils/array';
// import { die, choice } from '../../utils/random';
import TableHeader from './EarningsReport/TableHeader';
import EarningRecord from './EarningsReport/EarningRecord';
import EarningRecordMobile from './EarningsReport/EarningRecordMobile';
import { Link } from 'react-router-dom';
import linkManager from '../../API/linkManager';
import useAppState from '../../hooks/useAppState';
import NewCampaignForm from './LinksMananger/NewCampaignForm';
import state from '../../state';
import { affilite_page_cfg } from '../../utils/affiliate_pages_cfg';
import ConnectWalletModal from '../TradePage/ConnectWalletModal';
import { WalletContext } from '../../utils/game';
import { useDispatch, useSelector } from 'react-redux';
import HelmetManager from '../../comp/HelmetManager';

const column_sorters = { asc: column_asc, desc: column_desc };

function RecordsList({ sorting: [column, order] }) {

    const [records, setRecords] = useState([
        // { id: 1, date: 1684952998400, totalAmount: 0.244, status: 'Paid', perTier1: 0.4001, perTier2: 0.232, perTier3: 0.3, transactionHash: 'xasdged' },
        // { id: 2, date: 1684922998400, totalAmount: 0.5123, status: 'Paid', perTier1: 0.003, perTier2: 1.1, perTier3: 1.10004, transactionHash: 'xewf333r' },
        // { id: 3, date: 1682932998400, totalAmount: 2.3, status: 'Pending', perTier1: 0.123, perTier2: 2.002, perTier3: 1.942, transactionHash: 'x32sdf324r32' },
        // { id: 4, date: 1684952998400, totalAmount: 0.244, status: 'In Progress', perTier1: 0.4001, perTier2: 0.232, perTier3: 0.3, transactionHash: 'xasdged' },
        // { id: 5, date: 1684922998400, totalAmount: 0.5123, status: 'Paid', perTier1: 0.003, perTier2: 1.1, perTier3: 1.10004, transactionHash: 'xewf333r' },
        // { id: 6, date: 1682932998400, totalAmount: 2.3, status: 'Paid', perTier1: 0.123, perTier2: 2.002, perTier3: 1.942, transactionHash: 'x32sdf324r32' },
        // { id: 7, date: 1684952998400, totalAmount: 0.244, status: 'Paid', perTier1: 0.4001, perTier2: 0.232, perTier3: 0.3, transactionHash: 'xasdged' },
        // { id: 8, date: 1684922998400, totalAmount: 0.5123, status: 'Paid', perTier1: 0.003, perTier2: 1.1, perTier3: 1.10004, transactionHash: 'xewf333r' },
        // { id: 9, date: 1682932998400, totalAmount: 2.3, status: 'Paid', perTier1: 0.123, perTier2: 2.002, perTier3: 1.942, transactionHash: 'x32sdf324r32' },
        // { id: 10, date: 1684952998400, totalAmount: 0.244, status: 'Paid', perTier1: 0.4001, perTier2: 0.232, perTier3: 0.3, transactionHash: 'xasdged' },
        // { id: 11, date: 1684922998400, totalAmount: 0.5123, status: 'Paid', perTier1: 0.003, perTier2: 1.1, perTier3: 1.10004, transactionHash: 'xewf333r' },
        // { id: 12, date: 1682932998400, totalAmount: 2.3, status: 'Paid', perTier1: 0.123, perTier2: 2.002, perTier3: 1.942, transactionHash: 'x32sdf324r32' }
    ]);
    const partnerRef = (APP.state.get('partnerRef') == null) ? 'playnance' : APP.state.get('partnerRef');
    const wallet_address = useAppState('wallet_address');

    records.sort(column_sorters[order](column));

    if (column === 'status') {
        if (order === 'desc') records.sort((a, b) => a.status.localeCompare(b.status))
        else records.sort((a, b) => b.status.localeCompare(a.status))
    }


    // get list of earnings
    const getList = async (wallet_address, partnerRef) => {

        const res = await linkManager.getEarningsReport(wallet_address, partnerRef);

        // res.data = [
        //     {
        //         "id": 93,
        //         "transactionHash": "0x10d06b3e6708c681b70d171e6b9bcd13e6819279278870b3c3961d1b192a7c81",
        //         "totalAmount": 0.108,
        //         "perTiers": {
        //             "1": 0.108,
        //             "2": 0.0,
        //             "3": 0.0
        //         },
        //         "walletAddress": "0x7fCF3a11A5A023C527E8031d262a005A914Cb7c6",
        //         "partnerRef": null,
        //         "status": "PAID",
        //         "synchronizedAt": "2024-06-25T12:00:04.755963",
        //         "date": "2024-06-24"
        //     },
        //     {
        //         "id": 141,
        //         "transactionHash": "0x3f30353d27be38c32475d5909e61c5d8d4a31304cbde55bf51a62720d9cc7657",
        //         "totalAmount": 0.5574,
        //         "perTiers": {
        //             "1": 0.5574,
        //             "2": 0.0,
        //             "3": 0.0
        //         },
        //         "walletAddress": "0x7fCF3a11A5A023C527E8031d262a005A914Cb7c6",
        //         "partnerRef": null,
        //         "status": "PAID",
        //         "synchronizedAt": "2024-07-10T12:00:07.862217",
        //         "date": "2024-06-25"
        //     },
        //     {
        //         "id": 1150,
        //         "transactionHash": "0x28ab5cdf33bedfb3fca2381d95e4c494840d1c1fc81dfb52c56de0834a1471d1",
        //         "totalAmount": 0.0616,
        //         "perTiers": {
        //             "1": 0.0616,
        //             "2": 0.0,
        //             "3": 0.0
        //         },
        //         "walletAddress": "0x7fCF3a11A5A023C527E8031d262a005A914Cb7c6",
        //         "partnerRef": null,
        //         "status": "PAID",
        //         "synchronizedAt": "2024-08-14T12:00:00.789126",
        //         "date": "2024-07-10"
        //     },
        //     {
        //         "id": 3284,
        //         "transactionHash": null,
        //         "totalAmount": 0.0,
        //         "perTiers": {
        //             "1": 0.0,
        //             "2": 0.0,
        //             "3": 0.0
        //         },
        //         "walletAddress": "0x7fCF3a11A5A023C527E8031d262a005A914Cb7c6",
        //         "partnerRef": null,
        //         "status": "IN PROGRESS",
        //         "synchronizedAt": null,
        //         "date": "2024-08-14"
        //     }
        // ];
        
        const list = Object.keys(res.data)
            .map(itm => res.data[itm])
            .map(itm => {
                let tiers = itm?.perTiers;
                delete itm?.perTiers
                return ({
                    ...itm,
                    perTier1: tiers['1'],
                    perTier2: tiers['2'],
                    perTier3: tiers['3']
                })
            });

        setRecords(list);

    };

    useEffect(() => {
        if (wallet_address) {
            getList(wallet_address, partnerRef);
        }
    }, [wallet_address]);

    return (

        <>

            <div className="earnings_list table_body default-web-view">
                {records.map(rec => <EarningRecord key={rec.id} {...rec} />)}
            </div>

            <div className="earnings_list table_body mobile-view">
                {records.map(rec => <EarningRecordMobile key={rec.id} {...rec} />)}
            </div>

        </>

    );

}

export default function EarningsReport() {

    const [sorting, setSorting] = useState(['time', 'desc']);
    const currentPage = 'earningreport';
    const { wallet, authenticate } = useContext(WalletContext);
    const dispatch = useDispatch();
    const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);

    const show_new_campaign_popup = () => {
        APP.add_popup(
            'add_campaign',
            { content: <NewCampaignForm /> }
        );
    };

    //set special tab for FAQ page
    const faqTab = (page) => {
        if (page !== 'faq') return;
        APP.state.set('special_tab', 'affiliate')
    };
    
    return (

        <div className="page affiliate_page affiliate_report_page table_page">
            
            <HelmetManager
                title="Share Report"
                description="Referral Program Report: Track Your Referral Performance and Earnings."
                keywords="crypto affiliate earnings,monetize your content , track referral performance, influncers  earnings, UpvsDown"
                canonical="/share_report"
            />

            <PageHeader title={APP.term('affiliate_earnings_report_title')} text_scale={.6} skipHistory={true} goldTxtstyles={{ marginTop: '-.7em' }} />

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
                        <p className={currentPage === itm?.page ? "link_btn_content_active" : "link_btn_content"}><span>{affilite_page_cfg(itm?.content)}</span></p>
                    </Link>
                ))}
            </div>

            <Link to={{ pathname: '/share_links' }}>
                <div className="add_link_btn" onClick={show_new_campaign_popup}>
                    <span>{APP.term('add_campaign_link')}</span>
                </div>
            </Link>

            <TableHeader sorting={sorting} setSorting={setSorting} />
            <RecordsList sorting={sorting} />

        </div>

    );

}