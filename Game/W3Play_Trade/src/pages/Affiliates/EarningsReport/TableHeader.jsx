import React from 'react';
import SortingColumn from './../../../comp/sorting_column';
import APP from './../../../app';

export default function TableHeader({ sorting, setSorting }) {
    return (
        <>

            <div className="table_header default-web-view">
                <SortingColumn sorting={sorting} setter={setSorting} column="date" text={APP.term('earning_date')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="perTier1" text={APP.term('earning_tier1_profit')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="perTier2" text={APP.term('earning_tier2_profit')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="perTier3" text={APP.term('earning_tier3_profit')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="totalAmount" text={APP.term('earning_total_profit')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="status" text={APP.term('earning_status')} />
                <div className="header_right" />
            </div>

            <div className="table_header mobile-view">
                <SortingColumn sorting={sorting} setter={setSorting} column="date" text={APP.term('earning_date')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="status" text={APP.term('earning_status')} />
                <div className="th hash-details">{APP.term('trade_history_hash_details')}</div>
                <div className="th action-empty-space"></div>
            </div>

        </>
    );
};