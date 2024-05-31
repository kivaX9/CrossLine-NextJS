import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { Box, Typography, Link } from '@mui/material'

import LoginForm from '@/components/Forms/LoginForm'

export default function Login() {
  const router = useRouter()

  const goRegister = useCallback(() => router.push('/auth/register'), [router])

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

      <LoginForm />

      <Link
        onClick={goRegister}
        sx={{ cursor: 'pointer', textAlign: 'center' }}
      >
        Зарегистрироваться
      </Link>
    </Box>
  )
}
