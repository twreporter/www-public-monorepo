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

const getPostMeta: GetPostMetaFunc = ({ ogImage, subcategories, ...rest }) => ({
  image: ogImage ? { src: getImageLink(ogImage), alt: ogImage.name } : undefined,
  category: _.get(subcategories, '[0].category.name', ''),
  ...rest
})

export default getPostMeta