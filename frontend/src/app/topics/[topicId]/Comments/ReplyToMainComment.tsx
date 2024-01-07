import styles from './ReplyToMainComment.module.scss'
import CommentBox from './CommentBox'
import { addTopicComment } from '@/apis/client/topic'
import { TopicComment } from '@/types'
import message from '@/components/Message'

export default function ReplyToMainComment({
  topicId,
  parent,
  addChildComment,
}: {
  topicId: number
  parent: TopicComment
  addChildComment: (parentId: number, replyToId: number, comment: TopicComment) => void
}) {
  const [messageApi, contextHolder] = message.useMessage()
  const handleComment = async (content: string) => {
    try {
      const wrapper = await addTopicComment(topicId, content, parent.id, parent.id)
      addChildComment(parent.id, parent.id, wrapper.result)
    } catch (err: any) {
      messageApi.error(err.message)
    }
  }
  return (
    <>
      {contextHolder}
      <div className={styles.reply}>
        <CommentBox onComment={handleComment} placeholder={'回复' + parent.user.name} />
      </div>
    </>
  )
}
