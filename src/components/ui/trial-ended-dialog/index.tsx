import { Box, Button, Dialog, Flex, Link, Text } from '@radix-ui/themes'
import { useEffect, useRef, useState } from 'react'
import { Trans } from 'react-i18next'

import classes from './trial-ended-dialog.module.css'

import { useTrialEndedDialogTexts } from '@/hooks/useOutsideTranslations.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { ExternalLinks, LocalStorageKeys } from '@/utils/constants.ts'

const Index = () => {
  const { trialEndedDialogOpen, setTrialEndedDialogOpen, userInfo } = useAppStore()
  const { trialEndedDialogTitleText, trialEndedDialogLeaveReviewCtaText, trialEndedDialogSubtitleKey } =
    useTrialEndedDialogTexts()

  const [reviewInProgress, setReviewInProgress] = useState(false)

  const unlockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const getUserScopedLocalStorageKey = (key: LocalStorageKeys) => {
    const userScopedId = userInfo?.email || localStorage.getItem(LocalStorageKeys.requestId) || 'anon'
    return `${key}:${userScopedId}`
  }

  const cancelUnlock = () => {
    if (unlockTimeoutRef.current) {
      clearTimeout(unlockTimeoutRef.current)
      unlockTimeoutRef.current = null
    }
    localStorage.removeItem(getUserScopedLocalStorageKey(LocalStorageKeys.reviewCooldownUntil))
    setReviewInProgress(false)
  }

  const applyUnlock = () => {
    localStorage.setItem(getUserScopedLocalStorageKey(LocalStorageKeys.questionsCount), '0')
    localStorage.setItem(getUserScopedLocalStorageKey(LocalStorageKeys.limitBypassed), '1')
    cancelUnlock()
    setTrialEndedDialogOpen(false)
  }

  const handleLeaveReview = () => {
    if (reviewInProgress) return
    const unlockAt = Date.now() + 30_000
    localStorage.setItem(getUserScopedLocalStorageKey(LocalStorageKeys.reviewCooldownUntil), String(unlockAt))
    setReviewInProgress(true)

    if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current)
    unlockTimeoutRef.current = setTimeout(() => {
      if (trialEndedDialogOpen) applyUnlock()
    }, 30_000)
  }

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) cancelUnlock()
    setTrialEndedDialogOpen(open)
  }

  useEffect(() => {
    if (!trialEndedDialogOpen) return

    const unlockAtRaw = localStorage.getItem(getUserScopedLocalStorageKey(LocalStorageKeys.reviewCooldownUntil))
    const unlockAt = Number(unlockAtRaw || '0')
    if (!unlockAt) return

    setReviewInProgress(true)

    const remainingMs = unlockAt - Date.now()
    if (remainingMs <= 0) {
      applyUnlock()
      return
    }

    if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current)
    unlockTimeoutRef.current = setTimeout(() => {
      if (trialEndedDialogOpen) applyUnlock()
    }, remainingMs)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trialEndedDialogOpen])

  useEffect(() => {
    if (!trialEndedDialogOpen) setReviewInProgress(false)
  }, [trialEndedDialogOpen])

  useEffect(() => {
    return () => {
      if (unlockTimeoutRef.current) clearTimeout(unlockTimeoutRef.current)
    }
  }, [])

  return (
    <Dialog.Root open={trialEndedDialogOpen} onOpenChange={handleDialogOpenChange}>
      <Dialog.Content maxWidth="420px" className={classes.content}>
        <Dialog.Close className={classes.closeBtn} aria-label="Close">
          <Text className={classes.closeIcon} as="span">
            ×
          </Text>
        </Dialog.Close>

        <Box className={classes.banner}>
          <Box className={classes.bannerIcon} aria-hidden>
            💡
          </Box>
          <Dialog.Title className={classes.title}>{trialEndedDialogTitleText}</Dialog.Title>
          <Dialog.Description className={classes.subtitle}>
            <Trans i18nKey={trialEndedDialogSubtitleKey} components={{ b: <b /> }} />
          </Dialog.Description>
        </Box>

        <Box className={classes.body}>
          <Flex direction="column" gap="2" className={classes.actions}>
            <Link href={ExternalLinks.appReviewPage} onClick={handleLeaveReview} target="_blank">
              <Button size="2" className={classes.primaryCta} loading={reviewInProgress} disabled={reviewInProgress}>
                {trialEndedDialogLeaveReviewCtaText}
              </Button>
            </Link>
          </Flex>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export default Index
