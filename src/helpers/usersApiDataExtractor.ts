import { UsersAxiosResponseSchema, SingleUserApiResponseSchema } from '../react-app-env'

const _getUsersDataFromApiResponse = (axiosResponse: UsersAxiosResponseSchema): Array<SingleUserApiResponseSchema> => axiosResponse.data.results
export const _getUsersAgeFromUsersCollection = (users: Array<SingleUserApiResponseSchema>): Array<number> => users.map(user => user.dob.age)

export const getUsersAgeFromApiResponse = (axiosResponse: UsersAxiosResponseSchema): Array<number> => _getUsersAgeFromUsersCollection(
    _getUsersDataFromApiResponse(axiosResponse)
)
