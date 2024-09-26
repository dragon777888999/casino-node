import React from "react";
import APP from "../../app";

const UtorgSuccess = () => {

    const isDemo = APP.state.get('currentToken') === 'demo';
    const payment_demo = isDemo ? 'utorg_payment_desc_demo' : 'utorg_payment_desc';

    return (
        <div className="p2p_success_wrap">
            <img src='media/images/p2p/thumbup.png' />
            <p>{APP.term('utorg_payment_success')}</p>
            <p className="desc">{APP.term(payment_demo)}</p>
            <p className="desc">{APP.term('utorg_payment_desc2')}</p>
        </div>
    )
}
export default UtorgSuccess;