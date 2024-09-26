import React from 'react';

function SingleTransactionStatus({ ringStatus }) {

    return (
        <div className="loader_container">
            <div className="item">
                <div className="top">
                    <div className={`ring ${ringStatus ? 'full' : ''}`}>
                        <svg height="200" width="200">
                            <circle className={`circle ${ringStatus ? '' : 'loading'}`} cx="100" cy="100" r="40" stroke="#fe9725" strokeWidth="6" fillOpacity="0" />
                        </svg>
                        <div className="image" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleTransactionStatus;