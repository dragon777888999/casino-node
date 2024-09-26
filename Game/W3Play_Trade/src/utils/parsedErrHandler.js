import APP from "../app"
import { set_alert_msg } from "../REDUX/actions/main.actions"

export default (dispatch, content) => {
    dispatch(set_alert_msg({ type: 'error', content: APP.term(content) }))
}