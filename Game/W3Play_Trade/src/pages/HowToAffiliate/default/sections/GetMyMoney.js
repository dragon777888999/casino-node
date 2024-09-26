import React from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const GetMyMoney = () => {

    return (

        <section className="get-my-money ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('baa_how_get_money')}</span>
                    </div>

                    <div className="sub-caption">
                        <span>{APP.term('baa_auto_to_wallet')}</span>
                    </div>

                    <div className="button-flex-wrap web-only flex">
                        <StartNowButton />
                    </div>

                </div>

                <div className="box image-area">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

                <div className="button-flex-wrap mobile-only flex">
                    <StartNowButton />
                </div>

            </div>

        </section>
        
    );

};

export default GetMyMoney;