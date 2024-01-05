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

interface TopicComment {
  id: number
  user: User
  content: string
  createTime: number
  replyCount: number
  parent: TopicComment
  replyTo: TopicComment
}

export type { Topic, TopicComment }
