import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ga4Event from "../../../utils/ga4.event";
import APP from "../../../app";
import { set_demo_mode } from "../../../REDUX/actions/main.actions";
import { useDispatch, useSelector } from "react-redux";

const PlayNowButton = () => {

    const evtCat = '1_play_now';
    const evtDescp = 'click on any first buttons leading to the trading page';
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initial_query_params = useSelector(state => state.mainRememberReducer.initial_query_params);

    function startPlaying(evtDescp, evtCat) {
        ga4Event(evtDescp, evtCat)
        APP.state.set('timer_update', true)

        dispatch(set_demo_mode({ active: false }))
        APP.state.set('currentToken', 'real');
        let navRoute = '/trade' + (initial_query_params?.initialParams ? `?${initial_query_params.initialParams}` : '');

        setTimeout(() => {
            navigate(navRoute);
            window.location.reload();
            APP.customer.update_balance();
        }, 50);
    }

    return (
        <div className="styled-button play-now" onClick={() => startPlaying(evtDescp, evtCat)}>
            <Link>
                <span>{APP.term('entry_play_earn_crypto')}</span>
            </Link>
        </div>
    );

};

export default PlayNowButton;