import { getTopicById } from '@/apis/server/topic'
import styles from './page.module.scss'
import MarkdownIt from 'markdown-it'
import dayjs from 'dayjs'
import Comments from './Comments'

const md = new MarkdownIt()
export default async function Topic({ params }: { params: { topicId: string } }) {
  const topic = await getTopicById(Number(params.topicId))
  const html = md.render(topic.content)
  return (
    <main className={styles.topic}>
      <div className={styles.main}>
        <div className={styles.center}>
          <article>
            <h1 className={styles.title}>{topic.title}</h1>
            <div className={styles.info}>
              &nbsp;作者&nbsp;
              <span className={styles.author}>{topic.author.name}</span>
              &nbsp;&nbsp;&nbsp;编辑&nbsp;
              <span className={styles.editor}>{topic.editor.name}</span>
              &nbsp;&nbsp;
              <span>{dayjs(topic.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
            <div className={styles.summary}>
              <p>{topic.summary}</p>
            </div>
            <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }}></div>
            <div className={styles.author}>
              <img src={topic.author.avatar ?? 'https://img01.vgtime.com//image/tou.gif'} alt={topic.author.name} />
              <span className={styles.name}>{topic.author.name}</span>
              <div className="clear"></div>
            </div>
          </article>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.center}>
          <Comments topicId={topic.id} />
          <div className={styles.copyright}>
            <span>(仿)游戏时光版权申明</span>
            <a>了解详细</a>
          </div>
        </div>
      </div>
      <div className="clear"></div>
    </main>
  )
}
