import APP from "../app";

export function affilite_page_cfg(ctn) {
    let cfg = [
        { term: 'aff_page_faq', content: 'FAQ' },
        { term: 'aff_page_link_manager', content: 'Link Manager' },
        { term: 'aff_page_link_report', content: 'Earning Report' },
        { term: 'aff_page_link_dashboard', content: 'Dashboard' }]

    return APP.term(cfg.find(itm => itm.content === ctn).term);
}