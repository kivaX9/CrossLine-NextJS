import axiosInstance from '@/utils/AxiosInstance'

import { Profile, UpdateProfile } from '@/domain/Profile'

const getProfile = async (userId: number): Promise<Profile | Error> => {
  try {
    const response = await axiosInstance.get(`/profiles/get/${userId}`)
    return response.data
  } catch (error) {
    return new Error('Ошибка получение данных профиля')
  }
}

const updateProfile = async (
  profileId: number,
  request: UpdateProfile,
): Promise<Profile | Error> => {
  try {
    const response = await axiosInstance.post(
      `/profiles/update/${profileId}`,
      request,
    )
    return response.data
  } catch (error) {
    return new Error('Ошибка изменения профиля')
  }
}

export const ProfileService = { updateProfile, getProfile }
