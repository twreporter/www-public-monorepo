import { list } from '@keystone-6/core'
import { text, json } from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  denyRoles,
  RoleEnum,
} from './utils/access-control-list'

const listConfigurations = list({
  fields: {
    fundraisingID: text({
      label: '勸募字號',
      validation: { isRequired: true },
    }),
    fundraisingDateString: text({
      label: '勸募週期',
      validation: { isRequired: true },
    }),
    socialMediaLinks: json({
      label: '社群連結列表（最多 6 個）',
      ui: {
        views: './lists/views/footer-social-media-links',
      },
    }),
    footerLinks: json({
      label: '超連結列表',
      ui: {
        views: './lists/views/footer-links-columns',
      },
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
    label: 'Footer',
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
  isSingleton: true,
})
export default listConfigurations
