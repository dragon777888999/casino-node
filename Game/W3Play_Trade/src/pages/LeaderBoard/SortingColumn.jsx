import React from 'react'

function SortingColumn({ sortingSettings: [columnToSort, sortingOrder], setSortingSettings, columnClass, columnText }) {

    const columnClasses = ['th', 'sortable', columnClass];
    
    const onClickSortColumn = (columnToSort === columnClass
        ? (e => setSortingSettings([columnClass, sortingOrder === 'asc' ? 'desc' : 'asc']))
        : (e => setSortingSettings([columnClass, columnClass === 'rank' ? 'asc' : 'desc']))
    );

    if(columnToSort === columnClass) {
        columnClasses.push('sorter');
        columnClasses.push(sortingOrder);
    }

    return (
        <div className={columnClasses.join(' ')} onClick={onClickSortColumn}>{columnText}</div>
    );

};

export default SortingColumn;