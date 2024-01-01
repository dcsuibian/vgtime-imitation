'use client'
import styles from './index.module.scss'
import useScrollPosition from '@/hooks/useScrollPosition'

export default function Header() {
  const scrollPosition = useScrollPosition()
  const hideTop = scrollPosition > 32 // 滚动超过32px时隐藏顶部

  return (
    <header className={styles.header + ' ' + (hideTop ? styles.down : '')}>
      <div className={styles.top} style={{ display: hideTop ? 'none' : 'block' }}>
        <div className={styles.left}>
          <a>欢迎光临(仿)游戏时光！</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <nav className={styles.left}>
          <ul>
            <li>
              <a>动漫</a>
            </li>
            <li>
              <a>游戏</a>
            </li>
            <li>
              <a>攻略评测</a>
            </li>
            <li>
              <a>新闻资讯</a>
            </li>
            <li>
              <a>专题专栏</a>
            </li>
            <li>
              <a>视频节目</a>
            </li>
            <li>
              <a>俱乐部</a>
            </li>
          </ul>
        </nav>
        <div className={styles.right}></div>
      </div>
    </header>
  )
}
