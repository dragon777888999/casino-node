import React from 'react';
import APP from '../../../../app';

import PlayNowButton from '../PlayNowButton';

const GetMaticToken = () => {

    const isDemo = APP.state.get('currentToken') === 'demo',
        buy_token_txt = isDemo ? 'htp_buy_matic_token_demo' : 'htp_buy_matic_token',
        exchange_other_txt = isDemo ? 'htp_exchange_other_demo' : 'htp_exchange_other',
        how_token_txt = isDemo ? 'htp_how_matic_token_demo' : 'htp_how_matic_token';

    return (

        <section className="get-matic-token rtl dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term(how_token_txt)}</span>
                    </div>

                    <div className="text-flex">

                        <div className="sub-caption">
                            <span>{APP.term(buy_token_txt)}</span>
                        </div>

                        <div className="separator-flex">
                            <div className="separator"></div>
                            <div className="text"><span>{APP.term('htp_or')}</span></div>
                            <div className="separator"></div>
                        </div>

                        <div className="sub-caption">
                            <span>{APP.term(exchange_other_txt)}</span>
                        </div>

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

export default GetMaticToken;