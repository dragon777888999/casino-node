import React from 'react';
import APP from '../../../../app';

import PlayNowButton from '../PlayNowButton';

const SellSendWins = () => {

    const isDemo = APP.state.get('currentToken') === 'demo',
        how_sell_txt = isDemo ? 'htp_how_sell_send_wins_demo' : 'htp_how_sell_send_wins',
        swap_service_txt = isDemo ? 'htp_our_swap_service_demo' : 'htp_our_swap_service',
        sell_txt = isDemo ? 'htp_sell_easily_demo' : 'htp_sell_easily',
        send_txt = isDemo ? 'htp_send_easily_demo' : 'htp_send_easily';

    return (

        <section className="sell-send-wins ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term(how_sell_txt)}</span>
                    </div>

                    <div className="text-flex">

                        <div className="sub-caption">
                            <span>{APP.term(sell_txt)}</span>
                        </div>

                        <div className="separator-flex">
                            <div className="separator"></div>
                            <div className="text"><span>{APP.term('htp_or')}</span></div>
                            <div className="separator"></div>
                        </div>

                        <div className="sub-caption">
                            <span>{APP.term(send_txt)}</span>
                        </div>

                        <div className="separator-flex">
                            <div className="separator"></div>
                            <div className="text"><span>{APP.term('htp_or')}</span></div>
                            <div className="separator"></div>
                        </div>

                        <div className="sub-caption">
                            <span>{APP.term(swap_service_txt)}</span>
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

export default SellSendWins;