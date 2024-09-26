import * as Ably from 'ably';
import Web3 from 'web3';
import UpVsDownGameV1 from '../../API/contracts/UpVsDownGameV1.json';
import web3Singleton from '../../API/Web3Singleton';
import { convertHexToColonFormat } from '../../utils/game/utilities/utils';
import { sleep } from '../../utils/async';

export const ablyGetRoundHistory = async (client, poolId, numberOfRounds) => {
  console.log('ablyGetRoundHistory::POOLID', poolId);

  //await sleep(8000); //simulate slow loading of the round history

  const table = APP.state.get('tables').find(item => item.pool_id === poolId); //find the table with id = poolId

  const channel = client.channels.get(table.pool_history_channel);
  const contractAddress = table.contract_adderess;

  let messageHistoryLimit = numberOfRounds * 3; //3 confirmations per message if we are using QuickNode quickalerts feature - need to test this

  let roundsHistory = new Promise((resolve, reject) => {
    channel.history({ limit: messageHistoryLimit, direction: 'backwards' }, function (err, messagesPage) {

      if (err) {
        reject(err);
        return;
      }

      // messagesPage                                    // PaginatedResult
      // messagesPage.items                              // array of Message
      // messagesPage.items[0].data                      // payload for first message
      // messagesPage.items.length                       // number of messages in the current page of history
      // messagesPage.hasNext()                          // true if there are further pages
      // messagesPage.isLast()                           // true if this page is the last page
      // messagesPage.next(function(nextPage) { ... });  // retrieves the next page as PaginatedResult

      const messages = messagesPage.items;

      //console.log('channel history', messages, messageHistoryLimit, Math.min(messageHistoryLimit, messages.length));

      let roundEndedEvents = [];

      const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'));
      const abi = UpVsDownGameV1.abi;
      // alert(JSON.stringify({ here: APP.state.get('current_game_address') }))
      const contract = new web3.eth.Contract(abi, APP.state.get('current_game_address'));
      const event = abi.find(item => item.type === "event" && item.name === "RoundEnded");

      //Go over messages and save needed data to array
      for (let i = 0; i < Math.min(messageHistoryLimit, messages.length); i++) {
        //Some bug with Quicknode alerts - from filter is not always working
        if (String(messages[i].data[0].logs[0].address.toString()).toLowerCase() !== APP.state.get('current_game_address').toLowerCase()) continue;

        let data = messages[i].data[0].logs[0].data; //data that we should decode to get poolId,timestamp,startPrice,endPrice
        let topics = messages[i].data[0].logs[0].topics;

        const decodedLog = web3.eth.abi.decodeLog(event.inputs, data, topics);

        let poolId = convertHexToColonFormat(decodedLog.poolId);
        let startPrice = decodedLog.startPrice;
        let endPrice = decodedLog.endPrice;
        let timestamp = decodedLog.timestamp;

        let roundEndedEvent = {
          'poolId': poolId,
          'startPrice': parseInt(startPrice) / 10000,
          'endPrice': parseInt(endPrice) / 10000,
          'timestamp': Number(timestamp),
          'transactionHash': messages[i].data[0].transactionHash
        }

        //Check if event with the same transaction hash already exists in the array
        if (!roundEndedEvents.some(transaction => transaction.transactionHash === roundEndedEvent.transactionHash)) {
          roundEndedEvents.push(roundEndedEvent); //add new event to the array
        }
        // for(let i=0; i<roundEndedEvents.length; i++){
        //   console.log('rrr x',roundEndedEvents[i]);
        //   console.log('rrr timestamp',roundEndedEvents[i].timestamp);
        //   console.log('rrr ',new Date(roundEndedEvents[i].timestamp).toLocaleString());
        // }
      }

      roundEndedEvents = roundEndedEvents.reverse().slice(-1 * numberOfRounds); //Take last 9 messages from the history

      console.log('round ended events', roundEndedEvents);

      // console.log('Round history first message', new Date(roundEndedEvents[0].timestamp).toLocaleString());
      // console.log('Round history last message', new Date(roundEndedEvents[roundEndedEvents.length - 1].timestamp).toLocaleString());
      // console.log('Round history messages count', roundEndedEvents.length);x


      resolve(roundEndedEvents);
    })
  });

  return roundsHistory;
}

export const ablyOnRoundEndedReceive = (client, poolId, callbackFunc) => {
  const table = APP.state.get('tables').find(item => item.id === poolId); //find the table with id = poolId
  const channel = client.channels.get(table.pool_history_channel);

  const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'));
  const abi = UpVsDownGameV1.abi;
  const contract = new web3.eth.Contract(abi, APP.state.get('current_game_address'));
  const event = abi.find(item => item.type === "event" && item.name === "RoundEnded");

  //Ably subscribe to channel and receive messages
  channel.subscribe(function (message) {
    // console.log('subscribe', message);

    let data = message.data[0].logs[0].data; //data that we should decode to get poolId,timestamp,startPrice,endPrice
    let topics = message.data[0].logs[0].topics;
    //console.log(message.data[0].transactionHash);
    //console.log('Data from smart contract RoundEnded event', data);

    const decodedLog = web3.eth.abi.decodeLog(event.inputs, data, topics);

    let poolId = convertHexToColonFormat(decodedLog.poolId);
    let startPrice = decodedLog.startPrice;
    let endPrice = decodedLog.endPrice;
    let timestamp = decodedLog.timestamp;
    let transactionHash = message.data[0].transactionHash;

    const lastRoundEndedEvent = {
      'poolId': poolId,
      'startPrice': parseInt(startPrice) / 10000,
      'endPrice': parseInt(endPrice) / 10000,
      'timestamp': Number(timestamp),
      'transactionHash': transactionHash
    }

    callbackFunc(lastRoundEndedEvent);
  });
};