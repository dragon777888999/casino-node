import React from "react";

const instagram = "https://instagram.com/cryptofights.pro";
const twitter = "https://twitter.com/cryptofightspro";
const telegram = "https://t.me/cryptofightspro";
const discord = "https://discord.gg/cryptofights";

const CryptoFights = ({ isMobileView }) => {
  return (
    <div className={`socials ${isMobileView ? "mobile-only" : "web-only"} flex`}>
      <a href={twitter} target="_blank" className="x-twitter" alt="Twitter" />
      <a href={instagram} target="_blank" className="instagram" alt="Instagram"/>
      <a href={telegram} target="_blank" className="telegram" alt="Telegram" />
      <a href={discord} target="_blank" className="discord" alt="Discord" />
    </div>
  );
};

export default CryptoFights;
