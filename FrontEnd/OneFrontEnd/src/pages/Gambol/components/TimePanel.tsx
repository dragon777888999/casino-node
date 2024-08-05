import { useContext, useEffect, useState } from "react";
import { endDate, startDate } from "../anchor/setup";
import { DataContext } from "../provider/DataProvider";

export const TimePanel = () => {

    const pad = (n: number) => {
        return (n < 10 ? '0' : '') + n;
    }
    const [days, setDays] = useState("0");
    const [hours, setHours] = useState("0");
    const [minutes, setMinutes] = useState("0");
    const [seconds, setSeconds] = useState("0");
    const {
        isStarted: [isStarted, setIsStarted],
        isEnded: [isEnded, setIsEnded],
    } = useContext(DataContext);
    useEffect(() => {
        const interval = setInterval(() => {
            const now  = Math.floor(new Date().getTime() / 1000)
            let seconds_left = startDate - now;
            if (now > startDate) {
                setIsStarted(true);
                seconds_left = endDate - now;
            }
            if (now > endDate) {
                setIsEnded(true);
                seconds_left = 0;
            }
            const d = pad(Math.floor(seconds_left / 3600 / 24));
            seconds_left = seconds_left % (3600 * 24)
            const h = pad(Math.floor(seconds_left / 3600));
            seconds_left = seconds_left % 3600;

            const m = pad(Math.floor(seconds_left / 60));
            const s = pad(seconds_left % 60);

            setDays(d)
            setHours(h)
            setMinutes(m)
            setSeconds(s)
        }, 1000);
        return () => clearInterval(interval);
      }, []);
    return (
        <div className="bg-white shadow-md flex-shrink-0 p-8 rounded-md text-center w-full justify-center">
            <h4 className="font-bold px-2 pb-4">{isStarted ? (isEnded ? "Ended" : "Ends in") : "Starts in"}</h4>
            <div className=" flex flex-row justify-between items-center">
                <div className="flex flex-col items-center">
                    <div className="sm:w-16 sm:h-20 w-12 h-15 flex-shrink-0 rounded-lg shadow-lg sm:py-5 py-2 mb-2 bg-blue-100 border-2 border-gray-300 sm:text-4xl text-3xl font-bold ">
                        {days}
                    </div>
                    <div className="sm:text-sm text-xs">days</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="sm:w-16 sm:h-20 w-12 h-15 flex-shrink-0 rounded-lg shadow-lg sm:py-5 py-2 mb-2 bg-blue-100 border-2 border-gray-300 sm:text-4xl text-3xl font-bold ">
                        {hours}
                    </div>
                    <div className="sm:text-sm text-xs">hours</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="sm:w-16 sm:h-20 w-12 h-15 flex-shrink-0 rounded-lg shadow-lg sm:py-5 py-2 mb-2 bg-blue-100 border-2 border-gray-300 sm:text-4xl text-3xl font-bold ">
                        {minutes}
                    </div>
                    <div className="sm:text-sm text-xs">minutes</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="sm:w-16 sm:h-20 w-12 h-15 flex-shrink-0 rounded-lg shadow-lg sm:py-5 py-2 mb-2 bg-blue-100 border-2 border-gray-300 sm:text-4xl text-3xl font-bold ">
                        {seconds}
                    </div>
                    <div className="sm:text-sm text-xs">seconds</div>
                </div>
            </div>
        </div>
    )
}