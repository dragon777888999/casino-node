import React from "react";
import APP from "../../../../app";

import StartNowButton from "../StartNowButton";

const IMAGE_DIR = '/media/images/new-entry-screen/crypto-fights/';

const ConnectWallet = () => {

    return (

        <>

            <section className="connect-wallet white">

                <div className="main-flex">


                    <div className="box left">
                        <div className="caption mobile-only block">
                            <span>CONNECT<br/>YOUR WALLET</span>
                        </div>
                        <div className="image-wrap"><div></div></div>
                    </div>

                    <div className="box right">

                        <div className="caption web-only block">
                            <span>CONNECT<br/>YOUR WALLET</span>
                        </div>

                        <p className="big">
                            <span>YOUR WALLET IS YOUR<br/>AFFILIATE ID</span>
                        </p>

                        <p className="small">
                            <span>All of your earning will be transferred<br/>to this wallet on a daily basis, be aware<br/>that all of the earnings from this affiliate<br/>links created on this wallet address will<br/>be transferred only to this wallet</span>
                        </p>

                        <div className="button-flex-wrap flex">
                            <StartNowButton />
                        </div>

                    </div>

                </div>

            </section>

        </>

    );

};

export default ConnectWallet;