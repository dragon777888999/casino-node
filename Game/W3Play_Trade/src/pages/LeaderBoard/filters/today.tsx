// Today format:  xx/xx/YYYY - xx/xx/YYY (same dates)

interface DateRange {
    from: string;
    to: string;
}

export default function today(fullIsoFormat: boolean): DateRange {

    let base = new Date();
    let to: any, from: any;

    if (fullIsoFormat) {
        from = base.toISOString().split('T')[0] + 'T00:00:00';
        to = base.toISOString().split('T')[0] + 'T23:59:59';
    }
    else {
        from = base.toISOString().split("T")[0];
        to = base.toISOString().split("T")[0];
    }

    return { from, to };
}