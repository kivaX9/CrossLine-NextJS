import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/router'

import { TextField, Button } from '@mui/material'

import { AuthService } from '@/services/AuthService'
import { useError } from '@/contexts/ErrorContext'
import localStorageUser from '@/utils/LocalStorageUser'

import { LoginUser } from '@/domain/Auth'

export default function LoginForm() {
  const { setError } = useError()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>()

  const login: SubmitHandler<LoginUser> = async (data) => {
    const { username, password } = data
    const response = await AuthService.login({ username, password })

    if (response instanceof Error) return setError(response.message)

    localStorageUser.setLocalStorageUser(response)

    router.push('/products')
  }

  return (
    <form
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      onSubmit={handleSubmit(login)}
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
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <Button
        type="submit"
        variant="contained"
      >
        Войти
      </Button>
    </form>
  )
}
