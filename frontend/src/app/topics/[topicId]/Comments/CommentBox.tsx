import styles from './CommentBox.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { useRef } from 'react'
import { setUri, toggle } from '@/store/modules/sidebar'
import Avatar from '@/components/Avatar'

export default function CommentBox({
  onComment,
  placeholder,
}: {
  onComment: (content: string) => void
  placeholder: string
}) {
  const { user } = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch<AppDispatch>()
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const handleLogin = () => {
    dispatch(setUri('login'))
    dispatch(toggle())
  }

  if (null === user) {
    return (
      <div className={styles.box}>
        <div className={styles.notice}>
          您还未
          <a className={styles.login} onClick={handleLogin}>
            登录
          </a>
          ，不能参与发言哦~
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.box}>
        <Avatar user={user} />
        <textarea ref={contentRef} placeholder={placeholder}></textarea>
        <div className={styles.operate}>
          <button type="button" onClick={() => onComment(contentRef.current.value)}>
            评论
          </button>
        </div>
        <div className="clear"></div>
      </div>
    )
  }
}
