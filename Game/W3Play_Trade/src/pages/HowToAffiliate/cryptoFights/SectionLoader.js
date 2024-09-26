import React from "react";
// import './Loader.css';

const SectionLoader = ({ text = 'Loading...' }) => {
    
    return (
        <div className="section-loader-overlay">
            <div className="section-loader-wrap"></div>
        </div>
    );

};

export default SectionLoader;