import React from "react";
import APP from "../../app";

const Failure = () => (
    <div className="p2p_failure_wrap">
        <img src='media/images/p2p/thumbdown.png' />
        <p>{APP.term('p2p_payment_fail')}</p>
    </div>
)

export default Failure;