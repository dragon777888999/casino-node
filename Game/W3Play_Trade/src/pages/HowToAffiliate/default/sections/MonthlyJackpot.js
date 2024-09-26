import React from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const MonthlyJackpot = () => {

    return (

        <section className="monthly-jackpot rtl dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('baa_monthly_jack')}</span>
                    </div>

                    <div className="sub-caption">
                        <span>{APP.term('baa_also_here')}</span>
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

export default MonthlyJackpot;