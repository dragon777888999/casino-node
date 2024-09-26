import React from 'react';
import useAppState from '../../hooks/useAppState';
import APP from '../../app';

// the text on the bottom of the trade button
function LongPressTooltip({ dir, phase, isPlacingBet }) {
    // console.log('in long press tooltip', dir, phase, isPlacingBet, new Date());
    // if (!isPlacingBet)
    //     console.log('in long press tooltip -> finish processing message', dir, phase, isPlacingBet, new Date());

    const show_select = useAppState('show_auto_trade_select'),
        { active: current_command } = useAppState('customer.auto_trade', {}),
        term = (
            /* !account 
            ? 'no_wallet_connected'
            : */ (isPlacingBet
                ? 'placing_bet'
                : (show_select == dir
                    ? 'select_auto_tade_tip'
                    : (phase == 'pending'
                        ? '' /*'wait_new_cycle'*/
                        : (current_command == 'none'
                            ? ''
                            : (current_command == dir
                                ? 'close_auto_tade_tip'
                                : 'switch_auto_tade_tip'
                            )
                        )
                    )
                )
            )
        );
    // console.log('in long press tooltip term = ', term);
    return <div className="hold_tooltip">{term.length ? APP.term(term) : term}</div>;
}

export default LongPressTooltip
