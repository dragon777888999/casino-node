import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const CreateLinks = () => {

    return (

        <>

            <section className="create-links">

                <div className="main-flex">

                    <div className="box right">

                        <div className="caption">
                            <span>CREATE<br/>AFFILIATE LINKS</span>
                        </div>

                        <p className="big">
                            <span>AS MANY AS YOU WANT</span>
                        </p>

                        <div className="play-now-box web-only flex">
                            <StartNowButton />
                        </div>

                    </div>

                    <div className="box left">
                        <div className="image-wrap"><div></div></div>
                    </div>

                    <div className="play-now-box mobile-only flex">
                            <StartNowButton />
                    </div>

                </div>

            </section>

        </>

    );

};

export default CreateLinks;