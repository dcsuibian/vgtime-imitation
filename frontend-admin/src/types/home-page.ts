import { Topic } from './topic'

interface HomePage {
  hotNews: Array<Topic> // 热点新闻
  news: Array<Topic> // 新闻资讯
  guides: Array<Topic> // 攻略资料
  reviews: Array<Topic> // 深度评测
  cultures: Array<Topic> // 游戏文化
  comics: Array<Topic> // 动漫时光
}

export type { HomePage }
