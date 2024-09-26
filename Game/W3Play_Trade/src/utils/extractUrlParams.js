export default function extractParamsFromString(url) {
    const regex = /[?&]([^=#]+)=([^&#]*)/g;
    let paramsString = '';
    let match;

    while ((match = regex.exec(url)) !== null) {
        const paramName = decodeURIComponent(match[1]);
        const paramValue = decodeURIComponent(match[2]);
        paramsString += `${paramName}=${paramValue}&`;
    }

    // remove the trailing '&' if present
    if (paramsString.endsWith('&')) {
        paramsString = paramsString.slice(0, -1);
    }

    return paramsString;
}