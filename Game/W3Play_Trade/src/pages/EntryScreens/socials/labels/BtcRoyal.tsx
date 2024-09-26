
import React from "react";

let twitter = 'https://twitter.com/BTC__Royal',
    instagram = 'https://www.instagram.com/btcroyal.io/',
    facebook = 'https://www.facebook.com/profile.php?id=61551055876369',
    tiktok = 'https://www.tiktok.com/@btc_royal?_t=8foLj9h0zuk';

const BtcRoyal = () => (

    <div className="socials">
        <a href={twitter} target="_blank">
            <img src='media/images/entryscreen/twitter.png' />
        </a>
        <a href={instagram} target="_blank">
            <img src='media/images/entryscreen/instagram.png' />
        </a>
        <a href={facebook} target="_blank">
            <img src='media/images/entryscreen/facebook.png' />
        </a>
        <a href={tiktok} target="_blank">
            <img src='media/images/entryscreen/tiktok.png' />
        </a>
    </div>
)

export default BtcRoyal;