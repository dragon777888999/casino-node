import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jackpot from '../API/jackpot';
import useAppState from '../hooks/useAppState';
import { set_loader } from '../REDUX/actions/main.actions';
import { sleep } from '../utils/async';
import state from '../state';

export default function useJackpotState() {

    const [weeklyPoolsStats, setWeeklyPoolsStats] = useState({});
    const [monthlyPoolsStats, setMonthlyPoolsStats] = useState({});
    const [weeklyWinners, setWeeklyWinners] = useState(null);
    const [monthlyWinners, setMonthlyWinners] = useState(null);
    const [historyList, setHistory] = useState([]);
    const [monthlyHistory, setMonthlyHistory] = useState([]);
    const dispatch = useDispatch();
    const wallet_address = useAppState('wallet_address');
    const demoState = useSelector(state => state.mainRememberReducer.demo_mode);

    // weekly stats (overall)
    const getWeekly = async () => {

        const reqUrl = !demoState.active
            ? state.weekly_jackpot_url
            : state.weekly_jackpot_demo_url;

        const res = await jackpot.getWeeklyData(reqUrl, wallet_address);

        if (res.data && !res.error) {
            setWeeklyPoolsStats({
                loaded: true,
                pools: res.data?.pools?.sort((a, b) => a.pool - b.pool),
                secondsLeft: res.data?.endingIn,
                poolsChannel: res.data?.channel,
                jackpotWallet: res.data?.wallet,
                ownTrades: res.data?.principal?.tickets || 0,
                ownChannel: res.data?.principal?.channel
            });
        }

        // await sleep(1500);
        dispatch(set_loader(false));

    };

    // weekly winners history 
    const getHistoryList = async () => {

        const reqUrl = !demoState.active
            ? state.jackpot_weekly_history_url
            : state.jackpot_weekly_history_demo_url;

        const res = await jackpot.getHistory(reqUrl);

        if (res.data && !res.error)
            setHistory(res.data._data);

    };

    // monthly winners history 
    const getMonthlyHistoryList = async () => {

        const reqUrl = !demoState.active
            ? state.jackpot_monthly_history_url
            : state.jackpot_monthly_history_demo_url;

        const res = await jackpot.getHistory(reqUrl);


        if (res.data && !res.error) {
            setMonthlyHistory(res.data._data);
        }

    };

    // weekly winners stats 
    const getWinnersList = async () => {

        const reqUrl = !demoState.active
            ? state.jackpot_weekly_winners_url
            : state.jackpot_weekly_winners_demo_url;

        const res = await jackpot.getWinners(reqUrl);

        if (res.data && !res.error) {
            setWeeklyWinners({
                winners: res.data?.winners,
                startDate: res.data?.startDate,
                endDate: res.data?.endDate
            });
            dispatch(set_loader(false));
        }

    };

    // monthly winners stats 
    const getMonthlyList = async () => {

        const reqUrl = !demoState.active
            ? state.jackpot_monthly_winners_url
            : state.jackpot_monthly_winners_demo_url

        const res = await jackpot.getWinners(reqUrl);

        if (res.data && !res.error) {
            setMonthlyWinners({
                winners: res.data?.winners,
                startDate: res.data?.startDate,
                endDate: res.data?.endDate
            });
            dispatch(set_loader(false));
        }

    };

    // update own weekly trades/bets
    const setOwnTrades = (newTradesAmt) => {
        setWeeklyPoolsStats(weeklyPoolsStats => ({
            ...weeklyPoolsStats,
            ownTrades: newTradesAmt
        }))
    };

    // weekly winners history 
    const getMonthly = async () => {

        const reqUrl = !demoState.active
            ? state.monthly_jackpot_url
            : state.monthly_jackpot_demo_url;

        const res = await jackpot.getMonthlyData(reqUrl, wallet_address);

        if (res.data && !res.error) {
            setMonthlyPoolsStats({
                loaded: true,
                secondsLeft: res.data?.endingIn,
                pools: res.data?.pools?.sort((a, b) => a.pool - b.pool) || [],
                jackpotWallet: res.data?.wallet,
                principal: res.data?.principal,
                threshold: res.data?.threshold || 0,
                prize: res.data?.prize || 0,
                ownTrades: res.data?.principal?.tickets || 0,
                ownChannel: res.data?.principal?.channel
                // participantsCount: res.data?.participantsCount || 0,
            })
        }

        await sleep(1500);
        dispatch(set_loader(false));

    };

    // update own monthly trades/bets
    const setOwnMonthlyTrades = (newTradesAmt) => {
        setMonthlyPoolsStats(monthlyPoolsStats => ({
            ...monthlyPoolsStats,
            principal: { ...monthlyPoolsStats?.principal, tickets: newTradesAmt }
        }))
    };

    // update own monthly general prize, user count
    const setNewMonthlyStats = (prize, count) => {
        setMonthlyPoolsStats(monthlyPoolsStats => ({
            ...monthlyPoolsStats,
            prize,
            participantsCount: count
        }))
    };

    return {
        getWeekly, weeklyPoolsStats,
        setOwnTrades,
        getWinnersList, weeklyWinners,
        getMonthlyList, monthlyWinners,
        getHistoryList, historyList,
        getMonthlyHistoryList, monthlyHistory,
        getMonthly, monthlyPoolsStats,
        setOwnMonthlyTrades,
        setNewMonthlyStats
    };

};