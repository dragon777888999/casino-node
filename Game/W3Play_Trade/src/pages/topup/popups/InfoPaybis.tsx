import React from 'react';
import { useDispatch } from 'react-redux';
import swapAPI from '../../../API/swap';
import APP from '../../../app';
import { set_iframe_popup, set_loader, set_paybis_info_popup } from '../../../REDUX/actions/main.actions';
import state from '../../../state';
import '../../../styles/topup.scss';

const InfoPaybis = () => {

    const dispatch = useDispatch();

    async function getPaybisUrl(wallet_address: string, dispatch: React.Dispatch<any>, type: string, partnerRef: string) {
        if (!wallet_address) return;
        dispatch(set_loader(true))
        dispatch(set_paybis_info_popup({ is_active: false }))

        // getting wallet address where money for swap should be sent to
        let res = await swapAPI.getSwapUrl(wallet_address, partnerRef, 'USDT-TRC20');

        if (!res.data) return;

        let keys = Object.keys(res.data).filter((key: any) => !isNaN(key)).sort((a: any, b: any) => a - b),
            swapAddress = keys.map((key: any) => res.data[key]).join('');

        setTimeout(() => {
            dispatch(set_loader(false))
        }, 5000);

        let buyUrl = `${APP.state.get('paybisUrl')}/?partnerId=${state.paybisPartnerId}&cryptoAddress=${swapAddress}&currencyCodeFrom=USD&currencyCodeTo=${APP.state.get('paybisBuyCryptoToken')}&amountFrom=${APP.state.get('paybisDefaultAmount')}`,
            sellUrl = `${APP.state.get('paybisUrl')}/?partnerId=${state.paybisPartnerId}&cryptoAddress=${swapAddress}&currencyCodeFrom=${APP.state.get('paybisSellCryptoToken')}&currencyCodeTo=USD&amountFrom=${APP.state.get('paybisDefaultAmount')}&transactionFlow=sellCrypto`,
            url = (type === 'buy') ? buyUrl : sellUrl;

        if (window.innerWidth <= 480) {
            dispatch(set_paybis_info_popup({ paybis_mobile_url: url }));
        }
        else {
            return dispatch(set_iframe_popup({ src: url, type: 'paybis' }))
        }
    }

    // close popup on bg click
    function handleBackgroundClick(event: any) {
        if (event.target.className === "info_paybis_popup_wrap") {
            dispatch(set_paybis_info_popup({ is_active: false }))
        }
    }

    return (
        <div className="info_paybis_popup_wrap" onClick={handleBackgroundClick}>
            <div className="info_paybis_popup">
                <p className="info_title"><span>{APP.term('info_paybis_title')}</span></p>
                <p className="info_desc"><span>{APP.term('info_paybis_desc')}</span></p>
                <div className="submit_btn" onClick={() => getPaybisUrl(APP.state.get('wallet_address'), dispatch, 'buy', APP.state.get('partnerRef'))}>
                    <p><span>{APP.term('info_paybis_submit')}</span></p>
                </div>
            </div>
        </div>
    )
}

export default InfoPaybis;