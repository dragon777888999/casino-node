import React from 'react';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';

function InnerPagesComponents({ index, setSelectedCoin, moveToPage, selectedCoin, updateStatus, status, changeCoin, setRecipientAddress, recipientAddress}) {
    const components = [
        // <Page1 key={0} setSelectedCoin={setSelectedCoin} moveToPage={moveToPage} changeCoin={changeCoin} />,
        <Page2 
            key={0} 
            setSelectedCoin={setSelectedCoin}
            moveToPage={moveToPage} 
            selectedCoin={selectedCoin} 
            updateStatus={updateStatus} 
            status={status} 
            setRecipientAddress={setRecipientAddress} 
            recipientAddress={recipientAddress}
        />,
        <Page3 
            key={1} 
            moveToPage={moveToPage} 
            updateStatus={updateStatus} 
            status={status} 
            recipientAddress={recipientAddress}
        />,
        <Page4 
            key={2} 
            selectedCoin={selectedCoin} 
            status={status}
        />
    ];

    return components[index];
}

export default InnerPagesComponents;