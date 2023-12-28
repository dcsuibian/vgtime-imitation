import styles from './index.module.scss'
import dayjs from 'dayjs'
import type { Topic } from '@/types'

export default function HotNews({ hotNews }: { hotNews: Topic[] }) {
  return (
    <div className={styles.hot}>
      <ul>
        {hotNews.map(topic => (
          <li key={topic.id}>
            <div className={styles.img}>
              <a target="_blank" href={`/topics/${topic.id}`} title={topic.title}>
                <img
                  src={`${topic.cover}?x-oss-process=image/resize,m_pad,color_000000,w_800,h_500`}
                  alt={topic.title}
                />
              </a>
            </div>
            <div className={styles.info}>
              <p>
                <a target="_blank" href={`/topics/${topic.id}`} title={topic.summary}>
                  {topic.summary}
                </a>
              </p>
              <a target="_blank" href={`/topics/${topic.id}`} title={topic.title}>
                <h2>{topic.title}</h2>
              </a>
              <div className={styles.bottom}>
                <div className={styles.left}>
                  <span>{topic.author.name}</span>
                </div>
                <div className={styles.right}>
                  <span>{dayjs(topic.createTime).format('YYYY-MM-DD')}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="clear"></div>
    </div>
  )
}
