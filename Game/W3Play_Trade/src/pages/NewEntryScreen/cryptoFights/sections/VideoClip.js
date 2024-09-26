import React, { useState, useRef } from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const VideoClip = () => {

    // const [wasClicked, setWasClicked] = useState(false);
    // const videoRef = useRef();

    // const onClickPlayImage = (e) => {
    //     setWasClicked(true);
    //     videoRef.current.play();
    // };

    return (

        <>

            <section className="entry-section take-a-look">

                <div className="main-flex">

                    <div className="box left">

                        <div className="video-parent">

                            {/* <div className="video-gradient-bg"></div> */}

                            <div className="video-black-bg">
                                <video controls poster={`${IMAGE_DIR}take-a-look-video-poster.png`}>
                                    <source src="/media/video/entry-page-video.mp4" type="video/mp4" />
                                </video>
                            </div>

                            {/* {!wasClicked && <div className="video-black-play-bg" onClick={onClickPlayImage}></div>} */}

                        </div>

                        <div className="play-now-box mobile-only flex">
                            <PlayNowButton />
                        </div>

                    </div>

                    <div className="box right">

                        <div className="caption web-only block">
                            <span>TAKE<br/>A LOOK</span>
                        </div>

                        <div className="caption mobile-only block">
                            <span>TAKE A LOOK</span>
                        </div>

                        <div className="paragraph">
                            <span>Watch this short video to learn the game logic, enjoy!</span>
                        </div>

                        <div className="play-now-box web-only flex">
                            <PlayNowButton />
                        </div>

                    </div>

                </div>

            </section>

        </>

    );

};

export default VideoClip;