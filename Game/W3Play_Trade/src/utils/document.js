export function vw(percent){
	let used_width = APP.state.get('chat_open') ? .7 : 1;
	return document.body['clientWidth'] * percent * used_width / 100;
}

export function vh(percent){
	return document.body['clientHeight'] * percent / 100;
}

export function ready(fn) {
	if (document.readyState != 'loading'){
		fn();
	} else if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', fn);
	} else {
		document.attachEvent('onreadystatechange', function() {
		if (document.readyState != 'loading')
			fn();
		});
	}
}