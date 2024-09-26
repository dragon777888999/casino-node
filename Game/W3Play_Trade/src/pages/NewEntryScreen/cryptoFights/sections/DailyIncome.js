import React, { useState, useRef } from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const DailyIncome = () => {

    const [videoVisible, setVideoVisible] = useState(false);
    const videoRef = useRef();

    const onClickPlayImage = (e) => {
        setVideoVisible(true);
        videoRef.current.play();
    };

    const onCloseVideo = () => {
        setVideoVisible(false);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
    };

    return (

        <section className="entry-section daily-income">

            <div className={`video-parent${videoVisible ? ' video-visible' : ''}`}>

                <div className="video-gradient-bg"></div>

                <div className="video-black-bg">
                    <video controls ref={videoRef}>
                        <source src="/media/video/affiliate-video.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="close" onClick={onCloseVideo}></div>

            </div>

            <div className="main-flex">

                <div className="box left">
                    <div className="image-wrap">
                        <div className="bg">
                            <div className="play" onClick={onClickPlayImage}></div>
                        </div>
                    </div>
                </div>

                <div className="box right">

                    <div className="caption">
                        <span>JOIN OUR AFFILIATE PROGRAM AND MAKE PASSIVE DAILY INCOME</span>
                    </div>

                    <div className="text">
                        <p className="big"><span>GET UP TO 35% COMMISION ON YOUR FRIENDS EARNING FEES - JOIN NOW TO OUR MULTI LEVEL REFERRAL PROGRAM!</span></p>
                        <p className="small"><span>Bring your friends to play and get automated daily passive income directly to your wallet, from the winning fees they pay!</span></p>
                        <PlayNowButton />
                    </div>

                    {/* <PlayNowButton /> */}

                </div>

            </div>

        </section>

    );

};

export default DailyIncome;