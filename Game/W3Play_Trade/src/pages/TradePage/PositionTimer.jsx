// PositionTimer.jsx
import React, { useRef, useEffect, useLayoutEffect, useState } from 'react';
import { browserName } from 'react-device-detect';
import { vw } from '../../utils/document';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import useAppState from '../../hooks/useAppState';
import useWindowSize from '../../hooks/useWindowSize';
import APP from '../../app';
import state from '../../state';
import { waitForInitialization } from '../../utils/game/utilities/utils';
import positionTimerColors from '../../utils/positionTimerColors';
import { useDispatch, useSelector } from 'react-redux';
import { set_pools_popup } from '../../REDUX/actions/main.actions'; // Import the action
import { useLocation } from 'react-router';

// const pad_num = (num) => {return num < 10 ? '0' + num : num};
// const format_minutes = (time) => {return `${Math.floor(time / 60)}:${pad_num(time % 60)}`};
const open_table_select_times = () => { return; APP.state.set('table_select_view', 'tables') };

const PositionTimerWrap = () => {
    const dispatch = useDispatch(); // Use dispatch
    //console.log('XX in PositionTimer');

    // waitForInitialization('current_round')
    //if (!APP.state.get('current_round').entry_timestamp) return;
    const switched_pool = useAppState('switched_pool');
    const currentRound = useAppState('current_round');
    const { is_open = false, entry_timestamp = 0, expiry_timestamp = 0, poolId = '' } = currentRound || {};
    const nextRoundTimestamp = useAppState('nextRoundTimestamp');
    const location = useLocation();
    const asset_id = useAppState('asset.id') || null;
    const isActivePosition = useAppState('isActivePosition');
    const { width: v_width, height: h_height } = useWindowSize();
    // const { downtime, duration, pool_id } = useAppState('active_table');

    // Handle undefined values gracefully
    if (!currentRound || !asset_id) {
        console.warn('PositionTimer: Required state not available');
        return null; // or render a fallback UI
    }

    // extract current pool
    const currentPool = useSelector(state => state.mainRememberReducer.currentPool);
    const isDemo = location.pathname?.includes('demo') || currentPool?.uid?.includes('demo');
    const tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');
    const active_table = tables.find(itm => itm.uid === currentPool?.uid) || {};
    const { downtime, duration, pool_id } = active_table;
    const asset = APP.state.get('asset');
    const valid_pools = tables.filter(itm => itm?.asset == asset?.remote_id).length > 1;
    const timer_update = useAppState('timer_update');
    // const [_duration, setDuration] = useState(duration);
    const [_play, setPlay] = useState(true);
    const [stateKey, setKey] = useState(1);
    const activeChat = useAppState('chat_open');
    let phase = is_open ? 'open' : 'pending';
    const phaseDuration = is_open ? downtime : duration;
    const metamask = navigator.userAgent.includes("MetaMaskMobile");
    const coinbase = (browserName.toLowerCase() === 'webkit');
    const app_phase = useAppState('phase');

    const phase_confirmed = useAppState('phase_confirmed');

    let is_closing_next = !phase_confirmed;


    // let isOpen = APP.state.get('current_round').is_open;
    // if (isOpen) {
    //     is_closing_next = true;
    // } else {
    //     is_closing_next = false;
    // }

    // function newRoundVal(currentRoundPhaseFromGameController) {
    //     if (currentRoundPhaseFromGameController === "ExpirationPhase") return 'pending';
    //     else return 'open';
    // }

    // const currentRoundPhaseFromGameController = useAppState('round_current_state');
    // let _phase = newRoundVal(currentRoundPhaseFromGameController);


    //let is_closing_next = false;

    // const phase_text = APP.term(app_phase == 'open' ? 'distributing_winnings' : 'waiting_for_round_start');

    //console.log('PositionTimer::phase text', phase_text);
    const skin_idx = useAppState('skin_idx')
    const colors = positionTimerColors(skin_idx)
    const container_ref = useRef(null);
    // console.log(entry_timestamp, 'entry_timestamp \n', is_open, 'is_open\n')
    // const [initialRemainingTime, setInitialTime] = useState(entry_timestamp ? ((is_open ? entry_timestamp : expiry_timestamp) - APP.controller.server_now()) / 1000 : 0);
    let [initialRemainingTime, setRemainingTime] = useState(entry_timestamp ? ((is_open ? entry_timestamp : expiry_timestamp) - APP.controller.server_now()) / 1000 : 0);
    const should_format_minutes = phaseDuration > 60;

    // const roundTime = (is_open, nextRoundTimestamp) => {
    //     return nextRoundTimestamp.start ? ((is_open ? (nextRoundTimestamp.start / 1000) : (nextRoundTimestamp.end / 1000)) - APP.controller.server_now()) / 1000 : 0
    // };
    const roundTime = (is_open, entryNextRound, nextRoundTimestamp) => {
        return entryNextRound ? ((is_open ? (entryNextRound / 1000) : (nextRoundTimestamp / 1000)) - APP.controller.server_now()) / 1000 : 0
    };

    // const validCircleTimer = duration && (Math.max(roundTime(is_open, nextRoundTimestamp), 0) > 0)
    //     && (nextRoundTimestamp?.end && (new Date() < new Date(nextRoundTimestamp?.end / 1000)))
    //     && !is_closing_next;
    const validCircleTimer = duration && (Math.max(roundTime(is_open, entry_timestamp, expiry_timestamp), 0) > 0)
        && (expiry_timestamp && (new Date() < new Date(expiry_timestamp / 1000)))
        && !is_closing_next;

    // const as = 2;
    // useEffect(() => {
    //     console.log(poolId, _phase, 'poolId + phase')
    //     setInitialTime(entry_timestamp ? ((is_open ? entry_timestamp : expiry_timestamp) - APP.controller.server_now()) / 1000 : 0)
    // }, [poolId, _phase])

    // make the plugin's SVG to be responsive to size changes
    useLayoutEffect(() => {

        let to = setTimeout(() => {
            let svg = container_ref.current.querySelector('svg');
            if (!svg) return;
            let width = svg?.getAttribute('width');
            let height = svg?.getAttribute('height');
            svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        }, 50);

        return () => { if (!metamask || !coinbase) clearTimeout(to) };

    }, [h_height, v_width, entry_timestamp, expiry_timestamp, nextRoundTimestamp, is_open, pool_id, validCircleTimer, timer_update]);

    useEffect(() => {

        if (metamask || coinbase) return;

        if ((navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i))
            && !activeChat) return;

        let to = setTimeout(() => {
            let svg = container_ref.current.querySelector('svg');
            if (!svg) return;
            let width = svg?.getAttribute('width');
            let height = svg?.getAttribute('height');
            svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        }, 50);

        return () => { clearTimeout(to) };

    }, [browserName, activeChat, h_height, v_width, phase, timer_update, nextRoundTimestamp]);

    const timeLeft = (remainingTime) => {

        //console.log('timeLeft', remainingTime);

        // let currentRound = APP.state.get('currentRound');
        // if (currentRound.start_timestamp != 0) {
        //     APP.state.set('nextRoundTimestamp', {
        //         start: currentRound.start_timestamp + 30,
        //         end: currentRound.start_timestamp + 30 + 15
        //     });
        // }

        //Wait for loading current_round into state
        //if (!APP.state.get('current_round').entry_timestamp) return;

        //console.log('XX timeLeft', remainingTime);

        // if (is_closing_next) return '  ';
        // else if(!should_format_minutes) return /*remainingTime + '_' +*/ parseInt(Math.max(roundTime(is_open, nextRoundTimestamp), 0));
        if (!should_format_minutes) return remainingTime;
        // in case we it's a countdown with more than a minute to wait
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        if (!timer_update) return;
        // setDuration(duration)
        setKey(stateKey + 1);
        APP.state.unset('timer_update');
    }, [timer_update]);

    useEffect(() => {
        let newTime = entry_timestamp ? ((is_open ? entry_timestamp : expiry_timestamp) - APP.controller.server_now()) / 1000 : 0;
        setRemainingTime(newTime)
        setKey(stateKey + 1)
        APP.state.set('isActivePosition', true);
    }, [poolId, is_open, entry_timestamp])


    // CHECK IF NEEDED 
    //   ************

    //Decide the current phase using the data we get from rounds streamer
    // (async () => {
    //     //await waitForInitialization('ratesStreamerInitialized'); //Wait for streamer initializtion between calculating the current time left and current phase
    //     await waitForInitialization('current_round');

    //     let currentRound = APP.state.get('current_round');


    //     //console.log('ZZ111 PositionTimer::ratesStreamerInitialized', APP.state.get('ratesStreamerInitialized'));
    //     //console.log('ZZ111 PositionTimer::current_round', APP.state.get('current_round'));

    //     if (APP.state.get('round_current_state') == 'PlaceTradePhase' && APP.state.get('current_round').entry_timestamp) {
    //         phase = 'open';
    //         initialRemainingTime = (entry_timestamp - APP.controller.server_now()) / 1000;
    //         // if (initialRemainingTime < 0)
    //         //     initialRemainingTime = 1; //refresh page on expiration flag (second flag)
    //     } else if (APP.state.get('round_current_state') == 'ExpirationPhase' && APP.state.get('current_round').entry_timestamp) {
    //         phase = 'pending';
    //         initialRemainingTime = (expiry_timestamp - APP.controller.server_now()) / 1000;
    //         // if (initialRemainingTime < 0)
    //         //     initialRemainingTime = 1; //refresh page on expiration flag (second flag)
    //     }
    // })();



    // console.log('XX PositionTimer::now', new Date());
    // console.log('XX PositionTimer::entry_timestamp', entry_timestamp, new Date(entry_timestamp));
    // console.log('XX PositionTimer::expiry_timestamp', expiry_timestamp, new Date(expiry_timestamp));
    // console.log('XX PositionTimer::phase', phase);
    // console.log('XX PositionTimer::initialRemainingTime', initialRemainingTime);

    // console.log('ZZ current_round', APP.state.get('current_round'));

    if (APP.state.get('round_current_state') == 'PlaceTradePhase') {
        // console.log('XX in place trade phase');

        // let currentRound = APP.state.get('current_round');
        // APP.state.set('nextRoundTimestamp', {
        //     start: currentRound.start_timestamp + 30 * 1000,
        //     end: currentRound.start_timestamp + (30 + 15) * 1000
        // });

    }

    // let currentRound = APP.state.get('current_round');
    // if (currentRound.start_timestamp != 0) {
    //     console.log('ZZ set next round timestamp to fix the graph and reset the lines/flags');
    //     APP.state.set('nextRoundTimestamp', {
    //         start: currentRound.start_timestamp + 30,
    //         end: currentRound.start_timestamp + 30 + 15
    //     });
    // }

    // console.log('POSITIONTIMER::duration', duration);
    // console.log('POSITIONTIMER::initialRemainingTime', initialRemainingTime);
    // console.log('POSITIONTIMER::is_closing_next', is_closing_next);

    // open pools selection popup
    function open_pools(valid_pools) {
        if (valid_pools) {
            dispatch(set_pools_popup(true));
        }
    }

    return (

        <div className="position_timer" tradephase={phase} ref={container_ref} /*onClick={open_table_select_times}*/>

            {/* {duration && (Math.max(roundTime(is_open, entry_timestamp, expiry_timestamp), 0) > 0)
                && (nextRoundTimestamp?.end && (new Date() < new Date(nextRoundTimestamp?.end / 1000)))
                && !is_closing_next */}
            {/* {console.log(duration, initialRemainingTime, 'duration + initialRemainingTime')} */}
            {isActivePosition && duration && initialRemainingTime > 0
                // (Math.max(roundTime(is_open, entry_timestamp, expiry_timestamp), 0) > 0)
                // && (nextRoundTimestamp?.end && (new Date() < new Date(nextRoundTimestamp?.end / 1000)))
                // && !is_closing_next


                ? <CountdownCircleTimer
                    // isPlaying={Math.max(roundTime(is_open, entry_timestamp, expiry_timestamp), 0) ? _play : false}
                    isPlaying={initialRemainingTime ? _play : false}
                    key={phase + '_' + asset_id + '_' + pool_id + '_' + stateKey}
                    colors={colors.inner}
                    duration={phase === 'open' ? downtime : duration}
                    // initialRemainingTime={Math.max(roundTime(is_open, entry_timestamp, expiry_timestamp), 0) || initialRemainingTime}
                    initialRemainingTime={initialRemainingTime}
                    size={Math.round(vw(11.7))} //origin
                    strokeWidth={Math.round(vw(.52))} //origin
                    onComplete={() => {
                        setTimeout(() => {
                            setKey((stateKey) => stateKey + 1);
                        }, 0);
                    }}                    
                    trailColor={colors.trail}>
                    {(props) => {
                        // if(is_closing_next) return '  ';
                        if (props.remainingTime < 1) {
                            APP.state.set('isActivePosition', false);
                        }
                        return (
                            <p className={props.remainingTime <= state.last_sec_anim && phase === 'open' ? 'last_sec_anim' : 'reg_timer'}>{
                                timeLeft(props?.elapsedTime < 0 ? Math.abs(parseInt(props?.elapsedTime)) : props?.remainingTime)}
                            </p>)
                        // else if(!should_format_minutes) return /*remainingTime + '_' +*/ parseInt(Math.max(roundTime(is_open, nextRoundTimestamp), 0));
                        // // in case we it's a countdown with more than a minute to wait
                        // const minutes = Math.floor(remainingTime / 60)
                        // const seconds = remainingTime % 60
                        // return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
                    }}
                </CountdownCircleTimer>

                : (<img src="/media/images/loaders/loader.gif" style={{ width: '4em', height: '2em', zIndex: 0, opacity: .55 }} />)}

            <span className="sec">{APP.term(should_format_minutes ? 'position_timer_min' : 'position_timer_sec')}</span>

            {valid_pools &&
                <div className="pool_popup_btn" onClick={open_pools}>
                    <div className='pool_popup_btn_img' />
                </div>}
        </div>

    );

};


export default React.memo(PositionTimerWrap);