import { useState, useEffect, } from 'react';

// indication for screen sizes

const useDimension = () => {

    const getWindowDimensions = () => {
        const { clientWidth: width, clientHeight: height } = document.body;
        return { width: width, height: height };
    };

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const handleOrientationChange = () => {
        setTimeout(() => {
            setWindowDimensions(getWindowDimensions());
        }, 50);
    };

    useEffect(() => {

        window.matchMedia("(orientation: portrait)")
        .addEventListener("change", handleOrientationChange);

        return () => window.matchMedia("(orientation: portrait)")
        .removeEventListener("change", handleOrientationChange);
        
    }, [windowDimensions]);


    return windowDimensions.width <= 480;

};

export default useDimension;
