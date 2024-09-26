import state from "../state";
import req from "../utils/request";
import UpVsDownGameV1 from '../API/contracts/UpVsDownGameV1.json';
import web3Singleton from '../API/Web3Singleton';
import { convertHexToColonFormat } from '../utils/game/utilities/utils';

const getRoundHistory = async (numberOfRounds = 10, uid) => {
    
    //get active table according to the route
    const isTradePage = state.pool_routes.includes(location.pathname);
    const isDemo = isTradePage ? location.pathname?.includes('demo') : uid?.includes('demo');
    const tables = APP.state.get(isDemo ? 'demo_tables' : 'tables');

    const table = isTradePage ?
        tables.find(pool => pool.route === location.pathname) :
        tables.find(pool => pool.uid === uid);

    // console.log('in get round history', table.pool_history_api + '/' + parseInt(numberOfRounds));

    let res;

    try {
        res = await req({
            url: table.pool_history_api + parseInt(numberOfRounds),
            params: {
            }
        }, true)

        if (res.status != 200) {
            console.log('Cannot get round history from API, status=', res.status);
            return [];
        }
    } catch (e) {
        console.log(e, 'e')
        console.log('Cannot get round history from API');
        return [];
    }


    let roundEndedEvents = [];

    const web3 = web3Singleton.getInstance(APP.state.get('eth_ws_uri_free'));
    const abi = UpVsDownGameV1.abi;
    // alert(JSON.stringify({ yyyy: APP.state.get('current_game_address') }))
    const contract = new web3.eth.Contract(abi, APP.state.get('current_game_address'));
    const event = abi.find(item => item.type === "event" && item.name === "RoundEnded");

    // console.log('in get round_distory', res.data);

    //Go over messages and save needed data to array
    for (let i = 0; i < Math.min(numberOfRounds, res.data.length); i++) {

        let message = res.data[i];

        let logs = message[0].logs[0];

        //Some bug with Quicknode alerts - from filter is not always working
        if (String(logs.address.toString()).toLowerCase() !== APP.state.get('current_game_address')?.toLowerCase()) continue;

        let data = logs.data; //data that we should decode to get poolId,timestamp,startPrice,endPrice

        let topics = logs.topics;

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
            'transactionHash': message[0].transactionHash
        }

        // //Check if event with the same transaction hash already exists in the array
        if (!roundEndedEvents.some(transaction => transaction.transactionHash === roundEndedEvent.transactionHash)) { //TEMP -> should be removed when Sergey deploy a fix
            roundEndedEvents.push(roundEndedEvent); //add new event to the array
        }
    }

    //roundEndedEvents = roundEndedEvents.reverse().slice(-1 * numberOfRounds); //Take last 9 messages from the history

    // console.log('roundEndedEvents', roundEndedEvents);

    return roundEndedEvents;
}

export default { getRoundHistory };