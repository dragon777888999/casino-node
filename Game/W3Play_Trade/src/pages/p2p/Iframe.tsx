import React from 'react';
import { useSelector, RootStateOrAny } from 'react-redux';
import APP from '../../app';

interface IframeProps {
    onClose: () => void;
}

const Iframe = ({ onClose }: IframeProps) => {

    const iframe_src = useSelector((state: RootStateOrAny) => state.mainReducer.iframe_src);

    return (
        <div onClick={onClose} className="iframe_popup_wrap_background">
            <div className="global_iframe_wrap">
                {iframe_src?.type !== 'paybis' && (<div className="global_iframe_close_btn" onClick={onClose} />)}
                <div className="iframe_header_row">
                    <p className="iframe_title">{APP.term('iframe_title')}</p>
                    {iframe_src?.type !== 'paybis' && (<div onClick={onClose} className="global_iframe_back" data-attr={iframe_src?.type}>
                        <p>{APP.term('iframe_back')}</p>
                    </div>)}
                </div>
                <iframe
                    frameBorder="0"
                    className="global_iframe"
                    src={iframe_src?.src} />
            </div>
        </div>
    );
}

export default Iframe;