import axios from 'axios'
import { useAuthStore } from './auth-store'
import { decodePayload } from '../utils/jwt'

// Provide a plain function (no Redux thunk) to fetch and store auth state
export async function fetchAccessToken(apiOrigin: string, cookieList?: string) {
  const headers: Record<string, string> = {}
  if (cookieList) headers.Cookie = cookieList

  const res = await axios.post(`${apiOrigin}/v2/auth/token`, null, {
    headers,
    timeout: 5000,
    withCredentials: true,
  })
  const jwt = res.data?.data?.jwt as string
  if (jwt) {
    const userInfo = decodePayload(jwt)
    useAuthStore.getState().setToken(jwt)
    useAuthStore.setState({ isAuthed: true })
    return { jwt, userInfo }
  }
  return null
}
