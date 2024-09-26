import React from 'react';

const HeaderWrap = ({ children, headerType }) => {

    let headerClass = headerType === 'positions' ? 'positions' : 'regular';

    return (
        <div className={`slide-header ${headerClass}-header`}>
            {children}
        </div>
    );

};

export default HeaderWrap;