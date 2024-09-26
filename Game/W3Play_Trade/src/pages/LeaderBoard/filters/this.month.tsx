// This month format:  01/XY/YYYY - 29/XY/YYYY 
//                     01/XY/YYYY - 30/XY/YYYY  
//                     01/XY/YYYY - 31/XY/YYYY 

interface DateRange {
    from: string;
    to: string;
}

export default function thisMonth(fullIsoFormat: boolean): DateRange {

    let from: string = new Date().toISOString(),
        today: any = new Date(),
        to: string;

    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    to = today.toISOString();

    if (fullIsoFormat) {
        from = from.slice(0, 8) + '01' + 'T00:00:00';
        to = from.slice(0, 8) + lastDay.toString() + 'T23:59:59';
    }
    else {
        from = from.slice(0, 8) + '01';
        to = to.slice(0, 8) + lastDay.toString();
    }

    return { from, to };
}