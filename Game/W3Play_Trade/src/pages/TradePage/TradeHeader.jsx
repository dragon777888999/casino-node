import React, { useContext } from 'react';
import ReactPixel from 'react-facebook-pixel';
import useAppState from '../../hooks/useAppState';
import UserBalance from '../../comp/user_balance';
import { Link, useNavigate } from 'react-router-dom';
import APP from '../../app';
import { WalletContext } from '../../utils/game';
import { useDispatch } from 'react-redux';
import { set_connect_wallet_popup } from '../../REDUX/actions/main.actions';
import state from '../../state';
import disabledChatDomains from '../../utils/disabledChatDomains';
import logoCfg from '../../utils/logoCfg';
import ga4Event from '../../utils/ga4.event';
import loadIntercom from '../../utils/loadIntercom';
import { set_bot_radar_platform } from '../../REDUX/actions/trade.actions';

const ToggleChat = () => {
    return (
        state.intercom_domains_list.includes(window.location.hostname) &&
        (<div id="support_btn_global"
            className="intercom_trade_header_btn"
            onClick={loadIntercom}>
            <span>{APP.term('trade_header_chat')}</span>
        </div>)
    )
};


const ConnectWalletButton = ({ openModal }) => {

    function handleButtonClick() {
        openModal(true);

        // send click on connect btn event (pixel)
        let wh_details = APP.state.get('pixels').find(itm => {
            if (itm?.params?.searchedByHostname) {
                return itm.target.includes(window.location.hostname);
            }
            else {
                return itm.target === window.location.href;
            }
        })

        if (wh_details?.params?.connectBtnleadEvt) ReactPixel.track('Lead')

        ga4Event('user click on connect wallet button', 'Connect_wallet_click')

        // Yaniv's friend postback logic
        async function sendPostback(clickIdParam) {
            try {
                let response = await fetch(`https://trk.aso1.net/postback?pid=lIFdJXC25u&clickid=${clickIdParam}`,
                    { method: 'POST' }),
                    parsedRes = await response.json();

            }
            catch (e) {
                // console.log(e, 'e .. postback')
            }
        }

        function getParamValue(paramString, paramName) {
            const params = new URLSearchParams(paramString);
            return params.get(paramName);
        }

        let clickIdParam = getParamValue(APP.state.get('initialParams'), 'clickid');
        if (clickIdParam) { sendPostback(clickIdParam); }

    }

    return (
        <div className="wallet_connect_btn"
            onClick={handleButtonClick}>
            <p>{APP.term('header_connect_wallet')}</p>
        </div>
    );
}

function open_menu() {
    APP.state.set('menu_open', true)
}

// header of the whole page
function TradeHeader({ onOpenAvt, setIsWalletTopupModalOpen }) {

    const dispatch = useDispatch()
    const user_avatar = useAppState('customer.avatar') || localStorage.getItem('avatar');
    const { wallet, authenticate } = useContext(WalletContext);

    let walletAdress = useAppState("wallet_address");

    if (typeof (walletAdress) == 'undefined') {
        //wallet address is not exists try to take data from active_wallet state
        console.log('wallet address is not exists try to take data from active_wallet state');
        walletAdress = APP.state.get('active_wallet');
    }

    const _width = window.innerWidth;
    const _height = window.innerHeight;

    let hostname = window.location.hostname;
    let whitelabels = Object.values(APP.state.get('whitelabels'));
    let whiteLabelObj = whitelabels.find(item => item.url === hostname)
    let navigate = useNavigate();
    let validIntercom = state.intercom_domains_list.includes(window.location.hostname);

    if (whiteLabelObj === undefined)
        whiteLabelObj = whitelabels.find(item => item.url === 'upvsdown.com')

    const onClickRefreshBalance = () => {
        APP.customer.update_balance();
    };

    // condition to check if connect wallet is allowed by specific country
    function connect(dispatch) {
        dispatch(set_connect_wallet_popup(true));
    }


    const TopupWalletButton = React.memo(({ navigate }) => {

        // routing to topup page
        function navTopup() {
            navigate('/topup')
            APP.state.set('topup_x_trade', true)
        }

        return (
            <div onClick={() => navTopup()}
                className="social_wallet_connect_btn"
            />
        )
    }, ({ prev, next }) => prev === next)

    // route path of affiliates btn 
    // 9wins.com => /contact_us
    // default => /share
    function btnPath() {
        if (window.location.hostname === '9wins.com') return '/contact_us';
        if (window.location.hostname === 'btcrollercoaster.com') return '/sap_links';
        else return '/share';
    }

    return (

        <div className="header">

            <div className="site_logo">
                {logoCfg(APP?.controller?.cfg, 'logoUrl') && (<img src={logoCfg(APP?.controller?.cfg, 'logoUrl')} alt='' />)}
                {logoCfg(APP?.controller?.cfg, 'faviconUrl') && (<img src={logoCfg(APP?.controller?.cfg, 'faviconUrl')} className="mobile_logo" />)}
                <div className="mobile_bot_radar" onClick={() => dispatch(set_bot_radar_platform(true))} />
            </div>

            <Link to={{ pathname: btnPath() }} className="header_leftbtn affiliate-anchor">
                <div>
                    <p>{APP.term('header_left_btn')}</p>
                </div>
            </Link>

            <div className="balance_box">

                {walletAdress && <TopupWalletButton openModal={setIsWalletTopupModalOpen} navigate={navigate} />}

                {walletAdress
                    ? <UserBalance showChange={true} />
                    : <ConnectWalletButton
                        openModal={() => connect(dispatch)}
                        wallet={wallet}
                        authenticate={authenticate}
                    />
                }

                {walletAdress && <div className="refresh-balance-button" onClick={onClickRefreshBalance}></div>}
            </div>

            <div className="contest-anchor" onClick={() => dispatch(set_bot_radar_platform(true))}>
                <div className="header_rightbtn">
                    <div>
                        {/* <p>{APP.term('header_right_btn')}</p> */}
                        <p>{APP.term('Bot')}</p>
                    </div>
                </div>
            </div>

            <div className="right_group">

                {(_height > _width) || disabledChatDomains(window.location.hostname) ? null : <ToggleChat />}

                <Link to={{ pathname: '/userprofile' }}
                    className={"user_avatar " + (!validIntercom ? 'add_space' : null)}>
                    <img src={user_avatar} />
                </Link>

                <button className="menu_btn" onClick={open_menu} />

            </div>

        </div>

    );

}


export default TradeHeader;
