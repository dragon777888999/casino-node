import React from "react";
import APP from "../../../../app";

import PlayNowButton from "../PlayNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const GetMaticToken = () => {

    return (

        <section className="get-matic-token white">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption mobile-only block">
                        <span>HOW TO GET MATIC TOKEN?</span>
                    </div>  

                    <div className="image-wrap">
                        <div></div>
                    </div>

                </div>

                <div className="box right">

                    <div className="caption web-only block">
                        <span>HOW TO GET MATIC TOKEN?</span>
                    </div>

                    <div className="">
                        <p className="big"><span>BUY MATIC TOKEN EASILY</span></p>
                        <p className="small"><span>With credit/debit or bank transfer instantly and easily!</span></p>
                    </div>

                    <div className="or"><span>OR</span></div>

                    <div className="">
                        <p className="big"><span>EXCHANGE OTHER CRYPTO TO MATIC</span></p>
                        <p className="small"><span>Easily and safely with our best swap service!</span></p>
                    </div>

                    <PlayNowButton />

                </div>

            </div>

        </section>

    );

};

export default GetMaticToken;