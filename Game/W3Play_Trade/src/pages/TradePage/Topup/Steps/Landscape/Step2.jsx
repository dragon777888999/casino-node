import Web3 from "web3";
import { ethers } from 'ethers';
import React, { useState, useRef } from 'react';
import APP from '../../../../../app';
import useAppState from '../../../../../hooks/useAppState';
import { EtherValue, EtherValueString } from '../../../../../utils/web3'
import state from '../../../../../state';
import { useDispatch, useSelector } from 'react-redux';
import { estimateGasFee } from '../../../../../utils/game/utilities/utils';
import { set_alert_msg, set_loader, set_polygon_details } from '../../../../../REDUX/actions/main.actions';
import { copyTextToClipboard } from '../../../../../utils/clipboard';
import RPC from '../../../../../utils/rpc';
import tokenInfo from '../../../../../API/contracts/USD.json';
import Symbol from "../../../../../comp/shape/playblock_symbol";
import num from "../../../../../utils/numberFormat";

function formatBalance(balance) {
    if (state.active_network !== 'testnet') return parseFloat(balance).toFixed(2);
    if (balance > 999) return parseFloat(balance).toFixed(2);
    if (balance > 99) return parseFloat(balance).toFixed(4);
    return balance;
}

const Step2 = ({ send, closePopup }) => {

    const dispatch = useDispatch();
    const polygon_details = useSelector(state => state.mainReducer.polygon_details);
    const email = localStorage.getItem("email");
    const walletAdress = useAppState("wallet_address")
    const customer_balance = useAppState('customer.balance') || APP.customer.balance;
    let ether_val_customer_balance = EtherValueString({ wei: customer_balance });
    const balance = formatBalance(ether_val_customer_balance)
    const [loading, setLoading] = useState("");

    let web3AuthObj = useSelector(state => state.mainRememberReducer.social_web3_obj?.obj);

    const playBlockTransaction = async () => {

        const to = inputRefto.current.value;
        const amount = inputRefAmount.current.value;
        setLoading("disabled");
        inputRefAmount.current.value = amount;
        inputRefto.current.value = to;

        const gasFeeEstimation = await estimateGasFee();

        if (amount > 0 && to != '') {
            closePopup()
            dispatch(set_loader(true))

            try {
                let signer,
                    provider,
                    response,
                    nonce;

                //Social wallet connect
                if (typeof (APP.state.get('web5signer')) !== 'undefined') {
                    provider = APP.state.get('web5signer').provider;
                    signer = APP.state.get('web5signer');
                    nonce = await provider.getTransactionCount(signer.getAddress());
                }

                //Other wallets like Metamask/Coinbase etc.
                else if (typeof window.ethereum !== 'undefined') {
                    provider = new ethers.BrowserProvider(window.ethereum);
                    signer = await provider.getSigner();
                    nonce = await provider.getTransactionCount(signer.getAddress());
                }

                else {
                    // Handle case where Ethereum provider is not available
                    console.error('Ethereum provider not available');
                }

                const realToken = state.plbToken;
                const demoToken = state.plbToken_demo;
                const isDemo = APP.state.get('currentToken') === 'demo';

                const currentToken = isDemo ? demoToken : realToken;

                const tokenContract = new ethers.Contract(currentToken.address, tokenInfo.abi, signer),
                    valueInWei = amount * 10 ** currentToken.decimals;

                if (parseFloat(EtherValue({ wei: APP.customer.balance })) < parseFloat(amount)) {
                    dispatch(set_loader(false));
                    const low_bln_alert = isDemo ? 'alert_msg_error_low_balance_demo' : 'alert_msg_error_low_balance';
                    dispatch(set_alert_msg({ type: 'error', content: low_bln_alert }));
                    return;
                    // closePopup();
                }

                response = await tokenContract.transfer(to, valueInWei, { nonce: nonce });

                if (response) {
                    dispatch(set_loader(false))
                    const succes_alert = isDemo ? 'alert_msg_success_sent_matic_demo' : 'alert_msg_success_sent_matic';
                    dispatch(set_alert_msg({ type: 'success', content: amount + ' ' + APP.term(succes_alert) + ' ' + to.slice(0, 8) + '...' + to.slice(-8) }))
                    APP.customer.update_balance();
                    closePopup()
                }
                else {
                    dispatch(set_alert_msg({ type: 'error', content: "alert_msg_error_matic_transfer" }))
                    dispatch(set_loader(false));
                    // closePopup()
                }
            }

            catch (e) {
                dispatch(set_loader(false))
                dispatch(set_alert_msg({ type: 'error', content: "alert_msg_error_transfer_fields" }))
                console.log(e, 'error amount transfer');
            }

        }
        else if (!amount || typeof amount !== 'number') {
            dispatch(set_loader(false))
            dispatch(set_alert_msg({ type: 'error', content: "alert_msg_error_amount_transfer" }))
            // closePopup()
        }
        else if (!to) {
            dispatch(set_loader(false))
            dispatch(set_alert_msg({ type: 'error', content: "alert_msg_error_address_transfer" }))
            // closePopup()
        }
        else {
            dispatch(set_loader(false))
            dispatch(set_alert_msg({ type: 'error', content: "alert_msg_error_transfer_fields" }))
        }
        setLoading("");

    };

    function transactionHandler() {
        if (polygon_details?.matic_transaction === 'polygon') maticTransaction(polygon_details?.provider);
        else playBlockTransaction();
    }


    const maticTransaction = async (provider) => {

        const to = inputRefto.current.value;
        const amount = inputRefAmount.current.value;

        if (!provider) {
            console.log("provider not initialized yet");
            return;
        }

        if (Number(polygon_details.matic_balance) <= Number(amount)) {
            dispatch(set_loader(false))
            dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_low_balance_matic' }))
            return;
        }

        const rpc = new RPC(provider);

        dispatch(set_loader(true))
        try {
            const receipt = await rpc.sendTransaction(to, amount);

            if (receipt) {
                dispatch(set_loader(false));

                if (receipt?.transactionHash) {
                    dispatch(set_alert_msg({ type: 'success', content: amount + ' ' + APP.term('alert_msg_success_sent_prev_matic') + ' ' + to.slice(0, 8) + '...' + to.slice(-8) }));
                    closePopup();

                    // cleanup transaction using polygon
                    dispatch(set_polygon_details({ update_balance: true, matic_transaction: false }))

                }

                else if (JSON.parse(receipt)?.data?.message?.toLowerCase().includes('insufficient funds')) {
                    dispatch(set_alert_msg({ type: 'error', content: "alert_msg_error_matic_gas_fee" }))
                    return;
                }
            }
        }
        catch (e) {
            dispatch(set_loader(false))
            dispatch(set_alert_msg({ type: 'error', content: "alert_msg_error_transfer_fields" }))
            console.log(e, 'e')
        }
    };



    const inputRefAmount = useRef();
    const [_amount, setAmount] = useState(null)
    const inputRefto = useRef();
    const [_walletAddress, setWalletAddress] = useState(null)
    const isDemo = APP.state.get('currentToken') === 'demo';
    const bln_header_txt = (polygon_details?.matic_transaction === 'polygon') ? 'topup_balance_header_matic' : (isDemo ? 'topup_balance_header_demo' : 'topup_balance_header');
    const address_placeholder_txt = (polygon_details?.matic_transaction === 'polygon') ? 'topup_step2_address_placeholder_matic' : (isDemo ? 'topup_step2_address_placeholder_demo' : 'topup_step2_address_placeholder');
    const erc20_desc_txt = (polygon_details?.matic_transaction === 'polygon') ? 'topup_step2_erc20_matic' : (isDemo ? 'topup_step2_erc20_demo' : 'topup_step2_erc20');
    const amt_desc_txt = (polygon_details?.matic_transaction === 'polygon') ? "topup_step2_matic_amt_matic" : (isDemo ? 'topup_step2_matic_amt_demo' : 'topup_step2_matic_amt');
    const transfer_txt = (polygon_details?.matic_transaction === 'polygon') ? 'topup_step2_transfer_matic' : (isDemo ? 'topup_step2_transfer_demo' : 'topup_step2_transfer');
    const is_polygon = (polygon_details?.matic_transaction === 'polygon') ? true : false;

    //abbreviation for wallet address
    function cutWallet(wallet) {
        return wallet.substring(0, 10) + '...' + wallet.substring(wallet.length, wallet.length - 10)
    }

    // copy wallet address + show alert msg for success + close topup
    function copyWalletAddress() {
        // dispatch(set_topup_wallet_popup(false))
        copyTextToClipboard(walletAdress, dispatch, APP.term('alert_succes_wallet_copied'))
    }

    const handleTouchStart = (event) => {
        event.preventDefault();
    };

    return (

        <div className="topup_step2_wrap">

            <div className="header">
                <p className="title"><span>{APP.term(transfer_txt)}</span></p>
            </div>

            <div className="balance_header">
                <p><span>{APP.term(bln_header_txt)}</span></p>
                <div className="balance">
                    <div>
                        <p><span>{(polygon_details?.matic_transaction === 'polygon') ? polygon_details?.matic_balance.toString().slice(0, 5) : parseFloat(balance).toFixed(2)}</span></p>
                    </div>
                </div>
            </div>

            <div className="content">

                <p><span>{APP.term(amt_desc_txt)}</span></p>
                <div className="usdp_input">
                    <input ref={inputRefAmount}
                        onChange={e => setAmount(e.target.value)}
                        onTouchStart={handleTouchStart}
                        style={{ touchAction: 'manipulation' }}
                        placeholder='0.00' />
                        
                    <div className={`symbol${is_polygon ? ' polygon' : ''}`}>
                        {is_polygon ? <div src='/media/images/polygon.png' /> :  <Symbol />}
                    </div>
                    {/* <img src='/media/images/polygon.png' /> */}
                </div>

                <img className="down" src='/media/images/topup/down.png' />

                <p><span>{APP.term(erc20_desc_txt)}</span></p>
                <div className="erc20">
                    <input ref={inputRefto}
                        onTouchStart={handleTouchStart}
                        onChange={e => setWalletAddress(e.target.value)}
                        style={{ touchAction: 'manipulation' }}
                        placeholder={APP.term(address_placeholder_txt)} />
                </div>

            </div>

            <div className="bottom">
                {loading == "disabled"
                    ? <div className="send"><p><span>{APP.term('topup_step2_sending')}</span></p></div>
                    : <div className="send" onClick={() => transactionHandler(polygon_details)}
                        style={{ opacity: (!_amount?.length || !_walletAddress?.length) ? .5 : 1 }}>
                        <p><span>{APP.term('topup_step2_send')}</span></p>
                    </div>
                }

                <div className="bottom_desc">
                    {email && (<p className="email">{APP.term('topup_step2_wallet_id')} <span>{email}</span></p>)}
                    <div className="wallet_address">
                        {(<p className="wallet">{APP.term('topup_step2_wallet_address')} <span>{cutWallet(walletAdress)}</span></p>)}
                        <div className="copy_btn" onClick={() => copyWalletAddress()}>
                            <img src='/media/images/copy.png' />
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );

};

export default Step2;