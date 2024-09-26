
import state from "../state";
import req from "../utils/request";

const sendContactData = async (body) => {
    return req({
        url: state.contact_form_url,
        method: 'POST',
        body: body
    });
};

export default { sendContactData };