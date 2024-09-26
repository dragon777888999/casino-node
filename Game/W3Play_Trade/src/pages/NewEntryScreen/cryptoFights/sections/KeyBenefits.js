import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const KeyBenefits = () => {

    return (

        <section className="entry-section white key-benefits">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption web-only block">
                        <span>5 KEY BENEFITS</span>
                    </div>

                    <div className="benefits">
                    <div className="benefit"><div className="num"><span>01</span></div><div className="text"><span>Best</span><span className="big"> win ratio</span><span>, 50%+.</span></div></div>
                        <div className="benefit"><div className="num"><span>02</span></div><div className="text"><span className="big">No deposit</span><span>, you control your funds.</span></div></div>
                        <div className="benefit"><div className="num"><span>03</span></div><div className="text"><span>You play </span><span className="big">peer to peer</span><span>, not against the house.</span></div></div>
                        <div className="benefit"><div className="num"><span>04</span></div><div className="text"><span>Win & go, you get </span><span className="big">your winnings</span><span> directly to your personal wallet.</span></div></div>
                        <div className="benefit web-only flex"><div className="num"><span>05</span></div><div className="text"><span>The smart contract that manages the game </span><span className="big">is fully audited and verified</span><span> by the best company in the industry: CERTIK!</span></div></div>
                        <div className="benefit mobile-only flex"><div className="num"><span>05</span></div><div className="text"><span>The smart contract that manages<br/>the game </span><span className="big">is fully audited and verified</span><span> by the best company in the industry: CERTIK!</span></div></div>
                    </div>

                    <PlayNowButton />

                </div>

                <div className="box right">
                    <div className="caption mobile-only block">
                        <span>5 KEY BENEFITS</span>
                    </div>
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

            </div>

        </section>

    );

};

export default KeyBenefits;