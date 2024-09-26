import React from 'react';
import SortingColumn from './../../comp/sorting_column';

export default function TradeHistoryTableHeader({ sorting, setSorting }) {

    return (
        <>
            <div className="table_header default-web-view">
                <div className="th table_id">{APP.term('position_table_id')}</div>
                <SortingColumn sorting={sorting} setter={setSorting} column="date" text={APP.term('position_table_date')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="pool" text={APP.term('position_table_pool')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="investment" text={APP.term('position_table_investment')} />
                <div className="th type">{APP.term('trade_history_status')}</div>
                <div className="th hash_details">{APP.term('trade_history_hash')}</div>
            </div>

            <div className="table_header mobile-view">
                <SortingColumn sorting={sorting} setter={setSorting} column="date" text={`${APP.term('position_table_date')} / ${APP.term('position_table_id')}`} />
                <SortingColumn sorting={sorting} setter={setSorting} column="pool" text={APP.term('position_table_pool')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="investment" text={APP.term('position_table_investment')} />
                <div className="th type">{APP.term('trade_history_status')}</div>
                <div className="th hash_details">{APP.term('trade_history_hash')}</div>
            </div>
        </>
    );

}