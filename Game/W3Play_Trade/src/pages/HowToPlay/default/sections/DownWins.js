import React from 'react';
import APP from '../../../../app';

const DownWins = () => {

    return (

        <section className="down-wins ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="sub-caption stripe">
                        <span>{APP.term('htp_lower_than_rate')}</span>
                    </div>

                    <div className="caption">
                        <span>{APP.term('htp_down_wins')}</span>
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

export default DownWins;