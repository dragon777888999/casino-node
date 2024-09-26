import React from "react";
import APP from "../../app";
import { useDispatch, useSelector } from "react-redux";
import socialConnect from "../../utils/connection/socialConnect";

const SocialBtn = () => {

    const androidDevice = navigator.userAgent.match(/Android/i),
        web3AuthObj = useSelector(state => state.mainRememberReducer.social_web3_obj?.obj),
        dispatch = useDispatch();

    return (
        <>

            <div className="cwp_btn_row add_margin1">

                {/* Google btn */}
                <div className="cwp_btn google" onClick={() => socialConnect(APP, 'google', web3AuthObj, dispatch)}>
                    <img src='media/images/connect_modal/socials/google.png' />
                    <p className="connect_btn_txt"><span>Google</span></p>
                </div>

                {/* Facebook btn */}
                <div className="cwp_btn facebook" onClick={() => socialConnect(APP, 'facebook', web3AuthObj, dispatch)}>
                    <img src='media/images/connect_modal/socials/facebook.png' />
                    <p className=""><span>Facebook</span></p>
                </div>
            </div>


            {androidDevice ?
                null :
                (<div className="cwp_btn_row apple add_margin1">

                    {/* Apple btn */}
                    <div className="cwp_btn apple" onClick={() => socialConnect(APP, 'apple', web3AuthObj, dispatch)}>
                        <img src='media/images/connect_modal/socials/apple.png' />
                        <p className=""><span>Apple</span></p>
                    </div>
                </div>)}

            {/* <div className="cwp_divider_wrap">
                <div className="divider" />
                <div className={`extra_connection ${!isExpanded ? 'expand' : 'hide'}`}
                    onClick={() => setExpanded(isExpanded => !isExpanded)} />
                <div className="divider" />
            </div> */}

            {/* <div className={`cwp_btn_row_expansion ${isExpanded ? 'visible' : ''}`}>
                {socials.map((type, idx) => (
                    <div key={idx} className={`cwp_btn_expansion ${type}`}
                        onClick={() => socialConnect(APP, type, web3AuthObj, dispatch)}>
                        <img src={`/media/images/connect_modal/socials/${type}.png`} />
                    </div>
                ))}
            </div> */}
        </>
    )
}

export default SocialBtn;