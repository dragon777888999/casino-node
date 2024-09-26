
import React from 'react'
import SortingColumnMain from './SortingColumnMain';
import APP from '../../../app';

const MainTableHeader = ({ sorting, setSorting }) => {

    return (

        <>

            <div className="table_header default-web-view-flex">
                <SortingColumnMain sortingSettings={sorting} setSortingSettings={setSorting} columnClass="date" text="DATE CREATED" />
                <div className="th link"><span>NAME / LINK</span></div>
                <SortingColumnMain sortingSettings={sorting} setSortingSettings={setSorting} columnClass="clicks" text="TOTAL CLICKS" />
                <SortingColumnMain sortingSettings={sorting} setSortingSettings={setSorting} columnClass="wallet" text="CONNECT WALLET" />
                <SortingColumnMain sortingSettings={sorting} setSortingSettings={setSorting} columnClass="players" text="ACTIVE PLAYERS" />
                <SortingColumnMain sortingSettings={sorting} setSortingSettings={setSorting} columnClass="conversion" text="CONVERSION RATE" />
                <SortingColumnMain sortingSettings={sorting} setSortingSettings={setSorting} columnClass="revenue" text="TOTAL REVENUE" />
                <div className="th action"></div>
            </div>

            <div className="table_header mobile-view-flex">
                <SortingColumnMain sortingSettings={sorting} setSortingSettings={setSorting} columnClass="date" text="DATE CREATED" />
                <div className="th link"><span>NAME</span></div>
                <SortingColumnMain sortingSettings={sorting} setSortingSettings={setSorting} columnClass="revenue" text="TOTAL REVENUE" />
                <div className="th action"></div>
            </div>
            
        </>

    );

};

export default MainTableHeader;