import React, { useState, useRef } from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const SLIDES_ARR = [
    {order: 1, name: 'your-wallet', isFirst: true},
    {order: 2, name: 'live-rate'},
    {order: 3, name: 'join-up-pool'},
    {order: 4, name: 'join-down-pool'},
    {order: 5, name: 'investment-bar'},
    {order: 6, name: 'up-pool-profit'},
    {order: 7, name: 'down-pool-profit'},
    {order: 8, name: 'pool-round'},
    {order: 9, name: 'start-rate'},
    {order: 10, name: 'up-pool-wins'},
    {order: 11, name: 'down-pool-wins'},
    {order: 12, name: 'profits', isLast: true}
];

const ConnectWallet = () => {

    const [currentSlide, setCurrentSlide] = useState(SLIDES_ARR[0]);
    const [topDisabled, setTopDisabled] = useState(true);
    const [bottomDisabled, setBottomDisabled] = useState(false);

    const onClickUp = () => {

        const prev = SLIDES_ARR.find(item => 
            item.order === (currentSlide.order - 1));

        if(!prev) return;
        if(prev.isFirst) setTopDisabled(true);
        if(bottomDisabled) setBottomDisabled(false);
        setCurrentSlide(prev);

    };

    const onClickDown = () => {

        const next = SLIDES_ARR.find(item => 
            item.order === (currentSlide.order + 1));

        if(!next) return;
        if(next.isLast) setBottomDisabled(true);
        if(topDisabled) setTopDisabled(false);
        setCurrentSlide(next);

    };

    return (

        <>

            <section className={`connect-wallet ${currentSlide.name}_view`}>

                <div className="views-wrapper">

                    <div onClick={onClickUp} className={`nav-arrow nav-up-arrow${topDisabled ? ' disabled' : ''}`}></div>
                    <div onClick={onClickDown} className={`nav-arrow nav-down-arrow${bottomDisabled ? ' disabled' : ''}`}></div>

                    {/* STARTING SLIDE (MAIN) */}

                    <div className="main-flex wallet-view your-wallet">

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">

                            {/* <div className="caption web-only block">
                                <span>CONNECT<br/>YOUR WALLET,<br/>OR CREATE SOCIAL<br/>WALLET!</span>
                            </div>

                            <div className="caption mobile-only block">
                                <span>CONNECT YOUR WALLET, OR CREATE SOCIAL WALLET!</span>
                            </div> */}

                            <div className="caption">
                                <span>CONNECT<br/>YOUR WALLET,<br/>OR CREATE SOCIAL<br/>WALLET!</span>
                            </div>

                        </div>

                    </div>

                    {/* LIVE BITCOIN RATE */}

                    <div className="main-flex wallet-view live-rate">

                        <div className="play-now-box mobile-only flex">
                            <PlayNowButton />
                        </div>

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">

                            <div className="caption">
                                <span>LIVE BITCOIN<br/>RATE</span>
                            </div>

                            <p className="big">
                                <span>THE LIVE<br/>BITCOIN RATE THAT<br/>ANNOUNCES THE<br/>WINNERS</span>
                            </p>

                            <div className="play-now-box web-only flex">
                                <PlayNowButton />
                            </div>

                        </div>

                    </div>

                    {/* JOIN UP POOL */}

                    <div className="main-flex wallet-view join-up-pool">

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">
                            <div className="caption">
                                <span>JOIN<br/>UP POOL<br/>IF YOU THINK</span><br/>
                                <span className="green">BITCOIN<br/>IS GOING UP</span>
                            </div>
                        </div>

                    </div>

                    {/* JOIN DOWN POOL */}

                    <div className="main-flex wallet-view join-down-pool">

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">
                            <div className="caption">
                                <span>JOIN<br/>DOWN POOL<br/>IF YOU THINK</span><br/>
                                <span className="red">BITCOIN IS GOING DOWN</span>
                            </div>
                        </div>

                    </div>

                    {/* INVESTMENT BAR */}

                    <div className="main-flex wallet-view investment-bar">

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">
                            <div className="caption">
                                <span>INVESTMENT<br/>BAR SELECT<br/>YOUR<br/>INVESTMENT</span>
                            </div>
                        </div>

                    </div>

                    {/* UP POOL PROFIT */}

                    <div className="main-flex wallet-view up-pool-profit">

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">

                            <div className="caption">
                                <span className="green">UP POOL</span><br/>
                                <span>POTENTIAL<br/>PROFIT</span>
                            </div>

                            <p className="big">
                                <span>BASED ON<br/>PLAYERS TRADE</span>
                            </p>

                        </div>

                    </div>

                    {/* DOWN POOL PROFIT */}

                    <div className="main-flex wallet-view down-pool-profit">

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">

                            <div className="caption">
                                <span className="red">DOWN POOL</span><br/>
                                <span>POTENTIAL<br/>PROFIT</span>
                            </div>

                            <p className="big">
                                <span>BASED ON<br/>PLAYERS TRADE</span>
                            </p>

                        </div>

                    </div>

                    {/* POOL ROUND */}

                    <div className="main-flex wallet-view pool-round">

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">

                            <div className="caption">
                                <span>POOL ROUND<br/>30 SEC</span>
                            </div>

                            <p className="big">
                                <span>TIME TO PLACE<br/>A TRADE</span>
                            </p>

                            <div className="caption">
                                <span>15 SEC</span>
                            </div>

                            <p className="big">
                                <span>KNOCK OUT<br/>TIME AND WINNERS<br/>ANNOUNCEMENT!</span>
                            </p>

                        </div>

                    </div>

                    {/* START RATE */}

                    <div className="main-flex wallet-view start-rate">

                        <div className="play-now-box mobile-only flex">
                            <PlayNowButton />
                        </div>

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">

                            <div className="caption">
                                <span>START<br/>RATE</span>
                            </div>

                            <div className="play-now-box web-only flex">
                                <PlayNowButton />
                            </div>

                        </div>

                    </div>

                    {/* UP POOL WINS */}

                    <div className="main-flex wallet-view up-pool-wins">

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">

                            <p className="big">
                                <span>HIGHER THAN<br/>START RATE</span>
                            </p>

                            <div className="caption">
                                <span className="green">UP POOL</span><br/>
                                <span>WINS</span>
                            </div>

                        </div>

                    </div>

                    {/* DOWN POOL WINS */}

                    <div className="main-flex wallet-view down-pool-wins">

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">

                            <p className="big">
                                <span>LOWER THAN<br/>START RATE</span>
                            </p>

                            <div className="caption">
                                <span className="red">DOWN POOL</span><br/>
                                <span>WINS</span>
                            </div>

                        </div>

                    </div>

                    {/* PROFITS */}

                    <div className="main-flex wallet-view profits">

                        <div className="play-now-box mobile-only flex">
                            <PlayNowButton />
                        </div>

                        <div className="box left">
                            <div className="image-wrap"><div></div></div>
                        </div>

                        <div className="box right">

                            <div className="caption">
                                <span>PROFITS</span>
                            </div>

                            <p className="small web-only block">
                                <span>The Profits are Divided Equally<br/>Subject To The Investment Ratio<br/>of The Investors In The Pools<br/>Minus The Earnings Fees<br/>Commission</span>
                            </p>

                            <p className="small mobile-only block">
                                <span>The Profits are Divided Equally Subject To The Investment Ratio of The Investors In The Pools Minus The Earnings Fees Commission</span>
                            </p>

                            <p className="big web-only block">
                                <span>THE WINNERS<br/>GET THEIR PROFITS<br/>INMEDIATELY INTO THEIR<br/>DIGITAL WALLETS.</span>
                            </p>

                            <p className="big mobile-only block">
                                <span>THE WINNERS GET THEIR PROFITS INMEDIATELY INTO THEIR DIGITAL WALLETS.</span>
                            </p>

                            <div className="play-now-box web-only flex">
                                <PlayNowButton />
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </>

    );

};

export default ConnectWallet;