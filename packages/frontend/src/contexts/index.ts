import { createContext } from 'react'
// @twreporter
import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '@twreporter/react-typescript-components/lib/constants/release-branch'

type BaseContextType = {
  releaseBranch: ReleaseBranch
}

// TODO: get from env
export const BaseContext = createContext<BaseContextType>({
  releaseBranch: RELEASE_BRANCH.dev,
})
