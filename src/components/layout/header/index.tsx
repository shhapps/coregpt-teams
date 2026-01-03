import { Button, Card, Flex, IconButton, Link, Tooltip, Text } from '@radix-ui/themes'
import { Lightbulb, Settings } from 'lucide-react'

import classes from './header.module.css'

import Drawer from '@/components/ui/drawer'
import { useDrawerTexts, useToolTipTexts } from '@/hooks/useOutsideTranslations.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { ExternalLinks, MainContent } from '@/utils/constants.ts'

const Header = () => {
  const { mainContent, setMainContent } = useAppStore()
  const { settingsText } = useToolTipTexts()
  const { drawerSuggestFeatureText } = useDrawerTexts()
  return (
    <Card className={classes.header} asChild>
      <header>
        <Drawer />
        <Flex align="center" gap="2">
          {mainContent !== MainContent.settings && (
            <Tooltip content={settingsText}>
              <IconButton
                onClick={() => setMainContent(MainContent.settings)}
                className={classes.btn}
                variant="outline"
                size="1"
              >
                <Settings width={18} height={18} />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip content={drawerSuggestFeatureText}>
            <Link href={ExternalLinks.suggestFeatureLink} target="_blank">
              <Flex align="center" gap="1">
                <Button variant="classic" size="1">
                  <Lightbulb width={15} height={15} />
                  <Text size="2">{drawerSuggestFeatureText}</Text>
                </Button>
              </Flex>
            </Link>
          </Tooltip>
        </Flex>
      </header>
    </Card>
  )
}

export default Header
