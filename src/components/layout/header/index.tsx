import { Avatar, Box, Card, IconButton, Tooltip } from '@radix-ui/themes'
import { Moon, Sun } from 'lucide-react'

import classes from './header.module.css'

import type { IUserInfo } from '@/interfaces/auth.interfaces.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { Theme } from '@/utils/constants'

function getAvatarToolTipText(userInfo?: IUserInfo) {
  const firstName = userInfo?.firstName ? userInfo?.firstName : ''
  const lastName = userInfo?.lastName ? userInfo?.lastName : ''
  const namePart = `${firstName?.trim()} ${lastName?.trim()}`.trim()
  return namePart ? `${namePart} - ${userInfo?.email}` : userInfo?.email
}

const Header = () => {
  const { theme, updateTheme, userInfo } = useAppStore()

  const handleThemeClick = () => {
    if (theme === Theme.dark) updateTheme(Theme.light)
    if (theme === Theme.light) updateTheme(Theme.dark)
  }

  return (
    <Card className={classes.header} asChild>
      <header>
        <Tooltip content={getAvatarToolTipText(userInfo)}>
          <IconButton radius="full" size="2" variant="outline">
            <Avatar variant="soft" radius="full" size="2" fallback={userInfo?.email?.[0] || 'A'} />
          </IconButton>
        </Tooltip>
        <Box className={classes.leftItems}>
          <Tooltip content="Toggle theme">
            <IconButton ml="3" onClick={handleThemeClick} variant="outline" size="2">
              {theme === Theme.dark ? <Sun width="20" height="20" /> : <Moon width="20" height="20" />}
            </IconButton>
          </Tooltip>
        </Box>
      </header>
    </Card>
  )
}

export default Header
