import React, { useEffect } from 'react';
// import Bottom from '../../Bottom.topup';
import Content from '../../Content.topup';
import Header from '../../Header.topup';
import useAppState from '../../../../../hooks/useAppState';
import { EtherValueString } from '../../../../../utils/web3'
import state from '../../../../../state';
// import { useDispatch } from 'react-redux';
// import { set_topup_wallet_popup } from '../../../../../REDUX/actions/main.actions';
// import { copyTextToClipboard } from '../../../../../utils/clipboard';
import APP from '../../../../../app';

function balanceFormat(balance) {
    if (state.active_network === 'testnet') {
        if (balance > 999) return parseFloat(balance).toFixed(2);
        else if (balance > 99) return parseFloat(balance).toFixed(4);
        else return balance;
    }
    else {
        return parseFloat(balance).toFixed(2);
    }
}

const Step1 = ({ goForward, goToPaybis }) => {

    const email = localStorage.getItem("email");
    const walletAdress = useAppState("wallet_address");
    // const dispatch = useDispatch();
    const customer_balance = useAppState('customer.balance') || APP.customer.balance;
    let ether_val_customer_balance = EtherValueString({ wei: customer_balance });
    const balance = balanceFormat(ether_val_customer_balance)

    useEffect(() => {
        let topup_type = APP.state.get('topup_opened_type');

        if (topup_type === 'paybis') {
            goToPaybis();
        }
        else if (topup_type === 'transfer') {
            goForward();
        }

        return () => {
            APP.state.unset('topup_opened_type')
        }
    }, [])

    return (
        <div className="topup_step1_wrap">
            <Header walletAdress={walletAdress}
                email={email}
                balance={balance}
                skipToStep2={goForward} />

            <Content goToPaybis={goToPaybis} />

        </div>
    )
}

export default Step1;