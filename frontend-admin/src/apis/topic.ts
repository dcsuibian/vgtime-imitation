import { ResponseWrapper, Topic } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function addTopic(topic: {
  title: Topic['title']
  summary: Topic['summary']
  content: Topic['content']
  cover: Topic['cover']
  type: Topic['type']
  status: Topic['status']
}): Promise<ResponseWrapper<Topic>> {
  const res = await fetch(`${API_BASE_URL}/topics`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(topic),
  })
  if (!res.ok) {
    throw new Error('请求失败')
  }
  const wrapper = await res.json()
  if (201 !== wrapper.code) {
    throw new Error(wrapper.message)
  }
  return wrapper
}
