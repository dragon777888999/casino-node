import { copyTextToClipboard } from "../clipboard";

export default async function handleShare(dispatch, url) {
    // mobile
    try {
        if (navigator.share) {
            await navigator.share({
                // title: '',
                // text: '',
                url,
            });
        }
        else {
            // web / don't support web share api
            copyTextToClipboard(url, dispatch, APP.term('alert_msg_success_jackpot_share'))
        }
    } catch (err) {
        console.error('handle err:', err);
    }
};