import React from 'react';
import useAppState from '../../../hooks/useAppState';
import APP from './../../../app';
import { add_commas } from './../../../utils/number';
import Symbol from '../../../comp/shape/playblock_symbol';
import truncNum from '../../../utils/truncNum';

const pad_num = (num) => {
	return num < 10 ? '0' + num : num.toString();
};

const format_date = (date) => {
	date = new Date(date);
	return `${pad_num(date.getDate())}.${pad_num(date.getMonth() + 1)}.${date.getYear().toString().slice(1)}`
};

export default function EarningRecord({ date, totalAmount, status, perTier1, perTier2, perTier3, transactionHash }) {

	const default_game_network = useAppState('default_game_network');
	const dateValue = format_date(date);
	const tier1Value = add_commas(truncNum(perTier1), 2);
	const tier2Value = add_commas(truncNum(perTier2), 2);
	const tier3Value = add_commas(truncNum(perTier3), 2);
	const totalAmountValue = add_commas(truncNum(totalAmount), 2);
	const hashValue = hashUrl(default_game_network, transactionHash);

	//config for playblock scan url
	function hashUrl(platform, hash) {
		const testnetUrl = 'https://arb-blueberry.gelatoscout.com/tx/';
		const mainnetUrl = 'https://explorer.playblock.io/tx/';
		if (platform === 'TESTNET') return testnetUrl + hash;
		else return mainnetUrl + hash;
	}

	return (

		<div className="earning_record tr">

			<div className="td time">{dateValue}</div>
			<div className="td tier1"><Symbol />{tier1Value}</div>
			<div className="td tier2"><Symbol />{tier2Value}</div>
			<div className="td tier3"><Symbol />{tier3Value}</div>
			<div className="td total"><Symbol />{totalAmountValue}</div>
			<div className={`td status ${status.toLowerCase()}`}>{status}</div>
			<div className="td_btn_right">
				{status.toLowerCase() === 'paid' &&
					<div className="btn_wrap">
						<a target="_blank" rel="noopener" href={hashValue} className="btn">
							<span>{APP.term('earning_report_hash_btn')}</span>
						</a>
					</div>}
			</div>

		</div>

	);

}