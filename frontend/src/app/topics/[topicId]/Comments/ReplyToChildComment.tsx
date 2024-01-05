import styles from './ReplyToChildComment.module.scss'
import CommentBox from '@/app/topics/[topicId]/Comments/CommentBox'
import { addTopicComment } from '@/apis/client/topic'
import { TopicComment } from '@/types'

export default function ReplyToChildComment({
  topicId,
  parentId,
  replyToId,
  addChildComment,
}: {
  topicId: number
  parentId: number
  replyToId: number
  addChildComment: (parentId: number, replyToId: number, comment: TopicComment) => void
}) {
  const handleComment = async (content: string) => {
    const wrapper = await addTopicComment(topicId, content, parentId, replyToId)
    addChildComment(parentId, replyToId, wrapper.result)
  }
  return (
    <div className={styles.reply}>
      <CommentBox onComment={handleComment} />
    </div>
  )
}
