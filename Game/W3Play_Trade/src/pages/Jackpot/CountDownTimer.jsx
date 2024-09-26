import React, { useEffect, useState } from "react";

const CountdownTimer = ({ startTime, onStop, onReset, reset }) => {

    const [timeRemaining, setTimeRemaining] = useState(parseInt(startTime));
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        startTimer();
    }, []);

    useEffect(() => {
        let interval;

        if (isActive && timeRemaining > 0 && startTime) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1000);
            }, 1000);
        } else if (timeRemaining === 0) {
            onStop();
            clearInterval(interval);

            // if (startTime > 0) {
            //     resetTimer();
            // }
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

    const stopTimer = () => {
        setIsActive(false);
    };

    const resetTimer = () => {
        setIsActive(true);
        setTimeRemaining(startTime);
        // onReset();
    };

    return (
        <>
            {days < 10 ? '0' + days : days}:{hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}
        </>
    );
};

export default CountdownTimer;
