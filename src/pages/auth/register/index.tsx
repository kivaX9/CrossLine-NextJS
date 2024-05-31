import { useCallback } from 'react'
import { useRouter } from 'next/router'

import { Box, Typography, Link } from '@mui/material'

import { AuthService } from '@/services/AuthService'

import RegisterForm from '@/components/Forms/RegisterForm'

export default function Login() {
  const router = useRouter()

  const goLogin = useCallback(() => router.push('/auth/login'), [router])

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
        Регистрация
      </Typography>

      <RegisterForm />

      <Link
        onClick={goLogin}
        sx={{ cursor: 'pointer', textAlign: 'center' }}
      >
        Авторизироваться
      </Link>
    </Box>
  )
}
