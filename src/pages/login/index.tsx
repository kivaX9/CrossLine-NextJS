import { Box, TextField, Typography, Button, Link } from '@mui/material'

import { useForm, Controller, SubmitHandler } from 'react-hook-form'

type FormValues = {
  username: string
  password: string
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      width={400}
      gap={2}
      p={2}
      borderRadius={1}
      bgcolor={'white'}
      boxShadow={10}
    >
      <Typography
        variant="h5"
        color="primary"
      >
        Авторизация
      </Typography>

      <form
        style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
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
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
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

      <Link sx={{ cursor: 'pointer', textAlign: 'center' }}>Забыли пароль?</Link>
    </Box>
  )
}
