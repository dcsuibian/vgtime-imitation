import styles from './PostMainComment.module.scss'
import { TopicComment } from '@/types'
import CommentBox from '@/app/topics/[topicId]/Comments/CommentBox'
import { addTopicComment } from '@/apis/client/topic'

export default function PostMainComment({
  topicId,
  addMainComment,
}: {
  topicId: number
  addMainComment: (comment: TopicComment) => void
}) {
  const handleComment = async (content: string) => {
    const wrapper = await addTopicComment(topicId, content, null, null)
    addMainComment(wrapper.result)
  }
  return (
    <div className={styles.post}>
      <CommentBox onComment={handleComment} />
    </div>
  )
}
