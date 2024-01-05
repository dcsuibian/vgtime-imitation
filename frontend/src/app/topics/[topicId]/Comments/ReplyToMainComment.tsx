import styles from './ReplyToMainComment.module.scss'
import CommentBox from './CommentBox'
import { addTopicComment } from '@/apis/client/topic'
import { TopicComment } from '@/types'

export default function ReplyToMainComment({
  topicId,
  parent,
  addChildComment,
}: {
  topicId: number
  parent: TopicComment
  addChildComment: (parentId: number, replyToId: number, comment: TopicComment) => void
}) {
  const handleComment = async (content: string) => {
    const wrapper = await addTopicComment(topicId, content, parent.id, parent.id)
    addChildComment(parent.id, parent.id, wrapper.result)
  }
  return (
    <div className={styles.reply}>
      <CommentBox onComment={handleComment} placeholder={'回复' + parent.user.name} />
    </div>
  )
}
