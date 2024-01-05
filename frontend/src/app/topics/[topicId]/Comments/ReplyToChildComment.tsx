import styles from './ReplyToChildComment.module.scss'
import CommentBox from '@/app/topics/[topicId]/Comments/CommentBox'
import { addTopicComment } from '@/apis/client/topic'
import { TopicComment } from '@/types'

export default function ReplyToChildComment({
  topicId,
  parent,
  replyTo,
  addChildComment,
}: {
  topicId: number
  parent: TopicComment
  replyTo: TopicComment
  addChildComment: (parentId: number, replyToId: number, comment: TopicComment) => void
}) {
  const handleComment = async (content: string) => {
    const wrapper = await addTopicComment(topicId, content, parent.id, replyTo.id)
    addChildComment(parent.id, replyTo.id, wrapper.result)
  }
  return (
    <div className={styles.reply}>
      <CommentBox onComment={handleComment} placeholder={'回复'+replyTo.user.name}/>
    </div>
  )
}
