import Web3PromiEvent from 'web3-core-promievent'
import { GameError } from '../utilities/errors'

/**
 * Wrapper for eth.Contract that provides revert reason resolution
 * and better error handler
 */
export class Contract {
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
    try {
      if (APP.state.get('gasPrice') === undefined) {
        this.gasPrice = await this.web3.eth.getGasPrice()
        APP.state.set('gasPrice', this.gasPrice)
      } else {
        this.gasPrice = APP.state.get('gasPrice')
      }
      this.contract = await new this.web3.eth.Contract(abi, address)
    } catch (error) {
      console.log('wallet is not connected', error)
    }
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
    // if (APP.state.get('addContractListener_'+eventName)){
    // console.log('already subscribed to ',eventName);
    //return; // APP.state.get('addContractListener_'+eventName);
    // return; //this is causing the bug
    // }

    let listener;

    listener = this.contract.events[eventName]({ fromBlock: 'latest' })
      .on('data', callback)
      .on('error', error => {
        console.log(error)
      });

    APP.state.set('addContractListener_' + eventName, listener);

    return;
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
    return this.contract.methods[methodName](...params).call(options)
  }

  /**
   *
   * @param {string} methodName
   * @param {array} params
   * @param {string} value
   * @returns {Web3PromiEvent}
   */
  send(methodName, params, value = undefined) {

    const promiEvent = new Web3PromiEvent()

    this.contract.methods[methodName](...params)
      .send({
        from: this.from,
        gas: '400000',
        gasPrice: this.gasPrice,
        value
      })
      .on('transactionHash', hash => promiEvent.eventEmitter.emit('transactionHash', hash))
      .on('confirmation', (confNumber, receipt) => promiEvent.eventEmitter.emit('confirmation', confNumber, receipt))
      .on('error', async (err, receipt) => {
        if (receipt && err.message.match(/Transaction has been reverted/)) {
          const reason = await this.getRevertReason(receipt.transactionHash)
          promiEvent.reject(new GameError(reason))
        }
      })
      .then(receipt => promiEvent.resolve(receipt))
      .catch(err => {
        if (err.code === 4001) {
          promiEvent.reject(new GameError('Transaction cancelled by the user'))
        } else if (err.code === -32603) {
          try {
            let regex = /(revert)\s([\sa-zA-Z,.]*)(")/g;
            let m = regex.exec(err.message)
            console.log(m[2])
            promiEvent.reject(new GameError(m[2]))
          } catch (e) {
            console.log(e)
          }
        } else if (!err.message.match(/Transaction has been reverted/)) {
          promiEvent.reject(err)
        }
      })

    return promiEvent.eventEmitter
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
      const json = JSON.parse(err.toString().replace('Error: Internal JSON-RPC error.', ''))

      return json.message.replace('execution reverted: ', '')
    }
  }
}
