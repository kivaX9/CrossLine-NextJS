import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, TextField } from '@mui/material'

import { ProfileService } from '@/services/ProfileService'

import localStorageUser from '@/utils/LocalStorageUser'
import { useError } from '@/contexts/ErrorContext'

import { UpdateProfile } from '@/domain/Profile'

export default function ProfileModalContent() {
  const { setError } = useError()
  const localUser = localStorageUser.getLocalStorageUser()
  const [profileId, setProfileId] = useState<number>()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<UpdateProfile>()

  useEffect(() => {
    async function fetchData() {
      const userId = localUser?.id
      if (userId) {
        const response = await ProfileService.getProfile(userId)

        if (response instanceof Error) return setError(response.message)

        const { firstName, lastName, telephone, user } = response

        setProfileId(user.id)
        setValue('firstName', firstName)
        setValue('lastName', lastName)
        if (telephone) setValue('telephone', telephone)
      }
    }

    fetchData()
  }, [localUser?.id, setError, setValue])

  const updateProfile: SubmitHandler<UpdateProfile> = async (data) => {
    if (profileId) {
      const { firstName, lastName, telephone } = data
      const response = await ProfileService.updateProfile(profileId, {
        firstName,
        lastName,
        telephone,
      })

      if (response instanceof Error) return setError(response.message)
    }
  }

  return (
    <>
      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        onSubmit={handleSubmit(updateProfile)}
      >
        <TextField
          {...register('firstName', {
            required: 'Это обязательное поле',
          })}
          variant="outlined"
          size="small"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          placeholder="Имя"
        />

        <TextField
          {...register('lastName', {
            required: 'Это обязательное поле',
          })}
          variant="outlined"
          size="small"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          placeholder="Фамилия"
        />

        <TextField
          {...register('telephone', {
            minLength: {
              value: 10,
              message: 'Номер телефона должен быть не менее 10 символов',
            },
            maxLength: {
              value: 15,
              message: 'Номер телефона должен быть не более 15 символов',
            },
            pattern: {
              value: /^[0-9+\-() ]+$/,
              message:
                'Номер телефона должен содержать только цифры и допустимые символы (+, -, (, ), пробел)',
            },
          })}
          variant="outlined"
          size="small"
          error={!!errors.telephone}
          helperText={errors.telephone?.message}
          placeholder="Телефон"
        />

        <Button
          type="submit"
          variant="contained"
        >
          Изменить
        </Button>
      </form>
    </>
  )
}
