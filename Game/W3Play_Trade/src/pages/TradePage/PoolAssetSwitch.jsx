import React /*, { useState }*/ from 'react';
import './PoolAssetSwitch.scss';
import { set_alert_msg, set_asset_popup } from '../../REDUX/actions/main.actions';
import { useDispatch } from 'react-redux';
import useIsDemoModeActive from '../../utils/demo/useIsDemoModeActive';

const PoolAssetSwitch = ({ assetIconUrl, assetName, poolName, poolNumber, validPools, openPools }) => {

    const dispatch = useDispatch();
    const isDemo = useIsDemoModeActive();
    // const [isMinimized, setIsMinimized] = useState(false); // Commented out for now

    const handleClick = () => {
        if (!isDemo) {
            dispatch(set_asset_popup(true));
        }
        else {
            dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_demo_assets' }))
        }
    };

    const handlePoolNumberClick = (e) => {
        e.stopPropagation(); // Prevents the event from bubbling up to the parent div
        openPools();
    };

    // const toggleMinimize = (e) => {
    //     e.stopPropagation();
    //     setIsMinimized(!isMinimized);
    // };

    return (
        <div className={`pool-asset-switch`} onClick={handleClick}> {/* Removed isMinimized class toggle */}
            {/* {!isMinimized && ( */}
            <>
                <div className={`clickable-area ${validPools ? 'clickable' : ''}`} onClick={handlePoolNumberClick}>
                    <div className={`top-right-circle ${'_' + poolNumber}`}>
                        <span className={`pool-number`}>
                            {poolNumber}
                        </span>
                    </div>
                </div>
                <div className="top-left-image"></div>
            </>
            {/* )} */}
            <div className="asset-image" style={{ backgroundImage: `url(${assetIconUrl})` }}></div>
            <div className="bottom-text">
                <span className="asset-name">{assetName}</span>
                <span className="pool-name">{poolName.split('-')[0]} Sec</span>
            </div>
            {/* <div className="arrow-icon" onClick={toggleMinimize}> */}
            {/* <svg viewBox="0 0 24 24"> */}
            {/* <path d={isMinimized ? 'M12 19l-7-7h14z' : 'M12 5l7 7H5z'} /> */}
            {/* </svg> */}
            {/* </div> */}
        </div>
    );
};

export default PoolAssetSwitch;