import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const GetProfits = () => {

    return (

        <section className="get-profits">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption">
                        <span>GET YOUR<br/>PROFITS EVERY DAY</span><br/>
                        <span className="green">12:00 GMT</span>
                    </div>

                    <div className="directly-to-wallet green">
                        <span>DIRECTLY TO<br/>YOUR DIGITAL WALLET<br/>AUTOMATICALLY</span>
                    </div>

                </div>

                <div className="box right">

                    <div className="image-wrap">
                        <div></div>
                    </div>

                </div>

            </div>

        </section>

    );

};

export default GetProfits;