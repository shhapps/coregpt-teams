import { Avatar, Box, Button, Flex, IconButton, Link, Separator, Text, Tooltip } from '@radix-ui/themes'
import {
  ChevronDown,
  FileText,
  HelpCircle,
  House,
  LayoutGrid,
  Lightbulb,
  Mail,
  Menu,
  MessageCircleMore,
  PanelLeftClose,
  Settings,
  ShieldCheck
} from 'lucide-react'
import { useState } from 'react'
import React from 'react'

import { Drawer } from './base-drawer'
import classes from './drawer.module.css'

import { useFeaturebase } from '@/hooks/use-featurebase.ts'
import { useDrawerTexts, useToolTipTexts } from '@/hooks/use-outside-translations.ts'
import type { IUserInfo } from '@/interfaces/auth.interfaces.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { AppNames, baseAppName, ExternalLinks, MainContent } from '@/utils/constants.ts'
import { LogoImage, OutlookLogo, ExcelLogo, GoogleLogo, WordLogo } from '@/utils/global/files.ts'

function getAvatarToolTipText(userInfo?: IUserInfo) {
  const firstName = userInfo?.firstName ? userInfo?.firstName : ''
  const lastName = userInfo?.lastName ? userInfo?.lastName : ''
  const namePart = `${firstName?.trim()} ${lastName?.trim()}`.trim()
  return namePart ? `${namePart} - ${userInfo?.email}` : userInfo?.email
}

const moreApps = [
  {
    name: AppNames.outlook,
    logoSrc: OutlookLogo,
    href: ExternalLinks.outlookOverviewPage
  },
  {
    name: AppNames.excel,
    logoSrc: ExcelLogo,
    href: ExternalLinks.excelOverviewPage
  },
  {
    name: AppNames.word,
    logoSrc: WordLogo,
    href: ExternalLinks.wordOverviewPage
  },
  {
    name: AppNames.googleWorkspace,
    logoSrc: GoogleLogo,
    href: ExternalLinks.googleWorkspaceReviewPage
  }
]

const Index = () => {
  const { drawerOpen, setDrawerOpen, setMainContent, mainContent, userInfo } = useAppStore()
  const [moreAppsOpen, setMoreAppsOpen] = useState(false)
  const { showWidget } = useFeaturebase()
  const { homeText, settingsText } = useToolTipTexts()
  const {
    drawerSupportText,
    drawerSuggestFeatureText,
    drawerContactUsText,
    drawerHelpText,
    drawerPrivacyPolicyText,
    drawerTermsOfUseText,
    drawerMoreAppsText
  } = useDrawerTexts()

  const handleMainContentClick = (event: React.MouseEvent, mainContent: MainContent) => {
    event.preventDefault()
    setDrawerOpen(false)
    setTimeout(() => setMainContent(mainContent), 0)
  }

  const handleSupportClick = (event: React.MouseEvent) => {
    event.preventDefault()
    setDrawerOpen(false)
    setTimeout(() => showWidget(), 0)
  }

  return (
    <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
      <Drawer.Trigger asChild>
        <IconButton className={classes.menuIcon} variant="ghost">
          <Menu width={24} height={24} />
        </IconButton>
      </Drawer.Trigger>
      <Drawer.Content className={classes.drawerContent} origin="left" size="75%" visible={drawerOpen}>
        <Flex direction="column" className={classes.drawerWrapper}>
          <Flex align="center" justify="between" className={classes.drawerHeader}>
            <Flex align="center" gap="4">
              <Link target="_blank" href={ExternalLinks.coregptAppsMainPage}>
                <IconButton radius="full" size="1" variant="outline">
                  <Avatar
                    variant="soft"
                    radius="full"
                    size="1"
                    fallback={<img className={classes.logoImage} src={LogoImage} alt="logo" />}
                  />
                </IconButton>
                <Drawer.Title asChild>
                  <Text size="4" className={classes.drawerTitle} weight="medium">
                    {baseAppName}
                  </Text>
                </Drawer.Title>
              </Link>
            </Flex>
            <Drawer.Close asChild>
              <IconButton className={classes.closeBtn}>
                <Tooltip content="X">
                  <PanelLeftClose className={classes.closeIcon} width={22} height={22} />
                </Tooltip>
              </IconButton>
            </Drawer.Close>
          </Flex>
          <Separator size="4" />
          <Drawer.Description />
          <Box mb="-4" className={classes.mainContent}>
            <Flex maxWidth="100%" gap="3" direction="column">
              <Link
                className={`${classes.drawerNavLink} ${
                  mainContent === MainContent.appTabs ? classes.drawerNavLinkActive : ''
                }`}
                onClick={e => handleMainContentClick(e, MainContent.appTabs)}
                size="5"
                href="#"
                truncate
              >
                <Flex align="center" gap="2">
                  <House className={classes.drawerNavIcon} width={18} height={18} />
                  <Text as="span">{homeText}</Text>
                </Flex>
              </Link>
              <Link
                className={`${classes.drawerNavLink} ${
                  mainContent === MainContent.settings ? classes.drawerNavLinkActive : ''
                }`}
                onClick={e => handleMainContentClick(e, MainContent.settings)}
                size="5"
                href="#"
                truncate
              >
                <Flex align="center" gap="2">
                  <Settings className={classes.drawerNavIcon} width={18} height={18} />
                  <Text as="span">{settingsText}</Text>
                </Flex>
              </Link>
              <Link onClick={handleSupportClick} className={classes.drawerNavLink} size="5" href="#" truncate>
                <Flex align="center" gap="2">
                  <MessageCircleMore className={classes.drawerNavIcon} width={18} height={18} />
                  <Text as="span">{drawerSupportText}</Text>
                </Flex>
              </Link>
              <Link
                onClick={() => setDrawerOpen(false)}
                className={classes.drawerNavLink}
                size="5"
                href={ExternalLinks.suggestFeatureLink}
                truncate
                target="_blank"
              >
                <Flex align="center" gap="2">
                  <Lightbulb className={classes.drawerNavIcon} width={18} height={18} />
                  <Text as="span">{drawerSuggestFeatureText}</Text>
                </Flex>
              </Link>
              <Link
                onClick={() => setDrawerOpen(false)}
                className={classes.drawerNavLink}
                size="5"
                href={ExternalLinks.contactUs}
                truncate
                target="_blank"
              >
                <Flex align="center" gap="2">
                  <Mail className={classes.drawerNavIcon} width={18} height={18} />
                  <Text as="span">{drawerContactUsText}</Text>
                </Flex>
              </Link>
              <Link
                onClick={() => setDrawerOpen(false)}
                className={classes.drawerNavLink}
                size="5"
                href={ExternalLinks.helpLink}
                truncate
                target="_blank"
              >
                <Flex align="center" gap="2">
                  <HelpCircle className={classes.drawerNavIcon} width={18} height={18} />
                  <Text as="span">{drawerHelpText}</Text>
                </Flex>
              </Link>
              <Link
                onClick={() => setDrawerOpen(false)}
                className={classes.drawerNavLink}
                size="5"
                href={ExternalLinks.privacyPolicy}
                truncate
                target="_blank"
              >
                <Flex align="center" gap="2">
                  <ShieldCheck className={classes.drawerNavIcon} width={18} height={18} />
                  <Text as="span">{drawerPrivacyPolicyText}</Text>
                </Flex>
              </Link>
              <Link
                onClick={() => setDrawerOpen(false)}
                className={classes.drawerNavLink}
                size="5"
                href={ExternalLinks.termsOfUse}
                truncate
                target="_blank"
              >
                <Flex align="center" gap="2">
                  <FileText className={classes.drawerNavIcon} width={18} height={18} />
                  <Text as="span">{drawerTermsOfUseText}</Text>
                </Flex>
              </Link>

              <Box className={classes.moreAppsSection}>
                <Separator size="4" className={classes.moreAppsSeparator} />
                <Button
                  className={classes.moreAppsTrigger}
                  onClick={() => setMoreAppsOpen((prev: boolean) => !prev)}
                  aria-expanded={moreAppsOpen}
                >
                  <Text as="span" className={classes.moreAppsTriggerLeft}>
                    <LayoutGrid className={classes.moreAppsTriggerIcon} width={18} height={18} />
                    <Text className={classes.moreAppsTitle}>{drawerMoreAppsText}</Text>
                  </Text>
                  <ChevronDown
                    width={16}
                    height={16}
                    className={`${classes.moreAppsChevron} ${moreAppsOpen ? classes.moreAppsChevronOpen : ''}`}
                  />
                </Button>
                <Box className={`${classes.moreAppsList} ${moreAppsOpen ? classes.moreAppsListOpen : ''}`}>
                  {moreApps.map(app => (
                    <Tooltip key={app.name} content={app.name} delayDuration={1000}>
                      <Link
                        href={app.href}
                        target="_blank"
                        onClick={() => setDrawerOpen(false)}
                        className={classes.moreAppRow}
                      >
                        <Box className={classes.moreAppIconWrap}>
                          <img src={app.logoSrc} alt={app.name} className={classes.moreAppIcon} />
                        </Box>
                        <Text className={classes.moreAppName} truncate>
                          {app.name}
                        </Text>
                      </Link>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </Flex>
          </Box>
          <Box className={classes.userInfo}>
            <Separator size="4" mb="3" />
            <Flex className={classes.userInfoBlock}>
              <Flex className={classes.avatar}>
                <Avatar variant="solid" radius="full" size="1" fallback={userInfo?.email?.[0] || 'A'} />
              </Flex>
              <Flex>
                <Tooltip content={getAvatarToolTipText(userInfo)}>
                  <Text className={classes.userEmail} truncate>
                    {userInfo?.email}
                  </Text>
                </Tooltip>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Drawer.Content>
    </Drawer.Root>
  )
}
export default Index
