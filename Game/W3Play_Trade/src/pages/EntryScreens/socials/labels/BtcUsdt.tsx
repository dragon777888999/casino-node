import React from "react";

let qverse = 'https://qverse.me/',
    ioosa = 'https://ioosa.tech/';

const BtcUsdt = () => (

    <div className="btcusdt_partnership">
        <p>Powered by:</p>
        <a href={qverse} target="_blank">
            <img src='media/images/btcusdt_label/qlogos.png' className="first_img" />
        </a>
        <p>in partnership with:</p>
        <a href={ioosa} target="_blank">
            <img src='media/images/btcusdt_label/ioosa.png' className="second_img" />
        </a>
    </div>
)

export default BtcUsdt;