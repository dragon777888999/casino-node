import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './BTCBattles.css';

const BTCBattles = () => {

    const navigate = useNavigate();
    const navParent = useRef();
    const navInner = useRef();
    const [mobileMenuOpen, setMobileMenuOpen] = useState();

    const onClickHamburger = () => {
        setMobileMenuOpen(prev => {
            if(prev) navParent.current.style.maxHeight = '0';
            else navParent.current.style.maxHeight = `${navInner.current.offsetHeight}px`;
            return !prev;
        });
    };

    const onClickNext = (navigateTo) => {
        const settings = {};
        const { search } = window.location;
        settings.pathname = navigateTo;
        if(search) settings.search = search;
        navigate(settings);
    };

    return (

        <div className="btcbattles-wrap">

            <div className="btcbattles-main">

                {/* HEADER */}
                <header className={`${(mobileMenuOpen ? 'mobile-menu-open' : '')}`}>

                    <div className="logo"></div>

                    <div class="hamburger" onClick={onClickHamburger}>
                        <div class="top"></div>
                        <div class="middle"></div>
                        <div class="bottom"></div>
                    </div>
                    
                    <nav ref={navParent}>
                        <div ref={navInner} className="nav-ul-wrap">
                            <ul>
                                <li><a href="#how-it-works"><span>HOW IT WORKS</span></a></li>
                                <li><a href="#what-is-p2e"><span>WHAT IS PLAY-2-EARN</span></a></li>
                                <li><div onClick={() => {onClickNext('faq')}}><span>FAQ</span></div></li>
                                <li className="play-now"><div onClick={() => {onClickNext('trade')}}><span>PLAY NOW</span></div></li>
                            </ul>
                        </div>
                    </nav>

                </header>

                {/* Decentralized Social Pool Prediction Gaming */}
                <section className="decentralized">
                    <div className="decentralized-bg"></div>
                    <div className="decentralized-overlay"></div>
                    <div className="decentralized-content">
                        <div className="floating-logo logo-1"></div>
                        <div className="floating-logo logo-2"></div>
                        <div className="floating-logo logo-3"></div>
                        <div className="floating-logo logo-4"></div>
                        <div className="floating-logo logo-5"></div>
                        <h2><span>Decentralized Social Pool Prediction Gaming</span></h2>
                        <p className="based"><span>Based on a Polygon Blockchain</span></p>
                        <p className="fully-transparent"><span>BTCBattles.com is a <b>Fully Transparent and Anonymous</b> DeFi Game Which Allows Players to Make Predictions on the Price of Bitcoin and Earn Rewards for Playing It</span></p>
                        <div onClick={() => {onClickNext('trade')}} className="play-now-button"><span>PLAY NOW</span></div>
                        <div className="certik-button"><a target="_blank" href="https://skynet.certik.com/projects/upvsdown"></a></div>
                    </div>
                </section>

                {/* THREE ICONS ON THE LEFT */}
                <section className="security">
                    <div className="left-icons">
                        <div className="icon-security"><span>Security & Fairness</span></div>
                        <div className="icon-play"><span>Play & Earn Rewards</span></div>
                        <div className="icon-transparent"><span>Transparent Smart Contract</span></div>
                    </div>
                </section>

                {/* HOW IT WORKS */}
                <section className="how-it-works" id="how-it-works">
                    <h2 className="pink-h2"><span>HOW IT WORKS</span></h2>
                    <div className="items-row top-row">
                        <div className="item step-1">
                            <h2 className="blue-h2"><span>SIGN UP & TOP-UP</span></h2>
                            <div className="text"><span>We Support the registration via Email, Social Networks and Digital Wallets. You can Directly Link Your Digital Wallet or Top-Up Balance via Credit/Debit Card or Crypto Payment.</span></div>
                        </div>
                        <div className="item step-2">
                            <h2 className="blue-h2"><span>SELECT YOUR BET</span></h2>
                            <div className="text"><span>You Will be Investing MATIC, Polygon's Native Currency Coin.</span></div>
                        </div>
                        <div className="item step-3">
                            <h2 className="blue-h2"><span>JOIN THE POOL</span></h2>
                            <div className="text"><span>Join UP Pool if You Think BTC Price is Going Up or Join Down Pool if You Think BTC Price is Going Down.</span></div>
                        </div>
                    </div>
                    <div className="items-row bottom-row">
                        <div className="item step-4">
                            <h2 className="blue-h2"><span>APPROVE YOUR BET</span></h2>
                            <div className="text"><span>Sign the Smart Contract in Your Digital Wallet to Approve Your Trade and Join the Selected Pool.</span></div>
                        </div>
                        <div className="item step-5">
                            <h2 className="blue-h2"><span>EARNINGS DISTRIBUTION</span></h2>
                            <div className="text"><span>At the End of The Round, The Winners will get Their Earnings Directly to the Same Digital Wallet they Signed the Trade With.</span></div>
                        </div>
                    </div>
                </section>

                {/* WHAT IS A PLAY-2-EARN GAME */}
                <section className="play-to-earn">
                    <div className="divided">
                        <div className="image-part"><div></div></div>
                        <div className="text-part">
                            <h2 className="pink-h2" id="what-is-p2e"><span>WHAT IS A PLAY-2-EARN GAME</span></h2>
                            <p><span>Players can earn cryptocurrency through the strategic play. We have no intermediaries, transfers are happening directly to the players, Peer-to-Peer. This is the essence of the Web3 Play-2-Earn (P2E) games.</span></p>
                            <p><span>This fun and engaging experience is based on a real-time Bitcoin price. If the price goes up and you placed a bet on it, you win. If the price goes down and you placed a bet on it, you win.</span></p>
                            <p><span>Blockchain technology allows us to be 100% transparent and fair. Our smart contracts are open and anybody can audit them.</span></p>
                            <div className="join-and-play-button" onClick={() => {onClickNext('trade')}}><span>JOIN AND PLAY</span></div>
                        </div>
                    </div>
                </section>

                {/* GAMEPLAY MODES */}
                <section className="gameplay-modes">
                    <h2 className="pink-h2"><span>GAMEPLAY MODES</span></h2>
                    <div className="gameplay-totem">
                        <div className="totem-image"></div>
                        <div className="totem-list">
                            <div><span><b>60 Seconds</b> Game Duration</span></div>
                            <div><span><b>30 Seconds</b> to Invest</span></div>
                            <div><span><b>30 Seconds</b> for Getting Results</span></div>
                            <div><span><b>Medium</b> Player Pool</span></div>
                        </div>
                        <div className="totem-button">
                            <div onClick={() => {onClickNext('trade')}}><span>PLAY NOW</span></div>
                        </div>
                    </div>
                </section>

                {/* 100% TRANSPARENT AND SECURE */}
                <section className="transparent">
                <h2 className="pink-h2"><span>100% Transparent and Secure</span></h2>
                    <div className="transparent-items">
                        <div className="item dxfeed">
                            <div className="image"></div>
                            <h2 className="blue-h2"><span>Real-Time Bitcoin Price</span></h2>
                            <p><span>The use of DxFeed helps to ensure the accuracy and reliability of data used in the game. It helps prevent manipulations and arbitrage by providing real-time, high-quality financial market data. This helps to ensure fair gameplay and results for all players, making the game more trustworthy and secure for all participants. See the <a href="https://dxfeed.com/" target="_blank">dxFeed Website</a>.</span></p>
                        </div>
                        <div className="item polygon">
                            <div className="image"></div>
                            <h2 className="blue-h2"><span>Fast and Secure Blockchain</span></h2>
                            <p><span>The game utilizes smart contracts on the blockchain network to ensure the integrity and security of all transactions and game results. These smart contracts are transparent and tamper-proof, providing a secure and fair environment for all players. Additionally, the use of digital wallets for investments adds an extra layer of security by requiring players to confirm their transactions. Check out our <a href="https://polygonscan.com/address/0x7a7726273407287c7926bd177f482d1442a79d27" target="_blank">Smart-Contract</a> on a Polygon Network.</span></p>
                        </div>
                        <div className="item certik">
                            <div className="image"></div>
                            <h2 className="blue-h2"><span>Audited and Verified Smart Contract</span></h2>
                            <p><span>Besides our Smart Contract is Open, it is Also Audited and Verified by CertiK, one of the Pioneers of Web3 Security and Audit Companies. You Can See the CertiK Audit Page <a href="https://skynet.certik.com/projects/upvsdown" target="_blank">here</a>.</span></p>
                        </div>
                    </div>
                </section>

                {/* FOOTER */}
                <footer>
                    <p className="all-rights-reserved"><span>All Rights Reserved. Developed by BTCBattles.</span></p>
                    <div className="footer-socials">
                        <a href="https://twitter.com/btc_battles" target="_blank" className="social-icon icon-twitter fa-brands fa-twitter"></a>
                        <a href="https://discord.gg/YYDFA9Pkmh" target="_blank" className="social-icon icon-discord fa-brands fa-discord"></a>
                    </div>
                </footer>
                {/* <i class="fa-brands fa-discord"></i> */}
                <div className="sticky-socials">
                    <a href="https://twitter.com/btc_battles" target="_blank" className="social-icon icon-twitter fa-brands fa-twitter"></a>
                    <a href="https://discord.gg/YYDFA9Pkmh" target="_blank" className="social-icon icon-discord fa-brands fa-discord"></a>
                </div>

            </div>

        </div>

    );

};

export default BTCBattles;