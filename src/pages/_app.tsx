import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter'
import type { DocumentHeadTagsProps } from '@mui/material-nextjs/v13-pagesRouter'
import { DocumentProps } from 'next/dist/pages/_document'
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline'

export default function App(
  { Component, pageProps }: AppProps,
  props: DocumentProps & DocumentHeadTagsProps,
) {
  return (
    <AppCacheProvider {...props}>
      <ScopedCssBaseline>
        <Component {...pageProps} />
      </ScopedCssBaseline>
    </AppCacheProvider>
  )
}
