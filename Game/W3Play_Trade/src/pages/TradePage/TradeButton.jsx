import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import useAppState from '../../hooks/useAppState';
import useGameEvent from '../../hooks/useGameEvent';
import useBet from '../../hooks/useBet';
import AutoTradeDetails from './AutoTradeDetails';
import LongPressTooltip from './LongPressTooltip';
import PhaseMessage from './PhaseMessage';
import { WalletContext } from '../../utils/game';
import { useDispatch, useSelector } from 'react-redux';
import { set_alert_msg, set_connect_wallet_popup, set_topup_wallet_popup } from '../../REDUX/actions/main.actions';
import { ConsoleView } from 'react-device-detect';
import state from '../../state';
import { EtherValue } from '../../utils/web3';
import { EtherValueString } from '../../utils/web3'
import { useNavigate } from 'react-router';
import { parseUnits } from '@ethersproject/units';
import { estimateGasFee } from '../../utils/game/utilities/utils';


// trade buttons logic methods
function noop() { }

// function tryAddInvestment(dir) {
//     var phase = APP.state.get('phase');
//     if (phase == 'open') return; // trade already started

//     var amount = APP.state.get('selected_investment');
//     APP.API.add_investment(
//         amount, dir,
//         () => console.log('made new investment: ', dir, amount),
//         ({ error }) => console.log('new investment error: ', error)
//     )
// }
// function activeAutoTrade() {
//     return APP.state.get('customer.auto_trade.active');
// }
// function autoTradeSelectMode() {
//     return APP.state.get('show_auto_trade_select');
// }

// function closeAutoTradeSelect(e) {
//     APP.state.set('show_auto_trade_select', 'none');
// }
// function openAutoTradeSelect(dir) {
//     APP.state.set('show_auto_trade_select', dir)
// }
// function onShortPress(dir) {
//     if (autoTradeSelectMode() == dir) closeAutoTradeSelect();
//     else tryAddInvestment(dir);
// }
// function onLongPress(dir) {
//     if (activeAutoTrade() == dir) APP.API.cancel_auto_trade();
//     else if (autoTradeSelectMode() == dir) closeAutoTradeSelect();
//     else openAutoTradeSelect(dir);
// }

// // click events setup that can distinguish long & shord clicks

// let heldButtons = { up: false, down: false };
// let didLongPress = { up: false, down: false };
// function tradeMouseUp(dir) {
//     console.log('tradeMouseUp', dir);
//     heldButtons[dir] = false;
//     // if this wasn't a long press try add investment (normal click)
//     if (!didLongPress[dir]) onShortPress(dir);
//     didLongPress[dir] = false;
// }
// function tradeMouseDown(dir) {
//     console.log('tradeMouseDown', dir);
//     heldButtons[dir] = true;
//     setTimeout(() => {
//         // if still held after 1.6sec make a long press event
//         if (heldButtons[dir]) {
//             onLongPress(dir);
//             didLongPress[dir] = true;
//         }
//     }, 1600)
// }

const ErrorBox = React.memo(({ error, onClick }) => {

    function handleErrTerm(err) {
        if (err.toLowerCase() === 'transaction cancelled by the user') return 'err_transaction';
        else if (err.toLowerCase() === 'insufficient funds') return 'err_insff_funds';
        else if (err.toLowerCase().includes("this pool has a round in progress")) return 'err_round_in_progress';
        else return err;
    }

    return (
        <div className="error_box" onClick={onClick}>
            <div className="title">{APP.term('place_bet_error')}</div>
            <div className="content">{APP.term(handleErrTerm(error))}</div>
        </div>
    )
}, ({ prev }, { error }) => prev === error)

function PositionBox({ onClick }) {
    return (
        <div className="position_box" onClick={onClick}>
            <div className="title">{APP.term('position_opened')}</div>
        </div>
    )
}

var locking_bet_phases = ['unsent'/*, 'sent'*/];

// main up/down trade buttons
// have very specific behaviours on short & long press
function TradeButton({ dir, isMobile }) {

    const [showPhaseMes, setPhaseMes] = useState(false);
    const phase = useAppState('phase');

    // const blockBetting = useAppState('blockBetting');
    const { is_open, entry_timestamp, expiry_timestamp } = useAppState('current_round');
    const initialRemainingTime = entry_timestamp ? parseInt(((is_open ? entry_timestamp : expiry_timestamp) - APP.controller.server_now()) / 1000) : 0;

    const bet_id = useAppState('button_bet.' + dir);
    const active_bet = useBet(bet_id);
    const error_event_args = useGameEvent('bet_error');
    const phase_confirmed = useAppState('phase_confirmed');
    const bet_phase = active_bet ? active_bet.phase : 'none';
    const phase_valid = phase == 'open'; //&& phase_confirmed;
    const poolId = useAppState('active_table.pool_id');
    const demo_mode = useSelector(state => state.mainRememberReducer.demo_mode);
    const contract_signed = useAppState('contract_signed_' + dir);
    const bet_failed = useAppState('round_closing_bet_fail');
    const bet_error = useAppState('bet_error');

    const isPlacingBet = locking_bet_phases.includes(bet_phase);

    const { account } = useContext(WalletContext);
    const wallet_address = useAppState('wallet_address');
    const can_place_trade = phase_valid && poolId /*&& account*/ && !isPlacingBet;

    const [errorFresh, setErrorFresh] = useState(false);
    const [error, setError] = useState(false);
    const [positionFresh, setPositionFresh] = useState(false);
    const dispatch = useDispatch();
    const [buttonClassName, setButtonClassName] = useState(['trade_btn' + (isMobile ? '_' + dir : '')]);
    const [validBet, setValidBet] = useState(true);
    const navigate = useNavigate();
    const [isArrowImg, setIsArrowImg] = useState(true);
    const resultDisplayActive = APP.state.get('win_lose_msg_show');
    const [eventFired, setEventFired] = useState(false);

    // Seems like it's not being used
    // if (isPlacingBet) {
    //     class_names.push('sending');
    // }

    function on_valid_click(demo_mode) {
        var bid = APP.state.get('selected_investment');
        // if(!bid) return;
        // placeBet(utils.toWei(bid.toString(), 'ether'), dir === 'up');
        try {
            APP.customer.place_bet(dir, poolId, bid, dispatch, demo_mode);
        }
        catch (e) {
            // alert(JSON.stringify(e))
        }
    }

    useEffect(() => {
        if (!phase_valid && showPhaseMes) {
            let timeout = setTimeout(() => setPhaseMes(false), 3000);
            return () => clearTimeout(timeout);
        }
        else if (showPhaseMes) setPhaseMes(false);
    }, [showPhaseMes, phase_valid]);

    // useEffect(() => {
    //     if (bet_phase == 'hash_recieved') {
    //         console.log(' Hash received!');
    //         setPositionFresh(true);
    //         // dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_success_contract_sign' }))
    //         // let timeout = setTimeout(() => setPositionFresh(false), 3000);
    //         // return () => clearTimeout(timeout);
    //     }
    // }, [bet_phase]);

    // disable signning contract bottom pool msg
    useEffect(() => {
        //console.log('TradeButton::useEffect ', contract_signed, bet_failed, active_bet);
        if ((contract_signed || typeof (contract_signed) == 'undefined') || (bet_failed && active_bet?.direction == dir && active_bet.error)) { //temp fix on error with social trade from ether.js
            //console.log('TradeButton::useEffect');
            if ((dir === active_bet?.direction) && (active_bet?.phase === 'hash_recieved')) {
                //console.log('TradeButton::useEffect set position fresh to false');
                setPositionFresh(false)
                APP.state.unset('contract_signed_' + dir);
            }
        }

        let timeout = setTimeout(() => {
            setPositionFresh(false);

            APP.state.unset('contract_signed_' + dir);
        }, 8000);

        return () => {
            // if (contract_signed?.takenDir.toLowerCase() === dir) {
            // clearTimeout(timeout);
            // setPositionFresh(false);
            // APP.state.unset('contract_signed_' + dir);
            // }
        }
    }, [contract_signed, bet_failed]);

    useEffect(() => {
        if (!error_event_args || !error_event_args.length) return;
        let [bet] = error_event_args;

        if (JSON.stringify(bet).toLowerCase().includes('insufficient funds for intrinsic transaction cost')) {
            dispatch(set_alert_msg({ type: 'error', content: 'aler_msg_err_gas_fee' }))
            APP.state.set('nav_to_topup', { active: true })
        }

        else if (bet.direction == dir) {
            setError(bet.error);
            setErrorFresh(true);
        }

        let timeout = setTimeout(() => setErrorFresh(false), 3000);
        return () => clearTimeout(timeout);

    }, [error_event_args]);


    useEffect(() => {
        //console.log('TRADE BUTTON use effect');
        APP.state.sub('place_trade_error', function (errorMsg) {
            if (typeof (errorMsg) !== 'undefined') {
                console.log('TRADE BUTTON use effect error message', errorMsg);
                //APP.state.set('bet_error', errorMsg);
                setError(errorMsg);
                setErrorFresh(true);

                //Display the error for 3 seconds
                let timeout = setTimeout(() => setErrorFresh(false), 3000);
                return () => clearTimeout(timeout);
            }
        });
    });


    const betErrorHandler = useCallback(() => {

        if (bet_error.toLowerCase().includes('cancelled by the user')) {
            dispatch(set_alert_msg({ type: 'error', content: 'err_transaction' }))
        }
        else if (bet_error.toLowerCase().includes('round is closing')) {
            dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_failed_bet' }))
        }
        else if (bet_error.toLowerCase().includes('insufficient funds for intrinsic transaction cost')) {
            dispatch(set_alert_msg({ type: 'error', content: 'aler_msg_err_gas_fee' }))
            APP.state.set('nav_to_topup', { active: true })
        }
        else if (bet_error.toLowerCase().includes('insufficient funds')) {
            dispatch(set_alert_msg({ type: 'error', content: 'aler_msg_err_gas_fee' }))
            APP.state.set('nav_to_topup', { active: true })
        }
        // might be not the right one for gas fee - but on mobile its the one the received
        else if (bet_error.toLowerCase().includes('failed to sign transaction')) {
            dispatch(set_alert_msg({ type: 'error', content: 'aler_msg_err_gas_fee' }))
            APP.state.set('nav_to_topup', { active: true })
        }
        else if (bet_error.toLowerCase().includes('trade failed')) {
            dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_failed_bet' }))
        }

        APP.state.unset('bet_error')
    }, [/*error*/ bet_error])

    useEffect(() => {
        if (bet_error) {
            betErrorHandler()
        }
    }, /*[error,*/[bet_error])

    // useEffect(() => {
    //     let interval = setInterval(() => {
    //         if (!validBet) return;
    //         let time = entry_timestamp ? parseInt(((is_open ? entry_timestamp : expiry_timestamp) - APP.controller.server_now()) / 1000) : 0
    //         APP.state.set('timeToCloseRound', time);
    //         if (is_open && time <= state.last_sec_allowed_betting) setValidBet(false)
    //     }, 1000);

    //     return () => {
    //         clearInterval(interval)
    //     }

    // }, [initialRemainingTime])

    const updateBet = useCallback((phase, is_open, phase_confirmed) => {
        if (phase === 'pending' || !is_open || !phase_confirmed) setValidBet(true)
    }, [])

    useEffect(() => {
        if (validBet) return;
        updateBet(phase, is_open, phase_confirmed);
    }, [phase, is_open, phase_confirmed])

    // prevent taking bet x sec before round ends
    // useEffect(() => {
    //     if (placeBetError) {
    //         setErrorFresh(true);
    //         let timeout = setTimeout(() => setErrorFresh(false), 5000);
    //         return () => clearTimeout(timeout);
    //     }
    //     else if (showPhaseMes) setPhaseMes(false);
    // }, [placeBetError])

    // useEffect(() => {
    //     if (!transactionHash) return;
    //     setPositionFresh(true);
    //     let timeout = setTimeout(() => setPositionFresh(false), 5000);
    //     return () => clearTimeout(timeout);
    // }, [transactionHash])

    // const [isWalletsModalOpen, setIsWalletModalOpen] = useState(false);
    const { wallet /*, authenticate*/ } = useContext(WalletContext);

    function _makeBet(demo_mode) {

        if (!account || !wallet_address) {
            dispatch(set_connect_wallet_popup(true));
        }
        // prevent taking bet x sec before round ends
        // else if (!validBet) {
        //     console.log(1.2)
        //     dispatch(set_alert_msg({ type: 'info', content: 'alert_msg_last_6sec_bet' }))
        //     return;
        // }
        else if (can_place_trade) {

            setButtonClassName(prev => {
                if (!prev.includes('click-trade-animation'))
                    return [...prev, 'click-trade-animation'];
                return prev;
            });

            (async function () {
                //console.log('setupNetwork')
                // console.log('**************')
                // console.log(BigInt(APP.customer.balance))
                // console.log(BigInt(APP.customer.balance).toString())
                // console.log(EtherValueString({ wei: BigInt(APP.customer.balance).toString() }))
                // console.log('**************')

                // const gasPrice = await wallet.walletProvider.getGasPrice();
                // const gasLimit = await wallet.walletProvider.estimateGas(transaction);
                const gasPrice = APP.state.get('gasPrice');

                console.log('customer balance in trade button', APP.customer.balance);
                if (parseFloat(EtherValueString({ wei: APP.customer.balance.toString() })) < parseFloat(APP.state.get('selected_investment'))) {

                    const isDemo = APP.state.get('currentToken') === 'demo';
                    const err_txt = isDemo ? 'error_msg_trade_failed_demo' : 'error_msg_trade_failed';

                    dispatch(set_alert_msg({ type: 'error', content: err_txt }))
                    APP.state.set('no_money_for_trade', true);

                    // document.body.getElementsByClassName('social_wallet_connect_btn')[0].click(); // CHECK IF NEEDED
                    // dispatch(set_topup_wallet_popup(true))
                    navigate('/topup')
                    return;
                    // document.body.getElementsByClassName('wallet_connect_btn')[0].click();
                }

                // doesnt have enough gas feee
                // else if ((parseFloat(APP.state.get('selected_investment'))) > parseFloat(EtherValueString({ wei: APP.customer.balance.toString() }))) {
                //     dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_err_transaction_fee' }))
                //     return;
                // }
                else {
                    APP.state.set('no_money_for_trade', false);
                }


                let network = APP.state.get('active_network');
                //console.log("_makeBet account wallet",wallet)
                try {
                    const currentUserChainId = await wallet.walletProvider.request({ method: "eth_chainId" })

                    // console.log('trade button: chainId = ' + currentUserChainId)
                    //console.log(wallet.walletProvider);

                    let neededChainId = '0x' + parseInt(APP.state.get('chainId')).toString(16);
                    let neededChainId_int = APP.state.get('chainId');

                    if (currentUserChainId.toString() !== neededChainId) {
                        // console.log('trade button: need to switch to ' + neededChainId + ' network')

                        await wallet.walletProvider.request({
                            params: [{ chainId: neededChainId }],
                            method: "wallet_switchEthereumChain",
                        });

                        // //Reload page after switch network , don't do this on Coinbase mobile
                        // if (browserName.toLowerCase() !== 'chrome webview' && browserName.toLowerCase() !== 'webkit')
                        //     window.location.reload();

                        //setBalance(await wallet.web3.eth.getBalance(APP.customer.active_wallet, 'pending'))
                    }

                    //return neededChainId;
                } catch (error) {
                    // APP.state.set('button_bet.' + direction, null);
                    console.log(error, 'error placing bet')
                    // on_valid_click() // Currenly removed check if needed after error
                }
                on_valid_click(demo_mode)
            })();

        }
        else if (!phase_valid) {
            setPhaseMes(true)
            if (phase === 'pending') {
                dispatch(set_alert_msg({ type: 'info', content: 'alert_msg_round_progress' }))
            }
        }
    }

    const onButtonAnimationEnd = (e) => {

        // Remove animation class
        setButtonClassName(prev => {
            if (prev.includes('click-trade-animation'))
                return prev.filter(str => str !== 'click-trade-animation');
            return prev;
        });

        // if(e.animationName === 'trade-button-scale' &&
        // e.target.classList.contains('click-trade-animation'))
        //     e.target.classList.remove('click-trade-animation');

    };

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIsArrowImg((prev) => !prev);
        }, 2000);

        return () => {
            clearInterval(intervalId);
        };
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!eventFired) {
            _makeBet(demo_mode?.active || APP.state.get('currentToken') === 'demo');
            setEventFired(true);
            setTimeout(() => setEventFired(false), 300);
        }
    };

    return (
        <>
            {/* // <div className="trade_btn" disabled={!phase_valid}
            //     onClick={!phase_valid ? e => setPhaseMes(true) : noop}
            //     onMouseUp={tradeMouseUp.bind(null, dir)}
            //     onMouseDown={tradeMouseDown.bind(null, dir)}> */}
            <div className={buttonClassName.join(' ')}

                disabled={
                    // (!phase_confirmed && !resultDisplayActive) ||
                    (!can_place_trade /*&& !resultDisplayActive*/)
                    || /*|| errorFresh*/  (isMobile && positionFresh)}

                // onClick={() => _makeBet(account, wallet_address, can_place_trade, phase_valid)}>
                onClick={!isMobile ? handleClick : undefined}
                onTouchStart={isMobile ? handleClick : undefined}
                onAnimationEnd={onButtonAnimationEnd}>
                {/* 
                    (positionFresh && phase === 'open') || (phase === 'pending' && !positionFresh) || isPlacingBet ? null
                : */}
                {/* <p style={{ color: '#fff', position: 'absolute', zIndex: 22 }}>{String(buttonClassName)}</p> */}
                <div className="fill">
                    {/* // whenever taking trade is unavailable */}
                    {((!positionFresh && !isPlacingBet && isMobile && !can_place_trade) || (!isMobile && !can_place_trade)) && <img src={`/media/images/arrow_${dir}.png`} />}

                    {
                        // check that trade is available
                        ((/*!errorFresh &&*/ !positionFresh && !isPlacingBet /*&& can_place_trade*/ /*&& wallet_address*/ && isMobile) || !isMobile) &&
                        (!can_place_trade ?
                            null
                            : isArrowImg ?
                                <img src={`/media/images/arrow_${dir}.png`} /> :
                                <p className={dir}>Go {dir}!</p>)
                    }
                </div>

                {/* <LongPressTooltip dir={dir} phase={phase} isPlacingBet={isPlacingBet} /> */}
                <AutoTradeDetails dir={dir} />

                {phase == 'pending' && showPhaseMes && !isMobile && (<PhaseMessage dir={dir} />)}

            </div>

            {errorFresh && true && <ErrorBox error={error} onClick={e => setErrorFresh(false)} />}
            {positionFresh && <PositionBox onClick={e => setPositionFresh(false)} />}

        </>
    )
}


export default TradeButton