import React, { useCallback, useContext, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InnerPagesComponents from '../components/InnerPagesComponents';
import { DataContext } from '../utils/state';
import { useSelector } from 'react-redux';
import RevBridgeAlertMsg from './RevBridgeAlertMsg';

function PageBox() {
    const { theme, coinsDataAfterFetch } = useContext(DataContext);
    const [componentKey, setComponentKey] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState(coinsDataAfterFetch?.coins[0]);
    const [status, setStatus] = useState(1);
    const [recipientAddress, setRecipientAddress] = useState('');
    
    const revBridgeAlertMsg = useSelector(state => state.mainReducer.revBridgeAlertMsg);

    const decrementStatus = useCallback(() => setStatus(prevStatus => prevStatus - 1), []);
    const moveToPage = useCallback((pageIndex) => setComponentKey(pageIndex), []);
    const updateStatus = useCallback((newStatus) => setStatus(newStatus), []);

    const handleBackClick = () => {
        if (componentKey > 0) {
            setComponentKey(prevKey => prevKey - 1);
        }
    };
    
    const changeCoin = (coin) => {
        setSelectedCoin(coin);
        moveToPage(1);
    }

    return (
        <div className={`page-box ${theme}`}>
            <Header index={componentKey} onBackClick={handleBackClick} decrementStatus={decrementStatus}/>
            <div className='content'>
                <InnerPagesComponents
                    key={componentKey}
                    index={componentKey}
                    setSelectedCoin={setSelectedCoin}
                    selectedCoin={selectedCoin}
                    moveToPage={moveToPage}
                    status={status}
                    updateStatus={updateStatus}
                    changeCoin={changeCoin}
                    setRecipientAddress={setRecipientAddress}
                    recipientAddress={recipientAddress}
                />
            </div>


            {revBridgeAlertMsg?.type ? <RevBridgeAlertMsg type={revBridgeAlertMsg?.type} content={revBridgeAlertMsg?.content} preventTimeout={revBridgeAlertMsg?.preventTimeout} /> : null}

            <Footer/>
        </div>
    );
}

export default PageBox;