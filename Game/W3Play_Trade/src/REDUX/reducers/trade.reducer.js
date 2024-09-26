import { SET_BOT_RADAR_PLATFORM } from "../actions/trade.actions";

let initialState = {
    bot_radar_platform: false,
}

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_BOT_RADAR_PLATFORM:
            return {
                ...state, bot_radar_platform: action.payload
            }
        default:
            return state
    }
}