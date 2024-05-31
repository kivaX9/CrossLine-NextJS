import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

import { TextField, Button } from '@mui/material'

import { AuthService } from '@/services/AuthService'
import { useError } from '@/contexts/ErrorContext'

import { RegisterUser } from '@/domain/Auth'

export default function RegisterForm() {
  const { setError } = useError()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUser>()

  const [password, setPassword] = useState('')

  const onSubmit: SubmitHandler<RegisterUser> = async (data) => {
    const { username, password, firstName, lastName } = data
    const response = await AuthService.register({
      username,
      password,
      firstName,
      lastName,
    })

    if (response instanceof Error) return setError(response.message)

    router.push('/auth/login')
  }

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register('username', {
          required: 'Это обязательное поле',
          minLength: {
            value: 3,
            message: 'Логин должен быть длиньше, чем 3 символа',
          },
        })}
        label="Логин"
        variant="outlined"
        size="small"
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        {...register('firstName', {
          required: 'Это обязательное поле',
        })}
        label="Имя"
        variant="outlined"
        size="small"
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        {...register('lastName', {
          required: 'Это обязательное поле',
        })}
        label="Фамилия"
        variant="outlined"
        size="small"
        error={!!errors.firstName}
        helperText={errors.firstName?.message}
      />

      <TextField
        {...register('password', {
          required: 'Это обязательное поле',
          minLength: {
            value: 8,
            message: 'Пароль должен быть длиньше, чем 8 символа',
          },
        })}
        label="Пароль"
        type="password"
        variant="outlined"
        size="small"
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        {...register('confirmPassword', {
          required: 'Это обязательное поле',
          validate: (value) => value === password || 'Пароли не совпадают',
        })}
        label="Повторите пароль"
        type="password"
        variant="outlined"
        size="small"
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        variant="contained"
      >
        Зарегистрироваться
      </Button>
    </form>
  )
}
