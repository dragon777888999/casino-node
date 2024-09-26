
import React from 'react'
import SortingColumn from './SortingColumn'

function LeaderboardTableHeader({ sortingSettings, setSortingSettings }) {
    return (
        <div className="table_header">
            <SortingColumn sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} columnClass="rank" columnText="#" />
            <div className="th user">{APP.term("leaderboard_player")}</div>
            <SortingColumn sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} columnClass="trades" columnText={APP.term('player_trades')} />
            <SortingColumn sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} columnClass="wins" columnText={APP.term('player_wins')} />
            <SortingColumn sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} columnClass="winrate" columnText={APP.term('follow_win_ratio')} />
            <SortingColumn sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} columnClass="winsPaids" columnText={`WINS PAID`} /> {/* Need to make a new term for player total wins paid */}
        </div>
    )
}


export default LeaderboardTableHeader;