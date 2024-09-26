import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const MakeMoreMoney = () => {

    return (

        <>

            <section className="make-more-money">

                <div className="main-flex">

                    <div className="box left">
                        <div className="image-wrap"><div></div></div>
                    </div>

                    <div className="box middle">

                        <div className="caption">
                            <span>HOW DO I<br/>MAKE MORE<br/>MONEY?</span>
                        </div>

                    </div>

                    <div className="box right">

                        <p className="big">
                            <span>MAKE SURE TO<br/>WAKE UP YOUR<br/>FRIENDS PLAY AND<br/>EARN, THE MORE<br/>THEY EARN THE<br/>MORE YOU GET!</span>
                        </p>

                        <StartNowButton />

                    </div>

                </div>

            </section>

        </>

    );

};

export default MakeMoreMoney;