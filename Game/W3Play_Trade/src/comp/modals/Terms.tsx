import React, { useEffect, useState } from 'react';
import { browserName } from 'react-device-detect';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import '../../../src/styles/pages/modals.css';
import conditionsAPI from '../../API/conditions';
import { set_terms_popup } from '../../REDUX/actions/main.actions';

type ScreenDimensions = {
    width: Number,
    height: Number,
}

export default function TermsAndConditions() {


    const dispatch = useDispatch(),
        [content, setContent] = useState<string>(''),
        metamask = (navigator.userAgent.includes("MetaMaskMobile")),
        coinbase = (browserName.toLowerCase() === 'webkit'),
        coinbaseAndroid = (browserName.toLowerCase() === 'chrome webview'),
        [windowDimensions, setWindowDimensions] = useState<ScreenDimensions>(getWindowDimensions()),
        lang = useSelector((state: RootStateOrAny) => state.mainRememberReducer.app_lang) || 'en';

    async function getContent(lang) {
        let res = await conditionsAPI.getConditions(lang?.code || 'en');
      
        if (res?.data?.content && !res?.error) setContent(res?.data?.content)
        else {
            getContent('en');
        }
    }

    useEffect(() => {
        getContent(lang)
    }, [])

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return { width, height };
    }

    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    }

    useEffect(() => {
        window.addEventListener('orientationchange', handleResize);
        return () => window.removeEventListener('orientationchange', handleResize);
    }, []);


    const LandScape = () => (
        <div className="terms_wrap">
            <div className="terms_content">
                <img src='/media/images/text/terms.png' className="terms_header" />
                <div className="terms_close" onClick={() => dispatch(set_terms_popup(false))}></div>
                <p className="terms_desc" dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    ),

        Portrait = () => (
            <div className="terms_wrap_mobile">
                <div className="terms_content_mobile">
                    <img src='/media/images/text/terms.png' className="terms_header_mobile" />
                    <div className="terms_close_mobile" onClick={() => dispatch(set_terms_popup(false))}></div>
                    <p className="terms_desc_mobile" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        );

    return (((!metamask && !coinbase && !coinbaseAndroid) && (windowDimensions?.height > windowDimensions?.width)) ? <Portrait /> : <LandScape />)
}