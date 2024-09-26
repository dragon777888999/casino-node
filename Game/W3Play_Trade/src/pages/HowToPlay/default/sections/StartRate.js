import React from 'react';
import APP from '../../../../app';

import PlayNowButton from '../PlayNowButton';

const StartRate = () => {

    return (

        <section className="start-rate ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('htp_start_rate')}</span>
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

export default StartRate;