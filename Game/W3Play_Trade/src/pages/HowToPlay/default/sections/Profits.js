import React from 'react';
import APP from '../../../../app';

import PlayNowButton from '../PlayNowButton';

const Profits = () => {

    return (

        <section className="profits rtl dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('htp_profits')}</span>
                    </div>

                    <div className="text-small">
                        <span>{APP.term('htp_profits_divided')}</span>
                    </div>

                    <div className="text-big">
                        <span>{APP.term('htp_profits_into_wallets')}</span>
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

export default Profits;