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
      <CommentBox onComment={handleComment} placeholder="严禁发布政治、宗教、色情、暴力内容，请勿讨论与翻墙有关的敏感话题。"/>
    </div>
  )
}
