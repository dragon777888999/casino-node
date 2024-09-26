import React, { useState } from 'react';
import useAppState from '../../../hooks/useAppState';
import truncNum from '../../../utils/truncNum';
import APP from './../../../app';
import { add_commas } from './../../../utils/number';

const pad_num = (num) => {
	return num < 10 ? '0' + num : num.toString();
};

const format_date = (date) => {
	date = new Date(date);
	return `${pad_num(date.getDate())}.${pad_num(date.getMonth() + 1)}.${date.getYear().toString().slice(1)}`
};

const Expansion = ({ tier1Value, tier2Value, tier3Value, totalAmountValue }) => {

	return (
		<div className="expansion_row">
			<div class="tier-row-header">
				<div class="friends-tier-header"><span>Friends Tier</span></div>
				<div class="total-daily-header"><span>Total Daily Earning</span></div>
				<div class="total-amount-header"><span>Total Amount</span></div>
			</div>
			<div className="tier-row-content">
				<div class="friends-tier-content">
					<div><span>01 (20%)</span></div>
					<div><span>02 (10%)</span></div>
					<div><span>03 (5%)</span></div>
				</div>
				<div class="total-daily-content">
					<div><span>{tier1Value}</span></div>
					<div><span>{tier2Value}</span></div>
					<div><span>{tier3Value}</span></div>
				</div>
				<div class="total-amount-content">
					<div><span>{totalAmountValue}</span></div>
				</div>
			</div>
		</div>
	);

};

export default function EarningRecord({ date, totalAmount, status, perTier1, perTier2, perTier3, transactionHash }) {

	const default_game_network = useAppState('default_game_network');
	const [expanded, setExpanded] = useState(false);

	const dateValue = format_date(date);
	const tier1Value = add_commas(truncNum(perTier1), 2);
	const tier2Value = add_commas(truncNum(perTier2), 2);
	const tier3Value = add_commas(truncNum(perTier3), 2);
	const totalAmountValue = add_commas(truncNum(totalAmount), 2);
	const statusValue = status;
	const hashValue = hashUrl(default_game_network, transactionHash);

	//config for polygon scan url
	function hashUrl(platform, hash) {
		const testnetUrl = 'https://arb-blueberry.gelatoscout.com/tx/';
		const mainnetUrl = 'https://explorer.playblock.io/tx/';
		if (platform === 'TESTNET') return testnetUrl + hash;
		else return mainnetUrl + hash;
	}

	return (

		<div className="earning_record tr">

			<div className="earning_record_top_row">
				<div className="td time"><span>{dateValue}</span></div>
				<div className={`td status ${statusValue.toLowerCase()}`}><span>{statusValue}</span></div>
				<div className="td_btn_right">
					{statusValue.toLowerCase() === 'paid' &&
						<div className="btn_wrap">
							<a target="_blank" rel="noopener" href={hashValue} className="btn"><span>{APP.term('earning_report_hash_btn')}</span></a>
						</div>}
				</div>
				<div className="td action" onClick={expanded ? e => setExpanded(false) : e => setExpanded(true)}>
					<div className={"expand" + (expanded ? ' expand_up' : '')}></div>
				</div>
			</div>

			{expanded && <Expansion
				tier1Value={tier1Value}
				tier2Value={tier2Value}
				tier3Value={tier3Value}
				totalAmountValue={totalAmountValue}
			/>}

		</div>

	);

}