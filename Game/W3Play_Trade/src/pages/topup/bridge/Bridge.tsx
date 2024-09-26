import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import APP from '../../../app';
import useAppState from '../../../hooks/useAppState';
import { set_bridge_popup, set_loader } from '../../../REDUX/actions/main.actions';
import state from '../../../state';
import '../../../styles/bridge.scss';

const Bridge = () => {

    const dispatch = useDispatch(),
        iframeRef = useRef(null),
        [loader, setLoader] = useState(true),
        walletAddress = useAppState('wallet_address');

    // clicking on bg => closing popup
    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if ((e.target as HTMLDivElement).className === 'bridge_popup_wrap_background') {
            dispatch(set_bridge_popup(false))
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoader(loader => !loader);
        }, 1000);

        return () => setLoader(false);
    }, [])

    return (
        <div className="bridge_popup_wrap_background" onClick={(e) => handleBackgroundClick(e)}>
            <div className="bridge_popup">

                {loader && (<div className="bridge_popup_loader">
                    <img src="/media/images/loaders/loader.gif" />
                </div>)}

                {!loader && (<div className="close_btn" onClick={() => dispatch(set_bridge_popup(false))} />)}
                <iframe
                    ref={iframeRef}
                    allow="clipboard-read; clipboard-write"
                    src={`${state.bridge_url}/?wa=${walletAddress}&pr=${APP.state.get('partnerRef')}`}
                    className="bridge_iframe" />
            </div>
        </div>
    )
}

export default Bridge;


// import React, { useEffect, useRef, useState } from 'react';
// import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
// import APP from '../../../app';
// import useAppState from '../../../hooks/useAppState';
// import { set_bridge_popup } from '../../../REDUX/actions/main.actions';
// import '../../../styles/bridge.scss';
// import stringify from 'json-stringify-safe';
// import { Base64 } from 'js-base64';
// import _ from 'lodash';
// import { ethers } from 'ethers';

// // Serialize the object and encode to Base64
// function serializeToBase64(obj: any): any {
//     const serialized = stringify(obj, (key, value) => {
//         return value;
//     });
//     return Base64.encode(serialized); // Use Base64.encode for Base64 encoding
// }

// const Bridge = () => {
//     const dispatch = useDispatch();
//     const iframeRef = useRef(null);
//     const [loader, setLoader] = useState(true);
//     const walletAddress = useAppState('wallet_address');
//     let web3AuthObj = useSelector((state: RootStateOrAny) => state.mainRememberReducer.social_web3_obj?.obj);
//     console.log("4- web3AuthObj.provider", web3AuthObj.provider);
//     // let signer = APP.state.get('web5signer');
//     // let provider = APP.state.get('web5signer').provider;
//     // let providerCopy = _.cloneDeep(provider);
//     // console.log("Bridge.tsx signer", signer);
//     // console.log("Bridge.tsx provider", provider);
//     // console.log("Bridge.tsx providerCopy", providerCopy);

//     let ethersProvider;
//       try {
//         ethersProvider = new ethers.BrowserProvider(web3AuthObj.provider);
//         console.log("4- ethersProvider", ethersProvider);
//       } catch (e) {
//         console.log("4- Provider error", e);
//       }

//     function handleBackgroundClick(e) {
//         if (e.target.className === 'bridge_popup_wrap_background') {
//             dispatch(set_bridge_popup(false));
//         }
//     }

//     useEffect(() => {
//         setTimeout(() => {
//             setLoader(loader => !loader);
//         }, 1000);

//         return () => setLoader(false);
//     }, []);

//     useEffect(() => {
//         if (iframeRef.current && walletAddress && web3AuthObj) {
//             iframeRef.current.onload = () => {
//                 const message = {
//                     walletAddress,
//                     partnerRef: APP.state.get('partnerRef'),
//                     walletProvider: stringify(web3AuthObj /* APP.state.get('web5signer') */),
//                     provider: stringify(web3AuthObj.provider /* APP.state.get('web5signer').provider */),
//                 };
//                 // console.log("4- Bridge.tsx message.walletProvider", message.walletProvider);
//                 // console.log("4- Bridge.tsx message.provider", message.provider);
//                 iframeRef.current.contentWindow.postMessage(message, '*'); // Allow access from any origin
//             }
//         }
//     }, [walletAddress, web3AuthObj]);

//     return (
//         <div className="bridge_popup_wrap_background" onClick={handleBackgroundClick}>
//             <div className="bridge_popup">
//                 {loader && (
//                     <div className="bridge_popup_loader">
//                         <img src="/media/images/loaders/loader.gif" />
//                     </div>
//                 )}
//                 {!loader && (
//                     <div className="close_btn" onClick={() => dispatch(set_bridge_popup(false))} />
//                 )}
//                 <iframe
//                     ref={iframeRef}
//                     allow="clipboard-read; clipboard-write"
//                     src={`${"http://localhost:3001"}/?wa=${walletAddress}&pr=${APP.state.get('partnerRef')}`}
//                     className="bridge_iframe"
//                 />
//             </div>
//         </div>
//     );
// };

// export default Bridge;
