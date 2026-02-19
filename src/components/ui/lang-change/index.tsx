import { Box, Button, DropdownMenu, Flex, Text, TextField } from '@radix-ui/themes'
import i18n from 'i18next'
import { Check } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import classes from './lang-change.module.css'

import { useLangChangeTexts } from '@/hooks/use-outside-translations.ts'
import { useAppStore } from '@/stores/app.store.ts'
import { AvailableLanguages } from '@/utils/constants.ts'

const languages = [
  { title: 'English', code: AvailableLanguages.en, flag: '🇺🇸' },
  { title: 'Русский', engTitle: 'Russian', code: AvailableLanguages.ru, flag: '🇷🇺' },
  { title: '简体中文', engTitle: 'Chinese', code: AvailableLanguages.zh, flag: '🇨🇳' },
  { title: 'हिन्दी', engTitle: 'Hindi', code: AvailableLanguages.hi, flag: '🇮🇳' },
  { title: 'Deutsch', engTitle: 'German', code: AvailableLanguages.de, flag: '🇩🇪' },
  { title: 'Italiano', engTitle: 'Italian', code: AvailableLanguages.it, flag: '🇮🇹' },
  { title: 'Español', engTitle: 'Spanish', code: AvailableLanguages.es, flag: '🇪🇸' },
  { title: 'Português', engTitle: 'Portuguese', code: AvailableLanguages.pt, flag: '🇧🇷' },
  { title: 'Français', engTitle: 'French', code: AvailableLanguages.fr, flag: '🇫🇷' },
  { title: 'Nederlands', engTitle: 'Dutch', code: AvailableLanguages.nl, flag: '🇳🇱' },
  { title: 'Czech', engTitle: 'Czech', code: AvailableLanguages.cs, flag: '🇨🇿' },
  { title: 'Polski', engTitle: 'Polish', code: AvailableLanguages.pl, flag: '🇵🇱' },
  { title: '日本語', engTitle: 'Japanese', code: AvailableLanguages.ja, flag: '🇯🇵' },
  { title: '한국어', engTitle: 'Korean', code: AvailableLanguages.ko, flag: '🇰🇷' },
  { title: 'Türkçe', engTitle: 'Turkish', code: AvailableLanguages.tr, flag: '🇹🇷' },
  { title: 'Tiếng Việt', engTitle: 'Vietnamese', code: AvailableLanguages.vi, flag: '🇻🇳' },
  { title: 'العربية', engTitle: 'Arabic', code: AvailableLanguages.ar, flag: '🇸🇦' },
  { title: 'ไทย', engTitle: 'Thai', code: AvailableLanguages.th, flag: '🇹🇭' },
  { title: 'Bahasa Indonesia', engTitle: 'Indonesian', code: AvailableLanguages.id, flag: '🇮🇩' },
  { title: 'עברית', engTitle: 'Hebrew', code: AvailableLanguages.he, flag: '🇮🇱' },
  { title: 'Hrvatski', engTitle: 'Croatian', code: AvailableLanguages.hr, flag: '🇭🇷' }
]

const LangChange = () => {
  const { applicationLanguage, setApplicationLanguage } = useAppStore()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const { searchLanguageText, langChangeNoLanguagesFoundText } = useLangChangeTexts()

  const filteredLanguages = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return languages
    return languages.filter(({ title, engTitle, code }) => {
      const haystack = `${title} ${engTitle ?? ''} ${code}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query, open])

  useEffect(() => {
    const el = itemRefs.current[activeIndex]
    if (el) el.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const handleLanguageSelect = useCallback(
    async (languageCode: AvailableLanguages, title: string) => {
      setApplicationLanguage(title)
      setOpen(false)
      await i18n.changeLanguage(languageCode)
    },
    [setApplicationLanguage]
  )

  useEffect(() => {
    const defaultLanguage =
      i18n.language === 'en-US'
        ? languages[0].title
        : (languages.find(({ code }) => code === i18n.language)?.title as string)
    setApplicationLanguage(defaultLanguage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DropdownMenu.Root
      open={open}
      onOpenChange={nextOpen => {
        setOpen(nextOpen)
        if (nextOpen) {
          setQuery('')
          setActiveIndex(0)
        } else {
          setQuery('')
        }
      }}
    >
      <DropdownMenu.Trigger>
        <Button variant="ghost" size="1" className={classes.triggerBtn}>
          <Flex gap="1" align="center">
            <Text as="span" size="1" className={classes.triggerFlag}>
              {languages.find(l => l.title === applicationLanguage)?.flag ?? '🌐'}
            </Text>
            <Text as="span" size="1" className={classes.triggerLabel}>
              {languages.find(l => l.title === applicationLanguage)?.engTitle ?? applicationLanguage}
            </Text>
            <DropdownMenu.TriggerIcon />
          </Flex>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content className={classes.dropdownContent} align="end">
        <Box className={classes.searchWrapper}>
          <TextField.Root
            size="2"
            placeholder={searchLanguageText}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                e.stopPropagation()
                setActiveIndex(prev => Math.min(prev + 1, filteredLanguages.length - 1))
                return
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault()
                e.stopPropagation()
                setActiveIndex(prev => Math.max(prev - 1, 0))
                return
              }
              if (e.key === 'Enter') {
                e.preventDefault()
                e.stopPropagation()
                const lang = filteredLanguages[activeIndex]
                if (lang) void handleLanguageSelect(lang.code, lang.title)
                return
              }
              e.stopPropagation()
            }}
            autoFocus
            className={classes.searchField}
          />
        </Box>

        <Box className={classes.itemsScroll}>
          {filteredLanguages.length === 0 ? (
            <Box className={classes.emptyState}>
              <Text size="1" color="gray">
                {langChangeNoLanguagesFoundText}
              </Text>
            </Box>
          ) : (
            filteredLanguages.map(({ title, code, flag, engTitle }, idx) => {
              const isActive = idx === activeIndex
              const isSelected = title === applicationLanguage
              return (
                <DropdownMenu.Item
                  key={code}
                  onSelect={() => handleLanguageSelect(code, title)}
                  className={`${classes.langItem}${isActive ? ` ${classes.activeItem}` : ''}`}
                  ref={node => {
                    itemRefs.current[idx] = node
                  }}
                  onMouseEnter={() => {
                    if (activeIndex !== idx) setActiveIndex(idx)
                  }}
                >
                  <Flex align="center" gap="2" justify="between" width="100%">
                    <Flex align="center" gap="2">
                      <Text as="span" className={classes.flagCell}>
                        {flag}
                      </Text>
                      <Text size="2">
                        {title}
                        {engTitle ? (
                          <Text as="span" size="1" color="gray">
                            {' '}
                            {engTitle}
                          </Text>
                        ) : null}
                      </Text>
                    </Flex>
                    {isSelected && <Check size={13} className={classes.checkIcon} />}
                  </Flex>
                </DropdownMenu.Item>
              )
            })
          )}
        </Box>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export default LangChange
