import React from "react";
import APP from "../../app";

const Success = () => {
    
    const isDemo = APP.state.get('currentToken') === 'demo',
        payment_txt = isDemo ? 'p2p_payment_desc_demo' : 'p2p_payment_desc';

    return (
        <div className="p2p_success_wrap">
            <img src='media/images/p2p/thumbup.png' />
            <p>{APP.term('p2p_payment_success')}</p>
            <p className="desc">{APP.term(payment_txt)}</p>
        </div>
    )
}

export default Success;