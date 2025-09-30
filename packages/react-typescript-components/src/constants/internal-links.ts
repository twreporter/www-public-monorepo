const accountBase = '/account'
const myReadingBase = '/myreading'
const categoriesBase = '/categories'
const articlesBase = '/a'

export const INTERNAL_LINKS = {
  home: '/',
  latest: '/latest',
  topics: '/topics',
  search: '/search',
  about: '/about-us',
  article: articlesBase,
  account: {
    index: accountBase,
    donationHistoryPage: `${accountBase}/donation-history`,
    emailSubscription: `${accountBase}/email-subscription`,
    exclusiveOffers: `${accountBase}/exclusive-offers`,
  },
  myReading: {
    index: myReadingBase,
    savedBookmarks: `${myReadingBase}/saved`,
    browsingHistory: `${myReadingBase}/history`,
  },
  categories: {
    world: `${categoriesBase}/world`,
    humanRights: `${categoriesBase}/humanrights`,
    politicsAndSociety: `${categoriesBase}/politics-and-society`,
    health: `${categoriesBase}/health`,
    environment: `${categoriesBase}/environment`,
    econ: `${categoriesBase}/econ`,
    culture: `${categoriesBase}/culture`,
    education: `${categoriesBase}/education`,
    opinion: {
      index: `${categoriesBase}/opinion`,
      bookReview: `${categoriesBase}/opinion/book-review`,
      letter: `${categoriesBase}/opinion/letter`,
    },
    podcast: {
      theRealStory: `${categoriesBase}/podcast/the-real-story`,
      onTheGround: `${categoriesBase}/podcast/on-the-ground`,
    },
    foundation: {
      index: `${categoriesBase}/foundation`,
    },
  },
  humanStory: '/tags/58db34a30f56b40d001ae6a6', // 人物故事 tag id
  photography: '/photography',
  podcast: {
    aboutPodcast: `${articlesBase}/podcast-list`,
  },
  infographic: '/tags/630f029461ca4e07004ef530', // infographic tag id
  influenceReport: `${articlesBase}/impact-and-annual-report`,
} as const
