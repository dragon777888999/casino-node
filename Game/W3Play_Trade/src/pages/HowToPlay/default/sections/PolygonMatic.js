import React from 'react';
import APP from '../../../../app';

import PlayNowButton from '../PlayNowButton';

const PolygonMatic = () => {

    const isDemo = APP.state.get('currentToken') === 'demo',
        desc_txt = isDemo ? 'htp_polygin_matic_demo' : 'htp_polygin_matic';

    return (

        <section className="polygon ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term(desc_txt)}</span>
                    </div>

                    <div className="sub-caption">
                        <span>{APP.term('htp_official_token')}</span>
                    </div>

                    <div className="items">
                        <div className="item"><span>{APP.term('htp_top_token')}</span></div>
                        <div className="item"><span>{APP.term('htp_web3_blockchain')}</span></div>
                        <div className="item"><span>{APP.term('htp_trusted_by_socials')}</span></div>
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

export default PolygonMatic;