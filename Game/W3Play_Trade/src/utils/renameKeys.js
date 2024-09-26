// change objects's key into other named keys 
export default function renameKeys(obj, keyMap) {
    Object.keys(keyMap).forEach(oldKey => {
        if (obj.hasOwnProperty(oldKey)) {
            obj[keyMap[oldKey]] = obj[oldKey];
            delete obj[oldKey];
        }
    });
    return obj;
}