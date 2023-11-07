import { HomePage } from '@/types'

export async function getHomePage(): Promise<HomePage> {
  const res = await fetch('http://localhost:9528/api/home-page')
  if (!res.ok) {
    throw new Error('请求失败')
  }
  return (await res.json()).result
}
