import React, { useState, useRef, forwardRef } from 'react';
import { useDispatch } from 'react-redux';

import ExpansionTableHeader from './ExpansionTableHeader';
import { add_commas } from '../../../utils/number';
import { copyTextToClipboard } from '../../../utils/clipboard';
import Symbol from '../../../comp/shape/playblock_symbol';
import state from '../../../state';
import truncNum from '../../../utils/truncNum';

// Map between expansion table column classes and their related
// data props in order for the sorting logic to work properly
const map = {
    'country': 'country',
    'clicks': 'hits',
    'wallet': 'connections',
    'players': 'activeUsers',
    'conversion': 'conversionRate',
    'trades': 'tradesTotal',
    'trades-per-user': 'avgTradesPerPlayer',
    'revenue-per-user': 'avgRevPerPlayer',
    'revenue': 'revenueTotal'
};

// Expansion table column sorting functions
const EXPANSION_TABLE_SORTERS = {
    asc: (column) => (a, b) => (a[map[column]] - b[map[column]]),
    desc: (column) => (a, b) => (b[map[column]] - a[map[column]]),
    // asc_str: (column) => (a, b) => (a[map[column]])?.localeCompare(b[map[column]]),
    // desc_str: (column) => (a, b) => (b[map[column]])?.localeCompare(a[map[column]])
};

const padNum = (num) => {
    return num < 10 ? '0' + num : num.toString();
};

const formatDate = (date) => {
    date = new Date(date);
    return `${padNum(date.getDate())}.${padNum(date.getMonth() + 1)}.${date.getYear().toString().slice(1)}`
};

const ExpansionTableRow = ({ country, hits, connections, conversionRate,
    activeUsers, tradesTotal, revenueTotal, avgTradesPerPlayer, avgRevPerPlayer }) => {
    return (

        <>

            <div className="expansion-table-row default-web-view-flex">
                <div className="expansion-td country"><span>{country}</span></div>
                <div className="expansion-td clicks"><span>{hits}</span></div>
                <div className="expansion-td wallet"><span>{connections}</span></div>
                <div className="expansion-td players"><span>{activeUsers}</span></div>
                <div className="expansion-td conversion"><span>{conversionRate}%</span></div>
                <div className="expansion-td trades"><span>{tradesTotal}</span></div>
                <div className="expansion-td trades-per-user"><span>{add_commas(truncNum(avgTradesPerPlayer), 2)}</span></div>
                <div className="expansion-td revenue-per-user"><span>{add_commas(truncNum(avgRevPerPlayer), 2)}</span></div>
                <div className="expansion-td revenue"><span>{add_commas(truncNum(revenueTotal), 2)}</span></div>
            </div>

            <div className="expansion-table-row mobile-view-flex">
                <div className="expansion-td country"><span>{country}</span></div>
                <div className="expansion-td clicks"><span>{hits}</span></div>
                <div className="expansion-td wallet"><span>{connections}</span></div>
                <div className="expansion-td players"><span>{activeUsers}</span></div>
                <div className="expansion-td revenue-per-user"><span>{add_commas(truncNum(avgRevPerPlayer), 2)}</span></div>
                <div className="expansion-td revenue"><span>{add_commas(truncNum(revenueTotal), 2)}</span></div>
            </div>

        </>

    );

};

const Expansion = forwardRef(({ geoData, ...props }, ref) => {

    const [sorting, setSorting] = useState(['country', 'asc']);
    const order = /*sorting[0] === 'country' ? `${sorting[1]}_str` :*/ sorting[1];

    const records = [...geoData];
    records.sort(EXPANSION_TABLE_SORTERS[order](sorting[0]));

    return (
        <div ref={ref} className="expansion">
            <ExpansionTableHeader sorting={sorting} setSorting={setSorting} />
            {records.map((record, i) => <ExpansionTableRow {...record} key={i} />)}
        </div>
    );

});

const MainTableRow = ({ title, createdAt, link, hits, connections,
    activeUsers, conversionRate, revenueTotal, geoData }) => {

    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const expansionRef = useRef(null);

    const toggleExpansionRow = () => {
        setIsExpanded(prev => {
            if (prev) {
                expansionRef.current.style = null;
                return false;
            }
            const height = expansionRef.current.scrollHeight;
            expansionRef.current.style.height = `${height}px`;
            return true;
        });
    };

    return (

        <div className="record-wrap">

            {/* WEB VIEW */}

            <div className="row default-web-view-flex">

                <div className="td date">
                    <span>{formatDate(createdAt)}</span>
                </div>

                <div className="td link">
                    <div className="link-content">
                        <div className="link-name"><span>{title}</span></div>
                        <div className="link-address"><span>{link}</span></div>
                    </div>
                    <div className="copy_icon" onClick={() => copyTextToClipboard(link, dispatch)}></div>
                </div>

                <div className="td clicks">
                    <span>{add_commas(hits)}</span>
                </div>

                <div className="td wallet">
                    <span>{add_commas(connections)}</span>
                </div>

                <div className="td players">
                    <span>{add_commas(activeUsers)}</span>
                </div>

                <div className="td conversion">
                    <span>{conversionRate}%</span>
                </div>

                <div className="td revenue">
                    <Symbol />
                    <span>{add_commas(truncNum(revenueTotal), 2)}</span>
                </div>

                <div className="td action" onClick={toggleExpansionRow}>
                    <div className={"expand" + (isExpanded ? ' expand_up' : '')}></div>
                </div>

            </div>

            {/* MOBILE VIEW */}

            <div className="row mobile-view-flex">

                <div className="sub-row sub-row-top">

                    <div className="td date">
                        <span>{formatDate(createdAt)}</span>
                    </div>

                    <div className="td link-name">
                        <div className="link-name"><span>{title}</span></div>
                    </div>

                    <div className="td revenue">
                        <Symbol />
                        <span>{add_commas(truncNum(revenueTotal), 2)}</span>
                    </div>

                    <div className="td action action-empty"></div>

                </div>

                <div className="sub-row sub-row-middle">

                    <div className="td link">
                        <div className="link-content">
                            <span className="link-name">{title}</span>
                            <div className="link-address"><span>{link}</span></div>
                        </div>
                        <div className="copy_icon" onClick={() => copyTextToClipboard(link, dispatch)}></div>
                    </div>

                    <div className="td action action-empty"></div>

                </div>

                <div className="sub-row sub-row-bottom">

                    <div className="td clicks">
                        <span className="title">{APP.term('sap_links_total_clicks')}</span>
                        <span className="value">{add_commas(hits)}</span>
                    </div>

                    <div className="td wallet">
                        <span className="title">{APP.term('sap_links_connect_wallet')}</span>
                        <span className="value">{add_commas(connections)}</span>
                    </div>

                    <div className="td players">
                        <span className="title">{APP.term('sap_links_active_players')}</span>
                        <span className="value">{add_commas(activeUsers)}</span>
                    </div>

                    <div className="td conversion">
                        <span className="title">{APP.term('sap_links_conversion_rate')}</span>
                        <span className="value">{conversionRate}%</span>
                    </div>

                    <div className="td action" onClick={toggleExpansionRow}>
                        <div className={"expand" + (isExpanded ? ' expand_up' : '')}></div>
                    </div>

                </div>

            </div>

            <Expansion ref={expansionRef} geoData={geoData} />

        </div>

    );

};

export default MainTableRow;