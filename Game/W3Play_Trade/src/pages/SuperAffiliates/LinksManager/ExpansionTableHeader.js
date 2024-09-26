
import React from 'react'
import SortingColumnExpansion from './SortingColumnExpansion';
import APP from '../../../app';

const ExpansionTableHeader = ({ sorting, setSorting }) => {

    return (
        <>

            {/* WEB VIEW */}
            <div className="expansion_table_header default-web-view-flex">
                <div className="expansion-th country"><span>{APP.term('sap_links_country')}</span></div>
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="clicks" text={APP.term('sap_links_total_clicks')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="wallet" text={APP.term('sap_links_connect_wallet')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="players" text={APP.term('sap_links_active_players')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="conversion" text={APP.term('sap_links_conversion_rate')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="trades" text={APP.term('sap_links_total_trades')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="trades-per-user" text={APP.term('sap_links_trade_per_player')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="revenue-per-user" text={APP.term('sap_links_revenue_per_player')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="revenue" text={APP.term('sap_links_total_revenue')} />
            </div>

            {/* MOBILE VIEW */}
            <div className="expansion_table_header mobile-view-flex">
                <div className="expansion-th country"><span>{APP.term('sap_links_country')}</span></div>
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="clicks" text={APP.term('sap_links_total_clicks')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="wallet" text={APP.term('sap_links_connect_wallet')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="players" text={APP.term('sap_links_active_players')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="revenue-per-user" text={APP.term('sap_links_rev_per_player')} />
                <SortingColumnExpansion sortingSettings={sorting} setSortingSettings={setSorting} columnClass="revenue" text={APP.term('sap_links_total_revenue')} />
            </div>

        </>

    );

};

export default ExpansionTableHeader;