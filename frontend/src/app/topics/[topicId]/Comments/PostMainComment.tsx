import styles from './PostMainComment.module.scss'
import { TopicComment } from '@/types'
import CommentBox from '@/app/topics/[topicId]/Comments/CommentBox'
import { addTopicComment } from '@/apis/client/topic'
import message from '@/components/Message'

export default function PostMainComment({
  topicId,
  addMainComment,
}: {
  topicId: number
  addMainComment: (comment: TopicComment) => void
}) {
  const [messageApi, contextHolder] = message.useMessage()
  const handleComment = async (content: string) => {
    try {
      const wrapper = await addTopicComment(topicId, content, null, null)
      addMainComment(wrapper.result)
    } catch (err: any) {
      messageApi.error(err.message)
    }
  }
  return (
    <>
      {contextHolder}
      <div className={styles.post}>
        <CommentBox
          onComment={handleComment}
          placeholder="严禁发布政治、宗教、色情、暴力内容，请勿讨论与翻墙有关的敏感话题。"
        />
      </div>
    </>
  )
}
