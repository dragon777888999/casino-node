import React from 'react';

function Coin({ coin, onClick }) {
    const { id, symbol, icon } = coin;
    const [coinName, coinDescription] = symbol.split('-');

    return (
        <div key={id} className={`coin_box`} onClick={onClick}>
            <img className='coin_icon' src={icon} alt={`Icon for ${symbol}`} data-img={`${symbol}`} />
            <div className='coin_desc_container'>
                <p className='coin_desc'>{coinName}</p>
                {coinDescription && <p className='coin_desc2'>{coinDescription}</p>}
            </div>
        </div>
    );
}

export default Coin;
