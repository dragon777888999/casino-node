import React from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const SeeStats = () => {

    return (

        <section className="see-stats dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('baa_how_see_stats')}</span>
                    </div>

                    <div className="sub-caption">
                        <span>{APP.term('baa_daily_update_at')}</span>
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

export default SeeStats;