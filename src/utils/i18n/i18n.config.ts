import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import ar from '../../locales/ar.json'
import cs from '../../locales/cs.json'
import de from '../../locales/de.json'
import en from '../../locales/en.json'
import es from '../../locales/es.json'
import fr from '../../locales/fr.json'
import he from '../../locales/he.json'
import hi from '../../locales/hi.json'
import hr from '../../locales/hr.json'
import id from '../../locales/id.json'
import it from '../../locales/it.json'
import ja from '../../locales/ja.json'
import ko from '../../locales/ko.json'
import nl from '../../locales/nl.json'
import pl from '../../locales/pl.json'
import pt from '../../locales/pt.json'
import ru from '../../locales/ru.json'
import th from '../../locales/th.json'
import tr from '../../locales/tr.json'
import vi from '../../locales/vi.json'
import zh from '../../locales/zh.json'

import { APP_LAUNCH_MODE, AvailableLanguages, MODE } from '@/utils/constants.ts'

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  // want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: AvailableLanguages.en,
    debug: MODE !== APP_LAUNCH_MODE.production,
    resources: {
      [AvailableLanguages.en]: { translation: en },
      [AvailableLanguages.ru]: { translation: ru },
      [AvailableLanguages.zh]: { translation: zh },
      [AvailableLanguages.hi]: { translation: hi },
      [AvailableLanguages.de]: { translation: de },
      [AvailableLanguages.it]: { translation: it },
      [AvailableLanguages.es]: { translation: es },
      [AvailableLanguages.pt]: { translation: pt },
      [AvailableLanguages.fr]: { translation: fr },
      [AvailableLanguages.nl]: { translation: nl },
      [AvailableLanguages.cs]: { translation: cs },
      [AvailableLanguages.pl]: { translation: pl },
      [AvailableLanguages.ja]: { translation: ja },
      [AvailableLanguages.ko]: { translation: ko },
      [AvailableLanguages.tr]: { translation: tr },
      [AvailableLanguages.vi]: { translation: vi },
      [AvailableLanguages.ar]: { translation: ar },
      [AvailableLanguages.th]: { translation: th },
      [AvailableLanguages.id]: { translation: id },
      [AvailableLanguages.he]: { translation: he },
      [AvailableLanguages.hr]: { translation: hr }
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  })
  .catch(err => console.error('Error while initializing i18n: ', err))

export default i18n
