import Web3PromiEvent from 'web3-core-promievent';
import { GameError } from './../utils/errors';
import { utils } from 'web3';
import Web3 from 'web3';
import APP from '../app'
import state from "../state";
import web3Singleton from './Web3Singleton';
import { ethers } from 'ethers';
import tokenInfo from './contracts/USD.json';
import { doSign } from '../utils/sign';
import betErrorHandler from '../utils/betErrorHandler';
import gasToken from './gasToken';
import { set_alert_msg } from '../REDUX/actions/main.actions';


/**
 * Wrapper for eth.Contract that provides revert reason resolution
 * and better error handler
 */
export default class WalletContract {
  /**
   *
   * @param {Web3} web3
   */
  constructor(web3) {
    this.web3 = web3
  }

  /**
   * Loads a JSON ABI of a contract and uses an address
   *
   * @param {Object} abi
   * @param {string} address
   */
  async load(abi, address) {
    // alert(JSON.stringify({ before: address }))
    //Prevent calling getGasPrice multiple times (save gas price in cache)
    if (APP.state.get('gasPrice') === undefined) {
      this.gasPrice = await this.web3?.eth?.getGasPrice() || await web3?.eth?.getGasPrice();
      APP.state.set('gasPrice', this.gasPrice)
    } else {
      this.gasPrice = APP.state.get('gasPrice')
    }

    //TODO: change to wallet provider with private key

    const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri'));

    // const web3 = new Web3(new Web3.providers.WebsocketProvider(
    //   APP.state.get('eth_ws_uri'), {
    //   reconnect: {
    //     auto: true,
    //     delay: 1000, // ms
    //     maxAttempts: 10,
    //     onTimeout: false
    //   }
    // }
    // ));

    const web3Free = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'));

    //Free provider. Like https://polygon-rpc.com , https://rpc.ankr.com/polygon_mumbai
    // const web3Free = new Web3(new Web3.providers.HttpProvider(
    //   APP.state.get('eth_ws_uri_free'), {
    //   reconnect: {
    //     auto: true,
    //     delay: 1000, // ms
    //     maxAttempts: 10,
    //     onTimeout: false
    //   }
    // }
    // ));

    if (this.web3?.eth) {
      this.web3.eth.transactionConfirmationBlocks = APP.state.get('web3TransactionConfirmationBlocks');
      this.contract = new this.web3.eth.Contract(abi, address);
      APP.state.set('web3Contract', this.contract)
      //Social connect
      this.contractEther = new ethers.Contract(address, abi, APP.state.get('web5signer'));

      //this.web3.setProvider(new Web3.providers.WebsocketProvider('wss://polygon-mainnet.g.alchemy.com/v2/RnVWKxoJ71LF6uXJ-jPY8P2jaVRblPs2'));

      //const web3Instance = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mainnet.g.alchemy.com/v2/RnVWKxoJ71LF6uXJ-jPY8P2jaVRblPs2'));

      //this.contractv4 = new web3Instance.eth.Contract(abi, address);

      //this.contractv4 = new Web3v4().eth.Contract(abi, address);
    }
    //this.contract = new web3.eth.Contract(abi, address)
  }

  /**
   * Sets the default from field for making transactions
   * @param {string} account
   */
  setFrom(account) {
    this.from = account
  }

  /**
   * Listens to a contract's event
   *
   * @param {string} eventName
   * @param {callback} callback
   * @returns {EventEmitter}
   */
  addContractListener(eventName, callback) {
    return this.contract.events[eventName]({ fromBlock: 'latest' })
      .on('data', callback)
      .on('error', error => {
        console.log(error)
      })
  }

  /**
   * Calls read methods for a contract
   *
   * @param {string} methodName
   * @param {Array<string>} params
   * @param {Object} options
   * @returns {Promise}
   */
  async call(methodName, params = [], options = {}) {
    return this.contract?.methods[methodName](...params).call(options)
  }

  async sendWeb3js(methodName, params, value = undefined, maxFeePerGas, maxPriorityFeePerGas) {
    const promiEvent = new Web3PromiEvent();

    let contract = this.contract || APP.state.get('web3Contract');

    // const relay = APP.state.get('gelatoRelay');
    // const provider = APP.wallets.walletProvider;

    // console.log('token info' , tokenInfo);

    // const token = APP.state.get('plbToken');

    // const deadline = Math.floor(Date.now() / 1000) + 60 * 5;

    // this.contractToken = new ethers.Contract(token.address, tokenInfo.abi, APP.state.get('web5signer'));

    // //Create signature 
    // const sig = (await doSign(
    //   APP.state.get('web5signer'),
    //   this.contractToken,
    //   token.name,
    //   token.address,
    //   value,
    //   APP.state.get('web5signer').address,
    //   APP.state.get('active_table').contract_adderess,
    //   deadline,
    //   (await provider.getNetwork()).chainId
    // ));

    // console.log('sig',sig);

    // const { v, r, s } = sig;

    // params[0]['owner'] = APP.customer.active_wallet;
    // params[0]['amount'] = value;
    // params[0]['deadline'] = deadline;
    // params[0]['v'] = v;
    // params[0]['r'] = r;
    // params[0]['s'] = s;


    // this.contract.methods[methodName](...params)
    contract.methods[methodName](...params)
      .send({
        from: this.from,
        //gas: '800000', //The maximum gas provided for a transaction (gas limit)
        //gasPrice: this.gasPrice, //The gas price in wei to use for transactions,
        //gas: 3000000,
        //type: 2,
        gasLimit: 2000000,
        //maxPriorityFeePerGas: '500000000000',
        //maxFeePerGas:         '500000000000',
        value,
        maxFeePerGas: maxFeePerGas.toString(),
        maxPriorityFeePerGas: maxPriorityFeePerGas.toString()
      })
      .on('transactionHash', hash => {
        //console.log('Trade transaction Hash: ', hash);
        promiEvent.eventEmitter.emit('transactionHash', hash);
      })
      .on('confirmation', (confNumber, receipt) => {
        //console.log('Confirmation number: ', confNumber);
        //console.log('Receipt: ', receipt);
        promiEvent.eventEmitter.emit('confirmation', confNumber, receipt);
      })
      .on('error', async (err, receipt) => {
        if (receipt && err.message.match(/Transaction has been reverted/)) {
          console.log(err, receipt);
          const reason = await this.getRevertReason(receipt.transactionHash)
          promiEvent.reject(new GameError(reason))
        }
      })
      .then(receipt => {
        //console.log('Receipt: ', receipt);
        promiEvent.resolve(receipt);
      })
      .catch(err => {

        // bet reverted 
        if (JSON.stringify(err.message).toLowerCase().includes('reverted')) {
          APP.state.set('bet_error', 'Trade Failed')
        }

        // User cancelled bet
        else if (err.code === 4001) {
          APP.state.set('bet_error', 'Transaction cancelled by the user')
          promiEvent.reject(new GameError('Transaction cancelled by the user'))
        }

        else if (err.code === 429) {

        } else if (err.code === -32603) {
          APP.state.set('global_bet_failed', true)
          // console.log('-32603', err.message)
          // promiEvent.reject(new GameError('Bet Failed'))
          try {
            let regex = /(revert)\s([\sa-zA-Z,.]*)(")/g;
            let m = regex.exec(err.message)

            if (m == null) {
              promiEvent.reject(new GameError('Error occured'))
            } else if (m) {
              console.log(err.data, 'data')
            }
            else {
              promiEvent.reject(new GameError(m[2]))
            }
          } catch (e) {
            console.log(e)
          }
        } else if (!err.message.match(/Transaction has been reverted/)) {
          // console.log('REVERETED>>>>>>>>>>>>>>>>>>>>>>\n\n\n\n')
          promiEvent.reject(err)
        }
      })

    return promiEvent.eventEmitter
  }

  //Send trade using Ethers.js
  async sendEthersjs(methodName, params, value = undefined, maxFeePerGas, maxPriorityFeePerGas, demoMode) {
    let contract = this.contractEther;
    const revertReasonFunc = this.getRevertReason;
    var receipt = false;
    try {

      try {

        let provider, signer;


        //Social wallet connect
        if (typeof (APP.state.get('web5signer')) !== 'undefined') {
          provider = APP.state.get('web5signer');
          signer = APP.state.get('web5signer');
        } else {
          //Other wallets like Metamask/Coinbase etc.
          provider = new ethers.BrowserProvider(window.ethereum);
          signer = await provider.getSigner();
          //Connect to the signer from connected wallet
          contract = contract.connect(signer);
        }

        console.log('XXXXX PROVIDER', provider);
        console.log('XXXXX SIGNER', signer);

        params[0]['owner'] = await signer.getAddress();
        params[0]['amount'] = value;

        // Get the balance of the signer's address (Native balance token)
        const getBalance = async (address) => {
          // Check if the provider has the getBalance method
          if (typeof provider?.provider?.getBalance === 'function') {
            return await provider.provider.getBalance(await signer.getAddress());
          } else {
            // Use ethers default provider for getting the balance
            const defaultProvider = new ethers.BrowserProvider(window.ethereum);
            return await defaultProvider.getBalance(address);
          }
        };

        // Get the balance of the signer's address (Native balance token)
        const balance = await getBalance(await signer.getAddress());
        // console.log(ethers.formatEther(balance), 'balance...')

        const gasPrice = APP.state.get('gwei_gas_price');
        console.log(parseFloat(ethers.formatEther(balance)), '<=', (parseFloat(gasPrice)))
        if (parseFloat(ethers.formatEther(balance)) <= parseFloat(gasPrice)) {
          await gasToken.getGasToken(APP.state.get('wallet_address'));
        }

        const tradeParams = params[0];

        console.log('params', params);
        console.log('trade params', tradeParams);

        //Populate transaction with user signature
        //convert amount from wei to decimal
        tradeParams.amount = tradeParams.amount / 10 ** 18;
        //Token information
        const demoToken = APP.state.get('plbToken_demo');
        const realToken = APP.state.get('plbToken');
        const token = APP.state.get('currentToken') === 'demo' ? demoToken : realToken;

        this.contractToken = new ethers.Contract(token.address, tokenInfo.abi, signer);

        //Set max allowance

        //Check if user allowance is below 1000 and send TX for approving MAX allowance

        const allowanceForUser = await this.checkAllowance(await signer.getAddress(), APP.state.get('active_table').contract_adderess);
        //console.log ('XXXXXX' , ethers.formatUnits(allowanceForUser, 2));

        if (allowanceForUser <= token.minAllowanceThreshold) {
          console.log('Allowance below threshold call approve for max allowance');
          const maxAllowance = ethers.MaxUint256;
          const tx = await this.contractToken.approve(APP.state.get('active_table').contract_adderess, maxAllowance);
          await tx.wait();
        } else {
          console.log('Allowance for wallet is ok continue placing trade');
        }

        // console.log(`Transaction hash for allowance approval: ${tx.hash}`);

        //If user gets this error
        //ERROR Error: execution reverted (unknown custom error) (action="estimateGas", 
        //It means that no allowance exists for his wallet to take funds and sent to smart contract

        //Send the trade itself
        tradeParams.amount = tradeParams.amount * 10 ** 2;
        console.log('TRADE PARAMS', tradeParams);
        console.log('TEST SENDING TX: START', new Date());

        console.log('CONTRACT ', contract);

        const txResponse = await contract.makeTrade({
          poolId: tradeParams.poolId, avatarUrl: tradeParams.avatarUrl, countryCode: tradeParams.countryCode,
          upOrDown: tradeParams.upOrDown,
          whiteLabelId: tradeParams.whiteLabelId, owner: tradeParams.owner,
          amount: tradeParams.amount
        });
        
        let dispatch = APP.state.get('dispatcher');

        if (txResponse.data) {
          console.log('XX here', txResponse, APP.state.get('ticketWorth'), APP.state.get('wallet_address'), tradeParams);

          if (txResponse?.from?.toLowerCase() === APP.state.get('wallet_address')?.toLowerCase()) {
            setTimeout(() => {
              dispatch(set_alert_msg({ type: 'tickets', content: parseInt((tradeParams.amount / 100) / APP.state.get('ticketWorth')) }))
            }, 2500);
          }
        }
        console.log('TEST SENDING TX: END', new Date())
        console.log('TX RESPONSE', txResponse);

      } catch (e) {
        console.log('ERROR', e);
        // extract & save error msg 
        betErrorHandler(String(e), APP.state.get('wallet_address'));
      }

      //console.log('Transaction hash: ', tx);  // or any other subsequent operation you'd like to do with tx

      // //On transactionHash
      // console.log('hash: ', tx.hash, new Date());
      // APP.controller.publish('transactionHash', tx.hash);
      // console.log('after transactionHash publish', new Date());

      // // Wait for confirmation
      // let numberOfBlocksToWait = APP.state.get('web3TransactionConfirmationBlocks');
      // receipt = await tx.wait(numberOfBlocksToWait); // Wait for confirmations
      // APP.controller.publish('confirmation', receipt)

      // console.log('Transaction confirmed in block:', receipt.blockNumber);

      //On confirmation
      //promiEvent.eventEmitter.emit('confirmation', numberOfBlocksToWait, receipt);

    } catch (err) {
      console.error('Error executing contract method:', err);
      //console.log('receipt: ', receipt);
      if (receipt && err.message.match(/Transaction has been reverted/)) {
        console.log('receipt: ', receipt);
        const reason = await this.revertReasonFunc(receipt.transactionHash);
        throw (new GameError(reason));
      }

      //bet reverted 
      if (JSON.stringify(err.message).toLowerCase().includes('reverted')) {
        console.log('bet reverted');
        APP.state.set('bet_error', 'Trade Failed');
        throw (new GameError('Error occured'));


        //not needed
        //APP.state.set('bet_failed', true);
        //APP.state.set('contract_signed', true);
      }

      // User cancelled bet
      else if (err.code === 4001) {
        APP.state.set('bet_error', 'Transaction cancelled by the user');
        throw (new GameError('Transaction cancelled by the user'));
      }

      else if (err.code === 429) {

      } else if (err.code === -32603) {
        APP.state.set('global_bet_failed', true)
        // console.log('-32603', err.message)
        // promiEvent.reject(new GameError('Bet Failed'))
        try {
          console.log(err);
          let regex = /(revert)\s([\sa-zA-Z,.]*)(")/g;
          let m = regex.exec(err.message)

          if (m == null) {
            throw (new GameError('Error occured'));
          } else if (m) {
            console.log(err.data, 'data')
          }
          else {
            throw (new GameError(m[2]));
          }
        } catch (e) {
          console.log(e)
        }
      } else if (!err.message.match(/Transaction has been reverted/)) {
        console.log(err);
        // console.log('REVERETED>>>>>>>>>>>>>>>>>>>>>>\n\n\n\n')
        throw (err)
      }
    }

    //return promiEvent.eventEmitter;
  }

  /**
   *
   * @param {string} methodName
   * @param {array} params
   * @param {string} value
   * @returns {Web3PromiEvent}
   */
  send(methodName, params, value = undefined, maxFeePerGas, maxPriorityFeePerGas, demoMode) {
    //TODO: move this to state.js, just for testing now.
    //const result = this.sendWeb3js(methodName, params, value, maxFeePerGas, maxPriorityFeePerGas); //Use web3.js
    var result = false;
    //Check if Ether object has provider
    //It has provider if user connected with Web3Auth/Magic


    result = this.sendEthersjs(methodName, params, value, maxFeePerGas, maxPriorityFeePerGas, demoMode); //Use ethers.js    

    // if (typeof (APP.state.get('web5signer')) !== 'undefined') {
    //   console.log('Place trade -> using ether.js')
    //   result = this.sendEthersjs(methodName, params, value, maxFeePerGas, maxPriorityFeePerGas); //Use ethers.js    
    // } else {
    //   console.log('Place trade -> using web3.js')
    //   result = this.sendWeb3js(methodName, params, value, maxFeePerGas, maxPriorityFeePerGas); //Use web3.js
    // }



    return result;
  }

  /**
   * Returns the parsed revert reason of a reverted transaction
   *
   * @param {string} txHash
   * @returns {string}
   */
  async getRevertReason(txHash) {
    const web3 = this.web3
    const tx = await web3.eth.getTransaction(txHash)
    try {
      await web3.eth.call(tx, tx.blockNumber)
    } catch (err) {
      // const json = JSON.parse(err?.message?.toString().replace('Error: Internal JSON-RPC error.', ''))
      // const json = err?.message?.toString().replace('Error: Internal JSON-RPC error.', '')
      return err?.message?.split('{')[0];
    }
  }

  async checkAllowance(ownerAddress, spenderAddress) {

    console.log('in check allowance', ownerAddress, spenderAddress);

    try {
      console.log('this.contractToken', this.contractToken);
      const allowance = await this.contractToken.allowance(ownerAddress, spenderAddress);
      console.log('Allowance:', allowance);
      return allowance;
    } catch (error) {
      console.error('Error fetching allowance:', error);
      throw error;
    }
  }
}
