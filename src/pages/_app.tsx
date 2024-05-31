import { useCallback, useEffect, useState } from 'react'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { DocumentProps } from 'next/dist/pages/_document'

import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter'
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v13-pagesRouter'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'
import CircularProgress from '@mui/material/CircularProgress'

import PageLayout from '@/layouts/PageLayout/PageLayout'
import AuthLayout from '@/layouts/AuthLayout/AuthLayout'

import Header from '@/components/Header/Header'
import { ErrorProvider } from '@/contexts/ErrorContext'

import newLocalStorageUser from '@/utils/LocalStorageUser'

export default function App(
  { Component, pageProps }: AppProps,
  props: DocumentProps & DocumentHeadTagsProps,
) {
  const router = useRouter()
  const [isAuthenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    const localUser = newLocalStorageUser.getLocalStorageUser()
    setAuthenticated(Boolean(localUser?.accessToken))

    if (isAuthenticated === null) return

    const authRouter: string[] = ['/auth/login', '/auth/register', '/']
    const currentPath = router.pathname

    if (isAuthenticated && authRouter.includes(currentPath)) {
      router.push('/products')
    } else if (!isAuthenticated && !authRouter.includes(currentPath)) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  if (isAuthenticated === null) {
    return (
      <AuthLayout>
        <CircularProgress size={50} />
      </AuthLayout>
    )
  }

  return (
    <ErrorProvider>
      <AppCacheProvider {...props}>
        <ScopedCssBaseline>
          {!isAuthenticated ? (
            <AuthLayout>
              <Component {...pageProps} />
            </AuthLayout>
          ) : (
            <PageLayout>
              <Header />
              <Component {...pageProps} />
            </PageLayout>
          )}
        </ScopedCssBaseline>
      </AppCacheProvider>
    </ErrorProvider>
  )
}
