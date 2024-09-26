import React, { useState, useRef } from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const VideoClip = () => {

    const [wasClicked, setWasClicked] = useState(false);
    const videoRef = useRef();

    const onClickPlayImage = (e) => {
        setWasClicked(true);
        videoRef.current.play();
    };

    return (

        <>

            <section className="entry-section take-a-look">

                <div className="main-flex">

                    <div className="box left">

                        <div className="caption">
                            <span>{APP.term('entry_take_a_look')}</span>
                        </div>

                        <div className="paragraph">
                            <span>{APP.term('entry_watch_short_video')}</span>
                        </div>

                        <div className="play-now-box web-only flex">
                            <PlayNowButton />
                        </div>

                    </div>

                    <div className="box right">

                        <div className="video-parent">

                            <div className="video-gradient-bg"></div>

                            <div className="video-black-bg">
                                <video controls ref={videoRef}>
                                    <source src="/media/video/entry-page-video.mp4" type="video/mp4" />
                                </video>
                            </div>

                            {!wasClicked && <div className="video-black-play-bg" onClick={onClickPlayImage}></div>}

                        </div>

                        <div className="play-now-box mobile-only flex">
                            <PlayNowButton />
                        </div>

                    </div>

                </div>

            </section>

        </>

    );

};

export default VideoClip;