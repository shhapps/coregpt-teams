import type { JSX, ReactNode } from 'react'

export type SnackbarSeverity = 'info' | 'success' | 'warning' | 'error'

export interface ISnackbarProps {
  open: boolean
  message?: string | JSX.Element
  severity?: SnackbarSeverity
  action?: ReactNode
}

export interface IMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface IMessageExamples {
  icon: string
  message: string
}
