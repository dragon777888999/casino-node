
import React, { useEffect, useRef, useState } from 'react';
import { browserName } from 'react-device-detect';
import { Link } from 'react-router-dom';
import APP from '../../app';
import '../../styles/pages/entryScreens/cryptobattles.css';

const CryptoBattles = () => {

    interface Socials {
        src: string,
        ref: string,
    }

    type ScreenDimensions = {
        width: Number,
        height: Number,
    }

    let socials: Socials[] = [
        { src: 'discord', ref: 'https://discord.gg/T4hJG9FDav' },
        { src: 'twiter', ref: 'https://twitter.com/Cryptobattlesio' },
        { src: 'telegram', ref: 'https://t.me/cryptobattlesann' },
        { src: 'book', ref: 'https://docs.cryptobattles.io/' },
        { src: 'youtube', ref: 'https://www.youtube.com/channel/UCVu3BlIaKYw3HsknSTPhzsg' }
    ],
        [windowDimensions, setWindowDimensions] = useState<ScreenDimensions>(getWindowDimensions()),
        videoRef = useRef(undefined),
        androidDevice = navigator.userAgent.match(/Android/i),
        smallDevice = window.innerWidth < 380,

        metamask = (navigator.userAgent.includes("MetaMaskMobile")),
        coinbase = (browserName.toLowerCase() === 'webkit'),
        coinbaseAndroid = (browserName.toLowerCase() === 'chrome webview'),

        walletsBrowser = metamask || coinbase || coinbaseAndroid;

    useEffect(() => {
        // if (windowDimensions?.height > windowDimensions?.width) return;
        videoRef.current.defaultMuted = true;
    }, [])

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return { width: width, height: height };
    }

    function handleResize() {
        setTimeout(() => {
            setWindowDimensions(getWindowDimensions());
        }, 50);
    }

    useEffect(() => {
        window.addEventListener('orientationchange', handleResize);
        return () => window.removeEventListener('orientationchange', handleResize);
    }, []);

    const AnimatedView = () => {

        const [visible, setVisible] = useState<boolean>(false);

        useEffect(() => {
            let timeout = setTimeout(() => {
                setVisible(!visible);
            }, 500);

            return () => clearTimeout(timeout)
        }, [visible])

        return (
            visible ?
                windowDimensions?.height > windowDimensions?.width ?
                    <a className="entry_cryptobattles_quests_link" href='https://crypto-battles.gitbook.io/crypto-battles-litepaper/overview/quests' target='_blank'>
                        <div className="entry_cryptobattles_wallet_dot_mobile"  />
                        <div className="entry_cryptobattles_wallet_dot_desc_mobile">
                            {APP.term('entry_cryptobattles_desc2')}
                        </div>
                    </a>
                    : <a className="entry_cryptobattles_wallet_dot_anim" href='https://crypto-battles.gitbook.io/crypto-battles-litepaper/overview/quests' target='_blank'>
                        <div className="entry_cryptobattles_wallet_dot" />
                        <div className="entry_cryptobattles_wallet_dot_desc">{APP.term('entry_cryptobattles_desc2')}</div>
                    </a> : null
        )
    },

        Landscape = () => (
            <div className="entry_cryptobattles_wrap">
                <div className="entry_cryptobattles_content">
                    <div className="entry_cryptobattles_header">
                        <img className="entry_cryptobattles_header_logo" src="/media/images/entry_screens/crypto battles logo.png" />
                        <img className="entry_cryptobattles_header_desc" src="/media/images/entry_screens/crypto battles logo text.png" />
                        <div className="entry_cryptobattles_header_rights">
                            {APP.term('entry_cryptobattles_header1')}<br />{APP.term('entry_cryptobattles_header2')}
                        </div>
                    </div>
                    <div className="entry_cryptobattles_video_row">
                        <video className="entry_cryptobattles_video" src="/media/images/entry_screens/videoPromo.mp4" ref={videoRef} autoPlay loop muted playsInline />
                    </div>
                    <div className="entry_cryptobattles_bottom">
                        <div className="entry_cryptobattles_bottom_header_row">
                            <p className="entry_cryptobattles_bottom_header">{APP.term('entry_cryptobattles_header3')}</p>
                            <strong className="entry_cryptobattles_bottom_header_bold">&nbsp;{APP.term('entry_cryptobattles_header4')}&nbsp;</strong>
                            <p className="entry_cryptobattles_bottom_header">{APP.term('entry_cryptobattles_header5')}</p>
                        </div>
                        <div className="entry_cryptobattles_bottom_play_row">
                            <div style={{ overflow: 'hidden' }}>
                                <img src="/media/images/entry_screens/dots-right.png" style={{ height: '210%', marginTop: '-2.1em' }} />
                            </div>
                            <Link to={{ pathname: "/trade" }}>
                                <img className="entry_cryptobattles_bottom_play_btn" src="/media/images/entry_screens/enterBattleBtn.png" />
                            </Link>
                            <div style={{ overflow: 'hidden' }}>
                                <img src="/media/images/entry_screens/dots-left.png" style={{ height: '210%', marginTop: '-2.1em' }} />
                            </div>
                        </div>
                        <div className="entry_cryptobattles_wallets_row">
                            <p className="entry_cryptobattles_wallets_row_desc">{APP.term('entry_cryptobattles_desc1')}</p>
                            <AnimatedView />
                            <div>
                                <Link to={{ pathname: "/trade" }}>
                                    <img src="/media/images/entry_screens/metamaskBtn.png" />
                                </Link>
                                <Link to={{ pathname: "/trade" }}>
                                    <img src="/media/images/entry_screens/coinbaseBtn.png" />
                                </Link>
                            </div>
                        </div>
                        <div className="entry_cryptobattles_socials_row">
                            {socials.map((itm, i) => (
                                <a key={i} href={itm.ref} target='_blank'>
                                    <img src={`/media/images/entry_screens/${itm.src}.png`} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <img className="entry_cryptobattles_bottom_img" src="/media/images/entry_screens/shape-bottom.png" />
                </div>
            </div>
        ),
        Portrait = () => (
            <div className="entry_cryptobattles_wrap_mobile">
                <div className="entry_cryptobattles_content_mobile">

                    <div className="entry_cryptobattles_header_mobile">
                        <div className="entry_cryptobattles_header_content_mobile">
                            <img className="entry_cryptobattles_header_logo_mobile" src="/media/images/entry_screens/crypto battles logo.png" />
                            <img className="entry_cryptobattles_header_desc_mobile" src="/media/images/entry_screens/crypto battles logo text.png" />
                            <div className="entry_cryptobattles_header_rights_mobile">
                                {APP.term('entry_cryptobattles_header1')}<br />{APP.term('entry_cryptobattles_header2')}
                            </div>
                        </div>
                    </div>

                    <div className="entry_cryptobattles_video_row_mobile">
                        <video className="entry_cryptobattles_video_mobile" src="/media/images/entry_screens/videoPromo.mp4" ref={videoRef} autoPlay loop muted playsInline />
                    </div>

                    <div className="entry_cryptobattles_bottom_header_row_mobile">
                        <p className="entry_cryptobattles_bottom_header_mobile">{APP.term('entry_cryptobattles_header3')}
                            <strong className="entry_cryptobattles_bottom_header_bold_mobile">&nbsp;{APP.term('entry_cryptobattles_header4')}&nbsp;</strong><br />
                            {APP.term('entry_cryptobattles_header5')}
                        </p>
                    </div>

                    <div className="entry_cryptobattles_play_box_mobile">
                        <Link to={{ pathname: "/trade" }}>
                            <img src="/media/images/entry_screens/enterBattleBtn.png" />
                        </Link>
                    </div>
                    <div className="entry_cryptobattles_wallets_row_mobile">
                        <AnimatedView />
                    </div>
                    <div className="entry_cryptobattles_wallets_desc_box_mobile">
                        <p className="entry_cryptobattles_wallets_row_desc_mobile">
                            {APP.term('entry_cryptobattles_desc1')}
                        </p>
                    </div>
                    <div className="entry_cryptobattles_wallets_box_mobile">
                        <Link to={{ pathname: "/trade" }} className="entry_cryptobattles_metamask">
                            <img src="/media/images/entry_screens/metamaskBtn.png" />
                        </Link>
                        <Link to={{ pathname: "/trade" }} className="entry_cryptobattles_coinbase">
                            <img src="/media/images/entry_screens/coinbaseBtn.png" />
                        </Link>
                    </div>
                    <div className="entry_cryptobattles_bottom_box_mobile">
                        <div className="entry_cryptobattles_bottom_socials_mobile">
                            {socials.map((itm, i) => (
                                <a key={i} href={itm.ref} target='_blank' className="entry_cryptobattles_social_img_link_mobile">
                                    <img src={`/media/images/entry_screens/${itm.src}.png`} className="entry_cryptobattles_social_img_mobile" />
                                </a>
                            ))}
                        </div>
                        <img className="entry_cryptobattles_bottom_img_mobile" src="/media/images/entry_screens/shape-bottom.png" />
                    </div>
                </div>
            </div>
        );


    return (windowDimensions?.height > windowDimensions?.width ? <Portrait /> : <Landscape />)
}

export default React.memo(CryptoBattles);
//