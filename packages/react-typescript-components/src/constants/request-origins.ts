import { RELEASE_BRANCH } from './release-branch'

const forServerSideRendering = {
  [RELEASE_BRANCH.master]: {
    accounts: 'http://localhost:3001',
    api: 'http://localhost:8080',
    main: 'http://localhost:3000',
    support: 'http://localhost:3001',
  },
  [RELEASE_BRANCH.staging]: {
    accounts: 'https://staging-accounts.twreporter.org',
    api: 'https://staging-go-api.twreporter.org',
    main: 'https://staging.twreporter.org',
    support: 'https://staging-support.twreporter.org',
  },
  [RELEASE_BRANCH.preview]: {
    accounts: 'https://accounts.twreporter.org',
    api: 'https://go-api.twreporter.org',
    main: 'https://www.twreporter.org',
    support: 'https://support.twreporter.org',
  },
  [RELEASE_BRANCH.release]: {
    accounts: 'https://accounts.twreporter.org',
    api: 'https://go-api.twreporter.org',
    main: 'https://www.twreporter.org',
    support: 'https://support.twreporter.org',
  },
  [RELEASE_BRANCH.dev]: {
    accounts: 'https://dev-accounts.twreporter.org',
    api: 'https://staging-go-api.twreporter.org',
    main: 'https://dev.twreporter.org',
    support: 'https://dev-support.twreporter.org',
  },
}

const forClientSideRendering = {
  [RELEASE_BRANCH.master]: forServerSideRendering[RELEASE_BRANCH.master],
  [RELEASE_BRANCH.staging]: forServerSideRendering[RELEASE_BRANCH.staging],
  [RELEASE_BRANCH.preview]: forServerSideRendering[RELEASE_BRANCH.preview],
  [RELEASE_BRANCH.release]: forServerSideRendering[RELEASE_BRANCH.release],
  [RELEASE_BRANCH.dev]: forServerSideRendering[RELEASE_BRANCH.dev],
}

export { forClientSideRendering, forServerSideRendering }
