import get from 'lodash/get'

const _ = { get }

export type JwtPayload = {
  [key: string]: unknown
}

export function decodePayload(jwt: string): JwtPayload | null {
  try {
    const payload = _.get(jwt.split('.'), 1)
    return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
  } catch (err) {
    console.error('extract payload from jwt error: ', err)
    return null
  }
}

export default { decodePayload }
