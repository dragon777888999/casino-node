// determine the hostname
export default () => {
    if (typeof window !== 'undefined') {
        return window.location.hostname;
    }
    return '';
};