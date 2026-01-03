import { Box, Flex, Link } from '@radix-ui/themes'
import { ArrowLeft } from 'lucide-react'

import classes from './back-btn.module.css'

import { useCommonTexts } from '@/hooks/useOutsideTranslations.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { MainContent } from '@/utils/constants.ts'

const Index = () => {
  const { setMainContent } = useAppStore()
  const { backText } = useCommonTexts()
  return (
    <Box>
      <Link className={classes.link} asChild href="#" onClick={() => setMainContent(MainContent.appTabs)}>
        <Flex gap="2">
          {' '}
          <ArrowLeft /> {backText}{' '}
        </Flex>
      </Link>
    </Box>
  )
}

export default Index
