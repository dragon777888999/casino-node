import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PoolDirReturn from './PoolDirReturn';

import { set_mobile_pool_players_visible } from '../../REDUX/actions/main.actions'; 

const PoolsReturn = () => {

    const dispatch = useDispatch();
    const poolPlayersHidden = useSelector(state => state.mainReducer.pool_players_hidden);

    const onClickTogglePoolPlayers = () => {
        dispatch(set_mobile_pool_players_visible(!poolPlayersHidden));
    };

    return (
        <div className={`pools_return_wrap ${poolPlayersHidden ? 'pool-players-hidden' : ''}`}>
            <button className="toggle-players mobile-view" onClick={onClickTogglePoolPlayers}><span></span></button>
            <PoolDirReturn dir={'up'} />
            <PoolDirReturn dir={'down'} />
        </div>
    )
}

export default PoolsReturn;