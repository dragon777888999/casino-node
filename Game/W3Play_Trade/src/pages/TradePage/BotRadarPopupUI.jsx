import React from 'react';
import { useDispatch } from 'react-redux';
import APP from '../../app';
import { set_bot_radar_platform } from '../../REDUX/actions/trade.actions';
import '../../styles/botradar.scss';

const BotRadarPopupUI = () => {

    const dispatch = useDispatch(),
        botRadarWLId = 'f9f50',
        wh_id = APP?.controller?.cfg?.partnerInfo?.partnerRef,
        urlSrc = `https://app.botradar.io/${wh_id || botRadarWLId}/strategies`;

    return (
        <div className="bot_radar_ui_popup_wrap">
            <div className="header">
                <div className="logo" />
                <p className="title">{APP.term('botradar_ui_title')}</p>
                <p className="close" onClick={() => dispatch(set_bot_radar_platform(false))}>&#x2715;</p>
            </div>
            <iframe src={urlSrc} />
        </div>
    )
}

export default BotRadarPopupUI;