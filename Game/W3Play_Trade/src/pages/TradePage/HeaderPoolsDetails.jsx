import React from 'react';
// import APP from '../../app';
// import useAppState from '../../hooks/useAppState';
import Pool from './Pool.mobile';
import PositionTimer from './PositionTimer';
import ErrorBoundary from '../../comp/ErrorBoundary';

const HeaderPoolsDetails = () => {

    // const upPlayers = useAppState('pool.' + 'up'),
    //     downPlayers = useAppState('pool.' + 'down');

    return (
        <div className="header_pools_details">
            <ErrorBoundary>
                <PositionTimer />
            </ErrorBoundary>
            {/* <p className="header_vs">VS</p> */}

            <Pool dir='up' />
            <Pool dir='down' />

            {/* <div className="players">
                <div>
                    <p>{Object.entries(upPlayers?.positions)?.length || 0}</p>
                    <p>{APP.term('header_players')}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <p>{Object.entries(downPlayers?.positions)?.length || 0}</p>
                    <p>{APP.term('header_players')}</p>
                </div>
            </div> */}
        </div>
    )
}

export default HeaderPoolsDetails;