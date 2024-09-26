import state from "../state";
import req from "../utils/request";

const getWeeklyData = async (url, wallet) => {

    const _token = localStorage.getItem("auth-token");
    
    return req({
        url: url,
        method: 'POST',
        ...(_token && ({ token: _token })),
        body: {
            ...(wallet && ({ wallet })),
        }
    });

}

const getMonthlyData = async (url, wallet) => {

    const _token = localStorage.getItem("auth-token");

    return req({
        url: url,
        method: 'POST',
        ...(_token && ({ token: _token })),
        body: {
            ...(wallet && ({ wallet })),
        }
    });
    
}

const getHistory = async (url) => {
    return req({
        url: url,
    });
}

const getWinners = async (url) => {
    return req({
        url: url,
    });
}

const getJackpotBalance = async () => {
    return req({
        url: state.jackpot_initial_state_url,
    })
}

// const getMonthlyWinners = async () => {
//     return req({
//         url: state.monthly_jackpot_winners_url,
//     })
// }

export default { getWeeklyData, getWinners, getHistory, getMonthlyData, /*getMonthlyWinners,*/ getJackpotBalance };