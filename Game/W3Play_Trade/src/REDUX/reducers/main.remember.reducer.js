import {
    SET_SOUNDS_SELECTED,
    SET_BG_MUSIC,
    SET_SOUND_EFFECTS,
    SET_VOICEOVER,
    SET_TUTORIAL,
    SET_AFFILIATE_TUTORIAL,
    SET_TERMS_POPUP,
    SET_FULL_SCREEN,
    SET_SOUNDS_POPUP,
    SET_FIRST_LOAD,
    SET_APP_LANG,
    SET_NEW_PARTNER,
    SET_LAST_ACTIVE_TABLE,
    SET_BUBBLES_TUTORIAL,
    SET_ENTRY_TUTORIAL_INDEX,
    SET_BETTING_TUTORIAL,
    SET_NEW_POOL,
    SET_USER_MAGIC_AUTH,
    SET_SAFARI_WEB5_LOGIN,
    SET_WEB_CONNECTION_TYPE,
    SET_WEB3_SOCIAL_OBJ,
    SET_INITIAL_QUERY_PARAMS,
    SET_LOGIN_POOLS_POPUP,
    SET_LAST_SAP_TUTORIAL_SLIDE,
    SET_DEMO_MODE,
    SET_TELEGRAM_LOGIN,
    SET_DEMO_POPUP_SEEN,
    SET_USER_SEC

} from "../actions/main.actions";


let rememberState = {
    // sounds: {
    //     effects_enabled: undefined,
    //     voice_enabled: undefined,
    //     bg_enabled: undefined,
    // },
    // audio_preferences: undefined,
    sounds_selected: false, // if user already selected if sounds are on or off
    bg_music_on: false,
    sound_effects_on: false,
    voiceover_on: false,
    seen_tutorial: false,
    last_active_table: false,
    seen_affiliate_tutorial: false,
    terms_popup: false,
    full_screen: false,
    sounds_popup: false,
    app_lang: { code: 'en', lang: 'English', changed_by_user: false },
    new_partner: { wallet: '', url: '', logo: '', email: '' },
    bubbles_tutorial: { active: false, seen: false },
    entry_tutorial_idx: 1,
    completed_betting_tutorial: 'inactive',
    currentPool: { displayed_msg: false, name: '', symbol_color: '', uid: '', route: '' },
    connected_user_magic_auth: { isLoggedIn: false, loginType: false, validLogin: false, loading: false },
    login_x_safari: { login: false, wallet: 'web5' },
    last_web5_connection_type: null,
    social_web3_obj: null,
    initial_query_params: null,
    login_pools_popup: false,
    last_sap_tutorial_slide: { last_slide: 0, submitted_form: false },
    demo_mode: { active: false, popup: false, claim_popup_wallet_address: '', lastMode: '' },
    telegram_login: null,
    demo_popup_seen: false,
    user_sec: null
}

export default (state = rememberState, action) => {


    switch (action.type) {

        case SET_SOUNDS_SELECTED:
            return {
                ...state, sounds_selected: action.payload
            }
        case SET_SOUND_EFFECTS:
            return {
                ...state, sound_effects_on: action.payload
            }
        case SET_BG_MUSIC:
            return {
                ...state, bg_music_on: action.payload
            }
        case SET_VOICEOVER:
            return {
                ...state, voiceover_on: action.payload
            }
        case SET_TUTORIAL:
            return {
                ...state, seen_tutorial: action.payload
            }
        case SET_AFFILIATE_TUTORIAL:
            return {
                ...state, seen_affiliate_tutorial: action.payload
            }
        case SET_TERMS_POPUP:
            return {
                ...state, terms_popup: action.payload
            }
        case SET_FULL_SCREEN:
            return {
                ...state, full_screen: action.payload
            }
        case SET_SOUNDS_POPUP:
            return {
                ...state, sounds_popup: action.payload
            }
        case SET_FIRST_LOAD:
            return {
                ...state, first_load: action.payload
            }
        case SET_APP_LANG:
            return {
                ...state, app_lang: action.payload
            }
        case SET_NEW_PARTNER:
            return {
                ...state, new_partner: { ...state.new_partner, ...action.payload }
            }
        case SET_LAST_ACTIVE_TABLE:
            return {
                ...state, last_active_table: action.payload
            }
        // case SET_LAST_ACTIVE_TABLE:
        //     return {
        //         ...state, last_active_table: action.payload
        //     }
        case SET_BUBBLES_TUTORIAL:
            return {
                ...state, bubbles_tutorial: action.payload
            }
        case SET_ENTRY_TUTORIAL_INDEX:
            return {
                ...state, entry_tutorial_idx: action.payload
            }
        case SET_BETTING_TUTORIAL:
            return {
                ...state, completed_betting_tutorial: action.payload
            }
        case SET_NEW_POOL:
            return {
                ...state, currentPool: { ...state.currentPool, ...action.payload }
            }
        case SET_USER_MAGIC_AUTH:
            return {
                ...state, connected_user_magic_auth: { ...state.connected_user_magic_auth, ...action.payload }
            }
        case SET_SAFARI_WEB5_LOGIN:
            return {
                ...state, login_x_safari: { ...state.login_x_safari, ...action.payload }
            }
        case SET_WEB_CONNECTION_TYPE:
            return {
                ...state, last_web5_connection_type: action.payload
            }
        case SET_WEB3_SOCIAL_OBJ:
            return {
                ...state, social_web3_obj: { ...state.social_web3_obj, ...action.payload }
            }
        case SET_INITIAL_QUERY_PARAMS:
            return {
                ...state, initial_query_params: action.payload
            }
        case SET_LAST_SAP_TUTORIAL_SLIDE:
            return {
                ...state, last_sap_tutorial_slide: { ...state.last_sap_tutorial_slide, ...action.payload }
            }
        case SET_LOGIN_POOLS_POPUP:
            return {
                ...state, login_pools_popup: action.payload
            }
        case SET_DEMO_MODE:
            return {
                ...state, demo_mode: { ...state.demo_mode, ...action.payload }
            }
        case SET_TELEGRAM_LOGIN:
            return {
                ...state, telegram_login: action.payload
            }
        case SET_DEMO_POPUP_SEEN:
            return {
                ...state, demo_popup_seen: action.payload
            }
        case SET_USER_SEC:
            return {
                ...state, user_sec: action.payload
            }
        default:
            return state
    }

}