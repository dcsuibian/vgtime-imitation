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
      </div>
    </header>
  )
}
