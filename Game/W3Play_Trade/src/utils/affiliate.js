import APP from "../app";

export function getRefFromUrlParm() {

    const url_string = window.location.href;
    const url = new URL(url_string);
    const ref = url?.searchParams?.get('ref');
    
    // any symbol that isn't number char means end of ref 
    const match = ref?.match(/(.*?)([^a-zA-Z0-9])/);
    
    const foundRef = match ? match[1] : ref;
    APP.state.set('aff_ref', foundRef);

    return foundRef ? foundRef : false;
}