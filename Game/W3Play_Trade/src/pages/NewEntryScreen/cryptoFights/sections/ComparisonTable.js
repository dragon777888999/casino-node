import React, { useEffect, useRef } from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const ComparisonTable = () => {

    const scrollableParentRef = useRef();
    const scrollableRef = useRef();

    useEffect(() => {
        scrollableParentRef.current.scrollTo(scrollableRef.current.offsetWidth/4.5, 0);
    }, []);

    return (

        <>
        
            <section className="entry-section comparison-table web-only block">

                <div className="main-flex">

                    <div className="caption-wrap">
                        <div className="caption">
                            <span>COMPARISON TABLE</span>
                        </div>
                    </div>

                    <div className="table-flex">

                        <div className="column options">
                            <div className="cell extend-top"></div>
                            <div className="cell description border"></div>
                            <div className="cell border margin-top"><span>Winning withdraw</span></div>
                            <div className="cell border"><span>Deposit</span></div>
                            <div className="cell border"><span>Play against the house</span></div>
                            <div className="cell border"><span>Chance to win</span></div>
                            <div className="cell border"><span>Peer to peer</span></div>
                            <div className="cell"><span>Transparency</span></div>
                            <div className="cell extend-bottom"></div>
                        </div>

                        <div className="column gaming">
                            <div className="cell extend-top"></div>
                            <div className="cell description border">
                                <div className="desc-top-caption"><span>GAMING</span></div>
                                <div className="desc-middle-percentage"><span>30%</span></div>
                                <div className="desc-bottom-caption"><span>Win ratio</span></div>
                            </div>
                            <div className="cell border margin-top"><div className="option-status x-sign"></div></div>
                            <div className="cell border"><div className="option-status v-sign"></div></div>
                            <div className="cell border"><div className="option-status v-sign"></div></div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell"><div className="option-status x-sign"></div></div>
                            <div className="cell extend-bottom"></div>
                        </div>

                        <div className="column up-vs-down">
                            <div className="cell extend-top"><span>Best option</span></div>
                            <div className="cell description">
                                <div className="desc-top-caption"><span>CRYPTOFIGHTS.PRO</span></div>
                                <div className="desc-middle-percentage"><span>50%+</span></div>
                                <div className="desc-bottom-caption"><span>Win ratio</span></div>
                            </div>
                            <div className="cell border text margin-top">
                                <p className="option-caption"><span>Auto payment</span></p>
                            </div>
                            <div className="cell border text">
                                <p className="option-caption"><span>Connect wallet</span></p>
                            </div>
                            <div className="cell border">
                                <div className="option-status x-sign"></div>
                            </div>
                            <div className="cell border text">
                                <p className="option-caption"><span>Best</span></p>
                            </div>
                            <div className="cell border">
                                <div className="option-status v-sign"></div>
                            </div>
                            <div className="cell text">
                                <p className="option-caption"><span>100%</span></p>
                            </div>
                            <div className="cell extend-bottom">
                                <PlayNowButton />
                            </div>
                        </div>

                        <div className="column finance">
                            <div className="cell extend-top"></div>
                            <div className="cell description border">
                                <div className="desc-top-caption"><span>FINANCE</span></div>
                                <div className="desc-middle-percentage"><span>25%</span></div>
                                <div className="desc-bottom-caption"><span>Win ratio</span></div>
                            </div>
                            <div className="cell border margin-top"><div className="option-status x-sign"></div></div>
                            <div className="cell border"><div className="option-status v-sign"></div></div>
                            <div className="cell border"><div className="option-status v-sign"></div></div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell border"><div className="option-status x-sign"></div></div>
                            <div className="cell"><div className="option-status x-sign"></div></div>
                            <div className="cell extend-bottom"></div>
                        </div>

                    </div>

                </div>

            </section>

            <section className="entry-section comparison-table mobile-only block">

                <div className="main-flex">

                    <div className="caption">
                        <span>COMPARISON TABLE</span>
                    </div>

                    <div className="table-flex-wrap" ref={scrollableParentRef}>

                        <div className="table-flex" ref={scrollableRef}>

                            <div className="column gaming">
                                <div className="cell extend-top"></div>
                                <div className="cell description border">
                                    <div className="desc-top-caption"><span>GAMING</span></div>
                                    <div className="desc-middle-percentage"><span>30%</span></div>
                                    <div className="desc-bottom-caption"><span>Win ratio</span></div>
                                </div>
                                <div className="cell border text text-line">
                                    <p className="option-caption"><span>Winning withdraw</span></p>
                                </div>
                                <div className="cell border text text-light">
                                    <p className="option-caption"><span>Deposit</span></p>
                                </div>
                                <div className="cell border text text-light">
                                    <p className="option-caption"><span>Play against the house</span></p>
                                </div>
                                <div className="cell border text text-line">
                                    <p className="option-caption"><span>Chance to win</span></p>
                                </div>
                                <div className="cell border text text-line">
                                    <p className="option-caption"><span>Peer to peer</span></p>
                                </div>
                                <div className="cell text text-line">
                                    <p className="option-caption"><span>Transparency</span></p>
                                </div>
                                <div className="cell extend-bottom"></div>
                            </div>

                            <div className="column up-vs-down">
                                <div className="cell extend-top"><span>Best option</span></div>
                                <div className="cell description">
                                    <div className="desc-top-caption"><span>CRYPTOFIGHTS.PRO</span></div>
                                    <div className="desc-middle-percentage"><span>50%+</span></div>
                                    <div className="desc-bottom-caption"><span>Win ratio</span></div>
                                </div>
                                <div className="cell border text">
                                    <p className="option-caption"><span>Winning withdraw</span></p>
                                </div>
                                <div className="cell border text">
                                    <p className="option-caption"><span>Deposit - Connect wallet</span></p>
                                </div>
                                <div className="cell border text text-line">
                                    <p className="option-caption"><span>Play against the house</span></p>
                                </div>
                                <div className="cell border text">
                                    <p className="option-caption"><span>Best chance to win</span></p>
                                </div>
                                <div className="cell border text">
                                    <p className="option-caption"><span>Peer to peer</span></p>
                                </div>
                                <div className="cell text">
                                    <p className="option-caption"><span>100% transparency</span></p>
                                </div>
                                <div className="cell extend-bottom">
                                    <PlayNowButton />
                                </div>
                            </div>

                            <div className="column finance">
                                <div className="cell extend-top"></div>
                                <div className="cell description border">
                                    <div className="desc-top-caption"><span>FINANCE</span></div>
                                    <div className="desc-middle-percentage"><span>25%</span></div>
                                    <div className="desc-bottom-caption"><span>Win ratio</span></div>
                                </div>
                                <div className="cell border text text-line">
                                    <p className="option-caption"><span>Winning withdraw</span></p>
                                </div>
                                <div className="cell border text text-light">
                                    <p className="option-caption"><span>Deposit</span></p>
                                </div>
                                <div className="cell border text text-light">
                                    <p className="option-caption"><span>Play against the house</span></p>
                                </div>
                                <div className="cell border text text-line">
                                    <p className="option-caption"><span>Chance to win</span></p>
                                </div>
                                <div className="cell border text text-line">
                                    <p className="option-caption"><span>Peer to peer</span></p>
                                </div>
                                <div className="cell text text-line">
                                    <p className="option-caption"><span>Transparency</span></p>
                                </div>
                                <div className="cell extend-bottom"></div>
                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </>

    );

};

export default ComparisonTable;