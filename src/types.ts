import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface BaseUser {
  email: string
  lastVisit: number
}

export interface SessionConfession {
  title: string
  createdAt: number
  anonymous?: Record<string, Record<string, string>>
  data?: Record<string, Record<string, string>>
}

export interface Action {
  value: string
  anonymous: boolean
  uid?: string
  votes?: Record<string, 'like' | 'nope'>
}
