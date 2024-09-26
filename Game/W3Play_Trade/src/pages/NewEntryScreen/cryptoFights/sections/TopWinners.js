import React, { useState, useEffect } from "react";

import APP from "../../../../app";
import yesterday from '../../../LeaderBoard/filters/yesterday';
import today from '../../../LeaderBoard/filters/today';
import thisWeek from '../../../LeaderBoard/filters/thisWeek';
import thisMonth from '../../../LeaderBoard/filters/this.month';
// import leaderboardDataTemp from '../../leaderboardDataTemp';
import API from '../../../../API/leaderboard';

import LeaderboardTableHeader from "../LeaderboardTableHeader";
import LeaderboardTableRow from "../LeaderboardTableRow";
import SectionLoader from '../SectionLoader';
import PlayNowButton from "../PlayNowButton";

// (Column ids vs record props)
const mapping = {
	rank: 'rank',
	trades: 'tradesCount',
	wins: 'winningsCount',
	winrate: 'winRate',
	profits: 'profit'
};

// Sorting functions (asc/desc)
const sortingFunctions = {
	asc: (col) => (a, b) => (a[mapping[col]] - b[mapping[col]]),
	desc: (col) => (a, b) => (b[mapping[col]] - a[mapping[col]])
};

const leaderboardDate = (date) => {
    if(date === 1) return yesterday();
    else if(date === 2) return today();
    if(date === 3) return thisWeek();
    else if(date === 4) return thisMonth();
    else if(date === 5) return {from: 0, to: 0}; // All time
};

// Add bgPercent & winRate data props
const attachLeaderboardExtraData = (list) => {
	for (let i = 0; i < list.length; i++) {
		const { profit, winningsCount, tradesCount } = list[i];
		list[i].bgPercent = parseInt((profit / list[0].profit) * 100);
		list[i].winRate = parseInt((winningsCount / tradesCount) * 100);
	};
};

const LeaderboardTableBody = ({ listData, sorting: [column, order] }) => {
	const sortedList = [...listData];
	sortedList.sort(sortingFunctions[order](column));
	return <>{sortedList.map((user, i) =>
		<LeaderboardTableRow key={i} {...user} />)}</>;
};

const TopWinners = () => {

	const [sortingSettings, setSortingSettings] = useState(['rank', 'asc']);
	const [loadedList, setLoadedList] = useState(null);
	const [partnerRef, setPartnerRef] = useState(false);
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [currentList, setCurrentList] = useState({type: 5, name: APP.term('leaderboard_alltime')});
	const [leaderboardDropDown, setLeaderboardDropDown] = useState(false);
	const [isError, setIsError] = useState(false);

	const leaderboardFilterOptions = [
	    {type: 1, name: APP.term('leaderboard_yesterday')},
		{type: 2, name: APP.term('leaderboard_today')},
		{type: 3, name: APP.term('leaderboard_thisweek')},
		{type: 4, name: APP.term('leaderboard_thismonth')},
		{type: 5, name: APP.term('leaderboard_alltime')}
    ];

    const getLeaderboardData = async (type, partnerRef) => {

		const ranges = leaderboardDate(type);
		setIsError(null);
		setLoaderVisible(true);

		try {

			const response = await API.getLeaderboard(
				partnerRef,
				ranges?.from,
				ranges?.to
			);

			if(Object.values(response?.data).length && !response?.error) {
				attachLeaderboardExtraData(response.data);
				setLoadedList(response.data);
			}

			else {
				setLoadedList(null);
				setIsError('No data available');
			}

		}

		catch(error) {setIsError('Could not fetch data')}
		finally {setLoaderVisible(false)}

	};

    useEffect(() => {
		const ref = APP?.controller?.cfg?.partnerInfo?.partnerRef;
		// prevent sending req without valid partnerRef
		if(partnerRef || !ref) return;
		setPartnerRef(ref);
		getLeaderboardData(currentList?.type, ref);
	}, [APP?.controller?.cfg?.partnerInfo?.partnerRef]);

	// update to selected list
	const updateList = (itm, ref) => {
		setCurrentList(itm);
		getLeaderboardData(itm?.type, ref);
	};

	const chosenFirst = (arr) => {
		const current = leaderboardFilterOptions
		.findIndex(item => item.name === currentList.name);
		if(!current) return leaderboardFilterOptions;
		const item = leaderboardFilterOptions.splice(current, 1);
		leaderboardFilterOptions.unshift(item[0]);
		return leaderboardFilterOptions;
	};

    return (

        <section className="entry-section white top-winners">

			{loaderVisible && <SectionLoader />}

            <div className="main-flex">

				<div className="above-table-area">

					<div className="leaderboard_current_filter" onClick={() => setLeaderboardDropDown(!leaderboardDropDown)}>

						<p className={`${leaderboardDropDown ? 'options-open' : 'options-closed'}`}><span>{currentList?.name}</span></p>

						<div className="arr" dropdown={leaderboardDropDown ? 'open' : 'close'} />

						{leaderboardDropDown && (<div className="leaderboard_dropdown">

							{/* {console.log('leaderboardFilterOptions', leaderboardFilterOptions)} */}
							
							{chosenFirst(leaderboardFilterOptions).map((itm, i) => (
								
								<p key={i}
									current={itm?.name === currentList?.name ? 'true' : 'false'}
									onClick={() => updateList(itm, partnerRef)}>
									<span>{itm?.name}</span>
								</p>

							))}

						</div>)}

					</div>

					<div className="caption">
						<span>TOP WINNERS</span>
					</div>

				</div>

                <div className="table-wrap">
                    <LeaderboardTableHeader sortingSettings={sortingSettings} setSortingSettings={setSortingSettings} />
					{(!loadedList && isError) && <div className="error"><span>{isError}</span></div>}
                    {(loadedList && !isError) && <div className="table-body-wrap">
                        <div className="users_list table_body">
							<LeaderboardTableBody sorting={sortingSettings} listData={loadedList} />
                        </div>
                    </div>}
                </div>
				
				<PlayNowButton />

            </div>

        </section>

    );

};

export default TopWinners;