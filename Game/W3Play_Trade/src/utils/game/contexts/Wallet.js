import React, { createContext, useEffect, useState, useMemo } from 'react'
import useAppState from '../../../hooks/useAppState'
import AppChat from '../../../pages/TradePage/AppChat'
import Wallet from '../wallets/Wallet'
import { browserName } from 'react-device-detect';
import state from '../../../state';

/**
 * @module Contexts
 */

/**
 * Provides a context with a {@link MetaMask} client
 * @property {string} account - Currently MetaMask selected account
 * @property {callback} authenticate - Request to connect MetaMask
 * @property {MetaMask} wallet - MetaMask client
 * @property {number} balance - User's crypto balance
 */
export const WalletContext = createContext()

/**
 *
 * @typedef {Object} WalletProviderParams
 * @property {string} network - Can be either LOCAL, TESTNET or MAINNET
 */


/**
   * Requests users to add the network in case they don't have it already
   *
   * @returns {Promise}
   */




/**
 * Provides a context that keeps a {@link MetaMask} client connected and synced
 * with user's MetaMask
 *
 * @param {WalletProviderParams} params
 * @returns {React.Component}
 */
export function WalletProvider({ network, children }) {
  const [account, setAccount] = useState()
  const [balance, setBalance] = useState(0)
  // const wallet = useMemo(() => new Wallet(network), [network])
  // changed here to wallet initialization from Root.jsx
  //const wallet = useMemo(() => APP.wallets, [network]) //steve implementation
  const wallet = APP.wallets
  const walletAdress = useAppState("wallet_address");
  //const wallet = useAppState()
  //console.log('contexts/wallet context network',network);
  //console.log('contexts/wallet wallet context APP.wallets',APP.wallets);
  //console.log('contexts/wallet wallet context wallet',wallet);

  useEffect(() => {
    setTimeout(() => {
      if (wallet.walletProvider && wallet.walletProvider.selectedAddress) {
        setAccount(wallet.walletProvider.selectedAddress)
      }
    }, 500)

    wallet.addEventListner('connect', () => {
      if (wallet.walletProvider.selectedAddress) {
        setAccount(wallet.walletProvider.selectedAddress)
      }
    })
    wallet.addEventListner('accountsChanged', accounts => {
      if (accounts.length === 0) {
        setAccount(false)
      } else {
        setAccount(wallet.walletProvider.selectedAddress)
      }
    })
  }, [wallet, walletAdress])

  useEffect(() => {
    const loadBalance = async () => {

      //if (APP.state.get('walletConnectModal').getIsConnected()) return;

      // console.log('Wallet.js:: in load balance');

      //console.log('before switch network');

      //Switch network functionality
      (async function () {
        //console.log('setupNetwork')
        try {
          // console.log('wallet', wallet);
          const currentUserChainId = await wallet.walletProvider.request({ method: "eth_chainId" });

          let neededChainId = '0x' + parseInt(APP.state.get('chainId')).toString(16);
          let neededChainId_int = APP.state.get('chainId');
          // console.log('neededChainId: ', neededChainId);
          // console.log('currentUserChainId: ', currentUserChainId);
          if (currentUserChainId.toString() !== neededChainId && currentUserChainId.toString() !== neededChainId_int) {
            console.log('need to switch to ' + neededChainId + ' network');

            await wallet.walletProvider.request({
              params: [{ chainId: neededChainId }],
              method: "wallet_switchEthereumChain",
            });

            //Reload page after switch network , don't do this on Coinbase mobile
            if (browserName.toLowerCase() !== 'chrome webview' && browserName.toLowerCase() !== 'webkit') {
              // console.log('Reload page after switch network...');
              if (!APP.state.get('web3Onboard')) {
                window.location.reload();
              }
            }
          }

          return neededChainId;
        } catch (error) {
          console.log(error, '114')
        }
      })();

      //console.log('useEffect after switch network account',account)  


      let active_wallet = APP.customer.active_wallet;
      // console.log('contexts/wallet useEffect after switch network active_wallet',active_wallet) 
      // console.log('contexts/wallet useEffect after switch network wallet',wallet)  
      // console.log('contexts/wallet useEffect after switch network wallet',APP.wallets)  
      if (typeof (wallet.web3) !== 'undefined' && wallet.web3 !== null) {

        // console.log('account', account);
        // console.log('active_wallet', active_wallet);

        if (account !== undefined)
          setBalance(await wallet.web3.eth.getBalance(account, 'pending'))
        else {
          // console.log('wallet.js set balance to', await wallet.web3.eth.getBalance(active_wallet, 'pending'));
          // setBalance(await wallet.web3.eth.getBalance(active_wallet, 'pending'))
        }
      }

    }

    walletAdress && loadBalance()
  }, [account, wallet, walletAdress])

  const authenticate = async (walletName) => {
    setAccount(await wallet.authenticate(walletName))
  }

  const updateBalance = async () => {
    // don't call get balance on undefined acoount and when web3 object is not initialized
    if (typeof (wallet.web3) !== 'undefined' && account !== undefined) {
      setBalance(await wallet?.web3?.eth?.getBalance(account, 'pending'))
    }
  }

  return (
    <WalletContext.Provider value={{
      account,
      walletAdress,
      authenticate,
      wallet,
      balance,
      updateBalance
    }}
    >
      {children}
    </WalletContext.Provider>
  )
}