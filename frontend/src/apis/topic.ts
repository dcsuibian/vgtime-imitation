import { Topic } from '@/types'

const { BACKEND_API_BASE_URL } = process.env

export async function getTopicById(id: number): Promise<Topic> {
  const res = await fetch(`${BACKEND_API_BASE_URL}/topics/${id}`)
  if (!res.ok) {
    throw new Error('请求失败')
  }
  return (await res.json()).result
}
