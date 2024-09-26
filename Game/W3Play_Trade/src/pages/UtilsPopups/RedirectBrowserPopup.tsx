import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import APP from '../../app';
import { set_redirect_browser_popup } from '../../REDUX/actions/main.actions';
import '../../styles/redirectBrowser.scss';
import { copyTextToClipboard } from '../../utils/clipboard';
import ga4Event from '../../utils/ga4.event';

const RedirectBrowserPopup = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        ga4Event(window.location.href, 'redirect_browser_popup_view')
    }, [])

    // close btn press + ga4 event for closing
    function closePopup() {
        dispatch(set_redirect_browser_popup(false))
        ga4Event(window.location.href, 'redirect_browser_popup_close')
    }

    // copy link press + ga4 event for coping
    function copyLink() {
        copyTextToClipboard(APP.state.get('initialUri'), dispatch, 'redirect_popup_alert_msg')
        ga4Event(window.location.href, 'redirect_browser_popup_copy')
    }

    return (
        <div onClick={() => closePopup()} className="redirect_popup_wrap_background">
            <div className="redirect_popup_content">
                <img src='/media/images/redirect_browser/stars.png' className="stars" />
                <img src='/media/images/redirect_browser/close.png' className="close" />
                <p className="header">{APP.term('redirect_popup_header')}</p>
                <p className="desc">{APP.term('redirect_popup_desc')}</p>
                <div className="copy_link_btn" onClick={() => copyLink()}>
                    <p>
                        {APP.term('redirect_popup_copy_btn')}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RedirectBrowserPopup;