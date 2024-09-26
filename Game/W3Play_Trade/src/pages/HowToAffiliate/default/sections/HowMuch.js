import React from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const HowMuch = () => {

    return (

        <section className="how-much dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('baa_how_much_i_get')}</span>
                    </div>

                </div>

                <div className="box image-area">
                    <div className="image-wrap">
                        <div></div>
                    </div>
                </div>

                <div className="button-flex-wrap">
                    <StartNowButton />
                </div>

                {/* <div className="button-flex-wrap web-only flex">
                    <StartNowButton />
                </div> */}

                {/* <div className="button-flex-wrap mobile-only flex">
                    <StartNowButton />
                </div> */}

            </div>

        </section>
        
    );

};

export default HowMuch;