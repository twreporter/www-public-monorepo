import { list } from '@keystone-6/core'
import { integer, relationship } from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  denyRoles,
  RoleEnum,
} from './utils/access-control-list'

const listConfigurations = list({
  fields: {
    post: relationship({
      label: '文章',
      ref: 'Post',
    }),
    order: integer({
      label: '排序',
    }),
  },
  access: {
    operation: {
      query: allowAllRoles(),
      create: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      update: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      delete: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    },
  },
  ui: {
    label: 'Review',
    isHidden: true,
    hideCreate: denyRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    hideDelete: denyRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    itemView: {
      defaultFieldMode: ({ session }) => {
        if (
          [RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor].indexOf(
            session?.data.role
          ) > -1
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
