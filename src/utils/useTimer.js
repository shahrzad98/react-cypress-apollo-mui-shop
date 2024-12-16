import { useState, useEffect, useCallback } from 'react';


function useTimer(s, shouldStart) {

    // s -> seconds to count down
    // shouldStart -> if timer should start on mount

    const [seconds, setSeconds] = useState(s);
    const [intervalId, setIntervalId] = useState(undefined);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const reset = useCallback(() => setSeconds(s), [s]);

    const start = useCallback(() => {

        reset();
        setIsTimerRunning(true);

        let id = setInterval(() => {

            setSeconds(seconds => seconds - 1);

        }, 1000);

        setIntervalId(id);

    }, [reset]);

    const stop = useCallback(() => {

        setIsTimerRunning(false);
        clearInterval(intervalId);

    }, [intervalId]);

    useEffect(() => {

        if (shouldStart)
            start();

    }, [start, shouldStart]);

    useEffect(() => {

        if (seconds <= 0)
            stop();

    }, [seconds, stop]);


    useEffect(() => {

        return () => clearInterval(intervalId);

    }, [intervalId]);


    return {
        isTimerRunning,
        seconds,
        start,
        stop,
        reset
    };
}

export default useTimer;
