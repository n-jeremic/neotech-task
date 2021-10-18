import './AverageAgeCalculator.css'
import { UsersAxiosResponseSchema } from '../react-app-env'
import { useState, useEffect, useCallback } from 'react'
import { fetchUsers } from '../api/apiUsers'
import { getUsersAgeFromApiResponse } from '../helpers/usersApiDataExtractor'
import { calculateAverage } from '../helpers/calculator'
import { useTimer } from '../hooks/timer'
import { SECOND } from '../consts/time'
import Button from './common/Button'
import TextOutput from './common/TextOutput'

const NUM_OF_USERS_TO_FETCH = 10
const TIMER_EXPIRATION_FOR_FETCHING_NEW_USERS = 10 * SECOND
const TIMER_TICK = SECOND

export default function AverageAgeCalculator () {
    const [averageAge, setAverageAge] = useState(0)
    const [fetchingUsersDataInProgress, setFetchingUsersDataInProgress] = useState(false)
    const [calculatorActive, setCalculatorState] = useState(true)
    const [refetchUsersTrigger, setRefetchUsersTrigger] = useState(-1)

    useTimer(
        calculatorActive,
        TIMER_EXPIRATION_FOR_FETCHING_NEW_USERS,
        TIMER_TICK,
        () => setRefetchUsersTrigger(refetchUsersTrigger + 1)
    )

    const handleUsersApiResponseResolved = useCallback((apiResponse: UsersAxiosResponseSchema) => {
        const usersAge = getUsersAgeFromApiResponse(apiResponse)
        const usersAverageAge = calculateAverage(usersAge)
        setAverageAge(usersAverageAge)
    }, [])

    const handleUsersApiResponseRejected = useCallback(() => {
        setAverageAge(0)
    }, [])

    useEffect(() => {
        if (calculatorActive) {
            setFetchingUsersDataInProgress(true)
            fetchUsers(NUM_OF_USERS_TO_FETCH)
                .then(response => handleUsersApiResponseResolved(response))
                .catch(() => handleUsersApiResponseRejected())
                .finally(() => setFetchingUsersDataInProgress(false))
        }
    }, [refetchUsersTrigger])


    const textOutput = fetchingUsersDataInProgress ?
        'Fetching users data...' :
        `Users average age is: ${averageAge}`

    return (
        <div className='calculator'>
            <TextOutput text={textOutput} textClass='average-age' />
            <Button
                clickCb={() => setCalculatorState(!calculatorActive)}
                buttonClass={['button', calculatorActive ? 'button-stop' : 'button-start'].join(' ')}
                buttonText={calculatorActive ? 'Stop calculator' : 'Start calculator'}
            />
        </div>
    )
}
