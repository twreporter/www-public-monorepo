import { list } from '@keystone-6/core'
import { integer, relationship, text } from '@keystone-6/core/fields'
import {
  allowAllRoles,
  allowRoles,
  denyRoles,
  RoleEnum,
} from './utils/access-control-list'
import { CREATED_AT, SLUG, UPDATED_AT } from './utils/common-field'

const listConfigurations = list({
  fields: {
    slug: SLUG,
    name: text({
      isIndexed: 'unique',
      label: '次類別中文名稱',
      validation: { isRequired: true },
    }),
    category: relationship({
      ref: 'Category.subcategories',
      many: false,
      label: 'Category',
      hooks: {
        validateInput: ({ addValidationError, resolvedData, item }) => {
          const { category } = resolvedData
          if (!item?.categoryId && !category) addValidationError('分類為必填')
        },
      },
    }),
    nameForCMS: text({
      hooks: {
        resolveInput: async ({ resolvedData, item, context }) => {
          const { category, name } = resolvedData

          const fetchCategoryName = async (id: NonNullable<unknown>) => {
            const categoryItem = await context.query.Category.findOne({
              where: { id: Number(id) },
              query: 'name',
            })
            return categoryItem?.name
          }
          let categoryName = ''
          if (category?.connect?.id) {
            categoryName = await fetchCategoryName(category.connect.id)
          } else if (item?.categoryId) {
            categoryName = await fetchCategoryName(item.categoryId)
          }
          const subcategoryName = name || item?.name
          return subcategoryName && categoryName
            ? `${subcategoryName} | ${categoryName}`
            : resolvedData.nameForCMS
        },
      },
      ui: {
        createView: { fieldMode: 'hidden' },
        itemView: { fieldMode: 'hidden' },
        listView: { fieldMode: 'hidden' },
      },
    }),
    sortOrder: integer({
      isIndexed: 'unique',
      label: 'Sort Order',
      ui: {
        createView: {
          fieldMode: ({ session }) => {
            if (
              [RoleEnum.Owner, RoleEnum.Admin].indexOf(session?.data.role) > -1
            ) {
              return 'edit'
            } else {
              return 'hidden'
            }
          },
        },
        itemView: {
          fieldMode: ({ session }) => {
            if (
              [RoleEnum.Owner, RoleEnum.Admin].indexOf(session?.data.role) > -1
            ) {
              return 'edit'
            } else {
              return 'read'
            }
          },
        },
      },
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
      ref: 'Post.subcategories',
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
      create: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      update: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
      delete: allowRoles([RoleEnum.Owner, RoleEnum.Admin, RoleEnum.Editor]),
    },
  },
  ui: {
    label: 'Subcategories',
    labelField: 'slug',
    listView: {
      initialColumns: ['slug', 'name', 'sortOrder'],
      initialSort: { field: 'sortOrder', direction: 'ASC' },
      pageSize: 50,
    },
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
