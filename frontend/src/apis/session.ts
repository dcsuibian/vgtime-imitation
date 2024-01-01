import { Session } from '@/types'

const { BACKEND_API_BASE_URL } = process.env

export async function getSession(): Promise<Session> {
  const res = await fetch(`/api/session`)
  if (!res.ok) {
    throw new Error('请求失败')
  }
  return (await res.json()).result
}
