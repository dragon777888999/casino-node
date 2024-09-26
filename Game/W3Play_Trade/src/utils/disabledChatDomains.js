import state from "../state"

export default (current_domain) => {
    return state.disable_chat_domains.find(itm => itm === current_domain)
}