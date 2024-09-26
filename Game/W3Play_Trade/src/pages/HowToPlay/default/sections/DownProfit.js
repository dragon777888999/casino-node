import React from 'react';
import APP from '../../../../app';

const DownProfit = () => {

    return (

        <section className="down-profit ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('htp_down_pot_profit')}</span>
                    </div>

                    {/* <div className="sub-caption">
                        <span>UP POOL POTENTIAL PROFIT</span>
                    </div> */}

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

export default DownProfit;