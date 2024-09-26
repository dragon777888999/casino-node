import React, { useEffect, useState } from "react";

interface CountdownTimerProps {
    startTime: any;
    onStop: () => void;
    onReset: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ startTime, onStop, onReset }) => {

    const [timeRemaining, setTimeRemaining] = useState<number>(parseInt(startTime, 10)),
        [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        startTimer();
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeRemaining > 0 && startTime) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1000);
            }, 1000);
        } else if (timeRemaining === 0) {
            onStop();
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive, timeRemaining, onStop]);

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
    const seconds = Math.floor((timeRemaining / 1000) % 60);

    const startTimer = () => {
        setIsActive(true);
    };

    return (
        <>
            {/* {days < 10 ? "0" + days : days}: */}
            {hours < 10 ? "0" + hours : hours}:
            {minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}
        </>
    );
};

export default CountdownTimer;