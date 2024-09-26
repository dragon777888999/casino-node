import React from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const PolygonMatic = () => {

    const isDemo = APP.state.get('currentToken') === 'demo';
    const earnTxt = isDemo ? 'baa_earn_in_polygon_demo' : 'baa_earn_in_polygon';

    return (

        <section className="polygon-matic ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term(earnTxt)}</span>
                    </div>

                    <div className="lines">
                        <p className="line"><span>{APP.term('baa_top_token')}</span></p>
                        <p className="line"><span>{APP.term('baa_web3_blockchain')}</span></p>
                        <p className="line"><span>{APP.term('baa_trusted_by_socials')}</span></p>
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

export default PolygonMatic;