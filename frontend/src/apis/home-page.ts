import { HomePage } from '@/types'

const { BACKEND_API_BASE_URL } = process.env

export async function getHomePage(): Promise<HomePage> {
  const res = await fetch(`${BACKEND_API_BASE_URL}/home-page`)
  if (!res.ok) {
    throw new Error('请求失败')
  }
  return (await res.json()).result
}
