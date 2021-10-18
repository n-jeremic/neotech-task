import { calculateAverage } from './calculator'

describe('calculator helpers', () => {
    describe('calculateAverage', () => {
        it('should return average value as integer, if calculated average is integer', () => {
            const VALUES_MOCK = [3, 4, 5]
            expect(calculateAverage(VALUES_MOCK)).toBe(4)
        })

        it('should return average value with one decimal place, ' +
            'if calculated average is decimal number with one decimal place', () => {
            const VALUES_MOCK = [3, 4, 5, 6]
            expect(calculateAverage(VALUES_MOCK)).toBe(4.5)
        })

        it('should return average value with two decimal places, ' +
            'if calculated average is decimal number with two decimal places', () => {
            const VALUES_MOCK = [9, 2, 3, 1]
            expect(calculateAverage(VALUES_MOCK)).toBe(3.75)
        })

        it('should return average value with two decimal places rounded properly by math, ' +
            'if calculated average is decimal number with more than two decimal places (data type 1)', () => {
            const VALUES_MOCK = [50, 2, 3]
            expect(calculateAverage(VALUES_MOCK)).toBe(18.33)
        })

        it('should return average value with two decimal places rounded properly by math, ' +
            'if calculated average is decimal number with more than two decimal places (data type 2)', () => {
            const VALUES_MOCK = [25, 3, 2, 2, 3, 1, 1]
            expect(calculateAverage(VALUES_MOCK)).toBe(5.29)
        })
    })
})
