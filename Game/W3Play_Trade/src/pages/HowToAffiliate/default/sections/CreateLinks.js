import React from 'react';
import APP from '../../../../app';

import StartNowButton from '../StartNowButton';

const CreateLinks = () => {

    return (

        <section className="create-links bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('baa_create_aff_links')}</span>
                    </div>

                    <div className="sub-caption">
                        <span>{APP.term('baa_as_many_as_you_want')}</span>
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

export default CreateLinks;