import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import type { IMessageExamples } from '@/interfaces/app.interfaces.ts'
import { LocalesKeys } from '@/utils/i18n/locales-keys'

export const useButtonTexts = () => {
  const { t } = useTranslation()

  return useMemo(
    () => ({
      reloadText: t(LocalesKeys.reload)
    }),
    [t]
  )
}

export const useTrialEndedDialogTexts = () => {
  const { t } = useTranslation()

  return useMemo(
    () => ({
      trialEndedDialogTitleText: t(LocalesKeys.trialEndedDialogTitle),
      trialEndedDialogLeaveReviewCtaText: t(LocalesKeys.trialEndedDialogLeaveReviewCta),
      trialEndedDialogSubtitleKey: LocalesKeys.trialEndedDialogSubtitle
    }),
    [t]
  )
}

export const useToolTipTexts = () => {
  const { t } = useTranslation()

  return useMemo(
    () => ({
      toggleThemeText: t(LocalesKeys.toggleTheme),
      applicationLanguageText: t(LocalesKeys.applicationLanguage),
      homeText: t(LocalesKeys.home),
      settingsText: t(LocalesKeys.settings),
      contactSupportText: t(LocalesKeys.contactSupport)
    }),
    [t]
  )
}

export const useSettingsTexts = () => {
  const { t } = useTranslation()

  return useMemo(
    () => ({
      settingsTitleText: t(LocalesKeys.settingsTitle)
    }),
    [t]
  )
}

export const useDrawerTexts = () => {
  const { t } = useTranslation()

  return useMemo(
    () => ({
      drawerSupportText: t(LocalesKeys.drawerSupport),
      drawerSuggestFeatureText: t(LocalesKeys.drawerSuggestFeature),
      drawerContactUsText: t(LocalesKeys.drawerContactUs),
      drawerPrivacyPolicyText: t(LocalesKeys.drawerPrivacyPolicy),
      drawerTermsOfUseText: t(LocalesKeys.drawerTermsOfUse)
    }),
    [t]
  )
}

export const useCommonTexts = () => {
  const { t } = useTranslation()

  return useMemo(
    () => ({
      backText: t(LocalesKeys.commonBack)
    }),
    [t]
  )
}

export const useAiChatTexts = () => {
  const { t } = useTranslation()

  const examples: IMessageExamples[] = [
    { icon: '🗂️', message: t(LocalesKeys.aiChatExampleSummarize) },
    { icon: '📝', message: t(LocalesKeys.aiChatExampleDraft) },
    { icon: '🎯', message: t(LocalesKeys.aiChatExampleExtract) },
    { icon: '🌐', message: t(LocalesKeys.aiChatExampleTranslate) },
    { icon: '⚡', message: t(LocalesKeys.aiChatExampleCondense) }
  ]

  return useMemo(
    () => ({
      aiChatPageTitleText: t(LocalesKeys.aiChatPageTitle),
      aiChatNewChatText: t(LocalesKeys.aiChatNewChat),
      aiChatPrivacyTooltipText: t(LocalesKeys.aiChatPrivacyTooltip),
      aiChatPrivacyLearnMoreText: t(LocalesKeys.aiChatPrivacyLearnMore),
      aiChatAiGeneratedText: t(LocalesKeys.aiChatAiGenerated),
      examples,
      aiChatTypeMessageText: t(LocalesKeys.aiChatTypeMessage)
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t]
  )
}
