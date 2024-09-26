import React from 'react';

const other_order = { asc: 'desc', desc: 'asc' };

function SortingColumn({ sorting: [sortColumn, order], setter, column, text }) {

    const classes = ['th', 'sortable', column];
    const onClick = (sortColumn == column
        ? (e => setter([column, other_order[order]]))
        : (e => setter([column, column == 'rank' ? 'asc' : 'desc']))
    );

    if (sortColumn == column) {
        classes.push('sorter');
        classes.push(order);
    }

    return (
        <div className={classes.join(' ')} onClick={onClick}>{text}</div>
    );
}

export default SortingColumn;