import axios from 'axios'
import { UsersAxiosResponseSchema } from '../react-app-env'

export const fetchUsers = (numberOfUsers: number): Promise<UsersAxiosResponseSchema> => axios.get(`https://randomuser.me/api/?results=${numberOfUsers}`)
