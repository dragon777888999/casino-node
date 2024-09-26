import React, { useState, useEffect, useLayoutEffect, useCallback } from 'react';
import AnimatedNumber from 'react-animated-number';
import APP from '../../app';
import useAppState from '../../hooks/useAppState';
import state from '../../state';
import { EtherValue } from '../../utils/web3';

// the flashing "winners"/"losers" over the pools on expiry
function GroupResultsDisplay({ dir, isMobile, /*totalSide, totalOtherSide, players*/ }) {

    let currentPoolId = APP.state.get('currentPoolId'),
        round_result = APP.state.get('round_result_' + dir + currentPoolId),
        totalSide = round_result?.totalSide,
        totalOtherSide = round_result?.totalOtherSide,
        // last_result = round_result?.last_result,
        players_count = round_result?.players_count;

        // console.log('11- round_result:', round_result)
    // if (!enabledResult) return;

    const [visible, setVisible] = useState(false);
    const last_result = useAppState('last_result');
    const rel_result = last_result == 'tie' ? 'tie' : (last_result == dir ? 'win' : 'lose');

    // const _totalOtherSide = EtherValue({ wei: totalOtherSide });
    const totalWonAmt = EtherValue({ wei: totalSide + totalOtherSide });
    
    // const [wonAmt, setWonAmt] = useState(EtherValue({ wei: totalSide }));
    // const [loseAmt, setLoseAmt] = useState(EtherValue({ wei: totalOtherSide }));

    const [wonAmt, setWonAmt] = useState(rel_result ===  'win' ? EtherValue({ wei: totalSide }) : EtherValue({ wei: totalOtherSide }));
    const [loseAmt, setLoseAmt] = useState(rel_result ===  'lose' ? EtherValue({ wei: totalSide }) : EtherValue({ wei: totalOtherSide }));

    // const _totalOtherSide = EtherValue({ wei: totalOtherSide });
    // const totalWonAmt = EtherValue({ wei: totalSide + totalOtherSide });

    // const [amt, setAmt] = useState(rel_result === 'win' ? 0 : totalWonAmt);
    const [playerCount, setPlayersCount] = useState(0);
    let className = 'group_result ' + rel_result;

    if (visible) className += ' visible';

    // flash result for 6 seconds whenever new valid result occurs

    // const mountResults = useCallback(() => {

    //     if (APP.state.get('did_round_end_once')) {
    //         setVisible(true);

    //         console.log('Shoud be set inside GroupResultsDisplay:', dir, totalWonAmt)
    //         // setTimeout(() => {
    //             setAmt(rel_result === 'win' ? totalWonAmt : 0)
    //             APP.state.set('pools_result_mounted_' + dir, true)
    //             // }, 1000);

    //         timeout = setTimeout(() => {
    //             setVisible(false)
    //         }, 6000);
    //     }

    //     return () => clearTimeout(timeout)
    // }, [])

    useEffect(() => {
        // console.log('ent')
        let timeout;

        // if (APP.state.get('did_round_end_once')) {
        setVisible(true);

        setPlayersCount(players_count);
        setTimeout(() => {
            // const rel_result = (last_result == 'tie') ? 'tie' : (last_result == dir ? 'win' : 'lose');
            // setAmt(rel_result === 'win' ? totalWonAmt : 0);

            setWonAmt(totalWonAmt);
            setLoseAmt(0);
        }, 1000);

        timeout = setTimeout(() => {
            APP.state.unset('pools_result_mounted_' + dir);
            APP.state.unset('did_round_end_once');
            APP.state.unset('pool_id_round_state');
            APP.state.unset('show_result');
            setVisible(false)
        }, 3000);
        // }

        return () => {
            clearTimeout(timeout)
        }
    }, [])

    return (
        <div className={className}>
            {isMobile
                ? <>{rel_result === 'win' && (<div className="win-trophy"></div>)}
                    <div className="group_result_mobile">
                        <span>
                            <p>{playerCount}</p><div>{APP.term('group_result_' + rel_result)}</div>
                            {rel_result === 'win' && (
                            displayAnimatedNumber(wonAmt)
                            )}
                            {rel_result === 'lose' && (
                                displayAnimatedNumber(loseAmt)
                            )}
                        </span>
                    </div>
                </>
                :
                <>
                    <span>
                        <p>{playerCount}</p><br /><div>{APP.term('group_result_' + rel_result)}</div>
                        {rel_result === 'win' && (
                         displayAnimatedNumber(wonAmt)
                        )}
                        {rel_result === 'lose' && (
                            displayAnimatedNumber(loseAmt)
                        )}
                    </span>
                </>
            }
        </div>
    );
};

const displayAnimatedNumber = (amount) => (
    <AnimatedNumber 
        component="text" 
        value={Number(amount || 0)}
        style={{
            transition: '.8s ease-out',
            transitionProperty: 'background-color, color, opacity'
        }}
        duration={1200}
        formatValue={(value) => value.toFixed(state.animPoolsDecimalNum)}
    />
);

export default React.memo(GroupResultsDisplay);