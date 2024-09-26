import React from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const GetProfits = () => {

    return (

        <section className="get-profits ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('baa_get_profits_at')}</span>
                    </div>

                    <div className="sub-caption">
                        <span>{APP.term('baa_direct_to_wallet')}</span>
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

export default GetProfits;