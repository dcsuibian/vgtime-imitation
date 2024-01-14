import styles from './ReplyToChildComment.module.scss'
import CommentBox from '@/app/topics/[topicId]/Comments/CommentBox'
import { addTopicComment } from '@/apis/client/topic'
import { TopicComment } from '@/types'
import message from '@/components/Message'

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
  const [messageApi, contextHolder] = message.useMessage()
  const handleComment = async (content: string) => {
    try {
      const wrapper = await addTopicComment(topicId, content, parent.id, replyTo.id)
      addChildComment(parent.id, replyTo.id, wrapper.result)
    } catch (err: any) {
      messageApi.error(err.message)
    }
  }
  return (
    <>
      {contextHolder}
      <div className={styles.reply}>
        <CommentBox onComment={handleComment} placeholder={'回复' + replyTo.user.name} />
      </div>
    </>
  )
}
