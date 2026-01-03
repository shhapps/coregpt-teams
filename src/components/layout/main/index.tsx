import { Box } from '@radix-ui/themes'
import { lazy, useEffect } from 'react'

import classes from './main.module.css'

import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header'
import LazyRetry from '@/components/ui/lazy-retry'
import Loader from '@/components/ui/loader'
import { useAuthData } from '@/hooks/useAuthData.ts'
import { useFeaturebase } from '@/hooks/useFeaturebase.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { MainContent } from '@/utils/constants.ts'

const Settings = lazy(() =>
  LazyRetry(() => import(/* webpackChunkName: "Settings" */ '@/components/settings'), 'Settings')
)
const AppTabs = lazy(() =>
  LazyRetry(() => import(/* webpackChunkName: "AppTabs" */ '@/components/tabs/app-tabs'), 'AppTabs')
)

const Index = () => {
  const { accessToken, mainContent } = useAppStore()
  const { checkAuthState } = useAuthData()
  const { initWidget } = useFeaturebase()

  useEffect(() => {
    void checkAuthState()
  }, [checkAuthState, accessToken])

  useEffect(() => {
    initWidget()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!accessToken) return <Loader />

  return (
    <Box className={classes.wrapper}>
      <Box asChild>
        <Header />
      </Box>
      <Box asChild>
        <main className={classes.main}>
          {mainContent === MainContent.appTabs && <AppTabs />}
          {mainContent === MainContent.settings && <Settings />}
        </main>
      </Box>
      <Box asChild>
        <Footer />
      </Box>
    </Box>
  )
}

export default Index
