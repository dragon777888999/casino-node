import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../comp/page_header';
import APP from '../../app';
import ConnectWalletModal from '../TradePage/ConnectWalletModal';
import { WalletContext } from '../../utils/game';

import './KnowledgeCenter.css';
import HelmetManager from '../../comp/HelmetManager';
import ga4Event from '../../utils/ga4.event';

const VideoBox = ({ vidTitle, vidSrc, vidImgSrc, cb }) => {

    return (

        <div className="box">

            <div onClick={cb} className="vid-image" data-video-src={vidSrc || ""}>
                <img src={vidImgSrc} loading="lazy" alt="" />
            </div>

            <div className="vid-text">
                <span>{vidTitle || "Lorem ipsum dolot sit amet conflict sepeus pocus"}</span>
            </div>

        </div>

    );

};

const KnowledgeCenter = () => {

    const dispatch = useDispatch();
    const { wallet, authenticate } = useContext(WalletContext);
    const connect_wallet_popup = useSelector(state => state.mainReducer.connect_wallet_popup);
    const [videoShownSrc, setVideoShownSrc] = useState(null);
    const vidRef = useRef(null);

    const VIDEOS_DATA = [
        {vidTitle: APP.term('kc_getting_started'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/new%20get%20started.mp4', vidImgSrc: '/media/images/knowledge-center/vid_1.jpg'},
        {vidTitle: APP.term('kc_about_playblock'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/all%20about%20Playblock%20(1).mp4', vidImgSrc: '/media/images/knowledge-center/vid_2.jpg'},
        {vidTitle: APP.term('kc_tokens_coinbase'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/adding%20tokens%20to%20coinbase.mp4', vidImgSrc: '/media/images/knowledge-center/vid_3.jpg'},
        {vidTitle: APP.term('kc_tokens_metamask'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/tokens%20to%20metamask.mp4', vidImgSrc: '/media/images/knowledge-center/vid_4.jpg'},
        {vidTitle: APP.term('kc_create_wallet'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/connect_or%20create%20(1).mp4', vidImgSrc: '/media/images/knowledge-center/vid_5.jpg'},
        {vidTitle: APP.term('kc_fun_mode'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/Fun%20Mode%20.mp4', vidImgSrc: '/media/images/knowledge-center/vid_6.jpg'},
        {vidTitle: APP.term('kc_topping_up'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/Top%20With%20Crypto.mp4', vidImgSrc: '/media/images/knowledge-center/vid_7.jpg'},
        {vidTitle: APP.term('kc_credit_debit'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/top%20up%20with%20credit%20card%20.mp4', vidImgSrc: '/media/images/knowledge-center/vid_10.jpg'},
        {vidTitle: APP.term('monthly_jackpot'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/Monthly%20jackpot.mp4', vidImgSrc: '/media/images/knowledge-center/vid_8.jpg'},
        {vidTitle: APP.term('weekly_jackpot'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/weekely%20jack.mp4', vidImgSrc: '/media/images/knowledge-center/vid_9.jpg'},
        {vidTitle: APP.term('kc_basic_gameplay'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/10-50%20sample.mp4', vidImgSrc: '/media/images/knowledge-center/vid_11.jpg'},
        {vidTitle: APP.term('kc_aff_program'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/Multi-Level%20Affiliate%20Program.mp4', vidImgSrc: '/media/images/knowledge-center/vid_12.jpg'},
        {vidTitle: APP.term('kc_sap'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/Super%20Affiliate.mp4', vidImgSrc: '/media/images/knowledge-center/vid_13.jpg'},
        {vidTitle: APP.term('kc_sell_usdp'), vidSrc: 'https://storage.googleapis.com/betcioproduction/playnance_videos/Sell%20USDP%20-%20Made%20with%20Clipchamp.mp4', vidImgSrc: '/media/images/knowledge-center/vid_14.jpg'}
    ];

    const onClickVideoImage = (e) => {
        const vidSrc = e.target.getAttribute('data-video-src');
        setVideoShownSrc(vidSrc);
        ga4Event(APP.term('kc_getting_started'), 'knowledge_center_video_visit')
    };

    const onClickCloseVideo = () => {
        setVideoShownSrc(null);
    };

    useEffect(() => {

        if (!videoShownSrc) {
            vidRef.current.pause();
            vidRef.current.currentTime = 0;
        }

        else vidRef.current.play();

    }, [videoShownSrc]);

    return (

        <div className='page knowledge-page'>
            <HelmetManager
                title="DeFi Academy"
                description="DeFi Academy: Learn About Smart Contracts, Decentralized Finance (DeFi), Crypto trading, Enhance Your Trading Knowledge."
                keywords="what is defi, defi crypto ,what is crypto, ai crypto, Crypto trading, Trading Knowledge, best ai crypto"
                canonical="/knowledge_center"
            />

            {connect_wallet_popup && (<ConnectWalletModal
                openModal={() => connect(dispatch)}
                wallet={wallet}
                authenticate={authenticate}
            />)}

            <PageHeader
                title={APP.term('kc_title')}
                skipHistory={true}
                text_scale={.6}
                goldTxtstyles={{ marginTop: '.6em' }}
            />

            <div className='top-caption'>
                <span>{APP.term('kc_expert_advice')}</span>
            </div>

            <div className='knowledge-content'>

                <div className='videos-wrap'>
                    {VIDEOS_DATA.map(item => <VideoBox
                        key={item.vidImgSrc}
                        vidTitle={item.vidTitle}
                        vidSrc={item.vidSrc}
                        vidImgSrc={item.vidImgSrc}
                        cb={onClickVideoImage}
                    />)}
                </div>

            </div>

            <div className={`video-player-wrap-overlay${videoShownSrc ? '' : ' hidden'}`}>
                <div className='video-player-wrap'>
                    <video ref={vidRef} controls src={videoShownSrc} />
                    <div className='close-vid' onClick={onClickCloseVideo}>
                        <span>{APP.term('kc_close_video')}</span>
                    </div>
                </div>
            </div>

        </div>

    );

};

export default KnowledgeCenter;