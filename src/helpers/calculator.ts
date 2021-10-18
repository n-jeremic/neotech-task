export const calculateAverage = (values: Array<number>): number => {
    const sumOfAllValues = values.reduce((accumulator, currentValue) => accumulator + currentValue)
    const valuesCount = values.length
    const averageValue = sumOfAllValues / valuesCount
    return Math.round(averageValue * 100) / 100
}
