import React, { useContext, useEffect, useState } from 'react';
import QRContainer from '../components/QRContainer';
import StatusBar from '../components/StatusBar';
import { DataContext } from '../utils/state';

function Page3({ moveToPage, status, updateStatus , recipientAddress }) {
    const { depositAddress, network, wsData } = useContext(DataContext);

    const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);
    const searchParams = new URLSearchParams(window.location.search);
    let userWallet = searchParams.get('wa')?.toLowerCase();

    const transactionStatuses = ['funds_received', 'funds_sent_to_user', 'funds_received_by_user'];

    //Test v
    /*  // New state variable for testing
     const [testStatus, setTestStatus] = useState('');
     useEffect(() => {
         // Start the interval when the component mounts
         const intervalId = setInterval(() => {
             // Update the testStatus state variable every 5 seconds
             setTestStatus(prevStatus => {
                 let newStatus;
                 switch (prevStatus) {
                     case '':
                         newStatus = 'funds_received';
                         break;
                     case 'funds_received':
                         newStatus = 'funds_sent_to_user';
                         break;
                     case 'funds_sent_to_user':
                         newStatus = 'funds_received_by_user';
                         break;
                     case 'funds_received_by_user':
                         newStatus = 'funds_received';
                         break;
                     default:
                         newStatus = '';
                 }
                 //console.log("testStatus: ", newStatus);
                 return newStatus;
             });
         }, 5000);
 
         // Clear the interval when the component unmounts
         return () => clearInterval(intervalId);
     }, []); */
    //Test ^

    useEffect(() => {
        if (!wsData) return;

        let parsedData;

        try { parsedData = JSON.parse(wsData); }
        catch (error) { return; }

        const streamerMessage = parsedData?.streamerMessage;
        if (!streamerMessage) return;

        const { walletAddress, timestamp, status } = JSON.parse(wsData)?.streamerMessage || {};
        if (!walletAddress || !timestamp || !status) return; // Early return if missing properties

        const messageTimestampInUTC = new Date(timestamp).getTime();
        const isWithinTimeLimit = Date.now() <= messageTimestampInUTC + 60 * 1000;

        if (userWallet === walletAddress.toLowerCase() && isWithinTimeLimit && transactionStatuses.includes(status.toLowerCase())) {
            setIsPaymentCompleted(true);
            moveToPage(2);
            updateStatus(3);
        } // eslint-disable-next-line
    }, [wsData, userWallet]);


    return (
        <div className='page3'>
            <StatusBar status={status} />
            <div className="page3_content">
                <div className="recipient-container">
                    <label htmlFor="recipient" className="recipient-label">Recipient address</label>
                    <input className='recipient-input' id="recipient" type="text" value={recipientAddress} readOnly />
                </div>
                <QRContainer qrValue={depositAddress} address={depositAddress} network={network} />
                <p className="page3_bottom_desc">Please pay attention to the network type</p>
                <button
                    className={`button pink ${!isPaymentCompleted ? 'disabled' : ''}`}
                    disabled={!isPaymentCompleted}>
                    <span>Please complete payment</span>
                </button>
            </div>
        </div>
    )
}

export default Page3;