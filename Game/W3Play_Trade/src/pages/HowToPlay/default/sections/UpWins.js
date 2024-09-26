import React from 'react';
import APP from '../../../../app';

const UpWins = () => {

    return (

        <section className="up-wins rtl dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="sub-caption stripe">
                        <span>{APP.term('htp_higher_than_rate')}</span>
                    </div>

                    <div className="caption">
                        <span>{APP.term('htp_up_wins')}</span>
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

export default UpWins;