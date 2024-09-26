import React, { useEffect, useState } from 'react';
import APP from '../../../app';
import Symbol from '../../../comp/shape/playblock_symbol';
import '../../../styles/demo/claimCoinsPopup.scss';
import { set_demo_mode, set_connect_wallet_popup } from '../../../REDUX/actions/main.actions'; // Import set_connect_wallet_popup
import { useDispatch } from 'react-redux';
import tokenAPI from '../../../API/token';
import useAppState from '../../../hooks/useAppState';
import useWebSocket from '../../../hooks/useWebSocket';
import state from '../../../state';
import isWallet from '../../../utils/isWallet';

const Ring = ({ isTransactionCompleted }) => (
    <div className={`top ${isTransactionCompleted ? 'completed' : ''}`}>
        <div className={`ring ${isTransactionCompleted ? 'full' : ''}`}>
            <svg>
                <circle className={`circle ${isTransactionCompleted ? '' : 'loading'}`} strokeWidth="6" fillOpacity="0" />
            </svg>
            <div className="image" />
        </div>
    </div>
);

const ClaimCoinsPopup = ({ isLoggedIn }) => {

    const dispatch = useDispatch();
    const wallet_address = useAppState('wallet_address');
    const partnerRef = APP?.controller?.cfg?.partnerInfo?.partnerRef || 'playnance';
    const { disconnect, message } = useWebSocket(isWallet(state.usdb_claim_ws));
    const [isTransactionCompleted, setIsTransactionCompleted] = useState(false);
    const [showRing, setShowRing] = useState(false);

    // close popup
    function handleBackgroundClick(event) {
        if (event.target.className === "claim_coins_popup_wrap" || event.target.className === "close") {
            dispatch(set_demo_mode({ popup: false }));
        }
    }
    // Trigger connect wallet popup
    function handleConnectClick() {
        dispatch(set_connect_wallet_popup(true)); // show connect wallet popup
        dispatch(set_demo_mode({ popup: false })); // close claim coins popup
    }

    // send req to claim tokens
    async function claim(address, partnerRef, isTransactionCompleted) {

        // already claimed coins => 'thanks txt' => close popup
        if (isTransactionCompleted && showRing) {
            dispatch(set_demo_mode({ popup: false, claim_popup_wallet_address: false }));
        }

        // claim coins logic
        else {
            let res = await tokenAPI.getTokens(address, partnerRef);
            if (res.data) {
                // dispatch(set_demo_mode({ popup: false }));

                setShowRing(true); // set showRing to true when claim_btn is clicked
            }
        }
    }

    useEffect(() => {

        if (!message) return;

        try {
            const parsed = JSON.parse(message);
            const wa = parsed?.streamerMessage?.walletAddress;
            const timesStamp = parsed?.streamerMessage?.timestamp;

            if (wa === wallet_address && (Date.now() - timesStamp <= 60000)) {
                setIsTransactionCompleted(true);
                APP.customer.update_balance();
            }
        } catch (error) {
            console.error("3-Error", error);
        }

    }, [message]);

    useEffect(() => {
        return () => {
            console.log("3-Disconnecting usdb_claim_ws...");
            disconnect();
        }
    }, []);


    const getTerm = (baseTerm) => APP.term((isTransactionCompleted && showRing) ? `${baseTerm}_completed` : baseTerm);

    return (
        <div className="claim_coins_popup_wrap" onClick={handleBackgroundClick}>
            <div className="popup">
                <div className="close" onClick={handleBackgroundClick} />
                {showRing ? <Ring isTransactionCompleted={isTransactionCompleted} /> : <div className="header_img" />}

                {!isTransactionCompleted &&
                    <>
                    {/* Conditional rendering for desc1 */}
                    {isLoggedIn ? 
                        <p className="desc1"><span>{APP.term('claim_popup_desc1')}</span></p>
                        : <p className="desc1"><span>{APP.term('demo_connect_to_get')}</span></p>
                    }
                    </>
                }

                <div className="desc2_wrap">
                    <Symbol />
                    <p className="desc2"><span>{APP.term('claim_popup_desc2')}</span></p>
                </div>

                <p className="desc3"><span>{getTerm('claim_popup_desc3')}</span></p>

                { !isLoggedIn && 
                <>
                    <p className="desc4">
                        <span>*</span> {APP.term('demo_one_time_offer')}
                    </p>
                </>}
                {isLoggedIn && <br/>}

                {/* Conditional rendering for the buttons */}
                {isLoggedIn ? (
                    <div className="claim_btn" onClick={() => claim(wallet_address, partnerRef, isTransactionCompleted)}>
                        <p><span>{getTerm('claim_popup_btn_desc')}</span></p>
                    </div>
                ) : (
                    <div className="wallet_connect_btn" onClick={handleConnectClick}>
                        <p><span>{APP.term('demo_connect_now')}</span></p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ClaimCoinsPopup;