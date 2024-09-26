
import React, { useState, useEffect } from 'react';
import APP from '../app';
import PageHeader from './../comp/page_header';
import OpenTradesTableHeader from './OpenTrades/OpenTradesTableHeader';
import PositionRow from './OpenTrades/PositionRow';
import { column_desc, column_asc } from './../utils/array' 
import sim_open_trades from './../simulation/open_trades'
import useAppState from '../hooks/useAppState';

const column_sorters = { asc: column_asc, desc: column_desc };


function PositionsList({ sorting: [column, order] }){
	const positions = useAppState('open_trades'),
	positions_array = Object.values(positions || {});
	positions_array.sort(column_sorters[order](column));
	// console.log({positions_array})
	return (
		<div className="positions_list table_body">
			{positions_array.map(pos => <PositionRow key={pos.id} {...pos}/>)}
		</div>
	)
}

export default function OpenTradesPage() {
	var [sorting, setSorting] = useState(['time', 'desc']);

	useEffect(() => {
		let cleanup_sim = sim_open_trades(APP, APP.state);
		return cleanup_sim;
	}, [])

	return (
		<div className="page open_trades_page table_page">
			<PageHeader title={APP.term('open_trades_title')} text_scale={.7}/>
			<OpenTradesTableHeader sorting={sorting} setSorting={setSorting} />
			<PositionsList sorting={sorting} />
		</div>
	)
}
