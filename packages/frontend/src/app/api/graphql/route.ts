import { type NextRequest, NextResponse } from 'next/server'
import { v4 as uuidV4 } from 'uuid'
import keystoneFetch, { type GraphQLResponse } from '@/app/api/graphql/keystone'
import logger from '@/utils/logger'

type Body = {
  query: string
  variables?: Record<string, string>
}

export async function POST<T>(req: NextRequest) {
  const body = await req.json()
  const { query, variables } = body
  const requestId = uuidV4()
  logger.info('incoming API request', { requestId, request: body })

  const bodyForKeystone: Body = { query }
  if (variables) {
    bodyForKeystone.variables = variables
  }

  try {
    const response: GraphQLResponse<T> = await keystoneFetch<T>(
      JSON.stringify(bodyForKeystone),
      true
    )
    logger.debug('keystone api response', { requestId, response })
    return NextResponse.json(response)
  } catch (error) {
    let errMsg = ''
    if (error instanceof Error) {
      errMsg = error.message
    }
    logger.error('keystone api error', { requestId, errMsg })
    return NextResponse.json({ error: errMsg }, { status: 500 })
  }
}
