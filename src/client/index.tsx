import type { JSX } from 'react'
import { createRoot } from 'react-dom/client'

import TeamsTabApp from '@/components/teams-tab-app'
import { initSentry } from '@/utils/sentry.ts'

import '@/styles/global.css'

initSentry()

const render = (Component: () => JSX.Element) => {
  const mainContainerId = 'app'
  // Clear the existing HTML content
  document.body.innerHTML = `<div id="${mainContainerId}"></div>`
  const root = createRoot(document.getElementById(mainContainerId) as HTMLElement)
  root.render(<Component />)
}

render(TeamsTabApp)
