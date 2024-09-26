// This Week format: monday 00:00:00 till sunday 23:59:59

interface DateRange {
    from: string;
    to: string;
}

export default function thisWeek(fullIsoFormat: boolean): DateRange {

    let today = new Date(),
        currentDay = today.getDay(), // 0 (Sunday) through 6 (Saturday)
        diff = currentDay == 0 ? 5 : currentDay - 1, // Calculate the difference to Monday
        isSunday = (currentDay == 0),
        isMonday = (currentDay == 1);

    // Today is Monday 
    if (isMonday) {
        let base = new Date(Date.now() + (6 * 24 * 60 * 60 * 1000)),
            mondayISO: string, sundayISO: string;

        if (fullIsoFormat) {
            mondayISO = today.toISOString().split("T")[0] + 'T00:00:00';
            sundayISO = base?.toISOString().split("T")[0] + 'T23:59:59';
        }

        else {
            mondayISO = today.toISOString().split("T")[0];
            sundayISO = base?.toISOString().split("T")[0];

        }
        return { from: mondayISO, to: sundayISO };
    }


    // Today is Sunday
    else if (isSunday) {
        let base = new Date(today.setDate(today.getDate() - 5)),
            mondayISO: string, sundayISO: string;

        if (fullIsoFormat) {
            mondayISO = base?.toISOString().split("T")[0] + 'T00:00:00';
            sundayISO = new Date()?.toISOString().split("T")[0] + 'T23:59:59';
        }
        else {
            mondayISO = base?.toISOString().split("T")[0];
            sundayISO = new Date()?.toISOString().split("T")[0];
        }
        return { from: mondayISO, to: sundayISO };
    }


    // Others
    else {
        // day/month format should be with 0 if less than 10
        function isoFormat(amt: number) {
            if (amt < 10) return '0' + amt;
            else return amt;
        }

        let calcMonday = new Date(today.setDate(today.getDate() - diff)),
            mondayDayNum = calcMonday.getDate() + 6,
            calcSunday = new Date(today.setDate(mondayDayNum));

        // parse parts of date as iso format
        function convertToISO(dayToCalc: Date) {
            let day = dayToCalc.getDate(),
                month = dayToCalc.getMonth() + 1,
                year = dayToCalc.getFullYear(),
                dayToISO = year + '-' + isoFormat(month) + '-' + isoFormat(day);

            return dayToISO;
        }

        let mondayISO: any, sundayISO: any;

        if (fullIsoFormat) {
            mondayISO = calcMonday.toISOString().split('T')[0] + 'T00:00:00'
            sundayISO = calcSunday.toISOString().split('T')[0] + 'T23:59:59'
        }
        else {
            mondayISO = convertToISO(calcMonday);
            sundayISO = convertToISO(calcSunday);
        }

        return { from: mondayISO, to: sundayISO };
    }
}