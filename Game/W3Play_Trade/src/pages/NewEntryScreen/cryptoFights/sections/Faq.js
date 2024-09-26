import React, { useState, useEffect, useRef } from "react";
import { /*useDispatch,*/ useSelector } from 'react-redux';

import APP from "../../../../app";
import faqAPI from '../../../../API/faq';

import PlayNowButton from "../PlayNowButton";

const Faq = () => {

    const wrap_ref = useRef();
    const [content, setContent] = useState([]);
    const [activeTab, setActiveTab] = useState(APP.state.get('special_tab') || 'about');
    const [openedHeader, setOpenedHeader] = useState('');
    const [faqDropDown, setFaqDropDown] = useState(false);
    const lang = useSelector(state => state.mainRememberReducer.app_lang) || 'en';

    const getFaqData = async (lang) => {
        let res = await faqAPI.getFaq(lang?.code || 'en');
        if (Object.values(res?.data).length && !res?.error) setContent(res.data);
        else getFaqData('en');
    }

    const headersList = Object.keys(content).map((itm, i) => {

        const headerTitle = Object.values(content)[i][0].title;

        // set new header + close dropdown box
        const selectNewHeader = (faqDropDown, itm) => {
            setFaqDropDown(!faqDropDown)
            setActiveTab(itm)
        };

        return (
            <div key={i} className="faq-header-list-item" onClick={() => selectNewHeader(faqDropDown, itm)}>
                <p activetab={itm === activeTab ? 'true' : 'false'}>
                    <span>{headerTitle}</span>
                </p>
            </div>
        );

    });

    const formatFaqIndex = (value) => {
        return (++value < 10 ? `0${value}` : `${value}`);
    };

    const contentList = content[activeTab]?.map((itm, i) => {

        const rotate = (i, openedHeader) => { setOpenedHeader(openedHeader == i ? '' : i) };

        return (

            <div key={i} className="faq-content-row">

                <div className="faq-content-header" onClick={() => rotate(itm?.id, openedHeader)}>
                    <p className="faq-record-num"><span>{formatFaqIndex(i)}</span></p>
                    <p className="faq-content-header-desc"><span>{itm?.question}</span></p>
                    {openedHeader === itm?.id ? <div className="faq-content-content-arr"></div> : <div className="faq-content-header-arr"></div>}
                </div>

                {openedHeader == itm?.id ?
                    <div className="faq-content-content">
                        <p className="faq-content-content-desc"><span dangerouslySetInnerHTML={{ __html: itm?.answer }}></span></p>
                    </div> : null}

            </div>

        );

    });

    useEffect(() => {
        if(lang) getFaqData(lang);
        return () => APP.state.unset('special_tab');
    }, []);

    return (

        <section className="entry-section white entry-faq">

            <div className="main-flex">

                <div className="faq-wrap">

                    <div className="left">

                        <div className="caption">
                            <span>F.A.Q.</span>
                        </div>

                        {/* <div className="faq-header-current-list" onClick={() => setFaqDropDown(!faqDropDown)}>
                            <p><span>{content[activeTab]?.[0]?.title}</span></p>
                            <div rotate={faqDropDown ? 'true' : "false"} />
                        </div> */}

                        {/* {faqDropDown && ( */}
                            <div className="faq-header-drop-list">
                                {headersList}
                            </div>
                        {/* )} */}

                        <div className="play-now-box web-only flex">
                            <PlayNowButton />
                        </div>

                    </div>

                    <div className="right" ref={wrap_ref}>

                        <div className="faq-content">
                            {contentList}
                            {activeTab === 'wallet' && (<div className="faq-bottom-desc">
                                <p className="please-note"><span>{APP.term('faq_bottom_header')}</span></p>
                                <p className="we-want"><span>{APP.term('faq_bottom_desc')}</span></p>
                            </div>)}
                        </div>

                    </div>

                </div>

                <div className="play-now-box mobile-only flex">
                    <PlayNowButton />
                </div>

                {/* <PlayNowButton /> */}

            </div>

        </section>

    );

};

export default Faq;