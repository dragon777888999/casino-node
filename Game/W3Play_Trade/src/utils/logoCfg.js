import APP from "../app";

// set logo image
export default (cntrCfg, type) => {

    let defaultLogo = "/media/images/logos/upvsdown.svg";
    if (cntrCfg?.partnerInfo[type]) {
        APP.state.set('brand_logo', cntrCfg?.partnerInfo[type])
        return cntrCfg?.partnerInfo[type];
    }
    // else return defaultLogo;
    else return;
}