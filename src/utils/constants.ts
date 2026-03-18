export const {
  VITE_API_URL: API_URL,
  VITE_SENTRY_DSN: SENTRY_DSN,
  VITE_APP_LAUNCH_MODE: APP_LAUNCH_MODE,
  MODE
} = import.meta.env

export const appName = 'CoreGPT AI MeetSync'
export const baseAppName = 'CoreGPT'

export const apiAppName = 'Teams'

export enum AppNames {
  outlook = 'CoreGPT for Outlook',
  word = 'CoreGPT for Word',
  excel = 'CoreGPT for Excel',
  googleWorkspace = 'ChatGPT for Google Workspace'
}

export enum StoreNames {
  mainStore = appName,
  chatStore = 'chat-store'
}

export enum ExternalLinks {
  contactUs = 'https://coregptapps.com/contact-us',
  termsOfUse = 'https://shhapps.com/terms',
  privacyPolicy = 'https://shhapps.com/privacy-policy',
  coregptAppsMainPage = 'https://coregptapps.com',
  suggestFeatureLink = 'https://chatgptaiteams.userjot.com',
  appReviewPage = 'https://marketplace.microsoft.com/en-us/product/office/WA200009757?tab=Reviews',
  helpLink = 'https://help.coregptapps.com',
  googleWorkspaceReviewPage = 'https://workspace.google.com/marketplace/app/chatgpt_ai_for_workspace/845108372332',
  wordOverviewPage = 'https://appsource.microsoft.com/en-us/product/office/WA200008935?tab=Overview',
  excelOverviewPage = 'https://marketplace.microsoft.com/en-us/product/WA200008989?tab=Overview',
  outlookOverviewPage = 'https://marketplace.microsoft.com/en-us/product/office/WA200009260?tab=Overview'
}

export enum Theme {
  light = 'light',
  dark = 'dark'
}

export enum LocalStorageKeys {
  accessToken = 'access_token',
  refreshToken = 'refresh-token',
  requestId = 'request_id',
  theme = 'theme',
  questionsCount = 'questions_count',
  limitBypassed = 'limit_bypassed',
  reviewCooldownUntil = 'review_cooldown_until',
  applicationLanguage = 'applicationLanguage'
}

export const cssThemeColorVarName = '--theme-color'
export const cssAppColorVarName = '--app-color'

export const conversationIdHeader = 'conversation-id'

export enum AppLaunchModes {
  dev = 'dev',
  prod = 'prod'
}

export enum AvailableLanguages {
  en = 'en',
  ru = 'ru',
  zh = 'zh',
  hi = 'hi',
  de = 'de',
  it = 'it',
  es = 'es',
  pt = 'pt',
  fr = 'fr',
  nl = 'nl',
  cs = 'cs',
  pl = 'pl',
  ja = 'ja',
  ko = 'ko',
  tr = 'tr',
  vi = 'vi',
  ar = 'ar',
  th = 'th',
  id = 'id',
  he = 'he',
  hr = 'hr'
}

export enum MainContent {
  appTabs = 'app-tabs',
  settings = 'settings'
}
