
import React from "react";

let twitter = 'https://twitter.com/Polywin8',
    instagram = 'https://www.instagram.com/polywin8',
    telegram = 'https://t.me/polywin8';

const PolyWin = () => (

    <div className="socials">
        <a href={twitter} target="_blank">
            <img src='media/images/entryscreen/twitter.png' />
        </a>
        <a href={instagram} target="_blank">
            <img src='media/images/entryscreen/instagram.png' />
        </a>
        <a href={telegram} target="_blank">
            <img src='media/images/entryscreen/telegram.png' />
        </a>
    </div>
)

export default PolyWin;