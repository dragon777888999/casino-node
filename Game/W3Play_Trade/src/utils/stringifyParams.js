export default function stringifyParams(params){
    let str = '',
        keys = Object.keys(params),
        pairs = [];

    if(!keys.length) return str;
    str += '?';
    for(let key of keys){
        pairs.push(key + '=' + params[key])
    }
    str += pairs.join('&');
    return str;
}