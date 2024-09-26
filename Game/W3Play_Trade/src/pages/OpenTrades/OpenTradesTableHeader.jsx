
import React from 'react'
import SortingColumn from './../../comp/sorting_column'

export default function TradeHistoryTableHeader({ sorting, setSorting }) {
    return (
        <div className="table_header">
            <SortingColumn sorting={sorting} setter={setSorting} 
                column="time" text="ID"/>
            <SortingColumn sorting={sorting} setter={setSorting} 
                column="table_id" text={APP.term('position_table_name')} />
            <SortingColumn sorting={sorting} setter={setSorting} 
                column="investment" text={APP.term('position_investment')} />
            <SortingColumn sorting={sorting} setter={setSorting} 
                column="source_id" text={APP.term('position_type')} />
            <div className="th entry_rate">{APP.term('position_entry_rate')}</div>
            <div className="th current_rate">{APP.term('position_current_rate')}</div>
            <SortingColumn sorting={sorting} setter={setSorting} 
                column="expiry_time" text={APP.term('position_expiry_time')} />
        </div>
    )
}