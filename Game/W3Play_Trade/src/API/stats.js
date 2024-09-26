import Web3 from "web3";
import APP from "../app";
import req from "../utils/request";
import stringifyParams from "../utils/stringifyParams";
import state from '../../src/state';

const list_url = state.trade_stats_url;

// const getGeneralStats = async (query) => {

//     return req({
//         url: list_url,
//         headers: {
//             'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOiIzMGQifQ.G75qxwTczSHDwio0jrPaAK2gREMVRyUfd-I1vduhFFk'
//         },
//         params: { query: JSON.stringify(query) }
//     })
// }
const getGeneralStats = async () => {

    return req({
        url: state.general_stats_url,
    })
}

export default { getGeneralStats };