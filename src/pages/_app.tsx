import { useEffect } from 'react'

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter'
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v13-pagesRouter'
import { DocumentProps } from 'next/dist/pages/_document'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'

import PageLayout from '@/layouts/PageLayout/PageLayout'
import Header from '@/components/Header/Header'

export default function App(
  { Component, pageProps }: AppProps,
  props: DocumentProps & DocumentHeadTagsProps,
) {
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = checkAuthentication()

    if (router.pathname === '/') {
      if (isAuthenticated) {
        router.replace('/products')
      } else {
        router.replace('/login')
      }
    }
  }, [router, router.pathname])

  // Функция проверки аутификации
  function checkAuthentication() {
    return false
  }

  return (
    <AppCacheProvider {...props}>
      <ScopedCssBaseline>
        {checkAuthentication() ? null : (
          <PageLayout>
            <Header />
            <Component {...pageProps} />
          </PageLayout>
        )}
      </ScopedCssBaseline>
    </AppCacheProvider>
  )
}
