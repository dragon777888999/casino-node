import React, { useState, useRef } from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const SoEasy = () => {

    const [wasClicked, setWasClicked] = useState(false);
    const videoRef = useRef();

    const onClickPlayImage = (e) => {
        setWasClicked(true);
        videoRef.current.play();
    };

    return (

        <section className="so-easy ltr dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('baa_so_easy')}</span>
                    </div>

                    <div className="button-flex-wrap web-only flex">
                        <StartNowButton />
                    </div>

                </div>

                <div className="box image-area">

                    <div className="video-parent">

                        <div className="video-gradient-bg"></div>

                        <div className="video-black-bg">
                            <video controls ref={videoRef}>
                                <source src="/media/video/affiliate-video.mp4" type="video/mp4" />
                            </video>
                        </div>

                        {!wasClicked && <div className="video-black-play-bg" onClick={onClickPlayImage}></div>}

                    </div>

                </div>

                <div className="button-flex-wrap mobile-only flex">
                    <StartNowButton />
                </div>

            </div>

        </section>
        
    );

};

export default SoEasy;