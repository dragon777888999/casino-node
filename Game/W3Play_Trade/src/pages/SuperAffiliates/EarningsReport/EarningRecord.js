import React from 'react';
import state from '../../../state';
import numberFormat from '../../../utils/numberFormat';
import APP from './../../../app';
import Symbol from '../../../comp/shape/playblock_symbol';
import truncNum from '../../../utils/truncNum';

const EarningRecord = ({ date, commission, totalAmount, status, txHash }) => {

	// config for playblock scan url
	const hashUrl = (platform, hash) => {
		const testnetUrl = 'https://arb-blueberry.gelatoscout.com/tx/';
		const mainnetUrl = 'https://explorer.playblock.io/tx/';
		if (platform === 'testnet') return testnetUrl + hash;
		else return mainnetUrl + hash;
	};

	const hashValue = hashUrl(state.active_network, txHash);

	return (
		<div className="earning-row tr">
			<div className="td date"><span>{date}</span></div>
			{/* <div className="td commision"><Symbol/><span>{parseFloat(commission).toFixed(state.sap_digits)}</span></div> */}
			<div className="td commision"><Symbol /><span>{truncNum(commission)}</span></div>
			<div className="td total-amount"><Symbol /><span>{numberFormat.addCommas(truncNum(totalAmount))}</span></div>
			<div className={`td status ${status.toLowerCase()}`}><span>{status}</span></div>

			{/* <div className="td date"><span>{date}</span></div>
			<div className="td commision"><Symbol/><span>{commisionValue}</span></div>
			<div className="td total-amount"><Symbol/><span>{totalAmountValue}</span></div>
			<div className={`td status ${status.toLowerCase()}`}><span>{statusValue}</span></div> */}

			<div className="td tx-hash">
				{status.toLowerCase() === 'paid' &&
					<div className="btn_wrap">
						<a target="_blank" rel="noopener" href={hashValue} className="btn">
							{APP.term('earning_report_hash_btn')}
						</a>
					</div>
				}
			</div>
		</div>
	);

};

export default EarningRecord;