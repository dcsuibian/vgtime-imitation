import styles from './index.module.scss'
import { User } from '@/types'

export default function Avatar({ user }: { user: User }) {
  const avatarSrc = user.avatar ?? 'https://img01.vgtime.com//image/tou.gif'
  return (
    <div className={styles.avatar}>
      <img src={avatarSrc} alt={user.name} />
    </div>
  )
}
