import React from 'react';
import APP from '../../../../app';

const ConnectYourWallet = () => {

    return (

        <section className="connect-your-wallet ttb bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('htp_connect_create_wallet')}</span>
                    </div>

                </div>

                <div className="box image-area">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

            </div>

        </section>
        
    );

};

export default ConnectYourWallet;