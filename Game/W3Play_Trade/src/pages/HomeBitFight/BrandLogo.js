import React from "react";
import useAppState from "../../hooks/useAppState";

const BrandLogo = () => {

    const logoImg = useAppState('brand_logo');

    return (
        <div className="site-logo">
            {logoImg ? <img src={logoImg} alt='' /> : null}
        </div>
    );

};

export default BrandLogo;