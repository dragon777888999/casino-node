import React, { useEffect, useState } from 'react';
import '../../styles/privateKey.scss';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import APP from '../../app';
import { set_private_key_popup } from '../../REDUX/actions/main.actions';
import _num from '../../utils/numberFormat';
import Copy from './privateKey/Copy';
import Code from './privateKey/Code';

function PrivateKeyPopup() {

    const dispatch = useDispatch(),
        [value, setValue] = useState<any>(''),
        email = APP.state.get('user_email'),
        [step, setStep] = useState<number>(0),
        [pkey, setKey] = useState<string>(''),
        [loader, setLoader] = useState(false),
        social_web3_obj = useSelector((state: RootStateOrAny) => state.mainRememberReducer.social_web3_obj),
        [error, setError] = useState<boolean>(false);

    // clicking on bg => closing popup
    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if ((e.target as HTMLDivElement).className === 'private_key_popup_wrap_background') {
            dispatch(set_private_key_popup(false))
        }
    }

    // update new state with new amount - input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let val = e.target.value;
        setError(false);
        setValue(val);
    };

    // request wallet's private key (web3auth)
    const getPrivateKey = async () => {
        return await social_web3_obj?.obj?.provider.request({
            method: "eth_private_key"
        })
    };

    // go next step
    function goNext(val: any) {

        let otpObj = APP.state.get('otpObj');

        otpObj.emit('verify-email-otp', val);
        setLoader(true)

        otpObj.on('email-otp-sent', () => {
            // The email has been sent to the user
        })
            .on('invalid-email-otp', () => {
                // User entered invalid OTP
                setError(true);
                setLoader(false)

                // cancel login request
                // otpObj.emit('cancel');
            })
            .on('done', async (result: any) => {
                // is called when the Promise resolves

                setStep(step => step + 1)
                setLoader(false)

                await APP.magic.user.logout();
                APP.state.unset('otpObj')
                // DID Token returned in result
                // const didToken = result;

            })
            .on('error', (reason: any) => {
                // is called if the Promise rejects
                // setError(false);
                setLoader(false)
                console.error(reason);
            })
    }

    // render popup content 
    // step - 0 => enter code that was sent to email
    // step - 1 => private key is visible & can be copied
    function contentCmp(step: number, email: string, error: boolean, value: any, pkey: string) {
        if (step) return <Copy privatekey={pkey} />
        else return (
            <Code email={email}
                err={error}
                val={value}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
                setError={() => goNext(value)} />);
    }

    // get user's private key
    async function privateKeyGetter(social_web3_obj: any) {
        setLoader(true)

        try {
            // single social connect
            if (social_web3_obj && localStorage.getItem('isSingleSocialConnect')) {
                let res = await social_web3_obj?.obj?.provider.request({
                    method: "eth_private_key"
                })
                if (res) {
                    setLoader(false)
                    setKey(res)
                }
            }
            // web3auth multiple login option
            else {
                let res = await getPrivateKey();
                if (res) {
                    setLoader(false)
                    setKey(res)
                }
            }
        }
        catch (e) {
            console.log('err getting private', e)
        }
    }

    useEffect(() => {
        privateKeyGetter(social_web3_obj)

        let otpObj = APP.state.get('otpObj');

        // cancel login request 
        return () => {
            if (!otpObj || step) return;
            otpObj?.emit('cancel')
        }
    }, [social_web3_obj])

    return (
        <div className="private_key_popup_wrap_background" onClick={(e) => handleBackgroundClick(e)}>
            <div className="private_key_popup">

                {/* close btn */}
                <div className="close_btn" onClick={() => dispatch(set_private_key_popup(false))} />

                {/* header */}
                <p className="header"><span>{APP.term('private_key_header')}</span></p>

                {/* content */}
                {contentCmp(step, email, error, value, pkey)}

                {loader && (<div className="loader_wrap">
                    <img src="/media/images/loaders/loader.gif" />
                </div>)}

            </div>
        </div>
    );
}

export default PrivateKeyPopup;