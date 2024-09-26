import React from 'react';

function SortingColumnExpansion({ sortingSettings: [columnToSort, sortingOrder], setSortingSettings, columnClass, text }) {

    const columnClasses = ['expansion-th', 'sortable', columnClass];
    
    const onClickSortColumn = (columnToSort === columnClass
        ? (e => setSortingSettings([columnClass, sortingOrder === 'asc' ? 'desc' : 'asc']))
        : (e => setSortingSettings([columnClass, columnClass === 'country' ? 'asc' : 'desc']))
    );

    if(columnToSort === columnClass) {
        columnClasses.push('sorter');
        columnClasses.push(sortingOrder);
    }

    return (
        <div className={columnClasses.join(' ')} onClick={onClickSortColumn}>
            <span>{text}</span>
        </div>
    );

};

export default SortingColumnExpansion;