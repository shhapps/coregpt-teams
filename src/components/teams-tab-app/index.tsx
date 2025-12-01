import { Theme } from '@radix-ui/themes'
import { lazy, Suspense } from 'react'
import { Toaster } from 'sonner'
import '@radix-ui/themes/styles.css'
import '@/styles/global.css'

import ErrorBoundary from '@/components/ui/error-boundary'
import LazyRetry from '@/components/ui/lazy-retry'
import Loader from '@/components/ui/loader'
import LoaderBackdrop from '@/components/ui/loader-backdrop'
import MessageSnackbar from '@/components/ui/message-snackbar'
import { useAppStore } from '@/stores/app.store.ts'

const Main = lazy(() => LazyRetry(() => import(/* webpackChunkName: "Main" */ '@/components/layout/main'), 'Main'))

const AppContent = () => {
  return (
    <ErrorBoundary>
      <Toaster duration={3000} richColors position="top-center" toastOptions={{ style: { padding: '5px 10px ' } }} />
      <Suspense fallback={<Loader />}>
        <Main />
      </Suspense>
      <LoaderBackdrop />
      <MessageSnackbar />
    </ErrorBoundary>
  )
}

const App = () => {
  const { theme } = useAppStore()

  console.log('My team is here =>', theme)

  return (
    <Theme appearance={theme as never} accentColor="indigo">
      <AppContent />
    </Theme>
  )
}

export default App
