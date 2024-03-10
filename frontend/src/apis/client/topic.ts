import { PageWrapper, ResponseWrapper, TopicComment } from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getTopicCommentsByTopicIdAndParentId(
  topicId: number,
  parentId: null | number,
  pageNumber: number,
  pageSize: number,
): Promise<ResponseWrapper<PageWrapper<TopicComment>>> {
  const params = new URLSearchParams({
    parentId: parentId?.toString() ?? '',
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  })
  const res = await fetch(`${API_BASE_URL}/topics/${topicId}/comments?` + params)
  if (!res.ok) {
    throw new Error('请求失败')
  }
  const wrapper = await res.json()
  if (200 !== wrapper.code) {
    throw new Error(wrapper.message)
  }
  return wrapper
}

export async function addTopicComment(
  topicId: number,
  content: string,
  parentId: null | number,
  replyToId: null | number,
): Promise<ResponseWrapper<TopicComment>> {
  const res = await fetch(`${API_BASE_URL}/topics/${topicId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      topic: { id: topicId },
      content,
      parent: { id: parentId },
      replyTo: { id: replyToId },
    }),
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
