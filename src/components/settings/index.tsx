import { Box, Flex, Link, Separator, Switch, Text } from '@radix-ui/themes'
import { Globe, Lightbulb, Moon } from 'lucide-react'

import classes from './settings.module.css'

import BackBtn from '@/components/ui/back-btn'
import LangChange from '@/components/ui/lang-change'
import { useDrawerTexts, useSettingsTexts, useToolTipTexts } from '@/hooks/useOutsideTranslations.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { ExternalLinks, Theme } from '@/utils/constants.ts'

const Index = () => {
  const { applicationLanguageText, toggleThemeText } = useToolTipTexts()
  const { settingsTitleText } = useSettingsTexts()
  const { drawerSuggestFeatureText } = useDrawerTexts()
  const { theme, updateTheme } = useAppStore()

  return (
    <Box className={classes.wrapper}>
      <Flex direction="column" gap="1" className={classes.pageHeader}>
        <Text size="6" weight="bold">
          {settingsTitleText}
        </Text>
      </Flex>

      <Box className={classes.list}>
        <Box className={classes.categoryDivider} />

        <Flex align="center" justify="between" className={classes.row}>
          <Flex align="center" gap="2" className={classes.leftCell}>
            <Globe width="16" height="16" className={classes.leftIcon} />
            <Text size="2" weight="bold">
              {applicationLanguageText}
            </Text>
          </Flex>
          <Box className={classes.rightCell}>
            <LangChange />
          </Box>
        </Flex>

        <Separator size="4" />

        <Box className={classes.categoryDivider} />

        <Flex align="center" justify="between" className={classes.row}>
          <Flex align="center" gap="2" className={classes.leftCell}>
            <Moon width="16" height="16" className={classes.leftIcon} />
            <Text size="2" weight="bold">
              {toggleThemeText}
            </Text>
          </Flex>
          <Flex align="center" className={classes.rightCell} aria-label={toggleThemeText}>
            <Switch
              checked={theme === Theme.dark}
              onCheckedChange={checked => updateTheme(checked ? Theme.dark : Theme.light)}
              aria-label={toggleThemeText}
            />
          </Flex>
        </Flex>

        <Separator size="4" />

        <Box className={classes.categoryDivider} />

        <Link className={classes.rowLink} href={ExternalLinks.suggestFeatureLink} target="_blank" rel="noreferrer">
          <Flex align="center" justify="between" className={classes.row}>
            <Flex align="center" gap="2" className={classes.leftCell}>
              <Lightbulb width="16" height="16" className={classes.leftIcon} />
              <Text size="2" weight="bold">
                {drawerSuggestFeatureText}
              </Text>
            </Flex>
          </Flex>
        </Link>
      </Box>
      <Flex justify="center" align="center" mt="4">
        <BackBtn />
      </Flex>
    </Box>
  )
}

export default Index
