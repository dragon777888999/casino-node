import React from 'react';
import APP from '../../../../app';

const WeeklyJackpot = () => {

    return (

        <section className="jackpot-weekly ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('htp_weekly_jack')}</span>
                    </div>

                    <div className="text-big">
                        <span>{APP.term('htp_income_raffled')}</span>
                    </div>

                    <div className="text-small">
                        <span>{APP.term('htp_prize_pools')}</span>
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

export default WeeklyJackpot;