import styles from './page.module.scss'
import HotNews from '@/components/HotNews'
import TopicCard from '@/components/TopicCard'
import { getHomePage } from '@/apis/server/home-page'

export const revalidate = 60

export default async function Home() {
  const homePage = await getHomePage()
  const { hotNews, news, guides, reviews, cultures, comics } = homePage
  return (
    <main className={styles.main}>
      <section className={styles.hot}>
        <HotNews hotNews={hotNews} />
      </section>
      <section className={styles.news}>
        <h2>
          <a>新闻资讯</a>
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
          <a>攻略资料</a>
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
          <a>深度评测</a>
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
          <a>游戏文化</a>
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
          <a>动漫时光</a>
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
