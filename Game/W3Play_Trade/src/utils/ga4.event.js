import ReactGA from "react-ga4";
import yandex from "./yandex";

export default (category, action) => {
    ReactGA.event({
        category,
        action
    });

    if (typeof Intercom !== 'undefined') {
        Intercom('trackEvent', action, { category: category });
    }

    yandex(action)
}