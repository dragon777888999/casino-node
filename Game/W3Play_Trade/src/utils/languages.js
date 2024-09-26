export function languages(searchedLang) {
    let cfg = {
        'de': ['de', 'at', 'ch', 'li'],
        'jp': ['jp'],
        'cn': ['cn', 'tw'],
        'zh': ['hk'],
        'it': ['it'],
        'tr': ['tr'],
        'pl': ['pl'],
        'es': ['es', 'mx', 'co', 'ar', 'pe', 've', 'cl', 'ec', 'gt', 'cu', 'bo', 'do', 'hn', 'py', 'sv', 'ni', 'cr', 'pa', 'uy', 'gq'],
        'ar': ['dz', 'bh', 'td', 'km', 'dj', 'eg', 'er', 'iq', 'jo', 'kw', 'lb', 'ly', 'mr', 'ma', 'om', 'qa', 'sa', 'so', 'sd', 'sy', 'tn', 'ae', 'ye'],
        'fr': ['fr', 'ca', 'ch', 'be', 'ht', 'lu', 'mc', 'cd', 'mg', 'cm', 'ci', 'bf', 'ne', 'sn', 'ml', 'rw', 'td', 'gn', 'bi', 'tg', 'cf', 'bj', 'ga', 'ga', 'km', 'gq', 'dj', 'sc', 'vu'],
        'pt': ['pt', 'br', 'ao', 'mz', 'gw', 'tp', 'gq', 'cv', 'st'],
        'ko': ['kp', 'kr'],
        'id': ['id'],
        'ms': ['my', 'bn'],
        'th': ['th'],
        'vi': ['vn'],
        'ru': ['ru', 'by', 'kz', 'kg', 'ge']
    }

    for (let itm in cfg) {
        for (let val of cfg[itm]) {
            if (val.includes(searchedLang?.toLowerCase())) {
                return itm;
            }
        }
    }
}