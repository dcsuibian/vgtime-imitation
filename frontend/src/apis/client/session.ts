import { ResponseWrapper, Session } from '@/types'
import sha512 from 'crypto-js/sha512'

// 不能写成解构赋值的形式
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const SALT = process.env.NEXT_PUBLIC_SALT

export async function getSession(): Promise<ResponseWrapper<Session>> {
  const res = await fetch(`${API_BASE_URL}/session`)
  if (!res.ok) {
    throw new Error('请求失败')
  }
  return await res.json()
}

export async function login(phoneNumber: string, password: string): Promise<ResponseWrapper<Session>> {
  password = sha512(`${password}${SALT}`).toString() // 前端加盐哈希主要是为了防止后端打日志时不小心打出来用户的密码
  const res = await fetch(`${API_BASE_URL}/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phoneNumber,
      password,
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

export async function logout(): Promise<ResponseWrapper<void>> {
  const res = await fetch(`${API_BASE_URL}/session`, {
    method: 'DELETE',
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
