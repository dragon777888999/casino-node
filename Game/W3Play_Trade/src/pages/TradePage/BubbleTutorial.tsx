import React, { useState } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import APP from '../../app';
import { set_betting_tutorial, set_login_pools_popup, set_pools_popup } from '../../REDUX/actions/main.actions';
import state from '../../state';
import browserDetect from '../../utils/browserDetect';

const BettingTutorial = (): JSX.Element => {

    const UpProfit = ({ completeTutorial, onClickNext }) => (
        <div className="entry_bubble_up_profit">
            <p className="bubble_header"><span>{APP.term('bubbles_trade_up_profit_header')}</span></p>
            <p className="desc"><span>{APP.term('bubbles_trade_up_profit_desc')}</span></p>
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <div className="skip" onClick={completeTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="next" onClick={onClickNext}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const DownProfit = ({ completeTutorial, onClickNext }) => (
        <div className="entry_bubble_down_profit">
            <p className="bubble_header"><span>{APP.term('bubbles_trade_down_profit_header')}</span></p>
            <p className="desc"><span>{APP.term('bubbles_trade_down_profit_desc')}</span></p>
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <div className="skip" onClick={completeTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="next" onClick={onClickNext}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const PoolRound = ({ completeTutorial, onClickNext }) => (
        <div className="entry_bubble_pool_round">
            <p className="bubble_header"><span>{APP.term('bubbles_trade_round_header')}</span></p>
            <p className="bubble_sub_header"><span>{APP.term('bubbles_trade_round_subheader1')}</span></p>
            <p className="desc"><span>{APP.term('bubbles_trade_round_desc1')}</span></p>
            <p className="bubble_sub_header"><span>{APP.term('bubbles_trade_round_subheader2')}</span></p>
            <p className="desc"><span>{APP.term('bubbles_trade_round_desc2')}</span></p>
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <div className="skip" onClick={completeTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="next" onClick={onClickNext}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const StartRate = ({ completeTutorial, onClickNext }) => (
        <div className="entry_bubble_start_rate">
            <p className="bubble_header"><span>{APP.term('bubbles_trade_start_rate_header')}</span></p>
            
            <p className="desc"><span>{APP.term('bubbles_trade_start_rate_desc1')}</span></p>
            <p className="bubble_subheader up-pool-text"><span>{APP.term('bubbles_trade_start_rate_subheader1')}</span></p>
            <p className="desc"><span>{APP.term('bubbles_trade_start_rate_desc2')}</span></p>
            <p className="bubble_subheader down-pool-text"><span>{APP.term('bubbles_trade_start_rate_subheader2')}</span></p>
            
            <div className="skip" onClick={completeTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="next" onClick={onClickNext}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const LiveRate = ({ completeTutorial, onClickNext }) => (
        <div className="entry_bubble_live_rate">
            <p className="bubble_header"><span>{APP.term('bubbles_trade_live_rate_header')}</span></p>
            <p className="desc"><span>{APP.term('bubbles_trade_live_rate_desc')}</span></p>
            <div className="skip" onClick={completeTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="close" onClick={onClickNext}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    const Profits = ({ completeTutorial, onClickNext }) => (
        <div className="entry_bubble_profits">
            <p className="bubble_header"><span>{APP.term('bubbles_trade_profits_header')}</span></p>
            <p className="desc"><span>{APP.term('bubbles_trade_profits_desc')}</span></p>
            <p className="bubble_subheader"><span>{APP.term('bubbles_trade_profits_subheader')}</span></p>
            <img src='/media/images/bubbles_tutorial/rectangle.png' className="rectangle" />
            <div className="skip" onClick={completeTutorial}>
                <p><span>{APP.term('bubbles_skip')}</span></p>
            </div>
            <div className="close" onClick={onClickNext}>
                <p><span>{APP.term('bubbles_next')}</span></p>
            </div>
        </div>
    );

    // const Polygon = ({ completeTutorial, onClickNext }) => (
    //     <div className="entry_bubble_polygon">
    //         <div className="content_img" />
    //         <p className="bubble_header">{APP.term('bubbles_trade_polygon_header')}</p>
    //         <p className="desc">{APP.term('bubbles_trade_polygon_desc')}</p>
    //         <p className="bubble_subheader">{APP.term('bubbles_trade_polygon_subheader')}</p>
    //         <div className="skip" onClick={completeTutorial}>
    //             <p>{APP.term('bubbles_skip')}</p>
    //         </div>
    //         <div className="close" onClick={onClickNext}>
    //             <p>{APP.term('bubbles_next')}</p>
    //         </div>
    //     </div>
    // );

    // const BrowserSupport = ({ completeTutorial }) => (
    //     <div className="entry_bubble_browser_support">
    //         <div className="content_img" />
    //         <img src='/media/images/bubbles_tutorial/close.png' className="close_btn" onClick={completeTutorial} />
    //         <p className="bubble_header">{APP.term('bubbles_trade_browser_header')}</p>
    //         <p className="desc">{APP.term('bubbles_trade_browser_desc')}</p>
    //         <div className="confirm_btn" onClick={completeTutorial}>
    //             <p>{APP.term('bubbles_trade_browser_confirm')}</p>
    //         </div>
    //     </div>
    // );

    const steps = [
        UpProfit, DownProfit, PoolRound, StartRate, LiveRate, Profits, /*Polygon,BrowserSupport*/
    ],
        [stepId, setStepId] = useState<number>(0),
        dispatch = useDispatch(),
        login_pools_popup = useSelector((state: RootStateOrAny) => state.mainRememberReducer.login_pools_popup),
        Step = steps[stepId];

    function nextStep(stepId: number, totalSteps: number) {
        // last bubble
        if (stepId === totalSteps) {
            setStepId(stepId + 1)

            // list labels - prevent auto betting tutorial (after login)
            if (!state.disable_auto_tutorial.includes(window.location.hostname)) {
                dispatch(set_betting_tutorial('done'))
            }

            // show automatically popup only once
            if (!login_pools_popup) {
                // dispatch(set_pools_popup(true))
                dispatch(set_login_pools_popup(true))
                APP.state.set('activate_sounds_popup', 1)
            }

            APP.state.set('user_tutorial_gesture', false)
            APP.state.set('user_betting_tutorial_gesture', false)
        }
        // default - open next bubble
        else setStepId(stepId + 1)

    }

    function completeTutorial() {

        // list labels - prevent auto betting tutorial (after login)
        if (!state.disable_auto_tutorial.includes(window.location.hostname)) {
            dispatch(set_betting_tutorial('done'))
        }

        // show automatically popup only once
        if (!login_pools_popup) {
            // dispatch(set_pools_popup(true))
            dispatch(set_login_pools_popup(true))
            APP.state.set('activate_sounds_popup', 1)
        }

        APP.state.set('user_tutorial_gesture', false)
        APP.state.set('user_betting_tutorial_gesture', false)
    }

    return (
        <div className="betting_tutorial">
            <Step
                onClickNext={() => nextStep(stepId, steps.length - 1)}
                completeTutorial={() => completeTutorial()} />
        </div>
    )
}

export default React.memo(BettingTutorial);