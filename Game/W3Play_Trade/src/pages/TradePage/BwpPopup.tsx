import React from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import APP from '../../app';
import { set_bwp_popup } from '../../REDUX/actions/main.actions';
import { copyTextToClipboard } from '../../utils/clipboard';
import _num from '../../utils/numberFormat';

function BwpPopup() {

    const dispatch = useDispatch(),
        { bwp_popup } = useSelector((state: RootStateOrAny) => state.mainReducer),
        isDemo = APP.state.get('currentToken') === 'demo',
        descTxt = isDemo ? 'bwp_popup_header_demo' : 'bwp_popup_header';

    // clicking on bg => closing popup
    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if ((e.target as HTMLDivElement).className === 'bwp_popup_wrap_background') {
            dispatch(set_bwp_popup(false))
        }
    }

    // copy wallet to clipboard + success alert msg
    function copyWalletAddress(val: string, alert_txt: string) {
        copyTextToClipboard(val, dispatch, alert_txt);
    }

    return (
        <div className="bwp_popup_wrap_background" onClick={e => handleBackgroundClick(e)}>
            <div className="bwp_popup">
                <div className="close_btn" onClick={() => dispatch(set_bwp_popup(false))} />
                <p className="header">{APP.term(descTxt)}</p>
                <p className="subheader">{APP.term('bwp_popup_subheader')}</p>

                <p className="details_header">{APP.term('bwp_card_holder')}</p>
                <p className="details_val">{bwp_popup?.content?.cardHolder}</p>

                <div className="copy_btn" onClick={() => copyWalletAddress(bwp_popup?.content?.cardHolder, APP.term('alert_msg_success_bwp_card_holder'))}>
                    <p>{APP.term('bwp_copy')}</p>
                </div>

                <p className="details_header">{APP.term('bwp_card_number')}</p>
                <p className="details_val">{bwp_popup?.content?.cardNumber}</p>

                <div className="copy_btn" onClick={() => copyWalletAddress(bwp_popup?.content?.cardNumber, APP.term('alert_msg_success_bwp_card_number'))}>
                    <p>{APP.term('bwp_copy')}</p>
                </div>
            </div>
        </div>
    )
}

export default BwpPopup;
