import { INTERNAL_LINKS } from '../../constants/internal-links'
import { EXTERNAL_LINKS } from '../../constants/external-links'
import type { LinkTarget } from '../../customized-link/type'

export const CHANNEL_TYPE = {
  link: 'link',
  divider: 'divider',
  dropdown: 'dropdown',
  iconLink: 'icon-link',
  lightLink: 'light-link',
} as const

export const Channels = [
  {
    type: CHANNEL_TYPE.link,
    label: '最新',
    to: INTERNAL_LINKS.latest,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.divider,
  },
  {
    type: CHANNEL_TYPE.link,
    label: '深度專題',
    to: INTERNAL_LINKS.topics,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.dropdown,
    label: '議題',
    dropdownItems: [
      {
        label: '國際兩岸',
        to: INTERNAL_LINKS.categories.world,
        target: '_self' as LinkTarget,
      },
      {
        label: '人權司法',
        to: INTERNAL_LINKS.categories.humanRights,
        target: '_self' as LinkTarget,
      },
      {
        label: '政治社會',
        to: INTERNAL_LINKS.categories.politicsAndSociety,
        target: '_self' as LinkTarget,
      },
      {
        label: '醫療健康',
        to: INTERNAL_LINKS.categories.health,
        target: '_self' as LinkTarget,
      },
      {
        label: '環境永續',
        to: INTERNAL_LINKS.categories.environment,
        target: '_self' as LinkTarget,
      },
      {
        label: '經濟產業',
        to: INTERNAL_LINKS.categories.econ,
        target: '_self' as LinkTarget,
      },
      {
        label: '文化生活',
        to: INTERNAL_LINKS.categories.culture,
        target: '_self' as LinkTarget,
      },
      {
        label: '教育校園',
        to: INTERNAL_LINKS.categories.education,
        target: '_self' as LinkTarget,
      },
    ],
  },
  {
    type: CHANNEL_TYPE.dropdown,
    label: '評論',
    dropdownItems: [
      {
        label: '書摘與書評',
        to: INTERNAL_LINKS.categories.opinion.bookReview,
        target: '_self' as LinkTarget,
      },
      {
        label: '讀者投書',
        to: INTERNAL_LINKS.categories.opinion.letter,
        target: '_self' as LinkTarget,
      },
      {
        label: '全部',
        to: INTERNAL_LINKS.categories.opinion.index,
        target: '_self' as LinkTarget,
      },
    ],
  },
  {
    type: CHANNEL_TYPE.link,
    label: '人物故事',
    to: INTERNAL_LINKS.humanStory,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.divider,
  },
  {
    type: CHANNEL_TYPE.link,
    label: '影像',
    to: INTERNAL_LINKS.photography,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.dropdown,
    label: 'Podcast',
    dropdownItems: [
      {
        label: '關於報導者 Podcast',
        to: INTERNAL_LINKS.podcast.aboutPodcast,
        target: '_self' as LinkTarget,
      },
      {
        label: 'The Real Story',
        to: INTERNAL_LINKS.categories.podcast.theRealStory,
        target: '_self' as LinkTarget,
      },
      {
        label: 'On the Ground 路邊攤計劃',
        to: INTERNAL_LINKS.categories.podcast.onTheGround,
        target: '_self' as LinkTarget,
      },
    ],
  },
  {
    type: CHANNEL_TYPE.link,
    label: '少年報導者',
    to: EXTERNAL_LINKS.kidsReporter,
    target: '_blank' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.link,
    label: '報導者觀測站',
    to: EXTERNAL_LINKS.lawmaker,
    target: '_blank' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.link,
    label: '數位敘事',
    to: INTERNAL_LINKS.infographic,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.divider,
  },
  {
    type: CHANNEL_TYPE.iconLink,
    label: '個人專區',
    icon: 'member',
    to: INTERNAL_LINKS.account.index,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.iconLink,
    label: '我的閱讀',
    icon: 'kid_star',
    to: INTERNAL_LINKS.myReading.index,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.iconLink,
    label: '已收藏',
    icon: 'bookmark_basic',
    to: INTERNAL_LINKS.myReading.savedBookmarks,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.iconLink,
    label: '造訪紀錄',
    icon: 'history',
    to: INTERNAL_LINKS.myReading.browsingHistory,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.divider,
  },
  {
    type: CHANNEL_TYPE.lightLink,
    label: '基金會消息',
    to: INTERNAL_LINKS.categories.foundation.index,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.lightLink,
    label: '關於我們',
    to: INTERNAL_LINKS.about,
    target: '_blank' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.lightLink,
    label: '影響力報告',
    to: INTERNAL_LINKS.influenceReport,
    target: '_self' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.lightLink,
    label: '報導者開放實驗室',
    to: EXTERNAL_LINKS.openLab,
    target: '_blank' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.lightLink,
    label: '出版品與周邊',
    to: EXTERNAL_LINKS.publicationAndMerchandise,
    target: '_blank' as LinkTarget,
  },
  {
    type: CHANNEL_TYPE.divider,
  },
]
