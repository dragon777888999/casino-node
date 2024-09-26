import React from 'react';
import APP from '../../../../app';

const JoinUpPool = () => {

    return (

        <section className="join-up-pool ltr bright seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('htp_join_up_pool')}</span>
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

export default JoinUpPool;