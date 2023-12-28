import styles from './index.module.scss'
import classNames from 'classnames'
import dayjs from 'dayjs'
import type { Topic } from '@/types'

export default function TopicCard({
  topic,
  label,
  type,
}: {
  topic: Topic
  label: string
  type: 'normal' | 'small' | 'big'
}) {
  return (
    <div
      className={classNames(styles.card, 'small' === type ? styles.small : 'big' === type ? styles.big : styles.normal)}
    >
      <div className={styles.img}>
        <a target="_blank" href={`/topics/${topic.id}`} title={topic.title}>
          <img src={`${topic.cover}?x-oss-process=image/resize,m_pad,color_000000,w_640,h_400`} alt={topic.title} />
        </a>
      </div>
      <div className={styles.info}>
        <span>{label}</span>
        <a target="_blank" href={`/topics/${topic.id}`} title={topic.title}>
          <h2>{topic.title}</h2>
        </a>
        <p>{topic.summary}</p>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <span>{topic.author.name}</span>
          </div>
          <div className={styles.right}>
            <span>{dayjs(topic.createTime).format('YYYY-MM-DD')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
