
import React from 'react';
// import SortingColumn from './SortingColumn';

const LeaderboardTableHeader = ({ /*sortingSettings, setSortingSettings*/ }) => {
    
    return (
        <div className="table_header">
            <div className="th rank"><span>#</span></div>
            <div className="th user"><span>{APP.term('baa_address')}</span></div>
            <div className="th tier-1"><span>{APP.term('baa_tier_1')}</span></div>
            <div className="th tier-2"><span>{APP.term('baa_tier_2')}</span></div>
            <div className="th tier-3"><span>{APP.term('baa_tier_3')}</span></div>
            <div className="th paid"><span>{APP.term('baa_total_paid')}</span></div>
        </div>
    );

};


export default LeaderboardTableHeader;