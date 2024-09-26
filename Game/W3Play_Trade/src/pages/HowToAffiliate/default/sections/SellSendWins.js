import React from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const SellSendWins = () => {

    const isDemo = APP.state.get('currentToken') === 'demo';
    const descTxt = isDemo ? 'baa_how_sell_send_wins_demo' : 'baa_how_sell_send_wins';
    const swapTxt = isDemo ? 'baa_our_swap_service_demo' : 'baa_our_swap_service';
    const sellTxt = isDemo ? 'baa_sell_easily_demo' : 'baa_sell_easily';
    const sendTxt = isDemo ? 'baa_send_easily_demo' : 'baa_send_easily';

    return (

        <section className="sell-send-wins ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term(descTxt)}</span>
                    </div>

                    <div className="text-flex">

                        <div className="text-block">
                            <span>{APP.term(sellTxt)}</span>
                        </div>

                        <div className="or-flex">
                            <div className="hr"></div>
                            <div className="text"><span>{APP.term('baa_or')}</span></div>
                            <div className="hr"></div>
                        </div>

                        <div className="text-block">
                            <span>{APP.term(sendTxt)}</span>
                        </div>

                        <div className="or-flex">
                            <div className="hr"></div>
                            <div className="text"><span>{APP.term('baa_or')}</span></div>
                            <div className="hr"></div>
                        </div>

                        <div className="text-block">
                            <span>{APP.term(swapTxt)}</span>
                        </div>

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

export default SellSendWins;