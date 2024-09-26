
import React from 'react'
import SortingColumn from '../../../comp/sorting_column';
import APP from '../../../app';

const TableHeader = ({ sorting, setSorting }) => {

    return (
        <>

            {/* <div className="table_header default-web-view"> */}
            <div className="table_header">
                {/* <SortingColumn sorting={sorting} setter={setSorting} column="date" text={APP.term('campaign_date')}/> */}
                <div className="th date"><span>DATE</span></div>
                <div className="th commision"><span>35% COMMISION</span></div>
                <div className="th total-amount"><span>TOTAL AMOUNT</span></div>
                <div className="th status"><span>STATUS</span></div>
                <div className="th tx-hash"></div>
                {/* <SortingColumn sorting={sorting} setter={setSorting} column="total_users" text={APP.term('campaign_total_users')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="today_total_profits" text={APP.term('campaign_today_total_profits')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="past_total_profits" text={APP.term('campaign_past_total_profits')} /> */}
                
            </div>

            {/* <div className="table_header mobile-view">
                <SortingColumn sorting={sorting} setter={setSorting} column="date-name" text={APP.term('link_manager_date_name')}/>
                <SortingColumn sorting={sorting} setter={setSorting} column="total_users" text={APP.term('link_manager_friends')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="today_total_profits" text={APP.term('campaign_today_total_profits')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="past_total_profits" text={APP.term('campaign_past_total_profits')} />
                <div className="th action"></div>
            </div> */}
            
        </>

    );

};

export default TableHeader;