
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import APP from '../app';
import { set_app_lang, set_entry_tutorial_index } from '../REDUX/actions/main.actions';
import state from '../state';
import ga4Event from '../utils/ga4.event';
import Socials from './EntryScreens/Socials';
import BubbleTutorial from './EntryScreens/tutorials/BubbleTutorial';

const entryPage = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const lang = useSelector(state => state.mainRememberReducer.app_lang);
    const entry_tutorial_idx = useSelector(state => state.mainRememberReducer.entry_tutorial_idx);
    const [langSelector, setLangSelect] = useState(false);
    const unactive_tutorial = state.total_entry_tutorial_bubbles + 1 > entry_tutorial_idx;
    const currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool);
	const defaultRoute = currentPoolDetails?.route || "/trade";
    const [tutorial, setTutorial] = useState(false);
    // const defaultLogo = "/media/images/logos/upvsdown.svg";
    const logo = APP?.controller?.cfg;
    const isDemo = APP.state.get('currentToken') === 'demo';
    const desc_txt = isDemo ? 'polygon_matic_demo' : 'polygon_matic';

    // update chosen lang and its flag
    const updateLang = (itm) => {
        dispatch(set_app_lang({ ...itm, changed_by_user: true }));
        ga4Event("user's default language changed", 'language_changed')
        APP.state.set('customer.flag', itm?.src);
        APP.state.set('customer.lang', { code: itm?.code, lang: itm?.lang });
        APP.state.set('lang_open', false);
        window.location.reload();
        // close popup
        setLangSelect(false);
    };

    const onClickNext = () => {
        const settings = {};
        const { search } = window.location;
        ga4Event("click on any first buttons leading to the trading page", '1_play_now')
        settings.pathname = defaultRoute;
        if (search) settings.search = search;
        navigate(settings);
    };

    // open bubbles tutorial
    // const onInfoClick = () => {
    //     dispatch(set_entry_tutorial_index(1))
    // }

    // open bubbles tutorial
    const skipBubblesTutorial = () => {
        dispatch(set_entry_tutorial_index(6))
        onClickNext()
    }

    useEffect(() => {
        if (entry_tutorial_idx < 5) {
            dispatch(set_entry_tutorial_index(1))
        }
    }, [])

    return <div className="entry_screen" id="entry_screen">

        <div className="entry-main-flex">

            {/* Socials */}
            <Socials />

            {/* LANGUAGE SELECTOR */}
            <div className={"entry_screen_langs " + (!unactive_tutorial ? 'entry_screen_langs_indexed' : '')}>

                <div className="entry_screen_active_lang" onClick={() => setLangSelect(!langSelector)}>
                    <img className="entry_screen_active_lang_flag" src={`/media/images/flags/${lang?.src || 'usa'}.svg`} alt="flag" />
                    <img className="entry_screen_down_arr" src='/media/images/entry_screens/downArr.png' alt="chevron" />
                </div>

                {langSelector &&
                    <div className="entry_screen_lang_selector">
                        <img src='/media/images/entry_screens/entryLangBg.png' className="entry_screen_langs_bg" />
                        <div className="entry_screen_langs_list">
                            {state.langCfg.map((itm, i) => (
                                <div key={i} className="entry_screen_lang_btn" onClick={() => updateLang(itm)}>
                                    <img src={`/media/images/flags/${itm?.src}.svg`} className="entry_screen_lang_flag" />
                                    <p className="entry_screen_lang_desc"><span>{itm?.lang}</span></p>
                                </div>
                            ))}
                        </div>
                    </div>}

            </div>

            {/* LOGO / PARTNER LOGO */}
            <div className="entry-logo-box">
                {(logo && logo.partnerInfo && logo.partnerInfo.logoUrl) && <img src={logo.partnerInfo.logoUrl} />}
                {/* <img src={logo?.partnerInfo?.logoUrl ? logo?.partnerInfo?.logoUrl : defaultLogo} /> */}
            </div>

            {/* MAIN WHITE TEXT */}
            <div className="white-text-flex">
                <div className="bitcoin-image"></div>
                <div className="up-vs-down"><span>{APP.term('up_or_down')}</span></div>
                <div className="web3-pool-game"><span>{APP.term('web3_trading_game')}</span></div>
            </div>


            {/* HOLDING PHONE IMAGE */}
            <div className="holding-phone-box">
                <div className="holding-phone-background"></div>
                <div className="holding-phone-image"></div>
            </div>

            {/* LEFT SIDE ICONS */}
            <div className={"entry-icons-box " + (entry_tutorial_idx != 5 ? "entry-icons-box-indexed" : "")}>
                <div className={"entry-icon-box web3 " + (entry_tutorial_idx !== 1 && unactive_tutorial ? "unindexed_elm" : '')}
                    onClick={() => dispatch(set_entry_tutorial_index(1))}>
                    <div className="entry-web3-info">
                        <img className="entry-info-icon" src="/media/images/web3-info.png" />
                        <div className="entry-icon-image"></div>
                    </div>
                    <div className="entry-icon-top-text"><span>{APP.term('web3_dapp')}</span></div>
                    <div className="entry-icon-bottom-text"><span>{APP.term('no_registration')}</span></div>
                </div>
                <div className={"entry-icon-box blockchain " + (entry_tutorial_idx !== 2 && unactive_tutorial ? "unindexed_elm" : '')}
                    onClick={() => dispatch(set_entry_tutorial_index(2))}>
                    <div className="entry-icon-image"></div>
                    <div className="entry-icon-top-text"><span>{APP.term('blockchain')}</span></div>
                    <div className="entry-icon-bottom-text"><span>{APP.term(desc_txt)}</span></div>
                </div>
                <div className={"entry-icon-box secure " + (entry_tutorial_idx !== 3 && unactive_tutorial ? "unindexed_elm" : '')}
                    onClick={() => dispatch(set_entry_tutorial_index(3))}>
                    <div className="entry-icon-image"></div>
                    <div className="entry-icon-top-text"><span>{APP.term('secure')}</span></div>
                    <div className="entry-icon-bottom-text"><span>{APP.term('no_deposit')}</span></div>
                </div>
                <div className={"entry-icon-box decentralized " + (entry_tutorial_idx !== 4 && unactive_tutorial ? "unindexed_elm" : '')}
                    onClick={() => dispatch(set_entry_tutorial_index(4))}>
                    <div className="entry-icon-image"></div>
                    <div className="entry-icon-top-text"><span>{APP.term('decentralized')}</span></div>
                    <div className="entry-icon-bottom-text"><span>{APP.term('transparency')}</span></div>
                </div>
            </div>

            {/* "PLAY TO EARN" BUTTON */}
            <div className="play-to-earn-box">
                <div onClick={onClickNext}>
                    <span>{APP.term('play_to_earn_crypto')}</span>
                </div>
            </div>

            {/* GREEN DISCLAIMER TEXT */}
            <div className={"green-text-box " + (entry_tutorial_idx == 5 ? "indexed_elm" : '')}>
                <span>{APP.term('wins_to_wallet')}</span>
            </div>
            {entry_tutorial_idx < (state.total_entry_tutorial_bubbles + 1)
                && (<BubbleTutorial entry_tutorial_idx={entry_tutorial_idx}
                    onClickNext={skipBubblesTutorial} />)}

        </div>


    </div>;

};

export default function EntryScreen({ onContinue }) {
    return (
        <div className="page trade_page">
            {entryPage(onContinue)}
        </div>
    );
};