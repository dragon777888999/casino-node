export default {
    addCommas: n => {
        var parts = n.toString().split('.');
        parts[0] = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return parts.join('.');
    }
}
