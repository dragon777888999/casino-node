import React, { useState } from 'react'
import APP from '../../app';
import { add_commas, to_precision } from '../../utils/number';
import { relation_cases } from '../../utils/logic';
import useAppState from '../../hooks/useAppState';
import useSecondsCountdown from '../../hooks/useSecondsCountdown';

const {floor}= Math;

function pad_num(num){
	return num < 10 ? '0'+num : num.toString();
}

function format_date(date){
	date = new Date(date);
	return `${pad_num(date.getDate())}.${pad_num(date.getMonth())}.${date.getYear().toString().slice(1)}`
}
function format_time(date){
	date = new Date(date);
	return `${pad_num(date.getHours())}:${pad_num(date.getMinutes())}`
}
function format_minutes(period){
	return `${pad_num(floor(period/60000))}:${pad_num(floor(period%60000/1000))}`
}
function LiveRateCell({code, tail_digits}){
	const rate = useAppState('asset_rates.'+code);
	return <div className="td current_rate">{rate ? add_commas(rate, tail_digits) : '...'}</div>
}
function CounterCell({towards}){
	const time_left = useSecondsCountdown(towards);
	return <div className="td expiry_time">{format_minutes(time_left)}</div>
}

function ColoredWrapper({direction, asset, entry_rate, expiry_rate, children}){
	const current_rate = useAppState('asset_rates.'+asset.code),
	is_up = direction == 'up';
	var classes = ['tr', 'position']
	if((current_rate || expiry_rate) && entry_rate){
		classes.push(
			relation_cases(
				to_precision((expiry_rate || current_rate), asset.tail_digits),
				to_precision(entry_rate, asset.tail_digits),
				(is_up ? 'winning' : 'losing'),
				'tie',
				(is_up ? 'losing' : 'winning'),
			)
		)
	}
	if(expiry_rate){
		classes.push('expired')
	}
	return <div className={classes.join(' ')}>{children}</div>
}

function ResultTile({result, profit}){
	return (<div className="result">
		YOU {result.toUpperCase()} ${add_commas(Math.abs(profit), 2)}
	</div>)
}

export default function PositionRow({
	id, time, investment, table_id, asset_id, direction,
	expiry_time, entry_rate, expiry_rate, source_name,
	result, profit
}) {
	const tables = useAppState('tables'),
	assets = useAppState('assets'),
	table_name = (tables.find(t => t.id == table_id)||{}).name,
	asset = assets.find(a => a.id == asset_id);

    return (
		<ColoredWrapper direction={direction} asset={asset} entry_rate={entry_rate} expiry_rate={expiry_rate}>
			<div className="td id_time">
				<div className="id">{id}</div>
				<div className="time">{format_time(time)}</div>
			</div>
			<div className="td table_asset">
				<div className="asset">{asset.name}</div>
				<div className="table">{table_name.toUpperCase()}</div>
			</div>
			<div className="td invest_dir">
				<img className="direction" src={`/media/images/triangle_${direction}.svg`} />
				<div className="investment">${add_commas(investment, 2)}</div>
			</div>
			<div className="td source">{source_name.toUpperCase()}</div>
			<div className="td entry_rate">{entry_rate ? add_commas(entry_rate, asset.tail_digits) : APP.term('position_waiting')}</div>
			<LiveRateCell {...asset}/>
			<CounterCell towards={expiry_time}/>
			{/* <div className="td expiry_rate">{add_commas(expiry_rate, 2)}</div>
			<div className={`td result ${result}`}>
				<div className="result_name">{result.toUpperCase()}</div>
				<div className="profit">${add_commas(Math.abs(profit), 2)}</div>
			</div> */}
			{result && <ResultTile result={result} profit={profit}/>}
		</ColoredWrapper>
    )
}