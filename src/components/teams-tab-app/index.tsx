import { Theme } from '@radix-ui/themes'
import { lazy, Suspense } from 'react'
import { I18nextProvider } from 'react-i18next'
import { Toaster } from 'sonner'
import '@radix-ui/themes/styles.css'
import '@/styles/global.css'

import ErrorBoundary from '@/components/ui/error-boundary'
import LazyRetry from '@/components/ui/lazy-retry'
import Loader from '@/components/ui/loader'
import LoaderBackdrop from '@/components/ui/loader-backdrop'
import MessageSnackbar from '@/components/ui/message-snackbar'
import TrialEndedDialog from '@/components/ui/trial-ended-dialog'
import { useAppStore } from '@/stores/app.store.ts'
import i18n from '@/utils/i18n/i18n.config'

const Main = lazy(() => LazyRetry(() => import(/* webpackChunkName: "Main" */ '@/components/layout/main'), 'Main'))

const AppContent = () => {
  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <Toaster duration={3000} richColors position="top-center" toastOptions={{ style: { padding: '5px 10px ' } }} />
        <Suspense fallback={<Loader />}>
          <Main />
        </Suspense>
        <LoaderBackdrop />
        <MessageSnackbar />
        <TrialEndedDialog />
      </I18nextProvider>
    </ErrorBoundary>
  )
}

const App = () => {
  const { theme } = useAppStore()

  return (
    <Theme appearance={theme as never} accentColor="indigo">
      <AppContent />
    </Theme>
  )
}

export default App
