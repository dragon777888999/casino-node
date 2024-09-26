import React from 'react';
import APP from '../../../../app';

const SelectInvest = () => {

    return (

        <section className="select-invest rtl bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('htp_invest_bar_select')}</span>
                    </div>

                    <div className="bar-image"></div>

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

export default SelectInvest;