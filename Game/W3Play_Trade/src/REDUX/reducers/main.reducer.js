import {
    SET_FIRST_LOAD, SET_VALID_BROWSER, SET_CONNECT_WALLET_POPUP, SET_COMPLETED_TUTORIAL,
    SET_TOPUP_WALLET_POPUP, SET_ALERT_MSG, SET_LOADER, SET_MOBILE_POOL_PLAYERS_VISIBLE,
    SET_UNSUPPORTED_BROWSER_POPUP,
    SET_MAGIC_AUTH,
    SET_P2P_POPUP,
    SET_BWP_POPUP,
    SET_UTORG_POPUP,
    SET_IFRAME_POPUP,
    SET_TOPUP_CLOSE_BTN,
    SET_PRIVATE_KEY_POPUP,
    SET_CHOSEN_PARTNER_PROGRAM,
    SET_POOLS_POPUP,
    SET_ASSET_POPUP,
    SET_CHOSEN_ASSET,
    SET_REF_PARAM,
    SET_REDIRECT_BROWSER_POPUP,
    SET_HIGH_ROLLERS_PRINCIPAL,
    SET_WIN_RATIO_PRINCIPAL,
    SET_BRIDGE_POPUP,
    SET_REV_BRIDGE_POPUP,
    // SET_DEMO_MODE,
    SET_POLYGON_DETAILS,
    SET_REV_BRIDGE_ALERT_MSG,
    SET_PAYBIS_INFO_POPUP,
    SET_PIX_POPUP,
    SET_EFI_PAY_POPUP,
} from "../actions/main.actions";

let initialState = {
    first_load: false,
    valid_browser: true,
    connect_wallet_popup: false,
    loader: false,
    alert_msg: { type: '', content: '', preventTimeout: false },
    pool_players_hidden: false,
    completed_tutorial: { initial: false, bets: false },
    unsupported_browser_popup: false,
    magic_auth: false,
    iframe_popup: false,
    iframe_src: { src: '', type: '' },
    utorg_popup: false,
    topup_close_btn: false,
    private_key_popup: false,
    chosen_partner_program: '',
    pools_popup: false,
    asset_popup: false,
    chosen_asset: { id: 'btc', title: 'BTC' },
    ref_param: '',
    bwp_popup: { active: false, content: '' },
    p2p_popup: false,
    redirect_browser_popup: false,
    high_rollers_principal: {},
    win_ratio_principal: {},
    bridge_popup: false,
    rev_bridge_popup: false,
    polygon_details: { provider: false, matic_transaction: false, update_balance: false, matic_balance: '0' },
    // demo_mode: { active: false, popup: false },
    revBridgeAlertMsg: { type: '', content: '', preventTimeout: false },
    paybis_info_popup: { is_active: false, paybis_mobile_url: '' },
    pix_popup: false,
    efi_pay_popup: false,
}

export default (state = initialState, action) => {

    switch (action.type) {

        case SET_FIRST_LOAD:
            return {
                ...state, first_load: action.payload
            }
        case SET_VALID_BROWSER:
            return {
                ...state, valid_browser: action.payload
            }
        case SET_CONNECT_WALLET_POPUP:
            return {
                ...state, connect_wallet_popup: action.payload
            }
        case SET_COMPLETED_TUTORIAL:
            return {
                ...state, completed_tutorial: action.payload
            }
        case SET_TOPUP_WALLET_POPUP:
            return {
                ...state, topup_wallet_popup: action.payload
            }
        case SET_ALERT_MSG:
            return {
                ...state, alert_msg: action.payload
            }
        case SET_LOADER:
            return {
                ...state, loader: action.payload
            }
        case SET_MOBILE_POOL_PLAYERS_VISIBLE:
            return {
                ...state, pool_players_hidden: action.payload
            }
        case SET_UNSUPPORTED_BROWSER_POPUP:
            return {
                ...state, unsupported_browser_popup: action.payload
            }
        case SET_MAGIC_AUTH:
            return {
                ...state, magic_auth: action.payload
            }
        case SET_P2P_POPUP:
            return {
                ...state, p2p_popup: action.payload
            }
        case SET_BWP_POPUP:
            return {
                ...state, bwp_popup: action.payload
            }
        case SET_IFRAME_POPUP:
            return {
                ...state, iframe_src: action.payload
            }
        case SET_TOPUP_CLOSE_BTN:
            return {
                ...state, topup_close_btn: action.payload
            }
        case SET_UTORG_POPUP:
            return {
                ...state, utorg_popup: action.payload
            }
        case SET_PRIVATE_KEY_POPUP:
            return {
                ...state, private_key_popup: action.payload
            }
        case SET_CHOSEN_PARTNER_PROGRAM:
            return {
                ...state, chosen_partner_program: action.payload
            }
        case SET_ASSET_POPUP:
            return {
                ...state, asset_popup: action.payload
            }
        case SET_CHOSEN_ASSET:
            return {
                ...state, chosen_asset: action.payload
            }
        case SET_POOLS_POPUP:
            return {
                ...state, pools_popup: action.payload
            }
        case SET_REF_PARAM:
            return {
                ...state, ref_param: action.payload
            }
        case SET_REDIRECT_BROWSER_POPUP:
            return {
                ...state, redirect_browser_popup: action.payload
            }
        case SET_HIGH_ROLLERS_PRINCIPAL:
            return {
                ...state, high_rollers_principal: { ...state.high_rollers_principal, ...action.payload }
            }
        case SET_WIN_RATIO_PRINCIPAL:
            return {
                ...state, win_ratio_principal: { ...state.win_ratio_principal, ...action.payload }
            }
        case SET_BRIDGE_POPUP:
            return {
                ...state, bridge_popup: action.payload
            }
        case SET_REV_BRIDGE_POPUP:
            return {
                ...state, rev_bridge_popup: action.payload
            }
        case SET_POLYGON_DETAILS:
            return {
                ...state, polygon_details: { ...state.polygon_details, ...action.payload }
            }
        case SET_REV_BRIDGE_ALERT_MSG:
            return {
                ...state, revBridgeAlertMsg: action.payload
            }
        case SET_PAYBIS_INFO_POPUP:
            return {
                ...state, paybis_info_popup: { ...state.paybis_info_popup, ...action.payload }
            }
        case SET_PIX_POPUP:
            // console.log('PIX popup state:', action.payload);
            return {
                ...state,
                pix_popup: action.payload
            };
        case SET_EFI_PAY_POPUP:
            return {
                ...state,
                efi_pay_popup: action.payload
            };
        // case SET_DEMO_MODE:
        //     return {
        //         ...state, demo_mode: { ...state.demo_mode, ...action.payload }
        //     }
        default:
            return state
    }

}