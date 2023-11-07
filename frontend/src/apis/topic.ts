import { Topic } from '@/types'

export async function getTopicById(id: number): Promise<Topic> {
  const res = await fetch(`http://localhost:9528/api/topics/${id}`)
  if (!res.ok) {
    throw new Error('请求失败')
  }
  return (await res.json()).result
}
