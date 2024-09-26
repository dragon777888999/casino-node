import React, { useState, useEffect, useContext } from 'react';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import { Link } from 'react-router-dom';
import APP from '../../app';
import PageHeader from '../../comp/page_header';
import { column_desc, column_asc } from '../../utils/array';
import TableHeader from './LinksMananger/TableHeader';
import CampaignRow from './LinksMananger/CampaignRow';
import CampaignRowMobile from './LinksMananger/CampaignRowMobile';
import NewCampaignForm from './LinksMananger/NewCampaignForm';
import useAppState from '../../hooks/useAppState';
import LinkManagerAPI from '../../API/linkManager';
import state from '../../state';
import { affilite_page_cfg } from '../../utils/affiliate_pages_cfg';
import { useDispatch, useSelector } from 'react-redux';
import { set_loader } from '../../REDUX/actions/main.actions';
import ga4Event from '../../utils/ga4.event';
import ConnectWalletModal from '../TradePage/ConnectWalletModal';
import { WalletContext } from '../../utils/game';
import HelmetManager from '../../comp/HelmetManager';

const column_sorters = { asc: column_asc, desc: column_desc };

function CampaignsList({ sorting: [column, order], loading, walletAdress }) {

    const records = useAppState('user_campaigns');
    const records_sortable = [...records];
    records_sortable.sort(column_sorters[order](column));

    return (

        <>

            <div className="linkmanager_content default-web-view">
                {walletAdress && loading ? null :
                    records_sortable?.length ?
                        <>{records_sortable?.map((rec, i) => <CampaignRow key={i} {...rec} />)}</>
                        : walletAdress && (<div className="no_links_content">
                            <p className="no_links_desc">
                                {APP.term('linkmanager_desc1')} <br /> {APP.term('linkmanager_desc2')}
                            </p>
                        </div>)
                }
            </div>

            <div className="linkmanager_content mobile-view">
                {walletAdress && loading ? null :
                    records_sortable?.length ?
                        <>{records_sortable?.map((rec, i) => <CampaignRowMobile key={i} {...rec} />)}</>
                        : walletAdress && (<div className="no_links_content">
                            <p className="no_data_message">
                                <span>Click on "Generate Link" and Get Started With Your Affiliate Program.</span>
                            </p>
                        </div>)
                }
            </div>

        </>

    );

}

function show_new_campaign_popup() {
    APP.add_popup(
        'add_campaign',
        { content: <NewCampaignForm /> }
    )
}

function NewLinkRow() {

    const links_made = useAppState('user_campaigns').length;

    return (
        <div className="counter_row">
            <div className="links_count">
                <span>{links_made} {APP.term('campaign_links_created')}</span>
            </div>
        </div>
    );

}

export default function LinksMananger() {

    const [sorting, setSorting] = useState(['time', 'desc']);
    const walletAdress = useAppState('wallet_address');
    const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);
    const { wallet, authenticate } = useContext(WalletContext);
    const currentPage = 'linksmanager';
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const partnerRef = (APP.state.get('partnerRef') == null) ? 'playnance' : APP.state.get('partnerRef');
    const updatedLinksManager = useAppState('updateLinksManager');

    //get data of list manager
    async function getLinksList(wallet, partnerRef, dispatch) {
        // setLoading(true)

        try {
            const res = await LinkManagerAPI.getList(wallet, partnerRef);
            const data = Object.keys(res.data).map(itm => res.data[itm]).map(itm => {
                return ({
                    ...itm,
                    date: itm?.createdOn,
                    total_users: itm?.friends,
                    today_total_profits: itm?.dailyEarning,
                    past_total_profits: itm?.totalEarnings
                });
            });

            if (res) {
                setLoading(false);
                dispatch(set_loader(false))
                APP.state.set('user_campaigns', [...data]
                    .sort(column_sorters['desc']('date')));
            }

        } catch (error) {
            dispatch(set_loader(false))
        }
    }


    //set special tab for FAQ page
    function faqTab(page) {
        if (page !== 'faq') return;
        APP.state.set('special_tab', 'affiliate')
    }

    useEffect(() => {
        if (updatedLinksManager) {
            getLinksList(walletAdress, partnerRef, dispatch);
            APP.state.set('updateLinksManager', false);
        }
    }, [updatedLinksManager])

    useEffect(() => {
        if (!walletAdress) return;
        getLinksList(walletAdress, partnerRef, dispatch);
    }, [walletAdress])

    useEffect(() => {
        ga4Event('all ways opening affiliate manager page', 'affiliate_page');
    }, [])

    return (

        <div className="page affiliate_page affiliate_links_page table_page">

            {connect_wallet_popup &&
                (<ConnectWalletModal
                    wallet={wallet}
                    authenticate={authenticate} />)}

            <HelmetManager
                title="Referral Manager"
                description="Referral Links: Generate Custom Referral Links and Boost Your Network."
                keywords="Crypto Referral program,igmaing affilite , rev share commision, content creator earnings, UpvsDown, up vs down "
                canonical="/share_links"
            />


            <PageHeader
                title={APP.term('affiliate_link_manager_title')}
                skipHistory={true}
                text_scale={.6}
                goldTxtstyles={{ marginTop: '.6em' }}
            />

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

            <div className="add_link_btn" onClick={show_new_campaign_popup}>
                <span>{APP.term('add_campaign_link')}</span>
            </div>

            <NewLinkRow />
            <TableHeader sorting={sorting} setSorting={setSorting} />
            <CampaignsList sorting={sorting} loading={loading} walletAdress={walletAdress} />

        </div>

    );

}