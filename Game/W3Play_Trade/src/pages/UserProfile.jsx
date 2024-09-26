import React, { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import APP from '../app';
import { base64_img } from '../utils/base64_img';
import useAppState from '../hooks/useAppState';
import Web3 from 'web3';
import profile from '../API/profile';
import { set_alert_msg } from '../REDUX/actions/main.actions';
import { useDispatch, useSelector } from 'react-redux';
import ga4Event from '../utils/ga4.event';
import poolSwitch from '../utils/poolSwitcher';
import HelmetManager from '../comp/HelmetManager';

const doNothing = () => { };

function UserProfile() {

    const [image, setImage] = useState(false),
        [activeInput, setInput] = useState(false),
        navigate = useNavigate(),
        dispatch = useDispatch(),
        wallet_address = useAppState('wallet_address'),
        currentPoolDetails = useSelector(state => state.mainRememberReducer.currentPool),
        [inputContent, setInputContent] = useState(false),

        // convert to base64
        getBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
                reader.readAsDataURL(file);
            });
        },

        // General focus hook
        UseFocus = () => {
            const htmlElRef = useRef(null),
                setFocus = () => { htmlElRef.current && htmlElRef.current.focus() };

            htmlElRef?.current?.value == '';

            return [htmlElRef, setFocus]
        },

        [nicknameRef, setNicknameRef] = UseFocus(activeInput);

    // img should be jpg/jpeg/png/svg
    function imageType(file) {

        if (!file) return;

        let regex = new RegExp("(.*?)\.(png|jpg|svg|jpeg)$");
        if (!(regex.test(file?.type))) {
            dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_upload_img_format' }));
            // setError(true)
            setImage('');
            return false;
        }
        else {
            // setError(false)
            return true;
        }
    }

    // logic for uploading pic using base64
    function uploadButton() {
        const button = document.getElementById('uploadButton');
        button.click();

        button.addEventListener('change', (e) => {
            e.preventDefault();

            const file = e.target.files[0];

            //check for valid img type
            if (!imageType(file)) return;

            getBase64(file).then(base64 => {
                const indexOfComma = Array.from(base64).indexOf(',');

                if (base64 === '') {
                    setImage('');
                } else {
                    setImage({ file: base64.substring(indexOfComma + 1), type: file.type });
                }
            })
        })
    }

    // get uploaded user pic or last one he has
    function currentImg(image) {
        if (image?.file) return base64_img(image);
        else return APP.state.get('customer.avatar') || localStorage.getItem('avatar');
    }

    // save user changes
    async function submit(image, nicknameRef, wallet_address) {
        APP.state.set('customer.avatar', currentImg(image));
        APP.state.set('customer.nickname', nicknameRef?.current?.value);
        APP.state.set('menu_open', true);

        let body = {
            "file": image?.file,
            "wallet": Web3.utils.toChecksumAddress(wallet_address),
            "type": image?.type
        },
            res = await profile.updateProfilePic(body)

        if (res?.data?.avatarUrl) {
            dispatch(set_alert_msg({ type: 'success', content: 'alert_msg_avatar_changed' }))
            ga4Event('avatar picture successfuly changed', 'change_avatar')

            APP.state.set("customer.avatar", res.data.avatarUrl)
            localStorage.setItem("avatar", res.data.avatarUrl)
            navigate(poolSwitch(currentPoolDetails));
        }
        else {
            dispatch(set_alert_msg({ type: 'error', content: 'alert_error_msg_avatar' }))
        }

    }

    return (
        <div className="user_profile_wrap">
            <HelmetManager
                title="User Profile"
                description="Manage Your Profile: Personalize your trading identity and showcase your achievements."
                keywords="Play to earn crypto,Bitcoin trading bot,Predict Bitcoin price, crypto avatar , up vs down "
                canonical="userprofile"
            />
            {/* Close btn  */}
            <div className="user_profile_close_btn">
                <Link to={{ pathname: poolSwitch(currentPoolDetails) }}>
                    <img className="user_profile_close_img" src='/media/images/closebutton.png' />
                </Link>
            </div>

            {/* Header */}
            <div className="user_profile_header_box">
                <p className="user_profile_header"><span>{APP.term('change_avatar_header')}</span></p>
            </div>

            <div className="user_profile_form_box">

                {/* Upload btn */}
                <div className="user_profile_image_box">
                    <img className="user_profile_user_avatar_img" src={currentImg(image)} />
                    <input className="user_profile_file_input" id="uploadButton" type="file" />
                    <div className="user_profile_upload_btn" onClick={() => uploadButton()}>
                        <img className="user_profile_upload_img" src='/media/images/camera_gold.svg' />
                    </div>
                </div>

                <p className="user_profile_form_desc_text"><span>{APP.term('user_profile_bottom_desc')}</span></p>

                {/* Apply changes btn */}
                <div className="user_profile_apply_box" onClick={(image || inputContent) ? () => submit(image, nicknameRef, wallet_address) : doNothing}>
                    <div className="user_profile_apply_btn" style={{ opacity: (image || inputContent) ? 1 : .5 }}>
                        <span>{APP.term('user_profile_apply')}</span>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default UserProfile;