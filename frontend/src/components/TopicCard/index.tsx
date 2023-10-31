import styles from './index.module.scss'
import classNames from 'classnames'

export default function TopicCard({
  topic,
  label,
  type,
}: {
  topic: {
    id: number
    title: string
    cover: string
    summary: string
    author: {
      name: string
    }
  }
  label: string
  type: 'normal' | 'small' | 'big'
}) {
  return (
    <div
      className={classNames(
        styles.card,
        'small' === type ? styles.small : 'big' === type ? styles.big : styles.normal,
      )}
    >
      <div className={styles.img}>
        <a target="_blank" href={`/topics/${topic.id}`} title={topic.title}>
          <img src={topic.cover} alt={topic.title} />
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
            <span>{/*TODO 时间*/}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
