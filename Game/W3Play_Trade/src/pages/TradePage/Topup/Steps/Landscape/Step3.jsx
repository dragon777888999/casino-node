import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import APP from '../../../../../app';
import useAppState from '../../../../../hooks/useAppState';
import { copyTextToClipboard } from '../../../../../utils/clipboard';

const Step3 = ({ goBackMain, goForward }) => {

    const walletAddress = useAppState("wallet_address"),
        email = localStorage.getItem("email"),
        [valid, setValid] = useState(false),
        [alert, setAlert] = useState(false),
        credit_url = 'https://onramp.paybis.com/?partnerId=c539227d-8ddd-41f8-9f87-52d049d6ef50#/v2/exchange-form',
        dispatch = useDispatch(),

        isDemo = APP.state.get('currentToken') === 'demo',
        buy_txt = isDemo ? 'topup_step3_buy_demo' : 'topup_step3_buy',
        buy1_txt = isDemo ? 'topup_step3_buy_matic_1_demo' : 'topup_step3_buy_matic_1',
        header_txt = isDemo ? 'topup_step3_header_demo' : 'topup_step3_header';

    // abbreviation for wallet address
    function cutWallet(wallet) {
        return wallet.substring(0, 13) + '...' + wallet.substring(wallet.length, wallet.length - 13)
    }

    // copy wallet address + show alert msg for success + close topup
    function copyWalletAddress() {
        // dispatch(set_topup_wallet_popup(false))
        copyTextToClipboard(walletAddress, dispatch, APP.term('alert_succes_wallet_copied'))
        setValid(true);
    }

    // check if wallet was copied
    function copyWallet(valid) {
        if (!valid) {
            setAlert(true)
        }
    }

    return (
        <div className="topup_step3_wrap">

            <div className="header_wrap">
                {/* <div className="backbtn" onClick={goBackMain} /> */}
                <p className="header">{APP.term(header_txt)}</p>
                <p className="subheader">{APP.term('topup_step3_subheader')}</p>
            </div>

            <div className="content">
                <p className="header">{APP.term('topup_step3_wallet_address')}</p>
                <p className="wallet_address">{cutWallet(walletAddress)}</p>
                <div className="copy_btn" onClick={() => copyWalletAddress()}>
                    <p>{APP.term('topup_step3_copy')}</p>
                    <img src='/media/images/gold_copy.png' />
                </div>
            </div>

            <div className="tutorial">
                <p>{APP.term(buy1_txt)} <span onClick={goForward}>{APP.term('topup_step3_buy_matic_2')}</span></p>
            </div>

            <div className="bottom">
                <img src='/media/images/paybis.png' className="paybis" />
                <p className="exchange">{APP.term('topup_step3_paybis_desc')}</p>
                <p className="copy_alert">{alert && !valid ? APP.term('topup_step3_alert') : ''}</p>
                <div className={"buy_btn " + (valid ? 'active' : '')} onClick={() => copyWallet(valid)}>
                    <a href={credit_url} target='_blank' style={{ pointerEvents: !valid ? 'none' : '' }}>
                        <p>{APP.term(buy_txt)}</p>
                    </a>
                </div>
                <p className="web3_wallet_id">{APP.term('topup_step3_wallet_id')} <span>{email}</span></p>
                <img className="web3auth" src='/media/images/social_icons/web3auth.svg' />
            </div>

        </div>
    )
}

export default Step3;