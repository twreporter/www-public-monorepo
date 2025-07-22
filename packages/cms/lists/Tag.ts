import { list } from '@keystone-6/core'
import { relationship, text } from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  RoleEnum,
} from './utils/access-control-list'
import { CREATED_AT, SLUG, UPDATED_AT } from './utils/common-field'

const listConfigurations = list({
  fields: {
    slug: SLUG,
    name: text({
      isIndexed: 'unique',
      label: '標籤名稱',
      validation: { isRequired: true },
    }),
    ogTitle: text({
      label: 'og:title',
    }),
    ogDescription: text({
      label: 'og:description',
    }),
    ogImage: relationship({
      ref: 'Photo',
      label: 'og:image',
      ui: {
        labelField: 'name',
      },
    }),
    posts: relationship({
      ref: 'Post.tags',
      many: true,
      label: '相關文章',
      ui: {
        hideCreate: true,
        labelField: 'title',
      },
    }),
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT,
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
  ui: {
    label: 'Tags',
    labelField: 'name',
    listView: {
      initialColumns: ['name', 'slug'],
      initialSort: { field: 'createdAt', direction: 'DESC' },
      pageSize: 50,
    },
  },
})
export default listConfigurations
