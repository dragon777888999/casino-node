import { coin, die, choice, pow_die, change, change_factor } from "../utils/random";
import { round_up_to } from '../utils/number';
import { samples, last, lastn, butlast, to_column_map, remove_each_once } from "../utils/array";
import { sleep } from "../utils/async";
import { relation_cases } from '../utils/logic'

import Streamer from "../API/streamer";

const { min, random } = Math;
const { now } = Date;

export default function sim_open_trades(APP, state) {

	var _next_id = 145644;
	function posID(){ return _next_id++; }

	var asset_rates = {
		BTC: 60000,
		ETH: 4000,
		ADA: 1.85,
		BNB: 590,
		XRP: 1.08,
		DOGE: 0.23,
		SHIB: 0.000045
	},
	positions_count = 0,
	max_positions = 30,
	tick_asset_interval,
	new_position_interval,
	init_timeout,
	time_before_remove = 5000,
	position_sources = ['trade', 'auto', 'copy'];

	function mutate_rate(code, divisor=1000){
		asset_rates[code] *= 1 + die(-10000,10000)/(10000 * divisor);
		return asset_rates[code];
	}

	function tick_asset(){
		state.mutate('asset_rates', state_rates => {
			var new_rates = {...state_rates};
			var code = choice(Object.keys(asset_rates));
			new_rates[code] =  mutate_rate(code);
			return new_rates;
		})
	}

	function remove_position(id){
		state.unset('open_trades.'+id);
		positions_count--;
	}

	function set_expiry(asset, id){
		var expiry_rate = asset_rates[asset.code];
		state.mutate('open_trades.'+id, position => {
			let is_up = position.direction == 'up',
			result = relation_cases(
				expiry_rate, position.entry_rate,
				(is_up ? 'won' : 'lost'),
				'tie',
				(is_up ? 'lost' : 'won'),
			),
			profit = {
				won: die(150,350)/100 * position.investment,
				tie: 0,
				lost: -position.investment
			}[result],
			updated_pos = {...position};
			updated_pos.phase = 'expired';
			updated_pos.expiry_rate = expiry_rate;
			updated_pos.result = result;
			updated_pos.profit = profit;
			return updated_pos;
		})
		setTimeout(remove_position.bind(null, id), time_before_remove)
	}

	function set_entry(table, id){
		var asset = state.get('assets').find(asset => asset.id == table.asset);
		state.mutate('open_trades.'+id, position => {
			let updated_pos = {...position};
			updated_pos.entry_rate = asset_rates[asset.code]
			updated_pos.phase = 'open'
			return updated_pos;
		})
		setTimeout(set_expiry.bind(null, asset, id), table.duration * 1000)
	}

	function try_new_position(){
		var pos_chance = min(1, positions_count/max_positions)
		if (random() < pos_chance) return;

		var table = choice(state.get('tables')),
		direction = coin('up', 'down'),
		time = now(),
		entry_time = round_up_to(time, table.downtime*1000),
		expiry_time = entry_time + table.duration * 1000,
		time_to_open = entry_time - time,
		investment = choice(table.investments) * die(1, 5),
		source_id = die(0, 2),
		id = posID();

		state.set('open_trades.'+id, {
			id, 
			time,
			entry_time,
			expiry_time,
			direction,
			investment,
			asset_id: table.asset,
			table_id: table.id,
			source_id: source_id,
			source_name: position_sources[source_id],
			phase: 'waiting'
		})
		setTimeout(set_entry.bind(null, table, id), time_to_open);
		positions_count++;
	}

	function initialize(){
		state.mutate('asset_rates', _ => {
			var new_rates = {};
			for(let code in asset_rates) {
				new_rates[code] = mutate_rate(code, 20);
			}
			return new_rates
		})
		tick_asset_interval = setInterval(tick_asset, 100);
		new_position_interval = setInterval(try_new_position, 2000)
	}

	init_timeout = setTimeout(initialize, 1000-(now()%1000))

	// returns a cleanup function
	return () => {
		(init_timeout !== undefined) && clearTimeout(init_timeout);
		(tick_asset_interval !== undefined) && clearInterval(tick_asset_interval);
		(new_position_interval !== undefined) && clearInterval(new_position_interval);
	}
}