import React from 'react';
// import { Helmet } from "react-helmet";
import { Helmet } from "react-helmet-async"; // use Helmet with react-helmet-async

const MetaTags = ({ title, description, imageUrl, url }) => {
    return (
        <Helmet>
            {/* Open Graph (OG) meta tags */}
            <meta property="og:title" content={'t222itle'} />
            <meta property="og:description" content={'sdfdsfds'} />
            <meta property="og:image" content='https://affiliates.btcrollercoaster.com/assets/img/og_150.png"' />
            <meta property="og:url" content='https://btcrollercoaster.com/' />
            
            {/* Twitter Card meta tags */}
            <meta name="twitter:title" content={'sd222fds'} />
            <meta name="twitter:description" content={'sdfdsfdsf'} />
            <meta name="twitter:image" content='https://affiliates.btcrollercoaster.com/assets/img/og_150.png"' />
            <meta name="twitter:card" content="summary_large_image" />
        </Helmet>
    );
};

export default MetaTags;