import React from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const GetRevshare = () => {

    return (

        <section className="get-revshare ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('baa_get_rev_share')}</span>
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

export default GetRevshare;