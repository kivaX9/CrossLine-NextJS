import axios from 'axios'
import LocalStorageUser from '@/utils/LocalStorageUser'

const baseURL = process.env.NEXT_PUBLIC_API_URL

const axiosInstance = axios.create({
  baseURL,
})

// Передаю AccessToken в запрос от клиента
axiosInstance.interceptors.request.use(
  (config) => {
    const localUser = LocalStorageUser.getLocalStorageUser()
    if (localUser && localUser?.accessToken) {
      config.headers['Authorization'] = `Bearer ${localUser.accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Если приходит 401, то проверяю на валидность refreshToken, если валиден,
// то отпраляю запрос на обновлнеие токена и заново запрос от клиента,
// иначе удаление user из localStorage
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error

    const originalRequest = config

    if (status === 401 && !originalRequest._retry) {
      try {
        const localUser = LocalStorageUser.getLocalStorageUser()
        const currentRefreshToken = localUser?.refreshToken

        const { data } = await axios.post(`${baseURL}/auth/refresh`, {
          currentRefreshToken,
        })

        LocalStorageUser.setLocalStorageUser({
          ...localUser,
          ...data,
        })

        originalRequest._retry = true
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`
        return axiosInstance(originalRequest)
      } catch (err) {
        LocalStorageUser.removeLocalStorageUser()
        window.location.href = '/auth/login'

        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance
