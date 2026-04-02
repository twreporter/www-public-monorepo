import type { Context } from '.keystone/types'
import Path from 'node:path'
import { mergeSchemas } from '@graphql-tools/schema'
import { config } from '@keystone-6/core'
import { session, withAuth } from './auth'
import envVars from './environment-variables'
import { listDefinition as lists } from './lists'

type LatestCreateInput = {
  tag: {
    connect: {
      id: string
    }
  }
  order: number
}

type LatestWhereUniqueInput = {
  id: string
}

type ReviewCreateInput = {
  post: {
    connect: {
      id: string
    }
  }
  order: number
}

type ReviewWhereUniqueInput = {
  id: string
}

export default withAuth(
  config({
    db: {
      provider: 'mysql',
      url: envVars.database.url,
      idField: {
        kind: 'autoincrement',
      },
    },
    ui: {
      // For our starter, we check that someone has session data before letting them see the Admin UI.
      isAccessAllowed: (context) => !!context.session?.data,
      getAdditionalFiles: [
        async () => [
          {
            mode: 'copy',
            inputPath: Path.resolve('public/asset/favicon.ico'),
            outputPath: 'public/favicon.ico',
          },
        ],
      ],
      basePath: `',
        webpack: (config) => {
          config.resolve.alias = {
            ...(config.resolve.alias || {}),
            react: require('path').dirname(require.resolve('react/package.json')),
            'react-dom': require('path').dirname(require.resolve('react-dom/package.json')),
            'react/jsx-runtime': require.resolve('react/jsx-runtime'),
            'react/jsx-dev-runtime': require.resolve('react/jsx-dev-runtime'),
          }
          return config
        },
      basePath:'`,
    },
    lists,
    session,
    storage: {
      images: {
        kind: 'local',
        type: 'image',
        storagePath: envVars.images.storagePath,
        serverRoute: {
          path: '/images',
        },
        generateUrl: (path) => `/images${path}`,
      },
    },
    graphql: {
      extendGraphqlSchema: (schema) =>
        mergeSchemas({
          schemas: [schema],
          typeDefs: `
            type Mutation {
              deleteAllLatestAndBulkCreate(deleteCondition: [LatestWhereUniqueInput!]!, createData: [LatestCreateInput!]!): [Latest!]!
              deleteAllReviewsAndBulkCreate(deleteCondition: [ReviewWhereUniqueInput!]!, createData: [ReviewCreateInput!]!): [Review!]!
            }
          `,
          resolvers: {
            Mutation: {
              deleteAllLatestAndBulkCreate: async (
                _root,
                {
                  deleteCondition,
                  createData,
                }: {
                  deleteCondition: LatestWhereUniqueInput[]
                  createData: LatestCreateInput[]
                },
                context: Context
              ) => {
                await context.transaction(async (tx) => {
                  await tx.db.Latest.deleteMany({ where: deleteCondition })
                  await tx.db.Latest.createMany({ data: createData })
                })
                return await context.db.Latest.findMany({ where: { OR: [] } })
              },
              deleteAllReviewsAndBulkCreate: async (
                _root,
                {
                  deleteCondition,
                  createData,
                }: {
                  deleteCondition: ReviewWhereUniqueInput[]
                  createData: ReviewCreateInput[]
                },
                context: Context
              ) => {
                await context.transaction(async (tx) => {
                  await tx.db.Review.deleteMany({ where: deleteCondition })
                  await tx.db.Review.createMany({ data: createData })
                })
                return await context.db.Review.findMany({ where: { OR: [] } })
              },
            },
          },
        }),
    },
  })
)
