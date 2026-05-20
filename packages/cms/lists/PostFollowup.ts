import { list } from '@keystone-6/core'
import { json, relationship, text, timestamp } from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  denyRoles,
  RoleEnum,
} from './utils/access-control-list'
import { CREATED_AT, UPDATED_AT } from './utils/common-field'

const listConfigurations = list({
  fields: {
    title: text({
      isIndexed: true,
      label: '標題',
      validation: { isRequired: true },
    }),
    publishedDate: timestamp({
      isIndexed: true,
      label: '發布時間',
    }),
    summary: text({
      label: '摘要',
    }),
    content: json({
      label: '內容',
      ui: {
        views: './lists/views/wysiwyg-editor',
        createView: { fieldMode: 'edit' },
        listView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'edit' },
      },
    }),
    posts: relationship({
      ref: 'Post.postFollowups',
      many: true,
      label: '關聯文章',
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
    label: 'Post Followups',
    labelField: 'title',
    listView: {
      initialColumns: ['title', 'summary', 'publishedDate'],
      initialSort: { field: 'publishedDate', direction: 'DESC' },
      pageSize: 50,
    },
    hideCreate: denyRoles([
      RoleEnum.Owner,
      RoleEnum.Admin,
      RoleEnum.Editor,
      RoleEnum.Contributor,
    ]),
    hideDelete: denyRoles([
      RoleEnum.Owner,
      RoleEnum.Admin,
      RoleEnum.Editor,
      RoleEnum.Contributor,
    ]),
    itemView: {
      defaultFieldMode: ({ session }) => {
        if (
          [
            RoleEnum.Owner,
            RoleEnum.Admin,
            RoleEnum.Editor,
            RoleEnum.Contributor,
          ].indexOf(session?.data.role) > -1
        ) {
          return 'edit'
        } else {
          return 'read'
        }
      },
    },
  },
})
export default listConfigurations
