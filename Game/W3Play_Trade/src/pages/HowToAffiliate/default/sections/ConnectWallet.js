import React from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const ConnectWallet = () => {

    return (

        <section className="connect-wallet rtl dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('baa_connect_your_wallet')}</span>
                    </div>

                    <div className="sub-caption">
                        <span>{APP.term('baa_wallet_aff_id')}</span>
                    </div>

                    <div className="button-flex-wrap web-only flex">
                        <StartNowButton />
                    </div>

                </div>

                <div className="box image-area">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

                <div className="button-flex-wrap mobile-only flex">
                    <StartNowButton />
                </div>

            </div>

        </section>
        
    );

};

export default ConnectWallet;