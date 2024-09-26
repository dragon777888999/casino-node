import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { set_rev_bridge_popup } from '../../../REDUX/actions/main.actions';
import useAppState from '../../../hooks/useAppState';
import '../../../styles/bridge.scss';
import RevBridgeApp from './RevBridgeApp'; // Import the new RevBridgeApp component
import SingleTransactionStatus from './components/SingleTransactionStatus';

const RevBridge = () => {
    
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);

    const isLoading = useAppState('rbIsLoading');
    const ringStatuses = useAppState('rbsetRingStatuses');    

    // clicking on bg => closing popup
    function handleBackgroundClick(e) {
        if (e.target.className === 'bridge_popup_wrap_background') {
            dispatch(set_rev_bridge_popup(false));
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoader(loader => !loader);
        }, 1000);

        return () => setLoader(false);
    }, []);

    return (
        <div className="bridge_popup_wrap_background" onClick={handleBackgroundClick}>
            <div className="rev_bridge_popup">

                {isLoading && <SingleTransactionStatus ringStatuses={ringStatuses}/>}

                {loader && (<div className="bridge_popup_loader">
                    <img src="/media/images/loaders/loader.gif" />
                </div>)}

                {!loader && (<div className="close_btn" onClick={() => dispatch(set_rev_bridge_popup(false))} />)}
                <RevBridgeApp/>
            </div>
        </div>
    )
}

export default RevBridge;