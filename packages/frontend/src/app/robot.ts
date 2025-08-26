import type { MetadataRoute } from 'next'

const releaseBranch = process.env.NEXT_PUBLIC_RELEASE_BRANCH

export default function robots(): MetadataRoute.Robots {
  // todo: add sitemap entry
  if (releaseBranch === 'release') {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
        disallow: '/private/',
      },
    }
  }
  // staging/dev: disallow all (noindex)
  return {
    rules: {
      userAgent: '*',
      disallow: '/',
    },
  }
}
