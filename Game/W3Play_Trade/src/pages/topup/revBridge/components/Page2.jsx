import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import APP from '../../../../app';
import useAppState from '../../../../hooks/useAppState';
import ExchangeRate from '../components/ExchangeRate';
import InputGroup from '../components/InputGroup';
import StatusBar from '../components/StatusBar';
import { fetchData } from '../utils/fetchData';
import { endpoints, revEndpoints } from '../utils/fetchUrls';
import { DataContext } from '../utils/state';
import { playBlockTransaction } from '../utils/swapCurrency';
import { useDispatch } from "react-redux";
import walletBalanceHandler from '../utils/walletBalanceHandler';

function Page2({ setSelectedCoin, moveToPage, selectedCoin = {}, status, updateStatus, setRecipientAddress, recipientAddress }) {
    const [currencyName, setCurrencyName] = useState('');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [fee, setFee] = useState('');
    const [amount, setAmount] = useState(0);
    const [usdpAmount, setUsdpAmount] = useState(0);
    const { setDepositAddress, setNetwork, coinsDataAfterFetch } = useContext(DataContext);
    const [isValid, setIsValid] = useState(false);
    const walletAddress = useAppState('wallet_address');
    let web3AuthObj = useSelector(state => state.mainRememberReducer.social_web3_obj?.obj);
    const dispatch = useDispatch();

    useEffect(() => {

        if (!selectedCoin.name && coinsDataAfterFetch?.coins?.length > 0) {
            const usdtCoin = coinsDataAfterFetch.coins.find(coin => coin?.name.includes('USDT TRC20'));
            setSelectedCoin(usdtCoin || coinsDataAfterFetch.coins[0]);
        }
    }, [coinsDataAfterFetch, selectedCoin]);

    const getExchangeRate = useCallback(() => {

        if (!selectedCoin.symbol || !currencyName) {
            return;
        }

        console.log(`4- ${endpoints.getExchangeRate}/${selectedCoin.symbol}`)

        fetchData(`${endpoints.getExchangeRate}/${selectedCoin.symbol}`)
            .then(data => {
                setCurrencyName(selectedCoin.symbol);
                setExchangeRate(data.data);
            })
            .catch(error => console.error('Error:', error)); // eslint-disable-next-line
    }, [currencyName]);

    useEffect(() => {
        getExchangeRate();

        const timer = setInterval(getExchangeRate, 60000);
        return () => clearInterval(timer); // eslint-disable-next-line
    }, [currencyName]);

    useEffect(() => {
        setFee(selectedCoin.feePercentageWithdrawal);
        setCurrencyName(selectedCoin.symbol);

        const calculateUSDP = () => {
            let usdp = amount / exchangeRate * (1 - fee / 100);
            if (isNaN(usdp) || usdp < 0 || !usdp) { usdp = 0; }
            setUsdpAmount(usdp);
        };

        calculateUSDP();
    }, [selectedCoin, amount, exchangeRate, fee]);

    const handleContinue = async () => {

        // prevent moving forward if no token where detected on sending wallets
        if (!await walletBalanceHandler(selectedCoin.name.toLowerCase(), usdpAmount, dispatch)) {
            return;
        }

        setNetwork(selectedCoin.network);
        // console.log("4- selectedCoin?.withdrawalAddress",selectedCoin?.withdrawalAddress);

        setDepositAddress(selectedCoin?.withdrawalAddress);

        const transactionDetails = {
            depositAddress: selectedCoin?.withdrawalAddress, // depositAddress (The address of our wallet to send the usdp to)
            amount, // amount (The amount of usdp to send)
            currencyName // currencyNexusId ( The currency to send)
        };

        // Fetch the message
        console.log('4- getMessage', `${revEndpoints.getMessage}/${walletAddress}/${APP.state.get('partnerRef')}/${currencyName}/${amount}/${recipientAddress}`);
        // m0oN2

        return fetchData(`${revEndpoints.getMessage}/${walletAddress}/${APP.state.get('partnerRef')}/${currencyName}/${amount}/${recipientAddress}`)
            .then(messageResponse => {
                if (messageResponse.message === "Success") {
                    APP.state.set('rbIsLoading', true);
                    // The actual transaction function
                    playBlockTransaction(transactionDetails, web3AuthObj, web3AuthObj.provider, dispatch)
                        .then(response => {
                            if (response && response === 'success') {
                                APP.customer.update_balance();
                                APP.state.set('rbIsLoading', false);
                                APP.state.set('rbsetRingStatuses', true);
                                updateStatus(3);
                                moveToPage(2);
                            }
                            else {
                                APP.state.set('rbIsLoading', false);
                                // updateStatus(3);// for testing
                                // moveToPage(2);// for testing
                            }
                        })
                        .catch(error => {
                            APP.state.set('rbIsLoading', false);
                            console.error('Error:', error);
                        });
                }
            })
            .catch(error => console.error('Error:', error));
    };

    return (
        <div className='page2'>
            <StatusBar status={status} />

            <div className="page2_content">
                <InputGroup
                    selectedCoin={selectedCoin}
                    setSelectedCoin={setSelectedCoin}
                    setAmount={setAmount}
                    usdpAmount={usdpAmount}
                    recipientAddress={recipientAddress}
                    setRecipientAddress={setRecipientAddress}
                    network={selectedCoin.network}
                    setIsValid={setIsValid}
                    isValid={isValid}
                />
                <ExchangeRate
                    currency={currencyName}
                    exchangeRate={1 / exchangeRate}
                    fee={fee}
                    onClick={handleContinue}
                    amount={amount}
                    network={selectedCoin.network}
                    recipientAddress={recipientAddress}
                    setIsValid={setIsValid}
                    isValid={isValid}
                    minWithdrawal={selectedCoin.minWithdrawal}
                />
            </div>
        </div>
    )
}

export default Page2;