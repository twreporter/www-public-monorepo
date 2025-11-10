import { graphql, list } from '@keystone-6/core'
import { relationship, text, virtual } from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  denyRoles,
  RoleEnum,
} from './utils/access-control-list'
import { CREATED_AT, UPDATED_AT } from './utils/common-field'

const listConfigurations = list({
  fields: {
    twreporterID: text({
      label: '會員管理系統 ID',
      isIndexed: true,
    }),
    bookmark: relationship({
      label: '書籤',
      ref: 'Bookmark.user',
      many: true,
    }),
    postReading: relationship({
      label: 'Post Reading Count',
      ref: 'Post.postReadingBy',
      many: true,
      ui: {
        itemView: {
          fieldMode: 'hidden',
        }
      }
    }),
    postReadingCountView: virtual({
      label: 'Post Reading Count',
      field: graphql.field({
        type: graphql.JSON,
        async resolve(item, _args, context) {
          const count = await context.query.User.findOne({
            where: { id: String(item.id) },
            query: 'postReadingCount',
          })
          const relationshipQueryUrl = `/posts?!postReadingBy_matches="${item.id}"`
          return {
            summary: `總共有 ${count.postReadingCount} 筆`,
            link: {
              url: relationshipQueryUrl,
              desc: 'View related Posts',
            },
          }
        },
      }),
      ui: {
        views: './lists/views/relationship-link',
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'read',
        },
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    postReadingTime: relationship({
      label: 'Post Reading Time',
      ref: 'PostReadingTime.user',
      many: true,
      ui: {
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    postReadingTimeView: virtual({
      label: 'Post Reading Time',
      field: graphql.field({
        type: graphql.JSON,
        async resolve(item, _args, context) {
          const data = await context.query.PostReadingTime.findMany({
            where: { user: { id: { equals: String(item.id) } } },
            query: 'seconds',
          })
          const count = data.length
          const seconds = data.reduce((acc, time) => acc + time.seconds, 0)
          const relationshipQueryUrl = `/post-reading-times?!user_matches="${item.id}"`
          return {
            summary: `總共有 ${count} 筆、閱讀了 ${seconds} 秒`,
            link: {
              url: relationshipQueryUrl,
              desc: 'View related Post Reading Time',
            },
          }
        },
      }),
      ui: {
        views: './lists/views/relationship-link',
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'read',
        },
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    postReadingFootprint: relationship({
      label: 'Post Reading FootPrint',
      ref: 'PostReadingFootprint.user',
      many: true,
      ui: {
        itemView: {
          fieldMode: 'hidden',
        },
      },
    }),
    postReadingFootprintView: virtual({
      label: 'Post Reading FootPrint',
      field: graphql.field({
        type: graphql.JSON,
        async resolve(item, _args, context) {
          const count = await context.query.PostReadingFootprint.count({
            where: { user: { id: { equals: String(item.id) } } },
          })
          const relationshipQueryUrl = `/post-reading-footprints?!user_matches="${item.id}"`
          return {
            summary: `總共有 ${count} 筆`,
            link: {
              url: relationshipQueryUrl,
              desc: 'View related Post Reading Footprint',
            },
          }
        },
      }),
      ui: {
        views: './lists/views/relationship-link',
        createView: {
          fieldMode: 'hidden',
        },
        itemView: {
          fieldMode: 'read',
        },
        listView: {
          fieldMode: 'hidden',
        },
      },
    }),
    createdAt: CREATED_AT,
    updatedAt: UPDATED_AT,
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
    label: 'User',
    hideCreate: denyRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    hideDelete: denyRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    listView: {
      initialColumns: ['twreporterID', 'createdAt'],
      initialSort: { field: 'twreporterID', direction: 'DESC' },
      pageSize: 50,
    },
  },
})
export default listConfigurations
