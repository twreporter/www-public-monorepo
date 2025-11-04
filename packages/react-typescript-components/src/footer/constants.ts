// TODO: replace data from cms
import { INTERNAL_LINKS } from '../constants/internal-links'
import type { LinkTarget } from '../customized-link/type'
import { MEDIA_TYPE } from '../icons/constants'

export const FUNDRAISING_ID =
  '衛部救字第 1131363879 號｜勸募期間 2025/1/1~12/31'

const gtmId = {
  support: 'footer-support',
  newsletter: 'footer-newsletter',
}
/*
  display for links group
  | first column | second column | third column |
  | XXXX         | XXXX          | XXX          |
  | XXXXX        | XXXXXX        | XX           |
*/
export const getLinksGroups = (mainOrigin: string) => {
  return [
    // first column
    [
      {
        slug: 'about',
        text: '關於我們',
        to: `${mainOrigin}${INTERNAL_LINKS.about}`,
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'authors',
        text: '作者群',
        to: `${mainOrigin}/authors`,
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'contact',
        text: '聯絡我們',
        to: `${mainOrigin}${INTERNAL_LINKS.article}/contact-footer`,
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'join',
        text: '加入我們',
        to: `${mainOrigin}${INTERNAL_LINKS.article}/hiring-job-description`,
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'license',
        text: '常見問題',
        to: `${mainOrigin}${INTERNAL_LINKS.article}/about-us-questions`,
        target: '_blank' as LinkTarget,
      },
    ],
    // second column
    [
      {
        slug: 'donate',
        text: '捐款徵信',
        to: `${mainOrigin}${INTERNAL_LINKS.article}/credit-donate`,
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'media-center',
        text: '基金會消息',
        to: `${mainOrigin}${INTERNAL_LINKS.categories.foundation.index}`,
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'impact-and-annual-report',
        text: '影響力報告',
        to: `${mainOrigin}${INTERNAL_LINKS.article}/impact-and-annual-report`,
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'publication-and-merchandise',
        text: '出版品與周邊',
        to: 'https://twreporter.waca.ec/',
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'charity-cooperation',
        text: '公益合作',
        to: 'https://www.twreporter.org/a/cooperation',
        target: '_blank' as LinkTarget,
      },
    ],
    // third column
    [
      {
        slug: 'subscribe-email',
        text: '訂閱電子報',
        to: `${mainOrigin}${INTERNAL_LINKS.account.emailSubscription}`,
        target: '_blank' as LinkTarget,
        id: gtmId.newsletter,
      },
      {
        slug: 'subscribe-podcast',
        text: '訂閱 Podcast',
        to: 'https://solink.soundon.fm/twreporter-U7Q',
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'subscribe-RSS',
        text: '訂閱 RSS',
        to: 'https://public.twreporter.org/rss/twreporter-rss.xml',
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'install-web-app',
        text: '安裝Web App',
        to: 'https://www.twreporter.org/a/how-to-follow-the-reporter#方法3：安裝Web App',
        target: '_blank' as LinkTarget,
      },
      {
        slug: 'subscribe-telegram',
        text: '訂閱Telegram',
        to: 'https://t.me/tw_reporter_org',
        target: '_blank' as LinkTarget,
      },
    ],
  ]
}

export const getSocialMediaLinks = () => {
  return [
    {
      slug: 'facebook',
      icon: MEDIA_TYPE.facebook,
      to: 'https://www.facebook.com/twreporter/',
      target: '_blank' as LinkTarget,
    },
    {
      slug: 'instagram',
      icon: MEDIA_TYPE.instagram,
      to: 'https://www.instagram.com/twreporter/',
      target: '_blank' as LinkTarget,
    },
    {
      slug: 'x',
      icon: MEDIA_TYPE.twitter,
      to: 'https://twitter.com/tw_reporter_org',
      target: '_blank' as LinkTarget,
    },
    {
      slug: 'medium',
      icon: MEDIA_TYPE.medium,
      to: 'https://medium.com/twreporter',
      target: '_blank' as LinkTarget,
    },
    {
      slug: 'youtube',
      icon: MEDIA_TYPE.youtube,
      to: 'https://www.youtube.com/@TwreporterOrg',
      target: '_blank' as LinkTarget,
    },
    {
      slug: 'thread',
      icon: MEDIA_TYPE.threads,
      to: 'https://www.threads.com/@twreporter',
      target: '_blank' as LinkTarget,
    },
  ]
}
