import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import p2p from '../../API/p2p';
import APP from '../../app';
import useAppState from '../../hooks/useAppState';
import { set_alert_msg, set_loader, set_iframe_popup, set_p2p_popup, set_bwp_popup } from '../../REDUX/actions/main.actions';
import _num from '../../utils/numberFormat';

interface Currency {
    src: string;
    type: string;
    min: number,
    max: number
}

function P2pPopup() {

    const dispatch = useDispatch(),
        [selectedCurrency, setCurrency] = useState<any>(null),
        [dropbox, setDropBox] = useState<boolean>(false),
        walletAdress = useAppState('wallet_address'),
        [amt, setAmt] = useState<number>(0),
        currencies = [
            { src: 'media/images/currencies/uah.png', type: 'uah', min: 280, max: 50000 },
            { src: 'media/images/currencies/rub.png', type: 'rub', min: 1000, max: 300000 }
        ],

        // Single dropbox row
        CurrencyRow = ({ src, type, min, max }: Currency) => (
            <div className="currency_row" onClick={() => setCurrency({ type: type, src: src, min, max })}>
                <img src={src} className="currency_img" data-attr={type} />
                <p><span>{type}</span></p>
                <p className="desc"><span>* {APP.term('p2p_min') + ':'} {_num.addCommas(min)} {'-'} {APP.term('p2p_max') + ':'} {_num.addCommas(max)}</span></p>
            </div>
        ),

        // dropbox container
        DropBox = () => (
            <div className="dropbox">
                {currencies.map(({ src, type, min, max }: Currency) => (
                    <CurrencyRow key={type} src={src} type={type} min={min} max={max} />
                ))}
            </div>
        ),

        // Update new state with new amount - input
        handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

            let val = e.target.value,
                newValue = Number(val);

            if (String(val).length <= 6) {
                setAmt(newValue);
            }
        };

    // clicking on bg => closing popup
    function handleBackgroundClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if ((e.target as HTMLDivElement).className === 'p2p_popup_wrap_background') {
            dispatch(set_p2p_popup(false))
        }
    }

    // p2p payment  
    async function sendPayment(walletAdress: string, amount: number, currency: string | any, min: number, max: number) {

        if (!amt || !currency || !walletAdress) return;

        if (min > amt || amt > max) {
            dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_p2p_amt_range' }))
            return;
        }

        try {
            dispatch(set_p2p_popup(false))

            dispatch(set_loader(true))

            // if (currency.toLowerCase() === 'uah') {
            setTimeout(() => {
                dispatch(set_loader(false))
            }, 3000);
            // }

            let res: any;

            // if (currency.toLowerCase() === 'uah') {
            res = await p2p.submitPayment(walletAdress, amount, currency, APP.state.get('customer.countryCode'));
            // }
            // else {
            //     res = await p2p.submitBwpPayment(walletAdress, amount, currency, APP.state.get('customer.countryCode'));
            // }

            if (!res.error) {
                if (res?.data?.obCard) {
                    dispatch(set_iframe_popup({ src: res.data.obCard, type: 'p2p' }))
                }
                else if (res?.data?._data?.cardNumber) {
                    dispatch(set_loader(false))
                    dispatch(set_bwp_popup({ active: true, content: res?.data?._data }))
                }

            }
            else {
                dispatch(set_loader(false))
                dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_p2p_pay_err' }))
            }

        } catch (error) {
            dispatch(set_loader(false))
            console.log(error, 'p2p payment err')
        }
    };

    //  Currency that was currently selected or default => select currency
    function currencyToShow(type: string, src: string, dropbox: boolean, min: number, max: number) {
        if (type) return (<CurrencyRow type={type} src={src} min={min} max={max} />);
        else return (
            <>
                <p className='text-when-not-chosen'><span>{APP.term('p2p_popup_currency')}</span></p>
                <img src='media/images/p2p/arrow.svg' className="arrow" data-attr={dropbox ? "true" : "false"} />
            </>
        )
    }

    // Block invalid chars
    const blockInvalidChar = e =>
        ["e", "E", "+", "-", "."].includes(e.key) && e.preventDefault();

    // Prevent zoom in on click
    const handleTouchStart = (event: React.TouchEvent<HTMLInputElement>) => {
        event.preventDefault();
    };

    return (
        <div className="p2p_popup_wrap_background" onClick={e => handleBackgroundClick(e)}>
            <div className="p2p_popup">
                <div className="close_btn" onClick={() => dispatch(set_p2p_popup(false))} />
                <p className="header"><span>{APP.term('p2p_popup_header')}</span></p>
                <p className="subheader"><span>{APP.term('p2p_popup_subheader')}</span></p>

                {/* Dropbox + Selected Currency */}
                <div className="inputbox" onClick={() => setDropBox(!dropbox)}>
                    {currencyToShow(selectedCurrency?.type, selectedCurrency?.src, dropbox, selectedCurrency?.min, selectedCurrency?.max)}
                    {dropbox && (<DropBox />)}
                </div>

                {/* Amount Input */}
                <div className="input_amt_box">
                    <input placeholder={APP.term('p2p_popup_amt')}
                        onChange={e => handleChange(e)}
                        onKeyDown={blockInvalidChar}
                        onInput={blockInvalidChar}
                        data-attr={"amt"}
                        onTouchStart={handleTouchStart}
                        type="tel" pattern="[0-9]{10}" name="tel"
                        value={amt || ''} />
                </div>

                {/* Pay Button */}
                <div className="pay_btn"
                    onClick={() => sendPayment(walletAdress, amt, selectedCurrency?.type, selectedCurrency?.min, selectedCurrency?.max)}
                    data-attr={selectedCurrency?.type && amt ? "true" : "false"}>
                    <p><span>{APP.term('p2p_popup_pay')}</span></p>
                </div>
            </div>
        </div>
    )
}

export default P2pPopup;
