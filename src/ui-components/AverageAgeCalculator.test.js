import { unmountComponentAtNode } from 'react-dom'
import { render, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import AverageAgeCalculator from './AverageAgeCalculator'
import { fetchUsers } from '../api/apiUsers'

const USERS_API_RESPONSE_MOCK_WITH_AVERAGE_AGE_10 = {
    data: {
        results: [
            { name: 'user1', email: 'user1@email.com', dob: { age: 15 } },
            { name: 'user2', email: 'user2@email.com', dob: { age: 10 } },
            { name: 'user3', email: 'user3@email.com', dob: { age: 8 } },
            { name: 'user4', email: 'user4@email.com', dob: { age: 12 } },
            { name: 'user5', email: 'user5@email.com', dob: { age: 5 } }
        ]
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
    request: {}
}

const USERS_API_RESPONSE_MOCK_WITH_AVERAGE_AGE_30 = {
    data: {
        results: [
            { name: 'user1', email: 'user1@email.com', dob: { age: 20 } },
            { name: 'user2', email: 'user2@email.com', dob: { age: 40 } },
            { name: 'user3', email: 'user3@email.com', dob: { age: 30 } },
            { name: 'user4', email: 'user4@email.com', dob: { age: 25 } },
            { name: 'user5', email: 'user5@email.com', dob: { age: 35 } }
        ]
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
    request: {}
}

const TEN_SECONDS = 10000

jest.mock('../api/apiUsers', () => ({
    fetchUsers: jest.fn()
}))

describe('AverageAgeCalculator react component', () => {
    let container = null
    beforeEach(() => {
        jest.useFakeTimers()

        container = document.createElement('div')
        document.body.appendChild(container)
    })

    afterEach(() => {
        jest.resetAllMocks()
        jest.clearAllTimers()
        jest.useRealTimers()

        unmountComponentAtNode(container)
        container.remove()
        container = null
    })

    it('should have text output element for average age in DOM', async () => {
        fetchUsers.mockResolvedValue(USERS_API_RESPONSE_MOCK_WITH_AVERAGE_AGE_10)
        await act(async () => {
            render(<AverageAgeCalculator />, { container })
        })

        const averageAgeOutputElement = container.querySelector('.average-age')
        expect(averageAgeOutputElement).toBeInTheDocument()
    })

    it('should have button element in DOM', async () => {
        fetchUsers.mockResolvedValue(USERS_API_RESPONSE_MOCK_WITH_AVERAGE_AGE_10)
        await act(async () => {
            render(<AverageAgeCalculator />, { container })
        })

        const button = container.querySelector('.button')
        expect(button).toBeInTheDocument()
    })

    it('should display that fetching is in progress if users api call is pending', () => {
        fetchUsers.mockImplementation(() => new Promise((resolve, reject) => {}))
        act(() => {
            render(<AverageAgeCalculator />, { container })
        })

        const expectedMessageOutput = 'Fetching users data...'
        const messageOutput = container.querySelector('.average-age').innerHTML
        expect(messageOutput).toBe(expectedMessageOutput)
    })

    it('should fetch new users data and display users average age in DOM (if api call is resolved), ' +
        'as soon as component is rendered', async () => {
        fetchUsers.mockResolvedValue(USERS_API_RESPONSE_MOCK_WITH_AVERAGE_AGE_10)
        await act(async () => {
            render(<AverageAgeCalculator />, { container })
        })

        const expectedAverageAgeOutput = 'Users average age is: 10'
        const averageAgeOutput = container.querySelector('.average-age').innerHTML
        expect(averageAgeOutput).toBe(expectedAverageAgeOutput)
    })

    it('should fetch new users data and display users average age 0 in DOM if api call is rejected, ' +
        'as soon as component is rendered', async () => {
        fetchUsers.mockRejectedValue(new Error())
        await act(async () => {
            render(<AverageAgeCalculator />, { container })
        })

        const expectedAverageAgeOutput = 'Users average age is: 0'
        const averageAgeOutput = container.querySelector('.average-age').innerHTML
        expect(averageAgeOutput).toBe(expectedAverageAgeOutput)
    })

    it('should fetch new users data again and display new average age,' +
        ' after 10 seconds have passed since component first render', async () => {
        await act(async () => {
            fetchUsers.mockResolvedValue(USERS_API_RESPONSE_MOCK_WITH_AVERAGE_AGE_10)
            const { rerender } = render(<AverageAgeCalculator />, { container })

            fetchUsers.mockResolvedValue(USERS_API_RESPONSE_MOCK_WITH_AVERAGE_AGE_30)
            jest.advanceTimersByTime(TEN_SECONDS)
            rerender(<AverageAgeCalculator />)
        })

        const expectedAverageAgeOutput = 'Users average age is: 30'
        const averageAgeOutput = container.querySelector('.average-age').innerHTML
        expect(averageAgeOutput).toBe(expectedAverageAgeOutput)
    })

    it('should NOT fetch new users data again and update DOM with average age,' +
        ' if stop button was clicked', async () => {
        let rerenderComponent
        await act(async () => {
            fetchUsers.mockResolvedValue(USERS_API_RESPONSE_MOCK_WITH_AVERAGE_AGE_10)
            const { rerender } = render(<AverageAgeCalculator />, { container })
            rerenderComponent = rerender
        })

        act(() => {
            const stopButton = container.querySelector('.button-stop')
            fireEvent(stopButton, new MouseEvent('click', { bubbles: true, cancelable: false }))
        })

        await act(async () => {
            fetchUsers.mockResolvedValue(USERS_API_RESPONSE_MOCK_WITH_AVERAGE_AGE_30)
            jest.advanceTimersByTime(TEN_SECONDS)
            rerenderComponent(<AverageAgeCalculator />)
        })

        const expectedAverageAgeOutput = 'Users average age is: 10'
        const averageAgeOutput = container.querySelector('.average-age').innerHTML
        expect(averageAgeOutput).toBe(expectedAverageAgeOutput)
    })
})
