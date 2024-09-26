import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import AnimatedNumber from 'react-animated-number';

import APP from "../../../../app";
import state from '../../../../state';
import API from '../../../../API/stats';
import handleNum from '../../../../utils/systemStats/handleNum';
import numFormat from "../../../../utils/systemStats/numFormat";

import SectionLoader from "../SectionLoader";
import PlayNowButton from "../PlayNowButton";

const GeneralStats = forwardRef((props, ref) => {

    const STATS_UPDATE_DELAY = 60000;
    const statsDataRef = useRef();
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [statsData, setStatsData] = useState(null);

    const statsAreaVisible = () => {
        const rect = statsDataRef.current.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    };

    const getData = async () => {
    
        try {

            setIsLoadingData(true);
                
            const response = await API.getGeneralStats();

            if(response?.data?.requestId) {
                const { ratio24H, distributedAmount24H, distributedAmountAllTime } = response?.data;
                setStatsData({
                    ratio24H: Number(ratio24H),
                    distributedAmount24H: Number(distributedAmount24H),
                    distributedAmountAllTime: Number(distributedAmountAllTime)
                });
            }

        }

        catch(e) {console.log(e, 'err getting general stats')}
        finally {setIsLoadingData(false)}
    
    };

    const checkUpdateStats = (trigger) => {

        const now = Date.now();

        // Return if data being fetched
        if(isLoadingData) return;

        // Return if stats div not visible
        if(!statsAreaVisible(statsDataRef.current)) return;

        // Return if not enough time passed since last update
        if(lastUpdated && ((now - lastUpdated) < STATS_UPDATE_DELAY)) return;

        setLastUpdated(now);
        getData();

    };

    useImperativeHandle(ref, () => ({
        checkUpdateStats: checkUpdateStats
    }));

    return (

        <section className="entry-section stats">

            {isLoadingData && <SectionLoader />}

            <div className="main-flex">

                <div className="caption">
                    <span>{APP.term('entry_paid_and_ratio')}</span>
                </div>

                    <div className="stats-data-flex" ref={statsDataRef}>

                        <div className="win-box win-ratio-24">
                            <div className="top-text"><span>{APP.term('entry_stats_last')}</span></div>
                            <div className="middle-text"><span>{APP.term('entry_stats_ratio')}</span></div>
                            <div className="bottom-text">
                                {statsData && <><AnimatedNumber
                                    value={Number(handleNum(statsData.ratio24H, false))}
                                    style={{ transition: '.8s ease-out' }}
                                    duration={2000}
                                    formatValue={(value) => value.toFixed(1)}
                                /><span>%</span></>}
                            </div>
                        </div>
            
                        <div className="win-box wins-paid-24">
                            <div className="top-text"><span>{APP.term('entry_stats_last')}</span></div>
                            <div className="middle-text"><span>{APP.term('entry_stats_paid')}</span></div>
                            <div className="bottom-text">
                                <span>
                                    {statsData &&<AnimatedNumber
                                        component="text"
                                        value={Number(handleNum(statsData.distributedAmount24H, true))}
                                        style={{ transition: '.8s ease-out' }}
                                        duration={2000}
                                        formatValue={val => numFormat(val, state.entryDistDecimal24H)}
                                    />}
                                </span>
                            </div>
                        </div>
            
                        <div className="win-box wins-paid-all">
                            <div className="top-text"><span>{APP.term('entry_stats_all_time')}</span></div>
                            <div className="middle-text"><span>{APP.term('entry_stats_paid')}</span></div>
                            <div className="bottom-text">
                                <span>
                                    {statsData &&<AnimatedNumber
                                        component="text"
                                        value={Number(handleNum(statsData.distributedAmountAllTime, true))}
                                        style={{ transition: '.8s ease-out' }}
                                        duration={2000}
                                        formatValue={val => numFormat(val, state.entryDistDecimalAll)}
                                    />}
                                </span>
                            </div>
                        </div>

                    </div>

                <PlayNowButton />

            </div>

        </section>

    );

});

export default GeneralStats;