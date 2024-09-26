import APP from "./app";
import state from "./state"

export default () => {
    return {
        base: state.app_config_url,
        config: APP.controller.cfg.services['config-service'],
        authentication: APP.controller.cfg.services['authentication-service'],
        customer: APP.controller.cfg.services['customer-service'],
    }
}