import React from 'react';
import APP from '../../../../app';

const MakeMoney = () => {

    return (

        <section className="make-money rtl bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('baa_make_money_when_friends')}</span>
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

export default MakeMoney;