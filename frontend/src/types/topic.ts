import type { User } from './user'

interface Topic {
  id: number
  author: User
  editor: User
  title: string
  summary: string
  content: string
  cover: string
  type: '新闻' | '攻略' | '评测' | '文化' | '漫画'
  createTime: number
  updateTime: number
  status: 'published' | 'draft'
  changeTime: number
}

export type { Topic }
