
import React from 'react';
import SortingColumn from './SortingColumn';

const LeaderboardTableHeader = ({ sortingSettings, setSortingSettings }) => {
    
    return (
        <div className="table_header">
            <SortingColumn sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} columnClass="rank" columnText="#" />
            <div className="th user"><span>{APP.term("leaderboard_player")}</span></div>
            <SortingColumn sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} columnClass="trades" columnText={APP.term('player_trades')} />
            <SortingColumn sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} columnClass="wins" columnText={APP.term('player_wins')} />
            <SortingColumn sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} columnClass="winrate" columnText={APP.term('follow_win_ratio')} />
            <SortingColumn sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} columnClass="profits" columnText={APP.term("player_profit")} />
        </div>
    );

};


export default LeaderboardTableHeader;