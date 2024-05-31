import axiosInstance from '@/utils/AxiosInstance'

import { LoginUser, RegisterUser } from '@/domain/Auth'
import { User } from '@/domain/User'

const login = async (request: LoginUser): Promise<User | Error> => {
  try {
    const response = await axiosInstance.post('/auth/login', request)
    return response.data
  } catch (error) {
    return new Error('Ошибка авторизации')
  }
}

const register = async (request: RegisterUser) => {
  try {
    const response = await axiosInstance.post('/auth/register', request)
    return response.data
  } catch (error) {
    return new Error('Ошибка регистрации')
  }
}

export const AuthService = {
  login,
  register,
}
