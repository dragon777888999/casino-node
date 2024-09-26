import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import APP from '../../../app';
import useAppState from '../../../hooks/useAppState';
import { set_iframe_popup, set_loader, set_p2p_popup } from '../../../REDUX/actions/main.actions';
import state from '../../../state';
import { buyCoin } from '../../../utils/transactionHelpers';

const payments = ['googlePay', 'visa', 'skrill', 'applePay', 'mastercard', 'pix', 'sepa', 'paypal', 'moneybookers', 'neteller'],
    p2p_countries = ['jp', 'ru', 'ro', 'ukraine', 'kz', 'uz', 'az', 'kg', 'ke', 'bd', 'india'];

const CashWeb: React.FC = () => {

    const wallet_address = APP.state.get('wallet_address'),
        dispatch = useDispatch();

    // paybis widget url - load into iframe
    function getPaybisUrl(wallet_address: string, dispatch: React.Dispatch<any>, type: string) {
        if (!wallet_address) return;

        dispatch(set_loader(true))

        setTimeout(() => {
            dispatch(set_loader(false))
        }, 5000);

        let buyUrl = `${APP.state.get('paybisUrl')}/?partnerId=${state.paybisPartnerId}&cryptoAddress=${wallet_address}&currencyCodeFrom=USD&currencyCodeTo=${APP.state.get('paybisBuyCryptoToken')}&amountFrom=${APP.state.get('paybisDefaultAmount')}`,
            sellUrl = `${APP.state.get('paybisUrl')}/?partnerId=${state.paybisPartnerId}&cryptoAddress=${wallet_address}&currencyCodeFrom=${APP.state.get('paybisSellCryptoToken')}&currencyCodeTo=USD&amountFrom=${APP.state.get('paybisDefaultAmount')}&transactionFlow=sellCrypto`,
            url = (type === 'buy') ? buyUrl : sellUrl;

        dispatch(set_iframe_popup({ src: url, type: 'paybis' }))
    }

    // ensure from the correct iframe url + get msg if was triggered for closing
    
    const currentPoolDetails = useSelector((state :RootStateOrAny) => state.mainRememberReducer?.currentPool);
    const route = currentPoolDetails?.route;
    const handleIframeMessage = (event: MessageEvent) => {
        if (event.origin === APP.state.get('paybisUrl')) {
            if (JSON.parse(event.data)?.payload?.state === 'closed') {
                dispatch(set_iframe_popup(false))
            }
            else if (JSON.parse(event.data)?.payload?.state === 'loaded') {
                window.history.pushState({}, "", route);
            }
        }
    };

    useEffect(() => {
        window.addEventListener('message', handleIframeMessage);

        return () => {
            window.removeEventListener('message', handleIframeMessage);
        };
    }, []);

    return (
        <div className="tt_content cash_content">

            <p className="cash_title">{APP.term('cash_title')}</p>

            <div className="cash_options">

                {/* credit/debit card */}
                <div className="credit_btn" onClick={() => getPaybisUrl(wallet_address, dispatch, 'buy')}>
                    <p>{APP.term('cash_topup_credit')}</p>
                    <div className="right">
                        <img src='/media/images/topup/cash/visa.png' className="visa" />
                        <img src='/media/images/topup/cash/visaSymbol.png' className="visa_symbol" />
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div>

                {/* paypal */}
                <div className="paypal_btn" onClick={() => getPaybisUrl(wallet_address, dispatch, 'buy')}>
                    <p>{APP.term('cash_topup_paypal')}</p>
                    <div className="right">
                        <img src='/media/images/topup/cash/paypal.png' className="paypal" />
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div>

                {/* p2p */}
                {/* <div className="p2p_btn" onClick={() => dispatch(set_p2p_popup(true))}>
                    <p>{APP.term('cash_topup_p2p')}</p>
                    <div className="right">
                        <div className="countries">
                            {p2p_countries.map(itm => (
                                <img key={itm} src={`/media/images/flags/${itm}.svg`} />
                            ))}
                        </div>
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div> */}

                {/* pix */}
                <div className="pix_btn" onClick={() => buyCoin(wallet_address, dispatch)}>
                    <p>{APP.term('cash_topup_pix')}</p>
                    <div className="right">
                        <div className="countries">
                            <img src={`/media/images/flags/br.svg`} />
                        </div>
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div>

                {/* mobile money */}
                <div className="mobile_money_btn" onClick={() => buyCoin(wallet_address, dispatch)}>
                    <p>{APP.term('cash_topup_mobile_money')}</p>
                    <div className="right">
                        <div className="countries">
                            <img src={`/media/images/flags/th.svg`} />
                            <img src={`/media/images/flags/za.svg`} />
                        </div>
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div>

                {/* bank_transfer_btn */}
                <div className="bank_transfer_btn" onClick={() => buyCoin(wallet_address, dispatch)}>
                    <p>{APP.term('cash_topup_bank_transfer')}</p>
                    <div className="right">
                        <img src='/media/images/topup/cash/bank.png' className="bank_transfer" />
                        <i className="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
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

export default CashWeb;