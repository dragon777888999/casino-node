import req from "../utils/request";
import stringifyParams from "../utils/stringifyParams";
import { column_asc, column_desc, last } from '../utils/array';
import { round_up_to } from '../utils/number';
import state from "../state";
import linearGraphHistory from "./linearGraphHistory";

const base_url = state.asset_history_url
const data_resolutions = { 'seconds': 1000, '10seconds': 10000, 'minutes': 60000 }
const min_point_size = Math.min(...Object.values(data_resolutions));

export default async function assetHistory(assetId, timeback, point_size) {
	point_size = Math.max(point_size, min_point_size);
	var [req_resolution, req_resolution_val] = Object.entries(data_resolutions).filter(([, ms]) => ms <= point_size).sort(column_desc(1))[0];
	var params = {
		instrumentId: assetId,
		resolution: req_resolution.toUpperCase(),
		amount: Math.floor(timeback / req_resolution_val)
	}


	if (req_resolution == '10seconds') {
		params.resolution = 'SECONDS';
		params.ratio = '10';
	}

	// var req_data1 = await req({
	// 	url: base_url + stringifyParams(params),
	// });

	// assetId = state.linearGraphId
	// 800 points => (800 points / 5 frames / 60 sec) => 2.67 => ~2.4mins 
	let req_data = await linearGraphHistory.getLinearGraphHistory(800, assetId);

	const newData = {};
	if (!req_data || !req_data.data) return;

	Object.keys(req_data.data).forEach(key => {
		const { timestamp, price } = req_data.data[key];
		newData[key] = { lastTimeMs: timestamp, lastPrice: String(price) };
	});

	req_data = Object.values(newData).sort(column_asc('lastTimeMs'));

	const new_data = [];
	var next_sample_point = round_up_to(req_data[0].lastTimeMs, point_size),
		last_price = req_data[0].lastPrice,
		last_price_time = req_data[0].lastTimeMs;

	for (let data_point of req_data.slice(1)) {
		if (next_sample_point < data_point.lastTimeMs) {
			new_data.push([last_price_time, last_price]);
			next_sample_point += point_size;
		}
		last_price = data_point.lastPrice;
		last_price_time = data_point.lastTimeMs;
	}
	let { lastTimeMs, lastPrice } = last(req_data);
	new_data.push([lastTimeMs, lastPrice]);

	return new_data;
}