import React, { useContext } from 'react';
import { DataContext } from '../utils/state';
import Coin from './Coin';

function Page1({changeCoin}) {
    const { coinsDataAfterFetch } = useContext(DataContext);

    const handleClick = (selectedCoin) => {
        changeCoin(selectedCoin);
    }

    if (coinsDataAfterFetch?.error) {
        return <div className="error">There was an error: {coinsDataAfterFetch?.error}</div>;
    }

    if (!coinsDataAfterFetch?.coins.length) {
        return <div className="loading">Loading...</div>;
    }
    
    return (
        <div className='page1'>
            {coinsDataAfterFetch?.coins.map((coin) => 
                <Coin
                    key={coin.id} 
                    coin={coin} 
                    onClick={() => handleClick(coin)}
                />
            )}
        </div> 
    );
}

export default Page1;