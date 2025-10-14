import { list } from '@keystone-6/core'
import { relationship, text, json } from '@keystone-6/core/fields'
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
      isIndexed: true,
      label: '作者姓名',
      validation: { isRequired: true },
    }),
    email: text(),
    title: text({
      label: '職稱',
    }),
    bio: json({
      label: '簡介',
      ui: {
        views: './lists/views/wysiwyg-editor',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),
    avatar: relationship({
      ref: 'Photo',
      many: false,
      label: '大頭照',
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
      ref: 'Post.authors',
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
    label: 'Authors',
    labelField: 'name',
    listView: {
      initialColumns: ['name', 'slug', 'email'],
      initialSort: { field: 'createdAt', direction: 'DESC' },
      pageSize: 50,
    },
  },
})
export default listConfigurations
