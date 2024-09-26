import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const GetRevshare = () => {

    return (

        <section className="get-revshare">

            <div className="main-flex">

                <div className="box left">

                    <div className="caption web-only block">
                        <span>GET REVSHARE<br/>ON YOUR FRIENDS PAID<br/>COMMISSION</span><br/>
                    </div>

                    <div className="caption mobile-only block">
                        <span>GET REVSHARE ON YOUR FRIENDS PAID COMMISSION</span>
                    </div>

                    <div className="play-now-box web-only flex">
                        <StartNowButton />
                    </div>

                </div>

                <div className="box right">

                    <div className="image-wrap">
                        <div></div>
                    </div>

                </div>

                <div className="play-now-box mobile-only flex">
                    <StartNowButton />
                </div>

            </div>

        </section>

    );

};

export default GetRevshare;