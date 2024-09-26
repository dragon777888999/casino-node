import React, { useEffect, useState } from 'react';
import { validateWalletAddress } from '../utils/walletValidator';
import CurrencySelector from './CurrencySelector';

function InputGroup({ setSelectedCoin, selectedCoin, setAmount, usdpAmount, recipientAddress, setRecipientAddress , network, setIsValid, isValid}) {
    const currency = 'USDP';
    const { symbol: selectedCurrency, icon: selectedIcon } = selectedCoin;
    const [invalidText, setInvalidText] = useState('');
    // const [isValid, setIsValid] = useState(true);
    const minWithdrawalText = `To support swap transaction fees, the minimum amount to swap is ${selectedCoin.minWithdrawal} USDP`;

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

      const handleChange = (e) => {
        const value = e.target.value;
        setRecipientAddress(value);
    };

    // Use effect to re-validate the wallet address when selectedCoin or recipientAddress changes
    useEffect(() => {
        if (recipientAddress) {
            validateWalletAddress(recipientAddress, network).then(isValid => {
                setInvalidText(`The address is ${isValid ? 'valid' : 'invalid'} on the ${network} network.`);
                setIsValid(isValid);
            });
        }
    }, [selectedCoin, recipientAddress, network]);


    return (
        <div className="input-group">

            <div className="input-container">
                <label htmlFor="input1" className="input-label">You send</label>
                <div className="currency_input_wrap">
                    <input className='input' id="input1" type="number" inputMode='decimal' pattern="[0-9]*" min="0" placeholder='Enter Amount' onChange={handleAmountChange} />
                    <div className="usdp-container">
                        <img className="usdp-icon" src={'media/images/topup/revBridge/USDP.png'} alt={`${currency} icon`} />
                        <span className="currency-name">{currency}</span>
                    </div>
                </div>
            </div>

            <div className="input-container">
                <label htmlFor="input2" className="input-label">You receive (approximately) ≈</label>
                <div className="currency_input_wrap">
                    <input className='input' id="input2" type="number" min="0" value={usdpAmount} readOnly />
                    {selectedIcon ? 
                    <CurrencySelector 
                        currency={selectedCurrency} 
                        icon={selectedIcon} 
                        setSelectedCoin={setSelectedCoin} 
                    />
                    : null}
                </div>
            </div>

            <div className="input-container">
                <div className="currency_input_wrap">
                    <input value={recipientAddress} onChange={handleChange} className='input' id="recipient" type="text" placeholder='Enter recipient address' /* pattern="^0x[a-fA-F0-9]{40}$" */ title="Please enter a valid address." />
                </div>
                {!isValid && <span className="error-message">{invalidText}</span>}
                <span className="error-message">{minWithdrawalText}</span>
            </div>

        </div>
    );
}

export default InputGroup;