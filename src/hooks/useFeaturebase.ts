import { useRef } from 'react'

import { useAppStore } from '@/stores/app.store.ts'
import { apiAppName, ExternalLinks } from '@/utils/constants.ts'

declare global {
  interface Window {
    Featurebase?: (action: string, config?: Record<string, unknown>) => void
  }
}

const featurebaseAppId = '68cc6490912cb1275a9d52f3'

export const useFeaturebase = () => {
  const { requestId, accessToken, userInfo } = useAppStore()
  const bootRef = useRef<NodeJS.Timeout>(undefined)

  const getUserName = () => {
    if (userInfo?.firstName && userInfo?.lastName) return `${userInfo?.firstName} ${userInfo?.lastName}`
    if (userInfo?.firstName && !userInfo?.lastName) return userInfo.firstName
    if (!userInfo?.firstName && userInfo?.lastName) return userInfo.lastName
    return `${apiAppName} User`
  }

  function initWidget() {
    // 1. load the SDK script (if not already loaded)
    const scriptId = 'featurebase-sdk'
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://do.featurebase.app/js/sdk.js'
      // Insert before first script tag
      const firstScript = document.getElementsByTagName('script')[0]
      firstScript.parentNode?.insertBefore(script, firstScript)
    }

    bootRef.current = setInterval(function () {
      // 2. Once loaded / after insertion, call Featurebase("boot", config)
      if (window.Featurebase && typeof window.Featurebase === 'function') {
        window.Featurebase('boot', {
          appId: featurebaseAppId,
          userId: requestId,
          name: getUserName(),
          theme: 'light',
          language: 'en',
          hideDefaultLauncher: true,
          host: apiAppName,
          accessToken
        })
        clearInterval(bootRef.current)
      }
    }, 50)

    setTimeout(() => clearInterval(bootRef.current), 15000)
  }

  function showWidget() {
    if (window.Featurebase && typeof window.Featurebase === 'function') window.Featurebase('show')
    else {
      try {
        initWidget()
        window.Featurebase!('show')
      } catch (error) {
        console.error(`Error while opening featurebase widget: ${error}`)
        window.open(ExternalLinks.contactUs, '_blank')
      }
    }
  }

  return { initWidget, showWidget }
}
