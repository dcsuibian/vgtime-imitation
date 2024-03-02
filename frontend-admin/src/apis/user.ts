import { PageWrapper, ResponseWrapper, User } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getUsers(pageNumber: number, pageSize: number): Promise<ResponseWrapper<PageWrapper<User>>> {
  const params = new URLSearchParams({
    pageNumber: pageNumber.toString(),
    pageSize: pageSize.toString(),
  })
  const res = await fetch(`${API_BASE_URL}/users?` + params)
  if (!res.ok) {
    throw new Error('请求失败')
  }
  const wrapper = await res.json()
  if (200 !== wrapper.code) {
    throw new Error(wrapper.message)
  }
  return wrapper
}
