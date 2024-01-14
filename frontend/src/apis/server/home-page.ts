import { HomePage, ResponseWrapper } from '@/types'

const { BACKEND_API_BASE_URL } = process.env

export async function getHomePage(): Promise<ResponseWrapper<HomePage>> {
  const res = await fetch(`${BACKEND_API_BASE_URL}/home-page`)
  if (!res.ok) {
    throw new Error('请求失败')
  }
  const wrapper = await res.json()
  if (200 !== wrapper.code) {
    throw new Error(wrapper.message)
  }
  return wrapper
}
