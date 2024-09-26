import React, { useContext, useState } from 'react';
import { DataContext } from '../utils/state';
import Coin from './Coin';

function CurrencySelector({ currency, icon, setSelectedCoin }) {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const { coinsDataAfterFetch } = useContext(DataContext);

    const togglePopupVisibility = () => {
        setIsPopupVisible(!isPopupVisible);
    };

    const handleCoinClick = (selectedCoin) => {
        setSelectedCoin(selectedCoin);
        setIsPopupVisible(false);
    };

    if (coinsDataAfterFetch?.error) {
        return <div>Error: {coinsDataAfterFetch?.error?.message}</div>;
    }

    return (
        <>
            <div className="currency-selector" onClick={togglePopupVisibility}>
            <div className="currency-info">
                <img className={`currency-icon`} src={icon} alt={`${currency}`} data-img={`${currency}`} />
                <span className={`currency-name`}>{currency}</span>
            </div>
                <div className={`arrow-icon ${isPopupVisible ? 'up' : ''}`} alt="arrow down" />
            </div>
             {isPopupVisible && (
                <div className={`currency-popup transition ${isPopupVisible ? 'isPopupVisible' : ''}`}>
                    {coinsDataAfterFetch?.coins.map((coin) => 
                        <Coin 
                            key={coin.id} 
                            coin={coin} 
                            onClick={() => handleCoinClick(coin)}
                        />
                    )}
                </div>
            )}
        </>
    );
}

export default CurrencySelector;