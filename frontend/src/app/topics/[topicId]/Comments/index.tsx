'use client'
import styles from './index.module.scss'
import { Provider } from 'react-redux'
import store from '@/store'
import { useEffect, useRef, useState } from 'react'
import { getTopicCommentsByTopicIdAndParentId } from '@/apis/client/topic'
import { TopicComment } from '@/types'
import PostMainComment from './PostMainComment'
import ReplyToMainComment from './ReplyToMainComment'
import dayjs from 'dayjs'
import ReplyToChildComment from './ReplyToChildComment'
import Avatar from '@/components/Avatar'

interface Info {
  pageNumber: number // 当前页码
  comments: TopicComment[] // 评论列表
  total: number // 总评论数
  hasMore: boolean // 是否还有更多评论
}

const initialInfo: Info = {
  pageNumber: 1,
  comments: [],
  total: 0,
  hasMore: false,
}

function Comments({ topicId }: { topicId: number }) {
  // 防止初始化时重复请求，主要为了对付React的严格模式
  const initialized = useRef(false)
  // 主评论
  const [info, setInfo] = useState<Info>(initialInfo)
  // 子评论
  const [childMap, setChildMap] = useState<{ [key: number]: Info }>({})
  // 是否展开回复框
  const [replyMap, setReplyMap] = useState<{ [key: number]: boolean }>({})

  // 获取子评论
  const fetchChildComments = async (parentId: number, pageNumber: number) => {
    const wrapper = await getTopicCommentsByTopicIdAndParentId(topicId, parentId, pageNumber, 5)
    const page = wrapper.result
    const oldInfo = childMap[parentId] ?? initialInfo
    const newInfo = {
      pageNumber: page.pageNumber,
      comments: [...oldInfo.comments, ...page.data],
      total: page.total,
      hasMore: page.pageNumber < page.totalPages,
    }
    setChildMap(prevChildMap => ({
      ...prevChildMap,
      [parentId]: newInfo,
    }))
  }
  // 获取主评论
  const fetchMainComments = async (pageNumber: number) => {
    const wrapper = await getTopicCommentsByTopicIdAndParentId(topicId, null, pageNumber, 12)
    const page = wrapper.result
    setInfo(prevInfo => ({
      pageNumber: page.pageNumber,
      comments: [...prevInfo.comments, ...page.data],
      total: page.total,
      hasMore: page.pageNumber < page.totalPages,
    }))
    for (const comment of page.data) {
      // 如果有子评论，则获取子评论
      if (comment.replyCount > 0) {
        fetchChildComments(comment.id, 1).catch(console.error)
      }
    }
  }

  // 初始化
  useEffect(() => {
    if (initialized.current) {
      return
    }
    initialized.current = true
    fetchMainComments(info.pageNumber).catch(console.error)
  }, [])

  // 展开/收起回复框
  const toggle = (id: number) => {
    setReplyMap(prevReplyMap => ({
      ...prevReplyMap,
      [id]: !prevReplyMap[id],
    }))
  }

  // 添加主评论，供子组件调用
  const addMainComment = (comment: TopicComment) => {
    setInfo(prevInfo => ({
      ...prevInfo,
      comments: [comment, ...prevInfo.comments],
    }))
  }
  // 添加子评论，供子组件调用
  const addChildComment = (parentId: number, replyToId: number, comment: TopicComment) => {
    const oldInfo = childMap[parentId] ?? initialInfo
    setChildMap(prevChildMap => ({
      ...prevChildMap,
      [parentId]: {
        ...oldInfo,
        comments: [comment, ...oldInfo.comments],
      },
    }))
    // 收起回复框
    setReplyMap(prevReplyMap => ({
      ...prevReplyMap,
      [replyToId]: false,
    }))
  }
  return (
    <div className={styles.comments}>
      <div>
        <h2>评论（{info.total}）</h2>
      </div>
      {/*主评论发表框*/}
      <PostMainComment topicId={topicId} addMainComment={addMainComment} />
      {/*主评论列表*/}
      <ul>
        {info.comments.map(comment => (
          <li key={comment.id}>
            <div className={styles.user}>
              <span>
                <Avatar user={comment.user} />
              </span>
              <span className={styles.name}>{comment.user.name}</span>
            </div>
            <div className={styles.content}>
              <div>
                <p>{comment.content}</p>
              </div>
            </div>
            <div className={styles.operate}>
              <span className={styles.time}>{dayjs(comment.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
              <span className={styles.reply} onClick={() => toggle(comment.id)}>
                回复
              </span>
            </div>
            {replyMap[comment.id] && (
              <ReplyToMainComment topicId={topicId} parent={comment} addChildComment={addChildComment} />
            )}
            {childMap[comment.id] && (
              <div className={styles.children}>
                <ul>
                  {childMap[comment.id].comments.map(child => (
                    <li key={child.id}>
                      <div className={styles.user}>
                        <span>
                          <Avatar user={child.user} />
                        </span>
                        <span className={styles.name}>{child.user.name}</span>
                      </div>
                      <div className={styles.content}>
                        <div>
                          <p>
                            {child.replyTo.id !== child.parent.id && (
                              <>
                                回复
                                <a>{child.replyTo.user.name}</a>：
                              </>
                            )}
                            {child.content}
                          </p>
                        </div>
                      </div>
                      <div className={styles.operate}>
                        <span className={styles.time}>{dayjs(child.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                        <span className={styles.reply} onClick={() => toggle(child.id)}>
                          回复
                        </span>
                      </div>
                      {replyMap[child.id] && (
                        <ReplyToChildComment
                          topicId={topicId}
                          parent={comment}
                          replyTo={child}
                          addChildComment={addChildComment}
                        />
                      )}
                    </li>
                  ))}
                </ul>
                {childMap[comment.id].hasMore && (
                  <a
                    className={styles.more}
                    onClick={() => fetchChildComments(comment.id, childMap[comment.id].pageNumber + 1)}
                  >
                    更多{childMap[comment.id].total - childMap[comment.id].comments.length}条回复
                  </a>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="clear"></div>
      {/*加载更多主评论*/}
      {info.hasMore && (
        <a className={styles.more} onClick={() => fetchMainComments(info.pageNumber + 1)}>
          显示更多精彩评论
        </a>
      )}
    </div>
  )
}

export default function Wrapper({ topicId }: { topicId: number }) {
  return (
    <Provider store={store}>
      <Comments topicId={topicId} />
    </Provider>
  )
}
