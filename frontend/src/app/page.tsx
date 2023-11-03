import styles from './page.module.scss'
import TopicCard from '@/components/TopicCard'

interface Topic {
  id: number
  title: string
  summary: string
  cover: string
  author: {
    name: string
  }
  createTime: number
}

interface HomePage {
  hotNews: Array<Topic> // 热点新闻
  news: Array<Topic> // 新闻资讯
  guides: Array<Topic> // 攻略资料
  reviews: Array<Topic> // 深度评测
  cultures: Array<Topic> // 游戏文化
  comics: Array<Topic> // 动漫时光
}

async function getHomePage():Promise<HomePage> {
  const res = await fetch('http://localhost:9528/api/home-page')
  if(!res.ok){
    throw new Error('请求失败')
  }
  return (await res.json()).result
}

export default async function Home() {
  const homePage = await getHomePage()
  const { hotNews, news, guides, reviews, cultures, comics } = homePage
  return (
    <main className={styles.main}>
      <section className={styles.hot}>
        <ul>
          {hotNews.map(topic => (
            <li key={topic.id}>
              <div className={styles.img}>
                <a target="_blank" href={`/topics/${topic.id}`} title={topic.title}>
                  <img src={topic.cover} alt={topic.title} />
                </a>
              </div>
            </li>
          ))}
        </ul>
        <div className="clear"></div>
      </section>
      <section className={styles.news}>
        <h2>
          <a target="_blank">新闻资讯</a>
        </h2>
        <div>
          <div className={styles.big}>
            <TopicCard type="big" topic={news[0]} label="新闻" />
          </div>
          {news.slice(1, 4).map(topic => (
            <div key={topic.id} className={styles.normal}>
              <TopicCard type="normal" topic={topic} label="新闻" />
            </div>
          ))}
        </div>
        <div>
          {news.slice(4).map(topic => (
            <div key={topic.id} className={styles.small}>
              <TopicCard type="small" topic={topic} label="新闻" />
            </div>
          ))}
        </div>
        <div className="clear"></div>
      </section>
      <section className={styles.guide}>
        <h2>
          <a target="_blank">攻略资料</a>
        </h2>
        <div>
          <div className={styles.big}>
            <TopicCard type="big" topic={guides[0]} label="攻略" />
          </div>
          {guides.slice(1, 4).map(topic => (
            <div key={topic.id} className={styles.normal}>
              <TopicCard type="normal" topic={topic} label="攻略" />
            </div>
          ))}
        </div>
        <div className="clear"></div>
      </section>
      <section className={styles.review}>
        <h2>
          <a target="_blank">深度评测</a>
        </h2>
        <div>
          <div className={styles.big}>
            <TopicCard type="big" topic={reviews[0]} label="评测" />
          </div>
          {reviews.slice(1, 4).map(topic => (
            <div key={topic.id} className={styles.normal}>
              <TopicCard type="normal" topic={topic} label="评测" />
            </div>
          ))}
        </div>
        <div className="clear"></div>
      </section>
      <section className={styles.culture}>
        <h2>
          <a target="_blank">游戏文化</a>
        </h2>
        <div>
          <div className={styles.big}>
            <TopicCard type="big" topic={cultures[0]} label="游戏文化" />
          </div>
          {cultures.slice(1, 4).map(topic => (
            <div key={topic.id} className={styles.normal}>
              <TopicCard type="normal" topic={topic} label="游戏文化" />
            </div>
          ))}
        </div>
        <div className="clear"></div>
      </section>
      <section className={styles.comic}>
        <h2>
          <a target="_blank">动漫时光</a>
        </h2>
        <div>
          <div className={styles.big}>
            <TopicCard type="big" topic={comics[0]} label="动漫时光" />
          </div>
          {comics.slice(1, 4).map(topic => (
            <div key={topic.id} className={styles.normal}>
              <TopicCard type="normal" topic={topic} label="动漫时光" />
            </div>
          ))}
        </div>
        <div className="clear"></div>
      </section>
    </main>
  )
}
