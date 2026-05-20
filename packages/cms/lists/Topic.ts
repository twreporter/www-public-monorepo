import { list } from '@keystone-6/core'
import {
  json,
  relationship,
  select,
  text,
  timestamp,
} from '@keystone-6/core/fields'
import { get } from 'lodash'
import { color } from '../fields/color-picker'
import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'
import { CREATED_AT, SLUG, UPDATED_AT } from './utils/common-field'

const _ = {
  get,
}

const listConfigurations = list({
  fields: {
    slug: SLUG,
    title: text({
      label: '專題標題',
      validation: { isRequired: true },
      isIndexed: true,
    }),
    subtitle: text({
      label: '專題副標',
      validation: { isRequired: false },
    }),
    headline: text({
      label: '專題小標',
      validation: { isRequired: false },
    }),
    topicName: text({
      label: '文章頁專題標',
      validation: { isRequired: false },
      ui: {
        description: '20個全型字以內視覺效果最佳。',
      },
    }),
    titlePosition: select({
      defaultValue: 'bottom',
      options: [
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
        { label: 'Bottom Left', value: 'bottom-left' },
      ],
      label: '標題位置',
    }),
    state: select({
      label: '狀態',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Archived', value: 'archived' },
        { label: 'Invisible', value: 'invisible' },
      ],
      defaultValue: 'draft',
      isIndexed: true,
    }),
    publishedDate: timestamp({
      isIndexed: true,
      label: '發布時間',
    }),
    updatedDate: timestamp({
      label: '更新時間',
    }),
    description: json({
      label: '簡介',
      ui: {
        views: './lists/views/wysiwyg-editor',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),
    teamDescription: json({
      label: '製作人員名單',
      ui: {
        views: './lists/views/wysiwyg-editor',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),
    posts: relationship({
      ref: 'Post',
      many: true,
      label: '相關文章',
      ui: {
        hideCreate: true,
      },
    }),
    postLayout: select({
      label: '相關文章版型',
      type: 'enum',
      options: [
        { label: 'In Row', value: 'row' },
        { label: 'In Column', value: 'column' },
      ],
      defaultValue: 'row',
      ui: {
        views: './lists/views/select-layout',
      },
    }),
    postBackgroundColor: color({
      label: '文章區背景色',
    }),
    heroImage: relationship({
      ref: 'Photo',
      label: '首圖',
    }),
    mobileHeroImage: relationship({
      ref: 'Photo',
      label: '手機首圖',
    }),
    ogTitle: text({
      validation: { isRequired: false },
      label: 'og:title',
    }),
    ogDescription: text({
      label: 'og:description',
      validation: { isRequired: false },
    }),
    ogImage: relationship({
      ref: 'Photo',
      label: 'og:image',
    }),
    relatedPosts: relationship({
      ref: 'Post.relatedTopics',
      many: true,
      label: '關聯文章',
      ui: {
        hideCreate: true,
      },
    }),
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT,
  },
  hooks: {
    resolveInput: async ({ resolvedData }) => {
      const connectPosts = _.get(resolvedData, ['posts', 'connect'], [])
      const connectRelatedPosts = _.get(
        resolvedData,
        ['relatedPosts', 'connect'],
        []
      )
      let isDirty = false
      connectPosts.forEach(({ id }: { id: number }) => {
        if (
          !connectRelatedPosts.find((post: { id: number }) => post.id === id)
        ) {
          connectRelatedPosts.push({ id })
          isDirty = true
        }
      })

      if (isDirty) {
        resolvedData.relatedPosts = resolvedData.relatedPosts || {}
        resolvedData.relatedPosts.connect = connectRelatedPosts
      }
      return resolvedData
    },
  },
  ui: {
    label: 'Topics',
    labelField: 'title',
    listView: {
      initialColumns: ['title', 'slug', 'state'],
      initialSort: { field: 'publishedDate', direction: 'DESC' },
      pageSize: 50,
    },
  },
  access: {
    operation: {
      query: allowAllRoles(),
      create: allowRoles([
        RoleEnum.Owner,
        RoleEnum.Admin,
        RoleEnum.Editor,
        RoleEnum.Contributor,
      ]),
      update: allowRoles([
        RoleEnum.Owner,
        RoleEnum.Admin,
        RoleEnum.Editor,
        RoleEnum.Contributor,
      ]),
      delete: allowRoles([
        RoleEnum.Owner,
        RoleEnum.Admin,
        RoleEnum.Editor,
        RoleEnum.Contributor,
      ]),
    },
  },
})

export default listConfigurations
