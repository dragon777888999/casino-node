import stringifyParams from './stringifyParams';

export default async function standardRequest({
	url, params, body,
	method = "GET", mode = 'cors',
	headers, config, auth, token = localStorage.getItem("auth-token")
}, arrayExpected = false) {

	let res = {}

	if (params) url = url + stringifyParams(params);

	if (auth) {
		if (!token) return { error: 'missing login token' };
		headers = {
			Authorization: 'Bearer ' + token,
			...headers
		};
	}

	if (body) {
		if (typeof body !== 'string') {
			body = JSON.stringify(body);
			headers = {
				'Content-Type': 'application/json; charset=utf-8',
				...headers
			};
		}
		config = { body, ...config };
	}

	try {
		config = {
			method,
			mode,
			headers: {
				'Accept': 'application/json',
				...headers
			},
			...config
		};

		res = await fetch(url, config);
	}
	catch (e) {
		console.log('net. error', e, e.name, e.message);
		res.error = e.name ? e.name + ' : ' + e.message : e.message;
	}
	finally {
		if (res.ok) {
			try {
				res.data = await res.json();
				if (arrayExpected && Array.isArray(res.data)) {
					res.data = res.data;
				}
				else if (Array.isArray(res.data.data)) {
					res.data = res.data.data;
				}
				else if (typeof res.data === 'object') {
					res.data = { ...res.data, ...res.data.data };
					delete res.data.data;
				}
				if (res.data.error) {
					res.error = typeof res.data.error === 'object' ? res.data.error.message : res.data.error;
				}
			}
			catch (e) {
				delete res.data;
				res.error = "failed to parse response as json"
			}
		}
		else if (!res.error) {
			res.error = 'network error: ' + res.status;
			try {
				res.data = await res.json();
				if (res.data.error) {
					res.error = res.data.error;
				}
				if (res.data.message) {
					res.error = res.data.message;
				}
			}
			catch (e) { }
		}

		return res;
	}
}