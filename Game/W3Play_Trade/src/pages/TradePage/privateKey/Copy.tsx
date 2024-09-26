import React from 'react';
import { useDispatch } from 'react-redux';
import APP from '../../../app';
import { copyTextToClipboard } from '../../../utils/clipboard';

const Copy = ({ privatekey }) => {

    const dispatch = useDispatch();

    // copy private key
    function copyKey(privatekey: string) {
        copyTextToClipboard(privatekey, dispatch, APP.term('alert_msg_success_copy_key'))
    }

    return (

        <div className="content">

            <p className="desc">
                <span>{APP.term('private_key_copy_desc')}</span>
            </p>

            <div className="key_box">
                <p><span>{privatekey}</span></p>
            </div>

            <div className={"next_btn active"} onClick={() => copyKey(privatekey)}>
                <p><span>{APP.term('private_key_copy')}</span></p>
                <img src="/media/images/copy_black.png" />
            </div>

        </div>

    )
}

export default Copy;