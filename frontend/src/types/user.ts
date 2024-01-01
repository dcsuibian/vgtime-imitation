interface User {
  id: number
  name: string
  password: string
  role: '管理员' | '新闻编辑' | '普通用户'
  phoneNumber: string
  avatar: string
  email: string
  gender: '男' | '女' | '保密'
}

export type { User }
