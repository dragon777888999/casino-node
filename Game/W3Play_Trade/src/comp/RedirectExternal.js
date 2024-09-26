import React from "react";

const RedirectExternal = ({ url }) => {

    window.location.href = url;
    return <></>;

};

export default RedirectExternal;