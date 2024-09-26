import { BLOCK_DURATION, decodeString, encodeString, getRoundDuration } from '../utilities'
import UpVsDownGameV1 from '../contracts/UpVsDownGameV1.json'
import * as eventParsers from '../utilities/parsers'
import { ablyGetRoundHistory } from '../../../API/Ably/AblyRoundHistory';
import AblyClientSingleton from '../../../API/Ably/AblyClientSingleton';
import roundHistory from '../../../API/roundHistory';
import clear_table from '../../clearTable';

/**
 * Wrapper to interact with the game smart contract
 */
export class GameClient {
  /**
    * @typedef {Object} GameStatus
    * @property {bool} isRunning
    * @property {string} notRunningReason
  */

  /**
     * @typedef {Object} BetGroup
     * @property {Array<string>} bets
     * @property {Array<string>} addresses
     * @property {string} total
   */

  /**
    * @typedef {Object} Round
    * @property {web3.BN} startPrice
    * @property {web3.BN} endPrice
    * @property {BetGroup} upBetGroup
    * @property {BetGroup} downBetGroup
   */

  static tradePlacedEventExists = false;
  static roundStartedEventExists = false;
  static roundEndedEventExists = false;
  static roundDistributedEventExists = false;

  /**
   *
   * @param {Contract} gameContract
   */
  constructor(gameContract) {
    this.gameContract = gameContract
  }

  /**
   * Connect to a deployed smart contract
   * @param {string} address - Smart contract address
   */
  async connect(address) {
    // alert(JSON.stringify({ bb: address }))
    await this.gameContract.load(UpVsDownGameV1.abi, address)
  }

  /**
  * Connect to a deployed smart contract
  * @param {string} address - Smart contract address
  */
  async disconnect(address) {
    // alert('DISCONNECT FROM SMART CONTRACT')
    this.gameContract = null;
  }

  /**
   * Change the game fee percentage
   * @param {number} fee
   * @returns {Web3PromiEvent}
   */
  changeGameFeePercentage(fee) {
    return this.gameContract.send('changeGameFeePercentage', [fee])
  }

  /**
   * Change the address were collected fees are sent to
   * @param {string} address
   * @returns {Web3PromiEvent}
   */
  changeGameFeeAddress(address) {
    return this.gameContract.send('changeGameFeeAddress', [address])
  }

  /**
   * Change the adddress that is allowed to start/stop rounds
   * @param {string} address
   * @returns {Web3PromiEvent}
   */
  changeGameControllerAddress(address) {
    return this.gameContract.send('changeGameControllerAddress', [address])
  }

  /**
   * Enable the game to receive bets and start rounds
   * @returns {Web3PromiEvent}
   */
  startGame() {
    return this.gameContract.send('startGame', [])
  }

  /**
   * Stop the game, returning bets, and triggering a game stopped event
   * @param {string} reason
   * @returns {Web3PromiEvent}
   */
  stopGame(reason) {
    return this.gameContract.send('stopGame', [encodeString(reason)])
  }

  /**
   * Get current fee percentage
   * @returns {number}
   */
  getFeePercentage() {
    return APP.state.get('active_table').fee_percentage
    //return this.gameContract.call('feePercentage')
  }

  /**
  * Get current fee percentage
  * @returns {number}
  */
  getFeeJackpotPercentage() {
    return APP.state.get('active_table').jackpot_fee_percentage;
    //return this.gameContract.call('feeJackpotPercentage')
  }

  /**
   * Get current address that receives fees
   * @returns {string}
   */
  getFeeAddress() {
    return this.gameContract.call('feeAddress')
  }

  /**
   * Get current address that is allowed to start/stop rounds
   * @returns {string}
   */
  getGameControllerAddress() {
    return this.gameContract.call('gameController')
  }

  /**
   * Gets is the game is running or not and the reason
   *
   * @returns {GameStatus}
   */
  async getStatus() {
    const [isRunning, notRunningReason] = await Promise.all([
      this.gameContract.call('isRunning'),
      this.gameContract.call('notRunningReason')
    ])

    return {
      isRunning,
      notRunningReason: decodeString(notRunningReason || '')
    }
  }

  /**
   * Gets the current state for a pool
   *
   * @param {string} poolId
   * @returns {Round}
   */
  async getPoolState(poolId) {
    return this.gameContract.call('pools', [encodeString(poolId)])
  }

  /**
   * Gets if the pool is open for bets
   * @param {string} poolId
   * @returns {bool}
   */
  isPoolOpen(poolId) {
    return this.gameContract.call('isPoolOpen', [encodeString(poolId)])
  }

  //We will wait for initialization of web3AlternativeProviderGameContract
  //Because it may initalize later then calling getPoolHistory function
  async waitForInitialization() {
    let attempts = 0;
    const maxAttempts = 10; // For example, we try 10 times.
    const delay = 300;     // Check every 300 ms

    while (attempts < maxAttempts) {
      //const web3Connector = APP.state.get('web3AlternativeProviderGameContract');

      let web3Connector = APP.state.get('web3AlternativeProviderGameContract1');

      if (window.location.hostname == 'cryptofights.pro') {
        web3Connector = APP.state.get('web3AlternativeProviderGameContract'); //Alchemy endpoint
      }

      if (web3Connector) {
        return web3Connector; // Return the initialized connector.
      }
      await new Promise(resolve => setTimeout(resolve, delay)); // Wait for the specified delay.
      attempts++;
    }

    throw new Error('web3Connector failed to initialize within the expected time.');
  }

  /**
   * Returns a list of RoundEnded events for a pool - on page refresh or back to game tab
   * @param {string} poolId
   * @param {number} limit
   * @returns {Array}
   */
  async getPoolHistory(poolId, limit = 10, uid) {

    /** ROUND HISTORY FROM ABLY */
    //const ablyClient = AblyClientSingleton.getClient();
    //let res2 = await ablyGetRoundHistory(ablyClient,poolId,7); //fetch last 7 rounds from ably

    /** ROUND HISTORY FROM API */
    const roundHistoryRes = await roundHistory.getRoundHistory(8, uid);

    return roundHistoryRes;

    //We need to fetch round history only when we get roundended event
    if (typeof (APP.state.get('roundHistoryCache')) !== 'undefined' && !APP.state.get('refreshRoundHistory')) {
      //return existing round history
      console.log('Round history from cache');
      console.log(APP.state.get('roundHistoryCache'));
      return APP.state.get('roundHistoryCache');
    } else {
      console.log('Round history from blockchain');
      //Fetch new roundhistory
      console.log('GameClient::getPoolHistory', new Date());
      if (poolId == '30:16')
        limit = 2

      const blocksPassed = getRoundDuration(poolId) * BLOCK_DURATION * limit

      //Initialize web3Connector - alternative provider
      const web3Connector = await this.waitForInitialization();

      const lastBlock = await web3Connector.web3.eth.getBlockNumber();

      //const lastBlock = await this.gameContract.web3.eth.getBlockNumber()
      //console.log(this.gameContract.web3.utils.sha3(encodeString(poolId)))
      const history = await web3Connector.contract.getPastEvents('RoundEnded', {
        //filter: { 4: this.gameContract.web3.utils.sha3(encodeString(poolId)) },
        fromBlock: (lastBlock - blocksPassed) < 0 ? 0 : (lastBlock - blocksPassed)
      })

      //console.log(history)
      let historyObj = [];

      for (let i = 0; i < history.length; i++) {
        if (history[i]['raw']['topics'][1] == this.gameContract.web3.utils.sha3(encodeString(poolId)))
          historyObj.push(history[i])
      }

      let res = historyObj
        .reverse()
        .map(eventParsers.RoundEnded)
        .slice(0, 7)
        .filter(round => round.poolId === poolId); // TODO: even with index, never got the filter working

      const ablyClient = AblyClientSingleton.getClient();
      let res2 = await ablyGetRoundHistory(ablyClient, poolId, 7); //fetch last 7 rounds from ably

      console.log('round history from blockchain', res);
      console.log('round history from ably', res2);

      APP.state.set('refreshRoundHistory', false);
      console.log('set round history to cache');
      APP.state.set('roundHistoryCache', res);

      return res2;
    }
  }

  /**
   * Returns last RoundStarted event for a pool
   * @param {string} poolId
   * @returns {Object}
   */
  async getLastRoundStartedEvent(poolId) {
    //console.log('GameClient::getLastRoundStartedEvent',new Date());
    console.log('GameClient::getLastRoundStartedEvent');

    return;

    const web3Connector = await this.waitForInitialization();

    const blocksPassed = getRoundDuration(poolId); // * BLOCK_DURATION
    const lastBlock = await web3Connector.web3.eth.getBlockNumber()
    const history = await web3Connector.contract.getPastEvents('RoundStarted', {
      filter: { 3: web3Connector.web3.utils.sha3(encodeString(poolId)) },
      fromBlock: lastBlock - blocksPassed || 0
    })
    return history
      .map(eventParsers.RoundStarted)
      .filter(round => round.poolId === poolId) // TODO: even with index, never got the filter working
      .pop()
  }

  /**
   *
   * @param {string} poolId
   * @param {string} amount
   * @param {bool} prediction - true (UP) or false (DOWN)
   * @param {string} avatarUrl - path to avatar path on IPFS
   * @returns {Web3PromiEvent}
   */
  makeBet(poolId, amount, prediction, avatarUrl, countryCode) {
    const params = [encodeString(poolId), prediction, avatarUrl, countryCode]

    return this.gameContract.send('makeTrade', params, amount)
  }

  /**
   * Subscribes to a game event
   *
   * @param {GameEvents} eventName
   * @param {callback} callback
   * @returns {EventEmitter}
   */
  on(eventName, callback) {

    //if (eventName == 'TradePlaced') return; // prevent double subscribe to TradePlaced event (the second subscribe is from API/GameClient.js)
    //console.log('subscribed to ' + eventName + ' from utils/gameClient.js')

    if (!GameEvents[eventName]) {
      throw new Error(`Event ${eventName} is not valid`)
    }

    //Prevent TradePlaced event double subscription
    if (eventName == 'TradePlaced' && GameClient.tradePlacedEventExists) {
      // alert(88888888)
      //Check if listener already exists
      //console.log('listener to TradePlaced already exists')
      // return;
    } else if (eventName == 'TradePlaced' && !GameClient.tradePlacedEventExists) {
      GameClient.tradePlacedEventExists = true;
    }

    //Prevent RoundStarted event double subscription
    if (eventName == 'RoundStarted' && GameClient.roundStartedEventExists) {
      // return;
    } else if (eventName == 'RoundStarted' && !GameClient.roundStartedEventExists) {
      GameClient.roundStartedEventExists = true;
    }

    //Prevent RoundEnded event double subscription
    if (eventName == 'RoundEnded' && GameClient.roundEndedEventExists) {
      // return;
    } else if (eventName == 'RoundEnded' && !GameClient.roundEndedEventExists) {
      GameClient.roundEndedEventExists = true;
    }

    //Prevent RoundDistributed event double subscription
    if (eventName == 'RoundDistributed' && GameClient.roundDistributedEventExists) {
      // return;
    } else if (eventName == 'RoundDistributed' && !GameClient.roundDistributedEventExists) {
      GameClient.roundDistributedEventExists = true;
    }

    const poolsSubState = /*APP.state.get('currentToken') === 'demo' ? 'pools_subs_demo' : */'pools_subs';
    const subscribedPoolIds = APP.state.get(poolsSubState) ? APP.state.get(poolsSubState)[eventName] : {};
    const currentPoolId = APP.state.get('currentPoolId');
    const isDemo = currentPoolId?.includes('demo');
    const tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');
    const pool = tables.find(itm => itm.uid === currentPoolId);

    // console.log(location.pathname, 'is ok', pool.route)

    // if (location.pathname !== pool.route) return;

    if (subscribedPoolIds && subscribedPoolIds[currentPoolId]) {
      // If the currentPoolId already has an event subscription for this eventName, return
      // alert(JSON.stringify({ a: currentPoolId }))
      // console.log(poolsSubState, `2 Already subscribed to ${eventName} for poolId ${currentPoolId}`);
      return;
    }

    // Mark the currentPoolId as subscribed for this eventName
    APP.state.set(poolsSubState, { ...APP.state.get(poolsSubState), [eventName]: { ...subscribedPoolIds, [currentPoolId]: true } });
    // console.log('subscribe to ' + eventName + ' from utils/gameClient.js');


    const parser = eventParsers[eventName];
    // console.log('STATUS: 2', APP.state.get(poolsSubState), '....', currentPoolId)
    return this.gameContract?.addContractListener(eventName, event => callback(parser(event)))
  }
}

/**
 * Events thrown by the game
 *
 * @enum
 * @readonly
 * @property {string} RoundStarted - The round has started, no more bets allowed
 * @property {string} RoundEnded - The round has ended, winnings are given
 * @property {string} TradePlaced - A user has made a new bet
 * @property {string} GameStarted - The game has been started
 * @property {string} GameStopped - The game has been stopped
 * @property {string} TradeWinningsSent - Winnings has been sent for a bet
 */
export const GameEvents = {
  RoundStarted: 'RoundStarted',
  RoundEnded: 'RoundEnded',
  RoundDistributed: 'RoundDistributed',
  TradePlaced: 'TradePlaced',
  GameStarted: 'GameStarted',
  GameStopped: 'GameStopped',
  TradeWinningsSent: 'TradeWinningsSent'
}
