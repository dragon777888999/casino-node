import React from 'react';
import APP from '../../../../app';

const JoinDownPool = () => {

    return (

        <section className="join-down-pool rtl dark seperator">

            <div className="main-flex">

                <div className="box text-area">

                    <div className="caption stripe">
                        <span>{APP.term('htp_join_down_pool')}</span>
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

export default JoinDownPool;