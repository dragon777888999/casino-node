import React from 'react';
import { useDispatch } from 'react-redux';

import TopupLandscape from './Topup.landscape';
import { set_polygon_details, set_topup_wallet_popup } from '../../REDUX/actions/main.actions';
import APP from '../../app';

import '../../styles/pages/tradePage/connectWalletModal.css';
// import state from '../../state';

export default function TopupModal(props) {

    if (!props.openModal) return null;

    const dispatch = useDispatch();

    const onClickOverlay = (event) => {
        // click event from child components and elements, bubbling to this handler...
        if (event.target.className === "topup-wallet-modal-container"
            || event.target.className === 'topup-wallet-modal-portrait') {
            // false - means closing the modal
            props.closeModal(false);
            dispatch(set_topup_wallet_popup(false));
            APP.state.set('topup_wallet_popup', false);
        }
    };

    const closePopup = () => {
        // props.closeModal(false);
        dispatch(set_topup_wallet_popup(false));
        dispatch(set_polygon_details({ matic_transaction: false }))
        // APP.state.set('topup_wallet_popup', false);
    };

    return (
        <div className="topup-wallet-modal-container" onClick={onClickOverlay}>
            <TopupLandscape send={props.send} closePopup={closePopup} />
        </div>
    );

};