import type { ValuesOf } from '../types'

export const RELEASE_BRANCH = {
  dev: 'dev',
  master: 'master',
  staging: 'staging',
  release: 'release',
  preview: 'preview',
} as const

export type ReleaseBranch = ValuesOf<typeof RELEASE_BRANCH>
