// detect which browser is used
export default function browserDetect() {

    var browserName = '';
    var userAgent = navigator.userAgent;
    (typeof InstallTrigger !== 'undefined') && (browserName = 'Firefox');
    ( /* @cc_on!@*/ !!document.documentMode) && (browserName = 'IE');
    (!!window.chrome && userAgent.match(/OPR/)) && (browserName = 'Opera');
    (!!window.chrome && userAgent.match(/Edge/)) && (browserName = 'Edge');
    (!!window.chrome && !userAgent.match(/(OPR|Edge)/)) && (browserName = 'Chrome');

    (userAgent.toLowerCase().indexOf("edge") > -1) && (browserName = "MS Edge (EdgeHtml)");
    (userAgent.toLowerCase().indexOf("edg") > -1) && (browserName = "MS Edge Chromium");

    return browserName;
}