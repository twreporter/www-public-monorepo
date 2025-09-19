export const CHANNEL_TYPE = {
  link: 'link',
  divider: 'divider',
  dropdown: 'dropdown',
  iconLink: 'icon-link',
  lightLink: 'light-link',
} as const

// TODO: make sure the links are correct
export const Channels = [
  {
    type: CHANNEL_TYPE.link,
    label: '最新',
    to: 'latest',
    target: '_self',
  },
  {
    type: CHANNEL_TYPE.divider,
  },
  {
    type: CHANNEL_TYPE.link,
    label: '深度專題',
    to: 'topics',
    target: '_self',
  },
  {
    type: CHANNEL_TYPE.dropdown,
    label: '議題',
    dropdownItems: [
      {
        label: '國際兩岸',
        to: 'categories/world',
        target: '_self',
      },
      {
        label: '人權司法',
        to: 'categories/humanrights',
        target: '_self',
      },
      {
        label: '政治社會',
        to: 'categories/politics-and-society',
        target: '_self',
      },
      {
        label: '醫療健康',
        to: 'categories/health',
        target: '_self',
      },
      {
        label: '環境永續',
        to: 'categories/environment',
        target: '_self',
      },
      {
        label: '經濟產業',
        to: 'categories/econ',
        target: '_self',
      },
      {
        label: '文化生活',
        to: 'categories/culture',
        target: '_self',
      },
      {
        label: '教育校園',
        to: 'categories/education',
        target: '_self',
      },
    ],
  },
  {
    type: CHANNEL_TYPE.dropdown,
    label: '評論',
    dropdownItems: [
      {
        label: '書摘與書評',
        to: '',
        target: '_self',
      },
      {
        label: '讀者投書',
        to: '',
        target: '_self',
      },
      {
        label: '全部',
        to: '',
        target: '_self',
      },
    ],
  },
  {
    type: CHANNEL_TYPE.link,
    label: '人物故事',
    to: '',
    target: '_self',
  },
  {
    type: CHANNEL_TYPE.divider,
  },
  {
    type: CHANNEL_TYPE.link,
    label: '影像',
    to: '',
    target: '_self',
  },
  {
    type: CHANNEL_TYPE.dropdown,
    label: 'Podcast',
    dropdownItems: [
      {
        label: '關於報導者 Podcast',
        to: '',
        target: '_self',
      },
      {
        label: 'The Real Story',
        to: '',
        target: '_self',
      },
      {
        label: 'On the Ground 路邊攤計劃',
        to: '',
        target: '_self',
      },
    ],
  },
  {
    type: CHANNEL_TYPE.link,
    label: '少年報導者',
    to: '',
    target: '_self',
  },
  {
    type: CHANNEL_TYPE.link,
    label: '報導者觀測站',
    to: '',
    target: '_self',
  },
  {
    type: CHANNEL_TYPE.link,
    label: '數位敘事',
    to: '',
    target: '_self',
  },
  {
    type: CHANNEL_TYPE.divider,
  },
  {
    type: CHANNEL_TYPE.iconLink,
    label: '個人專區',
    icon: 'member',
    to: '',
    target: '',
  },
  {
    type: CHANNEL_TYPE.iconLink,
    label: '我的閱讀',
    icon: 'kid_star',
    to: '',
    target: '',
  },
  {
    type: CHANNEL_TYPE.iconLink,
    label: '已收藏',
    icon: 'bookmark_basic',
    to: '',
    target: '',
  },
  {
    type: CHANNEL_TYPE.iconLink,
    label: '造訪紀錄',
    icon: 'history',
    to: '',
    target: '',
  },
  {
    type: CHANNEL_TYPE.divider,
  },
  {
    type: CHANNEL_TYPE.lightLink,
    label: '基金會消息',
    to: '',
    target: '',
  },
  {
    type: CHANNEL_TYPE.lightLink,
    label: '關於我們',
    to: '',
    target: '',
  },
  {
    type: CHANNEL_TYPE.lightLink,
    label: '影響力報告',
    to: '',
    target: '',
  },
  {
    type: CHANNEL_TYPE.lightLink,
    label: '報導者開放實驗室',
    to: '',
    target: '',
  },
  {
    type: CHANNEL_TYPE.lightLink,
    label: '出版品與周邊',
    to: '',
    target: '',
  },
  {
    type: CHANNEL_TYPE.divider,
  },
]
