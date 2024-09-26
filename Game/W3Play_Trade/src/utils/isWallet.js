import { browserName } from "react-device-detect";

export default (url) => {
    // If the user using Metamask mobile browser we should use proxy streamer
    // Proxy streamer is the same streamer but with proxied DNS settings in Cloudflare
    // Use it only from platforms that cannot connect to websockets

    const metamaskBrowser = navigator.userAgent.includes("MetaMaskMobile");
    const coinbaseBrowser = (browserName.toLowerCase() === 'webkit');
    const coinbaseAndroid = browserName.toLowerCase() === 'chrome webview';
    const imToken = browserName.toLowerCase() === 'android browser';
    const specialBrowser = metamaskBrowser || coinbaseBrowser || coinbaseAndroid || imToken;

    if (specialBrowser) {
        let urlSplitted = url.split('.');
        urlSplitted[0] = urlSplitted[0] + '-proxy';
        url = urlSplitted.join('.');
    }

    return url;
}