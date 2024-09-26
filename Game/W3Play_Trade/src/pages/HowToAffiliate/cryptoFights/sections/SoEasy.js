import React, { useState, useRef } from 'react';
import APP from '../../../../app';

import StartNowButton from "../StartNowButton";

const IMAGE_DIR = '/media/images/how-to-aff/crypto-fights/';

const SoEasy = () => {

    const [wasClicked, setWasClicked] = useState(false);
    const videoRef = useRef();

    // const onClickPlayImage = (e) => {
    //     setWasClicked(true);
    //     videoRef.current.play();
    // };

    const onClickVideo = (e) => {
        videoRef.current.controls = true;
    };

    return (

        <section className="so-easy">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption web-only block">
                        <span>IT'S<br/>SO EASY!</span>
                    </div>

                    <div className="caption mobile-only block">
                        <span>IT'S SO EASY!</span>
                    </div>

                    <div className="button-flex-wrap web-only flex">
                        <StartNowButton />
                    </div>

                </div>

                <div className="box image-area">

                    <div className="video-parent">

                        <video ref={videoRef} poster={`${IMAGE_DIR}so-easy-poster.png`} onClick={onClickVideo}>
                            <source src="/media/video/affiliate-video.mp4" type="video/mp4" />
                        </video>

                    </div>

                </div>

                {/* <div className="button-flex-wrap mobile-only flex">
                    <StartNowButton />
                </div> */}

            </div>

        </section>
        
    );

};

export default SoEasy;