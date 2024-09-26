import React, { useState, useEffect } from 'react';
import APP from '../../app';
import useAppState from '../../hooks/useAppState';
import Symbol from '../../comp/shape/playblock_symbol';

const PoolResultIndicator = ({ last_result, didIWin }) => {

    if (last_result !== 'up' && last_result !== 'down' && last_result !== 'tie') {
        return null;
    }

    let text;
    let userWonAmount = APP.state.get('userAmountWon') || null; // Retrieve the stored won amount
    if (last_result === 'tie') {
        text = 'Tie';
    } else {
        text = last_result === 'up' ? 'Up pool wins' : 'Down pool wins';
        if (didIWin) {

            if (APP.sounds) {
                // add timeout of 1.4 sec before saying that you won
                setTimeout(() => {
                    APP.sounds.voice_you_won.play();
                }, 3200);
            }
            text = `You won`;
        }
    }

    return (
        <div className={`graph_pool_indicator ${last_result}`}>
            {last_result !== 'tie' &&
                <div className="indicator" data-img-dir={last_result} alt={last_result} />}
                <p className={`indicator_text ${didIWin ? 'grow_pulse_animation' : ''}`}>
                <span>
                    {text}
                    {didIWin && userWonAmount > 0 && (
                        <>
                        <Symbol width='.5em' height='.5em' color='#fff'/>
                        {`${userWonAmount}`}
                        </>
                    )}
                    </span>
                </p>
        </div>
    );

};

const GraphPoolIndicator = () => {
    const currentRoundPhaseFromGameController = useAppState('round_current_state');
    const show_result = useAppState('show_result');
    const phase = currentRoundPhaseFromGameController === "ExpirationPhase" ? 'pending' : 'open';
    const last_result = useAppState('last_result')?.toLowerCase();
    const [state, setState] = useState({
        isVisible: false,
        prevPhase: null,
        initialRender: true,
    });

    useEffect(() => {
        if (!state.initialRender && phase === 'open' && state.prevPhase !== 'open') {
            setState({ ...state, isVisible: true });
            const timeout = setTimeout(() => {
                setState({ ...state, isVisible: false });

                // Cleanup function: Reset state
                APP.state.unset('myTradePlacedup');
                APP.state.unset('myTradePlaceddown');
                APP.state.unset('user_investment');
                APP.state.unset('payout_percent_up');
                APP.state.unset('payout_percent_down');
                APP.state.unset('userAmountWon'); // Unset userAmountWon

            }, 3000);

            // Clear timeout on component unmount
            return () => {
                clearTimeout(timeout);
            };
        }
        setState({ ...state, prevPhase: phase, initialRender: false });

    }, [phase]);

    if (state.isVisible && show_result) {
        const didIWin = APP.state.get('myTradePlaced' + last_result);
        // console.log('11- didIWin :', didIWin);
        return (
            <PoolResultIndicator last_result={last_result} didIWin={didIWin} />
        );
    }

    return null;
};

export default GraphPoolIndicator;