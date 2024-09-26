import React, { useContext, useEffect, useState } from 'react';
import useAppState from '../../../../hooks/useAppState';
import StatusBar from '../components/StatusBar';
import { DataContext } from '../utils/state';

const transactionStatuses = {
    // 'usdp_received': [true, false, false],
    'usdp_received': [true, true, false],
    // 'funds_sent_to_user': [true, true, false],
    'funds_received_by_user': [true, true, true],
};

// For Testing Data
/* const initialWsData1 = JSON.stringify({
    "streamerMessage": {
      "walletAddress": "0xbc493150E3A9e4Cc21F22F4195ED48ae1C9585F3",
      "status": "usdp_received",
      "timestamp": Date.now(),
      "amount": "10.725000"
    }
  });
  
const initialWsData2 = JSON.stringify({
"streamerMessage": {
    "walletAddress": "0xbc493150E3A9e4Cc21F22F4195ED48ae1C9585F3",
    "status": "funds_received_by_user",
    "timestamp": Date.now(),
    "amount": "8.977031995309707"
}
}); */

function Page4({ status, selectedCoin }) {
    const { wsData } = useContext(DataContext);
    // const [wsData, setWsData] = useState(initialWsData1); // For Testing
    const [ringStatuses, setRingStatuses] = useState([false, false, false]);
    const [amount, setAmount] = useState(null);
    const [isTransactionCompleted, setIsTransactionCompleted] = useState(false);
    const userWallet = useAppState('wallet_address');

    useEffect(() => {
        if (wsData) {
            let messageData;
            try { messageData = JSON.parse(wsData); }
            catch (error) { return; }
            
            const streamerMessage = messageData?.streamerMessage;
            if (!streamerMessage) return;
            
            const { walletAddress, status, timestamp, amount } = JSON.parse(wsData)?.streamerMessage || {};
            const messageTimestampInUTC = new Date(timestamp).getTime();
            const isWithinTimeLimit = Date.now() <= messageTimestampInUTC + 30 * 1000;
           
            if (streamerMessage && userWallet.toLowerCase() === walletAddress.toLowerCase() && isWithinTimeLimit &&
                (status in transactionStatuses) ) {
                
                const newRingStatuses = transactionStatuses[status];
                
                if (newRingStatuses) {
                    setRingStatuses(newRingStatuses);
                    if (status !== 'usdp_received') {
                        setAmount(amount);
                    }
                    if (status === 'funds_received_by_user') {
                        setAmount(amount);
                        setIsTransactionCompleted(true);
                    }
                }
            }
        }
    }, [wsData]);

    // For Testing
    /* useEffect(() => {
        const timer = setTimeout(() => {
            setWsData(initialWsData2);
        }, 5000);

        return () => clearTimeout(timer);
    }, []); */

    return (
        <div className='page4'>
            <StatusBar status={status} />
            <TransactionStatus ringStatuses={ringStatuses} />
            <AmountSent amount={amount} selectedCoin={selectedCoin} />
            <button
                className={`button green ${!isTransactionCompleted ? 'disabled' : ''}`}
                disabled={!isTransactionCompleted}
                onClick={() => window.parent.postMessage('closeIframe', '*')}>
                <span>
                    {!isTransactionCompleted ? 'Transaction In Progress' : 'Transaction was successful'}
                </span>
            </button>
        </div>
    );
}

function TransactionStatus({ ringStatuses }) {
    const texts = ["Transaction arrived", "Exchanging", "Transaction complete"];
    return (
        <div className="container">
            {ringStatuses.map((ringStatus, i) => (
                <div key={i} className="item">
                    <div className="top">
                        <div className={`ring ${ringStatus ? 'full' : ''}`}>
                            <svg height="200" width="200">
                                <circle className={`circle ${ringStatus ? '' : 'loading'}`} cx="100" cy="100" r="40" stroke="#fe9725" strokeWidth="6" fillOpacity="0" />
                            </svg>
                            <div className="image" />
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="text">{texts[i]}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function AmountSent({ amount, selectedCoin }) {
    return (
        <div className='amount-sent-container'>
            <span className='currency-text'>Amount was sent to Your wallet ≈ </span>
            <div className='currency-info'>
                {amount && (
                    <>
                        <img className='currency-icon' src={selectedCoin?.icon} alt={`Icon for ${selectedCoin?.icon}`} />
                        <span className='currency-amount'>{parseFloat(amount).toFixed(6)}</span>
                    </>
                )}
            </div>
        </div>
    );
}

export default Page4;