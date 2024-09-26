import React, { useState, useRef } from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/default/';

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
                        <span>{APP.term('entry_make_daily_income')}</span>
                    </div>

                    <p className="big"><span>{APP.term('entry_join_ref_program')}</span></p>

                    <p className="small"><span>{APP.term('entry_bring_friends')}</span></p>


                    <PlayNowButton />

                </div>

            </div>

        </section>

    );

};

export default DailyIncome;