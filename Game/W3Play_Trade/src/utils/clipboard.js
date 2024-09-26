import { set_alert_msg } from "../REDUX/actions/main.actions";

function fallbackCopyTextToClipboard(text, dispatch, alert_msg_text) {

	var textArea = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		dispatch(set_alert_msg({ type: 'success', content: alert_msg_text || 'alert_msg_success_copy' }))
		var successful = document.execCommand('copy');
		var msg = successful ? 'successful' : 'unsuccessful';
		// console.log('Fallback: Copying text command was ' + msg);
		!successful && console.log('Fallback: Copying text command was ' + msg);
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err);
	}

	document.body.removeChild(textArea);
}
export async function copyTextToClipboard(text, dispatch, alert_msg_text) {

	let androidDevice = navigator.userAgent.match(/Android/i);

	if (androidDevice || !navigator?.clipboard) {
		fallbackCopyTextToClipboard(text, dispatch, alert_msg_text);
		return;
	}
	navigator.clipboard.writeText(text).then(function () {
		dispatch(set_alert_msg({ type: 'success', content: alert_msg_text || 'alert_msg_success_copy' }))
		// console.log('Async: Copying to clipboard was successful!');
	}, function (err) {
		console.error('Async: Could not copy text: ', err);
	});
}