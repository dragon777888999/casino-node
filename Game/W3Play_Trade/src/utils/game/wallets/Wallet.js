import Web3 from 'web3';
import { isMobile } from 'react-device-detect';
import { ethers } from 'ethers';
import { networks } from '../networks'
import { getMessageToSign, verifySignedMessage } from '../../moralis';
import { getChatToken } from '../../chat';
import state from '../../../state';
import tp from 'tp-js-sdk'
import GameController from '../../../controllers/Game';
import CustomerModel from '../../../models/Customer';
import { set_alert_msg, set_demo_mode, set_loader, set_user_sec } from '../../../REDUX/actions/main.actions';
import gasToken from '../../../API/gasToken';
import sendSessionStorage from '../../login/sendSession';
import { sleep } from '../../async';
import extractRppParam from '../../extractUrlParam';
import fetchCampaign from '../../campaigns/rpp';

const availableEvents = [
  /**
   * The MetaMask emits this event when it first becomes able to submit RPC requests to a chain.
   *
   * Callback parameters: info
   */
  'connect',
  /**
   * The MetaMask emits this event if it becomes unable to submit RPC requests to any chain.
   * In general, this will only happen due to network connectivity issues or some unforeseen error.
   *
   * Rreturn: info
   */
  'disconnect',
  /**
   * The MetaMask emits this event when the currently connected chain changes.
   *
   * Rreturn: chainId
   */
  'chainChanged',
  /**
   * The MetaMask emits this event whenever the return value of the eth_accounts RPC method changes.
   *
   * Rreturn: accounts
   */
  'accountsChanged'
]

// wallet extention urls

const WALLET_EXTENTION_URLS = {
  metaMask: {
    Chrome: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
    Edge: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm',
    Brave: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en',
    Firefox: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/'
  },
  coinbase: {
    Chrome: 'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en',
    Brave: 'https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad',
  },
  trustWallet: {
    Chrome: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
    Brave: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
  }
  ,
  imToken: {
    Chrome: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
    Brave: 'https://chrome.google.com/webstore/detail/trust-wallet/egjidjbpglichdcondbcbdnbeeppgdph',
  }
}

/**
 * MetaMask wallet client
 */
class Wallet {
  /**
   *
   * @param {string} network - One of available {@link networks}
   */
  constructor(network = "TESTNET", provider, address) {
    this.listeners = {};
    this.contracts = {};
    this.network = networks[network];

    this.walletProvider = null;
    this.installed = false;
    this.metaMask = { isInstaled: false, walletProvider: null };
    this.coinbase = { isInstaled: false, walletProvider: null };
    this.trustWallet = { isInstaled: false, walletProvider: null };
    this.web5 = { isInstaled: false, walletProvider: null };
    this.magicauth = { isInstaled: false, walletProvider: null };
    this.imToken = { isInstaled: false, walletProvider: null };
    this.tpWallet = { isInstaled: false, walletProvider: null };
    this.accounts = [];
    this.authenticated = false;
    this.multipleWallets = null;
    this.isInstalled = false;

    if (provider != undefined) {

      this.web5 = { isInstaled: true, walletProvider: provider };
      this.magicauth = { isInstaled: true, walletProvider: provider };

      let ethersProvider;
      try {
        ethersProvider = new ethers.BrowserProvider(provider);
      } catch (e) {
        console.log('Provider error', e);
      }
      //const ethersProvider = new ethers.providers.Web3Provider(provider);
      let signer;
      (async () => {
        signer = await ethersProvider.getSigner();
        APP.state.set('web5signer', signer);
      })();

      this.walletProvider = provider;
      this.isInstalled = true;
      this.isInstaled = true;
      //this["web5"].walletProvider=provider;
      this.accounts[0] = address
      try {
        this.walletProvider.selectedAddress = address
      }
      catch (e) {
        console.log(e, 'e')
      }
      this.web3 = new Web3(this.walletProvider);

    }
    else {
      if (window.ethereum) {
        this.detectInstalledWallets();
      }
      else {
        //alert(1)
        window.addEventListener('ethereum#initialized', this.detectInstalledWallets, {
          once: true,
        });

        // If the event is not dispatched by the end of the timeout,
        // the user probably doesn't have MetaMask installed.
        setTimeout(this.detectInstalledWallets, 3000); // 3 seconds
      }
    }

    // connect automatically if a user already connected and the wallet extension is still installed.
    try {
      // console.log('localStorage.getItem("wallet") && this.isInstalled...', localStorage.getItem("wallet"), this.isInstalled)
      if (localStorage.getItem("wallet") && this.isInstalled && localStorage.getItem("wallet") !== 'web5') {
        //if(this.trustWallet.isInstaled = true){alert(11)}
        if (this.setWallet()) {
          //if(this.trustWallet.isInstaled = true){alert(12)}
          //console.log("wallet.js constructor 2")
          APP.state.set("connecting_wallet", true);
          // insert new code here
          this.waitForWalletProviderToLoad()
            .then(() => {
              //if (this.trustWallet.isInstaled = true) { alert(13) }
              // if user is still connected to wallet
              const authToken = localStorage.getItem("auth-token");
              const chatToken = localStorage.getItem('chat-token');
              //if (this.trustWallet.isInstaled = true) { alert(authToken) }
              //if (this.trustWallet.isInstaled = true) { alert(this.walletProvider.selectedAddress) }

              // console.log(this.walletProvider, '__walletProvider_', 'authToken: ', authToken)
              if (this.walletProvider.selectedAddress == undefined && authToken) {
                this.requestAccounts().then((accounts) => {
                  //alert(accounts[0])
                  this.walletProvider.selectedAddress = accounts[0];
                  this.accounts = this.walletProvider.selectedAddress;
                  this.authenticated = true;

                  APP.state.set("wallet_address", this.accounts);
                  APP.controller.publish('user_wallet_address_changed', this.accounts);
                  APP.state.set("connecting_wallet", false);
                });

              }
              else {
                if (this.walletProvider.selectedAddress && authToken) {
                  // set the wallet address
                  //if (this.trustWallet.isInstaled = true) { alert(14) }
                  let lastWalletAddress = localStorage.getItem('last_wallet_address');

                  if (lastWalletAddress && (lastWalletAddress.toLocaleLowerCase() !== this.walletProvider.selectedAddress.toLocaleLowerCase())) {
                    localStorage.removeItem('wallet')
                    // alert(4.1)
                    APP.state.unset("wallet_address");
                    APP.controller.publish('user_wallet_address_changed', null);
                    return;
                  }

                  this.accounts = this.walletProvider.selectedAddress;
                  this.authenticated = true;
                  APP.state.set("wallet_address", this.accounts);
                  APP.controller.publish('user_wallet_address_changed', this.accounts);
                  APP.state.set("connecting_wallet", false);
                } else {
                  // user is not connected to wallet
                  console.log("disconnecting");
                  /*
                  localStorage.removeItem("auth-token");
                  localStorage.removeItem("chat-token");
                  localStorage.removeItem("avatar");
                  this.web3 = null;
                  */
                  localStorage.removeItem("wallet");
                  APP.state.set("connecting_wallet", false);
                  // alert(4)
                  APP.state.unset("wallet_address");
                  APP.controller.publish('user_wallet_address_changed', null);
                }
              }
            })
        }
      }
    } catch (e) {
      console.log('e', 213)
      // alert("error un wallets")
    }

    if (this.installed && this.walletProvider) {
      this.walletProvider.on("connect", (info) => {
        setTimeout(() => {
          if (this.walletProvider.selectedAddress) {
            this.authenticated = true;
            this.accounts = [this.walletProvider.selectedAddress];
          }
        }, 500);
      });
      this.walletProvider.on("disconnect", (info) => {
        this.web3.deac;
      });
      this.walletProvider.on("chainChanged", (chainId) => { });
      this.walletProvider.on("accountsChanged", (accounts) => {
        this.accounts = accounts;

        if (this.accounts.length === 0) {
          this.authenticated = false;
        }
      });
    }
  }

  setWallet() {
    const wallet = localStorage.getItem("wallet");

    //console.log("wallet.js setWallet", this.walletProvider)

    if (this[wallet].isInstaled) {
      this.walletProvider = this[wallet].walletProvider;
      this.web3 = new Web3(this[wallet].walletProvider);
      return true;
    }
    return false;
  }

  /**
   * Opens a browser window to install the wallet extension
   */
  async install(wallet) {
    //alert("install")
    const sUsrAg = navigator.userAgent;

    try {
      if (wallet == "imToken") {
        return true;
      }

      if (sUsrAg.indexOf("Firefox") > -1) {
        window.open(WALLET_EXTENTION_URLS[wallet]["Firefox"], "_blank");
      } else if (sUsrAg.indexOf("Edge") > -1) {
        window.open(WALLET_EXTENTION_URLS[wallet]["Edge"], "_blank");
      } else if (sUsrAg.indexOf("Chrome") > -1) {
        window.open(WALLET_EXTENTION_URLS[wallet]["Chrome"], "_blank");
      } else if (navigator.brave && (await navigator.brave.isBrave())) {
        window.open(WALLET_EXTENTION_URLS[wallet]["Brave"], "_blank");
      } else {
        //throw new Error("Browser does not supported by " + wallet);
      }
    }
    catch (e) {

    }
  }

  /**
   * Gets the current chain ID
   * @returns {string}
   */
  requestChainId() {
    return this.walletProvider.request({ method: "eth_chainId" });
  }

  /**
   * Requests MetaMask to change the current chain/network
   *
   * @param {string} chainId
   * @returns {Promise}
   */
  switchEthereumChain(chainId) {

    return this.walletProvider.request({
      params: [{ chainId }],
      method: "wallet_switchEthereumChain",
    });

  }

  /**
   * Requests MetaMask to add a chain/network
   * @param {Object} params
   * @returns {Promise}
   */
  addChains(params) {
    return this.walletProvider.request({
      params,
      method: "wallet_addEthereumChain",
    });
  }

  /**
   * Returns users accounts
   *
   * @returns {Array}
   */
  requestAccounts() {
    return this.walletProvider.request({
      method: "eth_requestAccounts",
    });
  }

  handleError(error) {
    console.log('hanndleError', error)
    if (error.code === 4001) {
      // throw error;
    }
    if (
      error.code === -32002 &&
      error.message.includes("eth_requestAccounts")
    ) {
      // alert('please open metamask and login first')
      console.log(error)
      // throw error
      //window.location.reload();
    }
    if (
      error.code === -32002 &&
      error.message.includes("wallet_requestPermissions")
    ) {
      // throw error;
    }
    console.log(error);
  }

  disconnect() {
    this.accounts = [];
  }

  /**
   * Requests MetaMask to connect the current instance
   * @returns {Promise}
   */
  async authenticate(walletName, /*address,*/ dispatch) {
    this.walletProvider = this[walletName].walletProvider;

    try {

      try {
        await this.setupNetwork()

        if (walletName !== 'web5' && walletName !== 'magicauth') {
          this.accounts = await this.requestAccounts();

          this.web3 = new Web3(this.walletProvider);
          if (this.accounts.length > 0) {

            // APP.state.set("wallet_address", this.accounts[0]);
            return this.accounts[0];
          }
        }
      }
      catch (e) {
        // alert(JSON.stringify({ _381: e }))
        try {
          dispatch(set_loader(false))
          dispatch(set_alert_msg({ type: '', content: '', preventTimeout: false }))
          console.log(e, 'e1')
          // user denied acc auth
          if (e?.code === 4001) {
            setTimeout(() => {
              dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_complete_singin' }))
            }, 1000);
          }
        }
        catch (e) {
          console.log(e, 'e2')
        }
      }

    } catch (error) {
      console.log(error, 'error1')
      try {
        dispatch(set_loader(false))
        dispatch(set_alert_msg({ type: '', content: '', preventTimeout: false }))
      }
      catch (e) {
        console.log(error, 'error2')
      }

      this.handleError(error);
    }
  }

  /**
   * Requests users to add the network in case they don't have it already
   *
   * @returns {Promise}
   */
  async setupNetwork() {
    try {
      const chainId = await this.requestChainId();

      if (chainId !== this.network.chainId) {
        console.log(chainId, 'this.network.chainId', this.network.chainId)

        try {
          try {
            const {
              rpcUrls,
              chainId,
              chainName,
              blockExplorerUrls,
              nativeCurrency,
            } = this.network;

            // console.log('____', {
            //   rpcUrls,
            //   chainId,
            //   chainName,
            //   blockExplorerUrls,
            //   nativeCurrency: {
            //     name: nativeCurrency.name,
            //     symbol: nativeCurrency.symbol,
            //     decimals: nativeCurrency.decimals,
            //   }
            // })

            await this.addChains([{
              chainId: chainId,
              chainName: chainName,
              nativeCurrency: {
                name: nativeCurrency.name,
                symbol: nativeCurrency.symbol,
                decimals: nativeCurrency.decimals,
              },
              rpcUrls: ['https://rpc.playblock.io/'],
              blockExplorerUrls: blockExplorerUrls,
            }])
          }
          catch (error) {
            console.log('addChain error', error)
          }
          await this.switchEthereumChain(this.network.chainId);
          // await this.watchAsset(state.plbToken.address, 'USD', state.plbToken.decimals, null);

        } catch (error) {
          console.log('error addNewChain/switchChain', error)
        }
      }

      await this.walletProvider

      return chainId;
    } catch (error) {
      console.log(error, 'SetupNetwork')
      if (error.code === 4902) {
        const {
          rpcUrls,
          chainId,
          chainName,
          blockExplorerUrls,
          nativeCurrency,
        } = this.network;

        await this.addChains([
          {
            rpcUrls,
            chainId,
            chainName,
            blockExplorerUrls,
            nativeCurrency: {
              name: nativeCurrency.name,
              symbol: nativeCurrency.symbol,
              decimals: nativeCurrency.decimals,
            },
          },
        ]);
      }
    }
  }

  async sendTransaction(amount, to) {
    const value = amount.toString(16);
    const from = this.walletProvider.selectedAddress;

    const transaction = {
      to: to,
      from: from,
      value: value,
      chainId: this.network.chainId,
    };

    try {
      const txHash = await this.walletProvider.request({
        params: [transaction],
        method: "eth_sendTransaction",
      });
      return txHash;
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * Requests MetaMask to add an ERC-20 contract to users wallets
   *
   * @param {string} address
   * @param {string} symbol
   * @param {number} decimals
   * @param {string} image
   * @returns {Promise}
   */
  async watchAsset(address, symbol, decimals, image = undefined) {

    try {
      const wasAdded = await this.walletProvider.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            image: image,
            symbol: symbol,
            address: address,
            decimals: decimals,
          },
        },
      });
      return wasAdded;
    } catch (error) {
      // alert(JSON.stringify({ a: error }))
      console.log('watchAsset Error: ', error)
      this.handleError(error);
    }
  }

  addEventListner(event, callback) {
    if (this.installed && this.walletProvider) {
      const eventId = `${event}-${Date.now()}`;

      if (!availableEvents.includes(event)) {
        throw new Error("event does not supported");
      }
      this.walletProvider.on(event, callback);
      this.listeners[eventId] = callback;

      return eventId;
    }
  }

  // removeEventListener (id) {
  //   if (this.listeners[id]) {
  //     this.wallet.removeListener(id.split('-')[0], this.listeners[id])
  //     delete this.listeners[id]
  //   }
  // }

  // removeAllEventListeners () {
  //   for (let [id, listener] of Object.entries(this.listeners)) {
  //     this.wallet.removeListener(id.split('-')[0], listener)
  //   }
  //   this.listeners = {}
  // }

  async detectInstalledWallets(dispatch) {
    let walletName;

    try {

      // alert(JSON.stringify({ _595: window.ethereum }))
      if (typeof window.ethereum !== "undefined") {

        // in case multiple wallets are installed
        // its a browser chrome or firefox
        if (window.ethereum.providers?.length) {
          this.multipleWallets = true;

          window.ethereum.providers.forEach((p) => {
            if (p.isMetaMask) {
              this.metaMask.isInstaled = true;
              this.metaMask.walletProvider = p;
              walletName = "metaMask"
            }
            if (p.playwall) {
              // alert('found playwall')
            }
            if (p.isCoinbaseWallet) {
              this.coinbase.isInstaled = true;
              this.coinbase.walletProvider = p;
              walletName = "coinbase"
            }
            if (p.isTrust) {
              // alert('TRUST')
              // console.log(navigator.userAgent)
              //alert(navigator.userAgent.includes("AppleWebKit"))
              this.trustWallet.isInstaled = true;
              this.trustWallet.walletProvider = p;
              walletName = "trustWallet"
            }
            /*if (p.isImToken) {
              this.imToken.isInstaled = true;
              this.imToken.walletProvider = p
              this.installed = true;
              walletName = "imToken"
            }
            if (p.isTokenPocket) {
              this.tpWallet.isInstaled = true;
              this.tpWallet.walletProvider = p
              this.installed = true;
              walletName = "tpToken"
            }*/
          });
        } else {
          // otherwise detect wich single wallet is installed.
          //alert(2)

          if (window.ethereum.isMetaMask) {
            //alert(20)
            this.metaMask.isInstaled = true;
            this.metaMask.walletProvider = window.ethereum;
            walletName = "metamask"
          }
          if (window.ethereum.isCoinbaseWallet) {
            //alert(22)
            this.coinbase.isInstaled = true;
            this.coinbase.walletProvider = window.ethereum;
            walletName = "coinbase"
          }
          if (window.ethereum.playwall) {
            // alert('playwall 2')
          }
          if (window.ethereum.isTrust) {
            // alert('trust 2')
            this.trustWallet.isInstaled = true;
            this.trustWallet.walletProvider = window.ethereum;
            walletName = "trustWallet"

            //this.authenticated = true;
            /*walert(navigator.userAgent)*/
          }
          if (window.ethereum.isImToken) {
            this.imToken.isInstaled = true;
            this.imToken.walletProvider = window.ethereum;
            walletName = "imToken"
          }
          if (window.ethereum.isTokenPocket) {
            this.tpWallet.isInstaled = true;
            this.tpWallet.walletProvider = window.ethereum;
            walletName = "tpWallet"
          }
        }
        //alert(walletName)
      }
      else {
        //alert("no")
      }
    }
    catch (e) {
      console.log(e, 'e..')
    }
    console.log("walletName:" + walletName)
    try {
      if (this.tpWallet.isInstaled == true) {
        // alert("installed")

        // alert(tp.isConnected());
        tp.fullScreen({
          fullScreen: 0
        })

      }

      if (this.imToken.isInstaled == true || this.tpWallet.isInstaled == true || this.trustWallet.isInstaled == true /*|| this.metaMask.isInstaled == true*/) {
        localStorage.setItem('wallet', walletName);

        const walletAdress = await this.authenticate(walletName, dispatch);

        this.walletProvider.selectedAddress = walletAdress
        this.accounts = walletAdress

        if (walletAdress) {
          let result;

          if (!this.trustWallet.isInstaled) {
            result = await this.connectWithMoralis(Web3.utils.toChecksumAddress(walletAdress), walletName, APP.state.get('aff_ref'), dispatch);
          }
          else {
            result = true;
          }

          if (result) {
            APP.controller = new GameController();
            APP.customer = new CustomerModel(1, {}, []);
            APP.controller.init();
            APP.customer.init();
            localStorage.setItem('wallet', walletName);
            APP.customer.update_balance();
            //alert("C")
            APP.state.set("success_wallet_connect", true);
          } else {
            localStorage.removeItem("wallet")
            APP.state.set("success_wallet_connect", false);
          }

          //alert(1)
        }
      }
    } catch (e) { /*alert("cant fullscreen")*/ }
    this.isInstalled = true;
  }

  waitForWalletProviderToLoad() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 500);
    })
  }

  async connectWithMoralis(walletAdress, walletProvider, aff_ref, dispatch, initial_query_params) {

    // alert('0.1');

    const ref = localStorage.getItem("ref"),
      partnerRef = APP?.controller?.cfg?.partnerInfo?.partnerRef || 'playnance',
      user_email = APP.state.get('user_email'),
      profileImage = APP.state.get('profileImage');

    // connect with moralis
    return getMessageToSign({
      wallet: walletAdress,
      // uri: window.location.origin,
      uri: initial_query_params?.initialUri || APP.state.get('initialUri') || window.location.href,
      walletProvider: walletProvider,
      affiliateRef: aff_ref || ref || 'self',
      ...(partnerRef && ({ partnerRef })),
      ...(user_email && ({ email: user_email })),
      ...(profileImage && ({ avatarUrl: profileImage })),
      countryCode: APP.state.get('customer.detectedCountry') || 'UK'
    })
      .then(async data => {
        // alert(JSON.stringify({
        //   wallet: walletAdress,
        //   // uri: window.location.origin,
        //   uri: initial_query_params?.initialUri || APP.state.get('initialUri') || window.location.href,
        //   walletProvider: walletProvider,
        //   whiteLabel: "global",
        //   affiliateRef: aff_ref || ref || 'self',
        //   ipAddress: "0.0.0.0",
        //   ...(partnerRef && ({ partnerRef })),
        //   ...(user_email && ({ email: user_email })),
        //   ...(profileImage && ({ avatarUrl: profileImage })),
        //   countryCode: APP.state.get('customer.detectedCountry') || 'UK'
        // }))

        this.userId = data.id;
        this.message = data.message;
        //this.profileId = data.profileId
        console.log(data.message, walletAdress, "data.message, walletAdress")
        // alert('5')
        // alert(data.message)

        let res;

        // once received an rpp query param
        // wl campaign logic
        if (window.location.href.includes('rpp')) {
          let rppVal = extractRppParam(window.location.href, 'rpp');
          fetchCampaign(rppVal)
        }

        if (walletProvider === 'trustWallet') {
          await sleep(500)
        }
        res = await this.web3.eth.personal.sign(String(data.message), walletAdress);

        if (walletProvider === 'trustWallet') {
          await sleep(500)
        }

        if (res) {
          console.log(res, 'res')
          // alert(res)
          return verifySignedMessage({
            id: String(this.userId),
            message: String(this.message),
            signature: res /*String(singedMessage)*/
          })
        }
        // return res;
      })
      // .then(singedMessage => {
      //   let singedMsg = APP.state.get('singed_message')
      //   // console.log(singedMessage, 'singedMessage..   2nd is: ', singedMsg)
      //   // console.log(JSON.stringify(singedMessage), '1')
      //   // console.log(this.message, '2')
      //   // alert(JSON.stringify({ signedMsg: String(singedMessage) }))
      //   // alert(JSON.stringify({
      //   //   thisDotMessage: String(this.message),
      //   //   thisDotUserId: String(this.userId)
      //   // }))

      //   return verifySignedMessage({
      //     id: String(this.userId),
      //     message: String(this.message),
      //     signature: singedMsg /*String(singedMessage)*/
      //   })
      // })
      .then(async data => {
        console.log('data: ', data);
        dispatch(set_user_sec(data?.sec));
        // alert(JSON.stringify({ _813: data }))
        // alert(6)
        if (data?.profile?.funTokenClaimed === false) {
          APP.state.set('activate_claim_popup', true)
          // dispatch(set_demo_mode({ popup: true, claim_popup_wallet_address: walletAdress })); => moved to Root.jsx
        }

        localStorage.setItem('auth-token', data.token.access_token);
        localStorage.setItem('last_wallet_address', walletAdress)
        APP.state.set("connecting_wallet", false);
        // sendSessionStorage();

        localStorage.setItem("partnerRef", data?.profile?.partnerRef)
        APP.state.set("customer.avatar", data.profile.avatarUrl)
        APP.state.set("customer.countryCode", data.profile.countryCode)
        localStorage.setItem("avatar", data.profile.avatarUrl)
        localStorage.setItem("countryCode", data.profile.countryCode)
        localStorage.removeItem('ref');
        APP.state.set("connected_wallet_successfully", true);
        APP.state.set('activate_sounds_popup', 2)

        // google analytics event - google tag manager
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'login',
          'userId': walletAdress // Replace this with your actual User ID
        });

        if (APP.state.get('active_network') === 'mainnet') {
          await gasToken.getGasToken(walletAdress);
        }

        // bitstars.io postback
        async function sendPostback(bitId) {
          try {
            let response = await fetch(`https://smslegacy.com/track/interaction?trackingid=${bitId}&type=lead`,
              { method: 'POST' }),
              parsedRes = await response.json();
          }
          catch (e) {
            // console.log(e, 'e .. postback')
          }
        }

        function getParamValue(paramString, paramName) {
          const params = new URLSearchParams(paramString);
          return params.get(paramName);
        }

        let bitId = getParamValue(APP.state.get('initialParams'), 'bitId');
        if (bitId && window.location.hostname.includes('bitstars.io')) { sendPostback(bitId); }
        // bitstars.io postback

        //For wallet connect purposes
        APP.state.set("WC_signin_success", true);
        try {
          dispatch(set_loader(false))
          dispatch(set_alert_msg({ type: '', content: '', preventTimeout: false }))
        }
        catch (e) {
          console.log('err:', e)
          // alert(JSON.stringify({ a: 2, b: JSON.stringify(e) }))
        }
        APP.state.unset('aff_ref')

        return 1;
      })
      .catch(async error => {
        // alert('782')
        // alert(error)
        console.log(error, 'error')

        this.disconnect();
        this.web3 = null;
        this.walletProvider = null;
        APP.state.set("success_wallet_connect", false);
        APP.state.unset("wallet_address");
        APP.controller.publish('user_wallet_address_changed', null);
        APP.state.set("connecting_wallet", false);

        // alert(JSON.stringify({ a: 4.3, b: JSON.stringify(error) }))
        APP.state.unset("wallet_address");
        try {
          dispatch(set_loader(false))
          dispatch(set_alert_msg({ type: '', content: '', preventTimeout: false }))

          if (!isMobile) {
            setTimeout(() => {
              dispatch(set_alert_msg({ type: 'error', content: 'alert_msg_error_complete_singin' }))
            }, 1000);
          }
        }
        catch (e) { }
        // dispatch(set_alert_msg({ type: 'error', content: 'Please Complete The Wallet Connect Process!' }))

        localStorage.removeItem('wallet');
        localStorage.removeItem('chat-token');
        // localStorage.removeItem('auth-token');
        localStorage.removeItem('avatar');

        //For wallet connect purposes
        APP.state.set("WC_signin_success", false);

        return 0;
        // web3 = null;
        // let res = await web3.eth.accounts.wallet.clear();
        // window.ethereum.close();

        // this.web3
        // disconnect user. set this.accounts to null and this.web3 to null 
        // alert('something went wrong while trying to connect please try again later ')
      })
      .catch((error) => {
        console.log("ERROR", error)
        return 0;
      })
  }

  getChatToken(walletAdress, partnerRef) {

    return getChatToken(walletAdress, partnerRef)
      .then((chatToken) => {

        if (chatToken) {
          localStorage.setItem("chat-token", chatToken.token);

          APP.state.set("chat_token", chatToken.token);
          APP.state.set("connecting_wallet", false);
        }
        else {
          console.log("no chat token")
        }
      })
  }

}

export default Wallet;