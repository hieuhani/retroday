import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export interface BaseUser {
  email: string
  lastVisit: number
}

export interface SessionConfession {
  title: string
  createdAt: number
}
