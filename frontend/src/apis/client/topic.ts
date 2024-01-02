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
  return await res.json()
}
