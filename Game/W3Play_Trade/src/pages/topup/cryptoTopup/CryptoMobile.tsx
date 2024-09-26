import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import APP from '../../../app';
import useAppState from '../../../hooks/useAppState';
import { set_iframe_popup } from '../../../REDUX/actions/main.actions';
import state from '../../../state';

const payments = ['googlePay', 'visa', 'skrill', 'applePay', 'mastercard', 'pix', 'sepa', 'paypal', 'moneybookers', 'neteller'];

const CryptoMobile = () => {

    const dispatch = useDispatch(),
        currentPoolDetails = useSelector((state: RootStateOrAny) => state.mainRememberReducer.currentPool),
        defaultRoute = currentPoolDetails?.route || "/trade",
        wallet_address = useAppState('wallet_address');

    // open iframe popup by btn clicked
    function openIframe(coinSymbol: string, wallet_address: string) {
        let url = `${state.changelly_url}?from=${coinSymbol}&to=${state.changelly_to}&amount=${state.changelly_amount}&address=${wallet_address}&fromDefault=${coinSymbol}&toDefault=${state.changelly_to_default}&merchant_id=${state.changelly_to_merchant_id}&payment_id=&v=3&variant=reg`;

        // load into iframe
        dispatch(set_iframe_popup({ src: url }))
    }

    // ensure from the correct iframe url + get msg if was triggered for closing
    const handleIframeMessage = (event: MessageEvent) => {
        if (event.origin === APP.state.get('paybisUrl')) {
            if (JSON.parse(event.data)?.payload?.state === 'closed') {
                dispatch(set_iframe_popup(false))
            }
            else if (JSON.parse(event.data)?.payload?.state === 'loaded') {
                window.history.pushState({}, "", defaultRoute);
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
        <div className="tt_content_mobile crypto_content_mobile">
            <p className="crypto_title">{APP.term('crypto_title')}</p>

            <div className="currencies_box">
                <div className="list">
                    {state.crypto_topup_list.map((itm, i) => (
                        <div className="currency" key={i} onClick={() => openIframe(itm.val, wallet_address)}>
                            <img className={itm.name}
                                src={`/media/images/topup/currencies/${itm.name}.png`} />

                            <div className="txts">
                                <p>{itm.name}</p>
                                <p>{itm.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="other_currency_btn" onClick={() => openIframe('*', wallet_address)}>
                    <p>{APP.term('crypto_other_currency_btn')}</p>
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

export default React.memo(CryptoMobile);