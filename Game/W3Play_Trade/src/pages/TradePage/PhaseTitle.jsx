
import React, { useState, useEffect } from 'react'
import APP from '../../app'
import useAppState from '../../hooks/useAppState';
import useDimension from '../../hooks/useDimension';

function PhaseTitle() {

    // const pnl = useAppState('customer.last_round_pnl'),
    const phase = useAppState('phase');
    const phase_confirmed = useAppState('phase_confirmed');
    const [show_confirmed, set_show_confirmed] = useState(false);
    const isMobilePortrait = useDimension();
    // [early, setEarly] = useState(false);

    useEffect(() => {
        if (!phase_confirmed) return;
        set_show_confirmed(true);
        let timeout = setTimeout(() => set_show_confirmed(false), 2000);
        return () => clearTimeout(timeout);
    }, [phase_confirmed]);

    // useEffect(() => {
    //     if (phase == 'pending') {
    //         setEarly(true);
    //         let timeout = setTimeout(() => setEarly(false), 2000);
    //         return () => clearTimeout(timeout);
    //     }
    // }, [phase])

    let message_l1 = APP.term('phase_message_' + phase);

    // (
    // early && pnl !== 0
    //     ? (pnl > 0
    //         ? APP.term('profit_message')
    //         : APP.term('loss_message')
    //     )
    //     : (phase_confirmed
    //         ? APP.term('phase_message_' + phase)
    //         : APP.term('phase_message_before_' + phase)
    //     )
    // ),
    //     phase_confirmed
    //         ? APP.term('phase_message_' + phase)
    //         : APP.term('phase_message_before_' + phase)
    // ),
    // message_l2 = (
    //     phase == 'open'
    //         ? ''
    //         : (early && pnl !== 0 ? '$' + Math.abs(pnl) : false)
    // ),
    // className = "phase_title"
    // key = early && pnl !== 0 ? 'pnl' : phase;
    // key = phase + (phase_confirmed ? '_waiting' : '');

    // if (early && pnl > 0) className += " green";
    // if (early && pnl < 0) className += " red";

    // disable txts after seen in center of the screen
    function disable_msg(msg, phase, phase_confirmed, isMobilePortrait) {
        if (phase_confirmed && phase === 'pending' && isMobilePortrait) return '';
        else return msg;
    }


    let graphMessageJSX;
    // if (!phase_confirmed && phase !== 'pending') graphMessageJSX = <span>{APP.term('phase_pending_title')}</span>;
    if (phase === 'open') graphMessageJSX = <><span>{APP.term('phase_open_title')}</span><br /><span>{message_l1}</span></>;
    else graphMessageJSX = <span>{disable_msg(message_l1, phase, phase_confirmed, isMobilePortrait)}</span>;

    return (
        <>
            <div className={`phase_title phase_${phase}`} key={phase}>
                {/* {!message_l2 ? null : (<><br /><span>{message_l2}</span></>)} */}
                {graphMessageJSX}
            </div>
            {/* {!show_confirmed
                ? null
                : <div className="confirmed_phase_message">
                    {APP.term('phase_message_confirmed_' + phase)}
                </div>
            } */}
        </>
    )
}

export default React.memo(PhaseTitle);