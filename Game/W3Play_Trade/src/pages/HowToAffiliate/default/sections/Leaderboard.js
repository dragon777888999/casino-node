import React, { useState, useEffect } from "react";

import APP from '../../../../app';
import API from '../../../../API/superAffiliatesDashboard';

import LeaderboardTableHeader from "../LeaderboardTableHeader";
import LeaderboardTableRow from "../LeaderboardTableRow";
import SectionLoader from '../SectionLoader';
import StartNowButton from '../StartNowButton';

const LeaderboardTableBody = ({ listData }) => {
    const sortedList = [...listData];
    // sortedList.sort(sortingFunctions[order](column));
    return <>{sortedList.map((user, i) =>
        <LeaderboardTableRow key={i} {...user} />)}</>;
};

const Leaderboard = () => {

    const [loadedList, setLoadedList] = useState(null);
    const [loaderVisible, setLoaderVisible] = useState(true);
    const [isError, setIsError] = useState(false);

    const getLeaderboardData = async () => {

        setIsError(null);
        setLoaderVisible(true);

        try {

            const response = await API.getLeaderboard();

            if(Object.values(response?.data).length && !response?.error) {
                setLoadedList(response.data);
            }

            else {
                setLoadedList(null);
                setIsError(APP.term('baa_no_data_available'));
            }

        }

        catch(error) {setIsError('Could not fetch data')}
        finally {setLoaderVisible(false)}

    };

    useEffect(() => {
        getLeaderboardData();
    }, []);

    return (

        <section className="leaderboard bright seperator">

            {loaderVisible && <SectionLoader />}

            <div className="main-flex">

                <div className="caption stripe">
                    <span>{APP.term('baa_aff_leaderboard')}</span>
                </div>

                <div className="table-wrap">
                    <LeaderboardTableHeader />
                    {(!loadedList && isError) && <div className="error"><span>{isError}</span></div>}
                    {(loadedList && !isError) && <div className="table-body-wrap">
                        <div className="users_list table_body">
                            <LeaderboardTableBody listData={loadedList} />
                        </div>
                    </div>}
                </div>

                <div className="button-flex-wrap">
                    <StartNowButton text={APP.term('entry_become_affiliate')} />
                </div>

            </div>

        </section>
        
    );

};

export default Leaderboard;