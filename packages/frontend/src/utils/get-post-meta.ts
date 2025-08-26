// type
import type { PostMetaFromRes } from '@/fetchers/type'
import type { ArticleMeta } from '@/type/article'
// utils
import { getImageLink } from '@/utils/get-image-link'
// lodash
import { get } from 'lodash'
const _ = {
  get,
}

type GetPostMetaFunc = (post: PostMetaFromRes) => ArticleMeta

const getPostMeta = (selectedTagSlug?: string):GetPostMetaFunc => {
  return ({ ogImage, subcategories, tags, ...rest }) => ({
  image: ogImage
    ? { src: getImageLink(ogImage), alt: ogImage.name }
    : undefined,
  category: _.get(subcategories, '[0].category.name', ''),
  tags: selectedTagSlug ? tags.map(({ slug, ...rest}) => ({
    slug,
    selected: slug === selectedTagSlug,
    ...rest
  })) : tags,
  ...rest,
  })
}

export default getPostMeta
