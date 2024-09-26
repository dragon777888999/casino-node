import React, { useEffect } from 'react';
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import APP from '../../app';
import useAppState from "../../hooks/useAppState";
import { set_bridge_popup, set_loader,set_pix_popup, set_p2p_popup, set_private_key_popup, set_topup_close_btn, set_polygon_details, set_topup_wallet_popup, set_rev_bridge_popup, set_paybis_info_popup, set_efi_pay_popup } from '../../REDUX/actions/main.actions';
import state from '../../state';
import { copyTextToClipboard } from '../../utils/clipboard';
// import deSwapMobile from '../../utils/topup/deSwap.mobile';
// import deSwap from '../../utils/topup/deSwap';
import { EtherValueString } from "../../utils/web3";
import removeDebridgeWidgetScript from '../../utils/topup/closeWidget.deswap';
import { Link } from 'react-router-dom';
import num from '../../utils/numberFormat';
import { buyCoin } from '../../utils/transactionHelpers';
// import swapAPI from '../../API/swap';

const payments = ['googlePay', 'visa', 'skrill', 'applePay', 'mastercard', 'pix', 'sepa', 'paypal', 'moneybookers', 'neteller']

interface WalletMailProps {
    wallet_address: string;
    user_email: string;
    dispatch: React.Dispatch<any>;
}

/* wallet + mail */
const WalletMail: React.FC<WalletMailProps> = ({ wallet_address, user_email, dispatch }) => {

    const isDemo = APP.state.get('currentToken') === 'demo',
        wallet_address_txt = isDemo ? 'game_wallet_wallet_address_demo' : 'game_wallet_wallet_address';

    // abbreviate long wallet format
    function cutWallet(wallet: string) {
        return wallet.slice(0, 11) + '...' + wallet.slice(wallet.length - 10);
    }

    // abbreviate long mail format
    function cutLongMail(mail: string | undefined): string | undefined {
        return mail?.length > 30 ? mail?.substring(0, 15) + '...' + mail.substring(mail?.length, mail?.length - 12) : mail;
    }

    // copy wallet to clipboard + success alert msg
    function copyWalletAddress(wallet: string) {
        copyTextToClipboard(wallet, dispatch, APP.term('alert_succes_wallet_copied'));
    }

    return (

        <div className="wallet_address">

            <p className="header">
                <span>{APP.term(wallet_address_txt)}</span>
            </p>

            <p className="wallet">
                <span>{cutWallet(wallet_address)}</span>
            </p>

            {user_email &&
            (<p className="email_header">
                <span>{APP.term('game_wallet_email')}</span><p><span>{cutLongMail(user_email)}</span></p>
            </p>)}
            
            <div className="copy_btn" onClick={() => copyWalletAddress(wallet_address)}>
                <img src='/media/images/copy.png' alt="copy" />
                <p><span>{APP.term('game_wallet_copy')}</span></p>
            </div>

        </div>

    )
};

interface BalanceProps {
    dispatch: React.Dispatch<any>;
    maticBalance: string;
    is_polygon: boolean;
}

const Balance: React.FC<BalanceProps> = React.memo(({ dispatch, maticBalance, is_polygon }) => {

    const customer_balance = useAppState('customer.balance');
    const ether_balance = EtherValueString({ wei: BigInt(customer_balance).toString() });
    const isDemo = APP.state.get('currentToken') === 'demo';
    const wallet_bln_txt = is_polygon ? 'game_wallet_balance_matic' : (isDemo ? 'game_wallet_balance_demo' : 'game_wallet_balance');
    const wallet_txt = isDemo ? 'game_wallet_desc_demo' : 'game_wallet_desc';

    // open transfer matic popup
    function openTransfer() {
        APP.state.set('topup_opened_type', 'transfer');
        if (is_polygon) dispatch(set_polygon_details({ matic_transaction: 'polygon' }))
        else dispatch(set_polygon_details({ matic_transaction: false }))
        dispatch(set_topup_wallet_popup(true));
    }
    // if (!(ether_balance && (Number(customer_balance) > 0))) return;

    return (
        <div className="balance_box">
            <p className="header"><span>{APP.term(wallet_bln_txt)}</span></p>
            <p className="balance"><span>{is_polygon ? maticBalance : num.addCommas(Number(ether_balance).toFixed(2))}</span></p>
            <div className="transfer_btn" onClick={openTransfer}>
                {/* <i className="fa-solid fa-dollar-sign"></i> */}
                <p><span>{APP.term('game_wallet_transfer')}</span></p>
            </div>
            {!parseInt(maticBalance) && <p className="desc"><span>{APP.term(wallet_txt)}</span></p>}
        </div>
    )
});

const Mobile = () => {

    const wallet_address = useAppState('wallet_address');
    const dispatch = useDispatch();
    const user_email = useAppState('user_email');
    // partnerRef = APP.state.get('partnerRef');
    // [paybisUrl, setPaybisUrl] = useState(null);
    const paybis_mobile_url = useSelector((state: RootStateOrAny) => state.mainReducer.paybis_info_popup?.paybis_mobile_url);
    const isWeb5 = localStorage.getItem("wallet") === 'web5';
    const topupCloseBtn = useSelector((state: RootStateOrAny) => state.mainReducer.topup_close_btn);
    const polygon_details = useSelector((state: RootStateOrAny) => state.mainReducer.polygon_details);
    const isDemo = APP.state.get('currentToken') === 'demo';
    const wallet_btn_txt = (isDemo ? 'game_wallet_btn_p2p_demo' : 'game_wallet_btn_p2p');
    // const wallet_header_txt = isDemo ? 'game_wallet_header_p2p_demo' : 'game_wallet_header_p2p';
    const wallet_sell_txt = isDemo ? 'game_wallet_sell_matic_demo' : 'game_wallet_sell_matic';

    const closeDeswapWidget = () => {
        dispatch(set_topup_close_btn(false));
        removeDebridgeWidgetScript();
    };

    // bridge url format
    // function getIframeURL(walletAddress: string): string {
    //     return "https://bridge.margin-tech.com/pay.php?checkout_id=custom-1&currency=matic&iframe=1&default-price=30&dark=1&address=" + walletAddress;
    // }

    // open paybis popup
    // function openPaybis(dispatch: React.Dispatch<any>) {
    //     APP.state.set('topup_opened_type', 'paybis');
    //     dispatch(set_topup_wallet_popup(true));
    // }

    // open popup (private key) + sent email
    async function sendEmail(email: string) {
        dispatch(set_private_key_popup(true));
        try {
            const otpObj = APP.magic.auth.loginWithEmailOTP({ email: email, showUI: false, deviceCheckUI: false });
            APP.state.set('otpObj', otpObj);
        } catch (err) {
            console.log(err, 'err');
        }
    }

    // paybis widget url - load into iframe
    // async function getPaybisUrl(wallet_address: string, dispatch: React.Dispatch<any>, type: string, partnerRef: string) {
    //     if (!wallet_address) return;
    //     dispatch(set_loader(true))

    //     // getting wallet address where money for swap should be sent to
    //     let res = await swapAPI.getSwapUrl(wallet_address, partnerRef, 'MATIC');

    //     if (!res.data) return;

    //     let keys = Object.keys(res.data).filter((key: any) => !isNaN(key)).sort((a: any, b: any) => a - b),
    //         swapAddress = keys.map((key: any) => res.data[key]).join('');

    //     setTimeout(() => {
    //         dispatch(set_loader(false))
    //     }, 5000);

    //     let buyUrl = `${APP.state.get('paybisUrl')}/?partnerId=${state.paybisPartnerId}&cryptoAddress=${swapAddress}&currencyCodeFrom=USD&currencyCodeTo=${APP.state.get('paybisBuyCryptoToken')}&amountFrom=${APP.state.get('paybisDefaultAmount')}`,
    //         sellUrl = `${APP.state.get('paybisUrl')}/?partnerId=${state.paybisPartnerId}&cryptoAddress=${swapAddress}&currencyCodeFrom=${APP.state.get('paybisSellCryptoToken')}&currencyCodeTo=USD&amountFrom=${APP.state.get('paybisDefaultAmount')}&transactionFlow=sellCrypto`,
    //         url = (type === 'buy') ? buyUrl : sellUrl;

    //     setPaybisUrl(url)
    // }

    // iframe of Transfi - buy matic using bank transfer
    // function buyMatic(wallet_address: string, dispatch: React.Dispatch<any>) {
    //     if (!wallet_address) return;
    //     dispatch(set_loader(true))

    //     setTimeout(() => {
    //         dispatch(set_loader(false))
    //     }, 5000);

    //     let view: string;

    //     if (state.transfiView == 'buy') {
    //         view = '&view=buy';
    //     } else if (state.transfiView == 'sell') {
    //         view = '&view=sell';
    //     } else if (state.transfiView == 'buy_sell') {
    //         view = '';
    //     }

    //     let url = `${state.transfiUrl}/?apiKey=${state.transfiApiKey}&cryptoTicker=${state.transfiCryptoTicker}&cryptoNetwork=${state.transfiCryptoNetwork}&walletAddress=${wallet_address}${view}`;
    //     dispatch(set_iframe_popup({ src: url, type: 'bank_transfer' }))
    // }

    // ensure from the correct iframe url + get msg if was triggered for closing

    const currentPoolDetails = useSelector((state: RootStateOrAny) => state.mainRememberReducer?.currentPool);
    const route = currentPoolDetails?.route;

    const handleIframeMessage = (event: MessageEvent) => {
        if (event.origin?.includes('paybis')) {
            if (JSON.parse(event.data)?.payload?.state === 'closed' || JSON.parse(event.data)?.payload?.state.includes('bp')) {
                dispatch(set_paybis_info_popup({ is_active: false, paybis_mobile_url: '' }))
            }
            else if (JSON.parse(event.data)?.payload?.state === 'loaded') {
                window.history.pushState({}, "", route);
            }
        }
    };

    // open changelly into iframe
    // function changellyExchange(wallet_address: string, dispatch: React.Dispatch<any>) {

    //     if (!wallet_address) return;
    //     dispatch(set_loader(true))

    //     setTimeout(() => {
    //         dispatch(set_loader(false))
    //     }, 5000);

    //     let url = `${state.changelly_url}?from=${state.changelly_from}&to=${state.changelly_to}&amount=${state.changelly_amount}&address=${wallet_address}&fromDefault=${state.changelly_from_default}&toDefault=${state.changelly_to_default}&merchant_id=${state.changelly_to_merchant_id}&payment_id=&v=3`;
    //     dispatch(set_iframe_popup({ src: url }))
    // }

    //deswap mobile/web detect functionality
    // const deSwapByDevice = (APP: any, dispatch: React.Dispatch<any>) => {
    //     const mobile = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    //     if (mobile) deSwapMobile(APP, dispatch);
    //     else deSwap(APP, dispatch);
    // };

    useEffect(() => {
        window.addEventListener('message', handleIframeMessage);

        return () => {
            window.removeEventListener('message', handleIframeMessage);
            dispatch(set_paybis_info_popup({ is_active: false, paybis_mobile_url: '' }))
        };
    }, []);

    return (
        <div className="tt_content_mobile">

            {/* deswap close btn logic + container */}
            <div id="deswap" />
            <div id="deswap_none" />

            {topupCloseBtn &&
                (<div onClick={closeDeswapWidget} className="global_iframe_back" data-attr={topupCloseBtn}>
                    <p><span>{APP.term('iframe_back')}</span></p>
                </div>)}

            <div className="content">
                <div className="inner_content">

                    {/* wallet + mail */}
                    <WalletMail wallet_address={wallet_address} user_email={user_email} dispatch={dispatch} />

                    {/* balance */}
                    <Balance dispatch={dispatch} maticBalance={polygon_details?.matic_balance.slice(0, 5)} is_polygon={false} />

                    {/* matic balance */}
                    {(parseFloat(polygon_details?.matic_balance) > 1) && isWeb5 ?
                        <Balance dispatch={dispatch} maticBalance={polygon_details?.matic_balance.slice(0, 5)} is_polygon={true} />
                        : null}


                    {/* paybis */}
                    {!isDemo &&
                        // <div className="topup_crypto_btn" onClick={() => getPaybisUrl(wallet_address, dispatch, 'buy', partnerRef)}>
                        <div className="topup_crypto_btn" onClick={() => dispatch(set_paybis_info_popup({ is_active: true }))}>
                            <p><span>{APP.term('game_wallet_paybis')}</span></p>
                            <div className="right">
                                <img src='/media/images/topup/cash/visa.png' className="visa" />
                                <img src='/media/images/topup/cash/visaSymbol.png' className="visa_symbol" />
                                <i className="fa fa-chevron-right" aria-hidden="true" />
                            </div>
                        </div>
                    }

                    {/* swap bridge */}
                    {!isDemo &&
                        (
                            <div className="topup_crypto_btn" onClick={() => dispatch(set_bridge_popup(true))}>
                                <p><span>{APP.term('topup_crypto_btn')}</span></p>
                                <div className="right">
                                    <img src='/media/images/topup/currencies/btc.png' className="btc" />
                                    <img src='/media/images/topup/currencies/eth.png' className="eth" />
                                    <img src='/media/images/topup/currencies/usdt.png' className="usdt" />
                                    <img src='/media/images/topup/currencies/bnb.png' className="bnb" />
                                    <img src='/media/images/topup/currencies/sol.png' className="sol" />
                                    <i className="fa fa-chevron-right" aria-hidden="true" />
                                </div>
                            </div>)
                    }

                    {/* transfi */}
                    {!isDemo &&
                        (<div /* to='/cash_topup' */ className="topup_cash_btn" onClick={() => buyCoin(wallet_address, dispatch)}>
                            <p><span>{APP.term('topup_cash_btn')}</span></p>
                            <div className="right">
                                <img src='/media/images/topup/cash/new_bank.png' className="new_bank" />
                                <i className="fa fa-chevron-right" aria-hidden="true" />
                            </div>
                        </div>)
                    }


                    {/* p2p */}
                    {state.p2p_labels.includes(window.location.hostname) && !isDemo && (
                        <div className="p2p_box" onClick={() => dispatch(set_p2p_popup(true))}>
                            {/* <p className="p2p_title">{APP.term(wallet_header_txt)}</p> */}
                            <p><span>{APP.term(wallet_btn_txt)}</span></p>
                            <div className="right">
                                <div className="countries">
                                    {/* <img src={`/media/images/flags/ru.svg`} className='ru' /> */}
                                </div>
                                <i className="fa fa-chevron-right" aria-hidden="true" />
                            </div>
                        </div>
                    )}


                    {/* pix btn */}
                    {['prod-latest.playblock.io','batalharoyale.io', 'localhost'].includes(window.location.hostname) && !isDemo && (
                        <div className="pix_btn" onClick={() => dispatch(set_pix_popup(true))}>
                        <p><span>{APP.term('cash_topup_pix')}</span></p>
                        <div className="right">
                            <div className="countries">
                                <img src={`/media/images/flags/br.svg`} className='br' />
                            </div>
                            <i className="fa fa-chevron-right" aria-hidden="true"></i>
                        </div>
                    </div>)}

                    {/* efipay btn */}
                    {['localhost','4ex.io','prod-latest.playblock.io'].includes(window.location.hostname) && !isDemo && (
                        <div className="efi_pay_btn" onClick={() => dispatch(set_efi_pay_popup(true))}>
                            <p><span>{APP.term('cash_topup_efi_pay')}</span></p>
                            <div className="right">
                                <div className="countries">
                                    <img src={`/media/images/flags/india.svg`} className='india' /> {/* Replace with appropriate flag */}
                                </div>
                                <i className="fa fa-chevron-right" aria-hidden="true"></i>
                            </div>
                        </div>
                    )}

                    {/* {!isDemo && (<div className="topup_crypto_btn" onClick={() => getPaybisUrl(wallet_address, dispatch, 'sell')}> */}
                    {!isDemo && (<div className="topup_crypto_btn" onClick={() => dispatch(set_rev_bridge_popup(true))}>
                        <p><span>{APP.term(wallet_sell_txt)}</span></p>
                        <div className="right">
                            <img src='/media/images/topup/currencies/usdt.png' className="usdt" />
                            <i className="fa fa-chevron-right" aria-hidden="true" />
                        </div>
                    </div>)}

                    {/* transfi */}
                    {/* <div className="bank_transfer_btn" onClick={() => buyMatic(wallet_address, dispatch)}>
                        <p>{APP.term('game_wallet_transfi')}</p>
                    </div> */}

                    {/* deswap */}
                    {/* <div className="changelly_btn" onClick={() => changellyExchange(wallet_address, dispatch)}>
                        <p>{APP.term('game_wallet_deswap')}</p>
                    </div> */}

                    {/* iframe (external btns) */}
                    {/* <iframe
                        src={getIframeURL(wallet_address)}
                        frameBorder="0"
                        className="web5_iframe"
                        allow="clipboard-read; clipboard-write" /> */}

                    {/* private key */}
                    {user_email && isWeb5 && (
                        <div className="private_key_btn" onClick={() => sendEmail(user_email)}>
                            <p><span>{APP.term('game_wallet_private_key')}</span></p>
                        </div>
                    )}

                    {/* sell matic */}
                    {/* <a className="sell_btn" onClick={() => getPaybisUrl(wallet_address, dispatch, 'sell')}>
                        <p>{APP.term(wallet_sell_txt)}</p>
                    </a> */}

                </div>

            </div>
            <div className="bottom_providers">
                {payments.map((itm, idx) => (
                    <img key={idx} src={`/media/images/topup/payments/${itm}.png`} className={itm} />
                ))}
            </div>
        </div>
    )
}

export default React.memo(Mobile);