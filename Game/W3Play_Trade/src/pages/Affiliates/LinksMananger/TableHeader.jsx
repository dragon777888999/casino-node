
import React from 'react'
import SortingColumn from './../../../comp/sorting_column'
import APP from './../../../app';
import detectTelegramBrowser from '../../../utils/detectTelegramBrowser';

export default function TableHeader({ sorting, setSorting }) {
    //TODO - need to add dynamic list of whitelabales that have bots and only show to them
    const isTelegramBrowser = false || detectTelegramBrowser(); // undo the ( false || ) when we will finish this telegram feature
    return (
        <>

            <div className={`table_header default-web-view ${isTelegramBrowser ? 'telegram-browser' : ''}`}>
                <SortingColumn sorting={sorting} setter={setSorting} column="date" text={APP.term('campaign_date')}/>
                <div className="th name">{APP.term('campaign_name')}</div>
                <div className="th link">{APP.term('campaign_link')}</div>
                {isTelegramBrowser && <div className="th link_telegram">{/* APP.term('campaign_link_telegram') */`TELEGRAM LINK`}</div>}
                <SortingColumn sorting={sorting} setter={setSorting} column="total_users" text={APP.term('campaign_total_users')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="today_total_profits" text={APP.term('campaign_today_total_profits')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="past_total_profits" text={APP.term('campaign_past_total_profits')} />
                <div className="th action"></div>
            </div>

            <div className="table_header mobile-view">
                <SortingColumn sorting={sorting} setter={setSorting} column="date" text={APP.term('link_manager_date_name')}/>
                <SortingColumn sorting={sorting} setter={setSorting} column="total_users" text={APP.term('link_manager_friends')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="today_total_profits" text={APP.term('campaign_today_total_profits')} />
                <SortingColumn sorting={sorting} setter={setSorting} column="past_total_profits" text={APP.term('campaign_past_total_profits')} />
                <div className="th action"></div>
            </div>
            
        </>

    )
}