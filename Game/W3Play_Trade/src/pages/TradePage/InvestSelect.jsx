import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAppState from '../../hooks/useAppState';
import APP from '../../app';
import state from '../../state';
import Symbol from '../../comp/shape/playblock_symbol';

function InvestSelect() {

    const investID = state.default_investment_index;
    const [currentPoolName, setCurrentPoolName] = useState('');
    const options = useAppState('investment_amounts', []);
    const investAmount = useAppState('selected_investment');
    const currentPool = useSelector(state => state.mainRememberReducer.currentPool);

    // once click - update the new invst
    const updateInvst = (opt) => {
        APP.state.set('selected_investment', opt);
    };

    // set initial invst 
    useEffect(() => {
        if (options && options.length) {
            APP.state.set('selected_investment', options[investID]);
        }
    }, [options]);

    // sync current pool invst btn colors
    useEffect(() => {
        const poolName = currentPool?.name || state.active_table?.name;
        setCurrentPoolName(poolName);
    }, [currentPool?.uid]);

    return (
        <div className="invest_select">
            {options?.map((opt, i) => (
                <div key={i}
                    className={`invst_btn _${currentPoolName.split('-')[0]} ${investAmount === opt ? 'active_invst_btn' : 'inactive_invst_btn'}`}
                    onClick={() => updateInvst(opt)}
                    onTouchEnd={(e) => { e.preventDefault(); updateInvst(opt); }}>
                    <Symbol />
                    <p>{opt}</p>
                </div>
            ))}
        </div>
    );
}

export default InvestSelect;