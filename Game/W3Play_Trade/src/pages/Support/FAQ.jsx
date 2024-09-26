import React, { useEffect, useRef, useState } from 'react';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async
import { Link } from 'react-router-dom';
import APP from '../../app';
import '../../styles/pages/faq.scss';
import faq from '../../API/faq';
// import useAppState from '../../hooks/useAppState';
import { useSelector } from 'react-redux';
import { browserName } from 'react-device-detect';
import state from '../../state';
import { affilite_page_cfg } from '../../utils/affiliate_pages_cfg';
import HelmetManager from '../../comp/HelmetManager';

function open_menu() {
    APP.state.set('menu_open', true)
}

export const FAQ = () => {

    const wrap_ref = useRef();
    const [content, setContent] = useState([]);
    const [activeTab, setActiveTab] = useState(APP.state.get('special_tab') || 'about');
    const [openedHeader, setOpenedHeader] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const lang = useSelector(state => state.mainRememberReducer.app_lang) || 'en';
    const currentPage = 'faq';

    // faq content
    const getData = async (lang) => {
        let res = await faq.getFaq(lang?.code || 'en');
        if (Object.values(res?.data).length && !res?.error) setContent(res.data);
        else getData('en');
    }

    // //set special tab for FAQ page
    // const faqTab = (page) => {
    //     if (page !== 'faq') return;
    //     APP.state.set('special_tab', 'affiliate');
    // };

    const FaqMobileDropdown = () => {

        if (!Object.keys(content).length) return null;

        const [menuOpen, setMenuOpen] = useState(false);
        const categories = [];
        let active;

        Object.keys(content).forEach((itm, i) => {
            const title = Object.values(content)[i][0].title;
            const obj = { title: title, id: itm };
            if (itm !== activeTab) return categories.push(obj);
            active = obj, categories.push({ ...obj, isActive: true });
        });

        const onClickActive = () => {
            setMenuOpen((prev) => !prev);
        };

        const onClickCategory = (id) => {
            setActiveTab(id);
            setMenuOpen(false);
        };

        return (

            <div className={`faq-mobile-dropdown mobile-view ${menuOpen ? 'open' : ''} `}>

                <HelmetManager
                    title="FAQ"
                    description="FAQ: Answers to Your Questions About Trading, Gaming, Earning, DeFi, and Earnings on Our Platform."
                    keywords="p2p Crypto,what is p2 crypto ,what is defi wallet , P2P trading, , defi crypto UpvsDown"
                    canonical="/faq"
                />

                <div className="mobile-dropdown-wrap">

                    <div className="faq-active-category"
                        onClick={onClickActive}>
                        <span>{active.title}</span>
                    </div>

                    <div className={`faq-categories ${menuOpen ? '' : 'hidden'}`}>
                        {categories.map(item => {
                            if (item.id === activeTab) return <div className="faq-category disabled" key={item.id}><span>{item.title}</span></div>;
                            else return <div className="faq-category" key={item.id} onClick={() => onClickCategory(item.id)}><span>{item.title}</span></div>;
                        })}
                    </div>

                </div>

            </div>

        );

    };

    const headersList = Object.keys(content).map((itm, i) => {

        const headerTitle = Object.values(content)[i][0].title;

        // set new header + close dropdown box
        function selectNewHeader(dropDown, itm) {
            setDropDown(!dropDown)
            setActiveTab(itm)
        }

        return (
            <div key={i} className="faq_header_list_item" onClick={() => selectNewHeader(dropDown, itm)}>
                <p activetab={itm === activeTab ? 'true' : 'false'}>
                    {headerTitle}
                </p>
            </div>
        );

    });

    const contentList = content[activeTab]?.map((itm, i) => {

        const rotate = (i, openedHeader) => { setOpenedHeader(openedHeader == i ? '' : i) };

        return (

            <div key={i} className="faq_content_row">

                <div className="faq_content_header" onClick={() => rotate(itm?.id, openedHeader)}>
                    <p className="faq_content_header_desc">{itm?.question}</p>
                    {openedHeader === itm?.id ? <div className="faq_content_content_arr"></div> : <div className="faq_content_header_arr"></div>}
                </div>

                {openedHeader == itm?.id ?
                    <div className="faq_content_content">
                        <p className="faq_content_content_desc" dangerouslySetInnerHTML={{ __html: itm?.answer }}></p>
                    </div> : null}

            </div>
        );

    });

    // scroll to end of container if page is rotated
    useEffect(() => {
        if (lang) getData(lang);
        return () => APP.state.unset('special_tab');
    }, []);

    return (

        <div>

            <div className="page faq_page faq_page text_page">

                <div className="faq_header">

                    <img src="/media/images/faqHeader.png" className="faq_header_bg" />

                    <div className="faq_top_header">

                        <Link to={-1} className="faq_back_btn"></Link>

                        {/* <img src="/media/images/text/faq.png" className="faq_header_img default-web-view" /> */}
                        <p className="faq_header_txt_web"><span>{APP.term('faq_page_title')}</span></p>
                        <p className="golden-title mobile-view"><span>{APP.term('faq_page_title')}</span></p>

                        <button className="faq_menu_btn" onClick={open_menu}>
                            <img src="/media/images/menu.svg" />
                        </button>

                    </div>

                    {/* <div className="top_link right mobile-view">
                        {state?.affiliate_pages?.map((itm, i) => (
                            <Link key={i} to={{ pathname: itm?.pathName }} className="link_btn" onClick={() => faqTab(itm?.page)}>
                                <div className={currentPage === itm?.page ? "link_btn_img_box_active" : "link_btn_img_box"}>
                                    <img src={'/media/images/affiliate/' + itm?.src} data-img={i} />
                                </div>
                                <p className={currentPage === itm?.page ? "link_btn_content_active" : "link_btn_content"}>{affilite_page_cfg(itm?.content)}</p>
                            </Link>
                        ))}
                    </div> */}

                    <FaqMobileDropdown />
                    <div className="faq_header_list">
                        <div className="faq_header_current_list" onClick={() => setDropDown(!dropDown)}>
                            <p>{content[activeTab]?.[0]?.title}</p>
                            <div rotate={dropDown ? 'true' : "false"} />
                        </div>
                        {dropDown && (
                            <div className="faq_header_drop_list">
                                {headersList}
                            </div>
                        )}
                    </div>
                    {/* <div className="faq_bottom_header default-web-view">{headersList}</div> */}

                </div>

                <div className="faq_content_wrap" ref={wrap_ref}>


                    <div className="faq_content">
                        {contentList}
                        {activeTab === 'wallet' && (<div className="faq_bottom_desc">
                            <p>{APP.term('faq_bottom_header')}</p>
                            <p>{APP.term('faq_bottom_desc')}</p>
                        </div>)}
                    </div>
                </div>

            </div>

        </div>

    );

}