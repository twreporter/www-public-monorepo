import {
  RELEASE_BRANCH,
  type ReleaseBranch,
} from '../../constants/release-branch'
import { forClientSideRendering } from '../../constants/request-origins'

export const checkReferrer = (
  referrer: string = '',
  releaseBranch: ReleaseBranch = RELEASE_BRANCH.master
) => {
  try {
    const url = new URL(referrer)
    return url.origin === forClientSideRendering[releaseBranch].main
  } catch (_err) {
    return false
  }
}
