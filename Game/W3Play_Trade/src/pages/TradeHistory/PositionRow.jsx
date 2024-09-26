import React, { useState } from 'react'
import APP from '../../app';
import { add_commas } from '../../utils/number';
import useAppState from '../../hooks/useAppState';
import state from '../../state';

const pad_num = (num) => {
	return num < 10 ? '0' + num : num.toString();
}

const format_date = (date) => {
	date = new Date(date);
	const day = pad_num(date.getDate());
	const month = pad_num(date.getMonth() + 1);
	const year = date.getYear().toString().slice(1);
	return `${day}.${month}.${year}`;
}

const format_time = (date) => {
	date = new Date(date);
	const hours = pad_num(date.getHours());
	const minutes = pad_num(date.getMinutes());
	return `${hours}:${minutes}`;
}

export default function PositionRow({ id, pool, dir, result, date, hash, ivst/*table_id, result, asset_id, source_name, date, itm*/ }) {
	// const tables = useAppState('tables', []);
	// const assets = useAppState('assets', []);
	// let table_name = '';
	let asset_name = '';

	// for (let table of tables) {
	// 	if (table.id == table_id) {
	// 		table_name = table.name;
	// 		break;
	// 	}
	// }

	// for (let asset of assets) {
	// 	if (asset.id == asset_id) {
	// 		asset_name = asset.name;
	// 		break;
	// 	}
	// }

	let default_game_network = useAppState('default_game_network');
	// let smrtct_evt = state.active_network === 'testnet' ? state.testnet_smctr_evts : state.mainnet_smctr_evts;
	let direction = dir.toLowerCase() === 'up' ? 'up' : 'down';

	//config for polygon scan url
	function hashUrl(platform, hash) {
		let testnetUrl = 'https://arb-blueberry.gelatoscout.com/tx/';
		let mainnetUrl = 'https://explorer.playblock.io/tx/';
		
		if (platform === 'TESTNET') return testnetUrl + hash;
		else return mainnetUrl + hash;
	}

	const value_id = id.substring(0, 4) + '...' + id.slice(-4);
	const value_date = `${format_date(date)} ${format_time(date)}`;
	const value_pool = `${asset_name} ${pool.toUpperCase()}`;
	const value_invest_img_src = `/media/images/${direction}_triangle.svg`;
	const value_invest_amount = add_commas(ivst, 2);
	// const value_type = 'TRADE' || source_name.toUpperCase();
	const value_hash_url = hashUrl(default_game_network, hash);
	const value_hash_term = APP.term('position_table_hash_details');

	return (
		<div className="trade_history_row">
			<div className="trade_history_time_and_id">{value_date} {'UTC'}<br />{value_id}</div>
			<div className="trade_history_id default-web-view">{value_id}</div>
			<div className="trade_history_time default-web-view">{value_date} {'UTC'}</div>
			<div className="trade_history_pool">{value_pool}</div>
			<div className="trade_history_investment"><img className="direction" src={value_invest_img_src} data-direction={direction}/><div className="investment_amt">{value_invest_amount}</div></div>
			<div className="trade_history_type" status={result}>{result}</div>
			<div className="trade_history_hash_btn">
				<div className="hash_btn" status={result}>
					<a target="_blank" rel="noopener" href={value_hash_url}>
						<p status={result}><span>{value_hash_term}</span></p>
					</a>
				</div>
			</div>
		</div>
	);

}