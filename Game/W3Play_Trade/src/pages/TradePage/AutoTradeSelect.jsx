import React, { useState, useRef, useEffect } from 'react'
import useAppState from '../../hooks/useAppState';
import APP from '../../app';
import { add_commas } from '../../utils/number';

function closeAutoTradeSelect(e) {
    APP.state.set('show_auto_trade_select', 'none');
}

function activeAutoTrade() {
    return APP.state.get('customer.auto_trade.active');
}

function startAutoTrade(dir, times) {
    if (activeAutoTrade() !== 'none') APP.API.cancel_auto_trade();
    APP.API.set_auto_trade(APP.state.get('selected_investment'), dir, times);
    closeAutoTradeSelect();
}

// auto trade times select (over pools)
function AutoTradeSelect({ dir }) {
    const show_what = useAppState('show_auto_trade_select'),
        invest = useAppState('selected_investment'),
        options = useAppState('auto_trade_times_options'),
        otherActive = useAppState('customer.auto_trade.active'),
        [confirm, setConfirm] = useState(false),
        timesSelected = useRef(0),
        selectTimes = useRef(times => {
            timesSelected.current = times;
            setConfirm(true)
        }),
        finishConfirm = useRef(e => {
            startAutoTrade(dir, timesSelected.current)
        });

    // no need to start with confirm
    useEffect(() => setConfirm(false), [show_what])

    if (show_what !== dir) return (<></>);

    return (
        <div className="auto_trade_select">
            <div className="close" onClick={closeAutoTradeSelect}>X</div>
            {
                confirm
                    ? (<>
                        <div className="confirm_texts">
                            <div className="confirm_text_a">
                                {APP.term('auto_trade_confirm_desc_a')}
                                {timesSelected.current}
                                {APP.term('auto_trade_confirm_desc_b')}
                                ${add_commas(invest, 0)}
                                {APP.term('auto_trade_confirm_desc_c')}
                            </div>
                            <div className="confirm_text_b">{APP.term('auto_trade_confirm_desc_d')}</div>
                            {otherActive !== 'none' && <div className="confirm_warning">{APP.term('auto_trade_confirm_warning')}</div>}
                        </div>
                        <div className="confirm_button" onClick={finishConfirm.current}>{APP.term('auto_trade_confirm')}</div>
                    </>)
                    : (<>
                        <div className="title">{APP.term('auto_trade_select_title')}</div>
                        {options.map((times, i) => (
                            <div key={i} className="option" onClick={selectTimes.current.bind(null, times)}>{times}</div>
                        ))}
                    </>)
            }
        </div>
    )
}


export default AutoTradeSelect