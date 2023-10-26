import styles from './page.module.scss'

const focusTopics:Array<{
  id: number
  title: string
  summary: string
  cover: string
}> = []
for (let i = 1; i <= 5; i++) {
  focusTopics.push({
    id: i,
    title: '《刺客信条 幻景》：刺客宇宙的回归和补全之作',
    summary: '《刺客信条：幻景》还是熟悉的配方？',
    cover: 'https://img01.vgtime.com/game/cover/2023/10/08/231008142919733_u459821.webp'
  })
}
export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.focus}>
        <ul>
          {focusTopics.map(topic =>
            <li key={topic.id}>
              <div className={styles.img}>
                <a target='_blank' href={`/topics/${topic.id}`} title={topic.title}>
                  <img src={topic.cover} alt={topic.title} />
                </a>
              </div>
            </li>
          )}
        </ul>
      </section>
      <section>
        <h2>
          review
        </h2>
      </section>
    </main>
  )
}
