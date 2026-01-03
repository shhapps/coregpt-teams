import { Avatar, Box, Flex, IconButton, Link, Separator, Text, Tooltip } from '@radix-ui/themes'
import {
  FileText,
  House,
  Menu,
  Mail,
  PanelLeftClose,
  ShieldCheck,
  MessageCircleMore,
  Lightbulb,
  Settings
} from 'lucide-react'

import { Drawer } from './base-drawer'
import classes from './drawer.module.css'

import { useFeaturebase } from '@/hooks/useFeaturebase.ts'
import { useDrawerTexts, useToolTipTexts } from '@/hooks/useOutsideTranslations.ts'
import type { IUserInfo } from '@/interfaces/auth.interfaces.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { baseAppName, ExternalLinks, MainContent } from '@/utils/constants.ts'
import { LogoImage } from '@/utils/global/files.ts'

function getAvatarToolTipText(userInfo?: IUserInfo) {
  const firstName = userInfo?.firstName ? userInfo?.firstName : ''
  const lastName = userInfo?.lastName ? userInfo?.lastName : ''
  const namePart = `${firstName?.trim()} ${lastName?.trim()}`.trim()
  return namePart ? `${namePart} - ${userInfo?.email}` : userInfo?.email
}

const Index = () => {
  const { drawerOpen, setDrawerOpen, setMainContent, mainContent, userInfo } = useAppStore()
  const { showWidget } = useFeaturebase()
  const { homeText, settingsText } = useToolTipTexts()
  const {
    drawerSupportText,
    drawerSuggestFeatureText,
    drawerContactUsText,
    drawerPrivacyPolicyText,
    drawerTermsOfUseText
  } = useDrawerTexts()

  const handleMainContentClick = (mainContent: MainContent) => {
    setDrawerOpen(false)
    setMainContent(mainContent)
  }

  const handleSupportClick = () => {
    setDrawerOpen(false)
    showWidget()
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
                onClick={() => handleMainContentClick(MainContent.appTabs)}
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
                onClick={() => handleMainContentClick(MainContent.settings)}
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
