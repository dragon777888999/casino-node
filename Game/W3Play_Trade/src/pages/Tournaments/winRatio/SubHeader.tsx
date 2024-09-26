import React, { useEffect } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import APP from '../../../app';
import { set_win_ratio_principal } from '../../../REDUX/actions/main.actions';
import '../../../styles/pages/winratio.scss';
import CountdownTimer from '../CountDown';

const SubHeader = () => {

    const principal = useSelector((state: RootStateOrAny) => state.mainReducer.win_ratio_principal),
        dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(set_win_ratio_principal({ end: 0 }))
        }
    }, [])

    return (
        <div className="wr_subheader">

            <p className="title">{APP.term('wr_subheader_title')}</p>

            {/* WEB VERSION */}
            <div className="left">
                <img src={APP.state.get('customer.avatar')} />
                <div>
                    <p>{APP.term('wr_subheader_place')}</p>
                    <span>#{principal?.rank || 0}</span>
                </div>

            </div>

            <div className="center">
                <p>{APP.term('wr_subheader_trades')}</p>
                <span>{`${principal?.trades || 0}/${principal?.threshold || 0}`}</span>
            </div>

            <div className="center">
                <p>{APP.term('wr_subheader_winratio')}</p>
                <span>{`${parseFloat(principal?.ratio || 0).toFixed(2)}%`}</span>
            </div>

            <div className="right">
                <p>{APP.term('wr_subheader_timer_end')}</p>
                <span>
                    {principal?.end > 0 ? (<CountdownTimer startTime={parseInt(principal?.end) * 1000 || 0}
                        onStop={() => console.log('weekly timer was stopped')}
                        onReset={() => console.log('weekly timer reset')} />) : 'Loading..'}
                </span>
            </div>


            {/* MOBILE VERSION */}
            <div className="center_top_mobile">
                <img src={APP.state.get('customer.avatar')} />
                <div>
                    <p>{APP.term('wr_subheader_place')}</p>
                    <span>#{principal?.rank || 0}</span>
                </div>
            </div>

            <div className="center_bottom_mobile">

                <div className="left">
                    <p>{APP.term('wr_subheader_trades')}</p>
                    <span>{`${principal?.trades || 0}/${principal?.threshold || 0}`}</span>
                </div>

                <div className="center">
                    <p>{APP.term('wr_subheader_winratio')}</p>
                    <span>{`${parseFloat(principal?.ratio || 0).toFixed(2)}%`}</span>
                </div>

                <div className="right">
                    <p>{APP.term('wr_subheader_timer_end')}</p>
                    <span>
                        {principal?.end > 0 ? (<CountdownTimer startTime={parseInt(principal?.end) * 1000 || 0}
                            onStop={() => console.log('weekly timer was stopped')}
                            onReset={() => console.log('weekly timer reset')} />) : 'Loading..'}
                    </span>
                </div>

            </div>

            <div className="desc_box">
                <p><span>* {APP.term('wr_subheader_desc')}</span></p>
                <img src='/media/images/tournaments/info.png' />
            </div>

        </div>
    )
}

export default SubHeader;