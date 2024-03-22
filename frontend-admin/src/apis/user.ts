import { PageWrapper, ResponseWrapper, User } from '@/types'
import sha512 from 'crypto-js/sha512'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const SALT = import.meta.env.VITE_SALT

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

export async function editUserPartially(user: User): Promise<ResponseWrapper<User>> {
  if (null !== user.password) {
    user.password = sha512(`${user.password}${SALT}`).toString() // 前端加盐哈希主要是为了防止后端打日志时不小心打出来用户的密码
  }
  const res = await fetch(`${API_BASE_URL}/users/${user.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  if (!res.ok) {
    throw new Error('请求失败')
  }
  const wrapper = await res.json()
  if (200 !== wrapper.code) {
    throw new Error(wrapper.message)
  }
  return wrapper
}
