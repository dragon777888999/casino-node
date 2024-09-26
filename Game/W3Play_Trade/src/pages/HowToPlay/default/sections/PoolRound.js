import React from 'react';
import APP from '../../../../app';

const PoolRound = () => {

    return (

        <section className="pool-round rtl dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('htp_pool_round')}</span>
                    </div>
                    <div className="caption">
                        <span>{APP.term('htp_secs_30')}</span>
                    </div>
                    <div className="sub-caption time-to-place">
                        <span>{APP.term('htp_place_trade')}</span>
                    </div>

                    <div className="caption">
                        <span>{APP.term('htp_secs_15')}</span>
                    </div>
                    <div className="sub-caption knock-out">
                        <span>{APP.term('htp_knock_out_time')}</span>
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

export default PoolRound;