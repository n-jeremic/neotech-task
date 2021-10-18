import { useEffect, useState } from 'react'

export const useTimer = (isTimerActive: boolean, timerExpiration: number, timerTick: number, ringABellCb: Function): void => {
    const initialTimeLeft = timerExpiration
    const [timeLeft, setTimeLeft]: [number, Function] = useState(initialTimeLeft)
    const [timeoutId, setTimeoutId]: [number, Function] = useState(-1)

    useEffect(() => {
        if (isTimerActive) {
            const newTimeoutId = setTimeout(() => {
                if (timeLeft > 0) {
                    setTimeLeft(timeLeft - timerTick)
                } else {
                    ringABellCb()
                    setTimeLeft(initialTimeLeft)
                }
            }, timerTick)

            setTimeoutId(newTimeoutId)
        } else {
            clearTimeout(timeoutId)
        }

        return () => clearTimeout(timeoutId)
    }, [isTimerActive, timeLeft])
}
