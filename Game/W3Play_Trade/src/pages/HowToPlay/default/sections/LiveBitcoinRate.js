import React from 'react';
import APP from '../../../../app';

import PlayNowButton from '../PlayNowButton';

const LiveBitcoinRate = () => {

    return (

        <section className="live-bitcoin-rate rtl dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="bitcoin-icon"></div>

                    <div className="caption stripe">
                        <span>{APP.term('htp_live_rate_bit')}</span>
                    </div>

                    <div className="sub-caption">
                        <span>{APP.term('htp_live_rate_bit_win')}</span>
                    </div>

                    <div className="button-flex-wrap web-only flex">
                        <PlayNowButton />
                    </div>

                </div>

                <div className="box image-area">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

                <div className="button-flex-wrap mobile-only flex">
                    <PlayNowButton />
                </div>

            </div>

        </section>
        
    );

};

export default LiveBitcoinRate;