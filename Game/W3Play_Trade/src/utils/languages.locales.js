export function localLang(searchedLang) {
    if (searchedLang.toLowerCase() === 'zh-cn') return 'sc';
    else if (searchedLang.toLowerCase() === 'zh-tw') return 'cn';
    else if (searchedLang === 'ja') return 'jp';
    else if (searchedLang.length <= 2) return searchedLang;
}