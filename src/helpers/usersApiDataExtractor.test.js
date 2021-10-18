import {
    _getUsersAgeFromUsersCollection,
    getUsersAgeFromApiResponse
} from './usersApiDataExtractor'

describe('usersApiDataExtractor helpers', () => {
    describe('_getUsersAgeFromUsersCollection', () => {
        it('should return array of integers from given users collection with corresponding structure (data type 1)', () => {
            const USERS_COLLECTION_MOCK = [
                { name: 'user1', email: 'user1@email.com', dob: { age: 45 } },
                { name: 'user2', email: 'user2@email.com', dob: { age: 32 } },
                { name: 'user3', email: 'user3@email.com', dob: { age: 78 } },
                { name: 'user4', email: 'user4@email.com', dob: { age: 12 } },
                { name: 'user5', email: 'user5@email.com', dob: { age: 52 } }
            ]

            const expectedOutput = [45, 32, 78, 12, 52]
            expect(_getUsersAgeFromUsersCollection(USERS_COLLECTION_MOCK)).toEqual(expectedOutput)
        })

        it('should return array of integers from given users collection with corresponding structure (data type 2)', () => {
            const USERS_COLLECTION_MOCK = [
                { name: 'user1', email: 'user1@email.com', dob: { age: 15 } },
                { name: 'user2', email: 'user2@email.com', dob: { age: 42 } },
                { name: 'user3', email: 'user3@email.com', dob: { age: 18 } },
                { name: 'user4', email: 'user4@email.com', dob: { age: 5 } },
                { name: 'user5', email: 'user5@email.com', dob: { age: 87 } }
            ]

            const expectedOutput = [15, 42, 18, 5, 87]
            expect(_getUsersAgeFromUsersCollection(USERS_COLLECTION_MOCK)).toEqual(expectedOutput)
        })
    })

    describe('getUsersAgeFromApiResponse', () => {
        it('should return array of integers from given users api response with corresponding structure (data type 1)', () => {
            const USERS_API_RESPONSE_MOCK = {
                data: {
                    results: [
                        { name: 'user1', email: 'user1@email.com', dob: { age: 45 } },
                        { name: 'user2', email: 'user2@email.com', dob: { age: 32 } },
                        { name: 'user3', email: 'user3@email.com', dob: { age: 78 } },
                        { name: 'user4', email: 'user4@email.com', dob: { age: 12 } },
                        { name: 'user5', email: 'user5@email.com', dob: { age: 52 } }
                    ]
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
                request: {}
            }


            const expectedOutput = [45, 32, 78, 12, 52]
            expect(getUsersAgeFromApiResponse(USERS_API_RESPONSE_MOCK)).toEqual(expectedOutput)
        })

        it('should return array of integers from given users api response with corresponding structure (data type 2)', () => {
            const USERS_API_RESPONSE_MOCK = {
                data: {
                    results: [
                        { name: 'user1', email: 'user1@email.com', dob: { age: 15 } },
                        { name: 'user2', email: 'user2@email.com', dob: { age: 42 } },
                        { name: 'user3', email: 'user3@email.com', dob: { age: 18 } },
                        { name: 'user4', email: 'user4@email.com', dob: { age: 5 } },
                        { name: 'user5', email: 'user5@email.com', dob: { age: 87 } }
                    ]
                },
                status: 200,
                statusText: 'OK',
                headers: {},
                config: {},
                request: {}
            }

            const expectedOutput = [15, 42, 18, 5, 87]
            expect(getUsersAgeFromApiResponse(USERS_API_RESPONSE_MOCK)).toEqual(expectedOutput)
        })
    })
})
