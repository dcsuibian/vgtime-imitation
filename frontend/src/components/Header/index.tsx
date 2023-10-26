import styles from './index.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.left}>
          <a>
            欢迎光临(仿)游戏时光！
          </a>
        </div>
      </div>
      <div className={styles.bottom}>
        <nav className={styles.left}>
          <ul>
            <li><a>动漫</a></li>
            <li><a>游戏</a></li>
            <li><a>攻略测评</a></li>
            <li><a>新闻资讯</a></li>
            <li><a>专题专栏</a></li>
            <li><a>视频节目</a></li>
            <li><a>俱乐部</a></li>
          </ul>
        </nav>
        <div className={styles.right}>

        </div>
      </div>
    </header>
  )
}
