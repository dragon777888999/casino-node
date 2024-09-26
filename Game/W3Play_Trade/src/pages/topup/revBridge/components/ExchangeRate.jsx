import React from 'react';

function ExchangeRate({ currency, exchangeRate, fee, amount, onClick, network, isValid, minWithdrawal }) {
    
    const isButtonDisabled = !amount || amount < minWithdrawal || !exchangeRate || fee < 0 || !currency || !isValid;

    return (
        <div className="exchange-rate">
            <div className="exchange-txt-row">
                <span className='exchange-rate-label'>Exchange rate: 1 USDP ≈ {exchangeRate} {currency} </span>
                <span className="fee">Fee: {fee}% + network fees</span>
            </div>

            <div className="funds-transferred">
                <div className="funds-txt-row">
                    <div className="network-text">Network: {network} <div className="icon"/></div>
                    <div className='divider'></div>
                    <div className="funds-text">
                        <div className="funds-icon"/>Funds transferred immediately
                    </div>
                </div>
                <button className={`button blue ${isButtonDisabled ? 'disabled' : ''}`}
                    disabled={isButtonDisabled}
                    onClick={onClick}>
                    <span>Swap</span>
                </button>
            </div>

        </div>
    );
}

export default ExchangeRate;