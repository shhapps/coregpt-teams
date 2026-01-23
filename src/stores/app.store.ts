import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import type { ISnackbarProps } from '@/interfaces/app.interfaces'
import type { IUserInfo } from '@/interfaces/auth.interfaces'
import { LocalStorageKeys, MainContent, StoreNames, Theme } from '@/utils/constants'
import { getStoreName } from '@/utils/global'
import { setStoreDefaultValues } from '@/utils/global/store'

export interface IAppState {
  requestId: string
  theme: Theme
  updateTheme: (newTheme: Theme) => void
  snackbar?: ISnackbarProps
  setSnackbar: (data: ISnackbarProps) => void
  accessToken?: string
  updateAccessToken: (accessToken?: string) => void
  userInfo?: IUserInfo
  updateUserInfo: (userInfo?: IUserInfo) => void
  mainContent: MainContent
  setMainContent: (mainContent: MainContent) => void
  trialEndedDialogOpen: boolean
  setTrialEndedDialogOpen: (trialEndedDialogOpen: boolean) => void
  applicationLanguage?: string
  setApplicationLanguage: (applicationLanguage: string) => void
  drawerOpen: boolean
  setDrawerOpen: (drawerOpen: boolean) => void
}

setStoreDefaultValues()

export const useAppStore = create<IAppState>()(
  devtools(
    set => ({
      requestId: localStorage.getItem(LocalStorageKeys.requestId),
      theme: localStorage.getItem(LocalStorageKeys.theme),
      updateTheme: (newTheme: Theme) => {
        localStorage.setItem(LocalStorageKeys.theme, newTheme)
        set({ theme: newTheme })
      },
      snackbar: { open: false },
      setSnackbar: snackbar => set({ snackbar }),
      accessToken: localStorage.getItem(LocalStorageKeys.accessToken) as string,
      updateAccessToken: (accessToken?: string) => {
        if (accessToken) {
          localStorage.setItem(LocalStorageKeys.accessToken, accessToken)
          set({ accessToken })
        }
      },
      updateUserInfo: (userInfo?: IUserInfo) => {
        if (userInfo) set({ userInfo })
      },
      mainContent: MainContent.appTabs,
      setMainContent: (mainContent: MainContent) => set({ mainContent }),
      trialEndedDialogOpen: false,
      setTrialEndedDialogOpen: (trialEndedDialogOpen: boolean) => set({ trialEndedDialogOpen }),
      setApplicationLanguage: (applicationLanguage: string) => set({ applicationLanguage }),
      drawerOpen: false,
      setDrawerOpen: (drawerOpen: boolean) => set({ drawerOpen: drawerOpen })
    }),
    { name: getStoreName(StoreNames.mainStore) }
  )
)
