import styles from './ReplyToMainComment.module.scss'
import CommentBox from './CommentBox'
import { addTopicComment } from '@/apis/client/topic'
import { TopicComment } from '@/types'

export default function ReplyToMainComment({
  topicId,
  parentId,
  addChildComment,
}: {
  topicId: number
  parentId: number
  addChildComment: (parentId: number, replyToId: number, comment: TopicComment) => void
}) {
  const handleComment = async (content: string) => {
    const wrapper = await addTopicComment(topicId, content, parentId, parentId)
    addChildComment(parentId, parentId, wrapper.result)
  }
  return (
    <div className={styles.reply}>
      <CommentBox onComment={handleComment} />
    </div>
  )
}
