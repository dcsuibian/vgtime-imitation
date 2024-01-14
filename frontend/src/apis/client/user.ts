import { ResponseWrapper } from '@/types'
import sha512 from 'crypto-js/sha512'

// 不能写成解构赋值的形式
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const SALT = process.env.NEXT_PUBLIC_SALT

export async function register(
  phoneNumber: string,
  password: string,
  verificationCode: string,
): Promise<ResponseWrapper<void>> {
  password = sha512(`${password}${SALT}`).toString() // 前端加盐哈希主要是为了防止后端打日志时不小心打出来用户的密码
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phoneNumber,
      verificationCode,
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
