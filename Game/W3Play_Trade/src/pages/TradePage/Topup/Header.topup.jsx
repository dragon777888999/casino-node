import React from 'react';
import { useDispatch } from 'react-redux';
import APP from '../../../app';
import useAppState from '../../../hooks/useAppState';
import { copyTextToClipboard } from '../../../utils/clipboard';

const Header = ({ balance, skipToStep2 }) => {

    const dispatch = useDispatch(),
        user_email = APP.state.get('user_email'),
        isDemo = APP.state.get('currentToken') === 'demo',
        topup_bln_txt = isDemo ? 'topup_balance_header_demo' : 'topup_balance_header',
        walletAdress = useAppState("wallet_address");

    //abbreviation for wallet address
    function cutString(wallet, amtToCut) {
        return wallet.substring(0, amtToCut) + '...' + wallet.substring(wallet.length, wallet.length - 7);
    }

    // copy wallet address + show alert msg for success + close topup
    function copyWalletAddress() {
        // dispatch(set_topup_wallet_popup(false))
        copyTextToClipboard(walletAdress, dispatch, APP.term('alert_succes_wallet_copied'))
    }

    // cut email if too long
    function curLongMail(mail) {
        return mail.length > 30 ? mail.substring(0, 15) + '...' + mail.substring(mail.length, mail.length - 12) : mail;
    }

    return (
        <div className="content_header">

            <div className="header">{APP.term('topup_header_title')}</div>

            <div className="balance_header">
                <p className="desc">{APP.term(topup_bln_txt)}</p>
                <div className="balance">
                    <div>
                        <p>{walletAdress && balance ? balance : '0.00'}</p>
                    </div>
                </div>
                <div className="balance_transfer_btn" onClick={skipToStep2}>
                    <p>{APP.term('topup_transfer_header')}</p>
                </div>
            </div>

            <div className="wallet_header">
                <p className="desc">{APP.term('topup_step1_wallet_address')}</p>
                <div className="balance">
                    <div>
                        <p>{walletAdress && (cutString(walletAdress, 8))}</p>
                    </div>
                </div>
                <div className="copy_btn" onClick={() => copyWalletAddress()}>
                    <img src='/media/images/copy.png' />
                </div>
            </div>

            {user_email &&
                (<div className="wallet_header">
                    <p className="desc">{APP.term('topup_step1_email')}</p>
                    <div className="balance">
                        <div>
                            <p>{curLongMail(user_email)}</p>
                        </div>
                    </div>
                </div>)}

            {/* <div className="balance_credit_card">
                {state.p2p_labels.includes(window.location.hostname) &&
                    (<div className="p2p_pay" onClick={openP2P}>
                        <p>{APP.term('topup_p2p')}</p>
                    </div>)}
            </div> */}

        </div>
    )
}

export default Header;