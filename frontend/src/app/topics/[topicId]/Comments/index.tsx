'use client'
import styles from './index.module.scss'
import { Provider } from 'react-redux'
import store from '@/store'
import { useEffect, useState } from 'react'
import { getTopicCommentsByTopicIdAndParentId } from '@/apis/client/topic'
import { TopicComment } from '@/types'
import dayjs from 'dayjs'

interface Info {
  pageNumber: number
  comments: TopicComment[]
  total: number
  hasMore: boolean
}

function Comments({ topicId }: { topicId: number }) {
  const [info, setInfo] = useState<Info>({
    pageNumber: 1,
    comments: [],
    total: 0,
    hasMore: false,
  })
  const [childMap, setChildMap] = useState<{ [key: number]: Info }>({})
  const fetchChildComments = async (parentId: number, pageNumber: number) => {
    const wrapper = await getTopicCommentsByTopicIdAndParentId(topicId, parentId, pageNumber, 5)
    const page = wrapper.result
    const oldInfo = childMap[parentId] ?? { pageNumber: 1, comments: [], total: 0, hasMore: false }
    const newInfo = {
      pageNumber: page.pageNumber,
      comments: [...oldInfo.comments, ...page.data],
      total: page.total,
      hasMore: page.pageNumber < page.totalPages,
    }
    setChildMap({
      ...childMap,
      [parentId]: newInfo,
    })
  }
  const fetchMainComments = async (pageNumber: number) => {
    const wrapper = await getTopicCommentsByTopicIdAndParentId(topicId, null, pageNumber, 12)
    const page = wrapper.result
    setInfo({
      pageNumber: page.pageNumber,
      comments: [...info.comments, ...page.data],
      total: page.total,
      hasMore: page.pageNumber < page.totalPages,
    })
    // 获取子评论
    for (const comment of page.data) {
      if (comment.replyCount > 0) {
        await fetchChildComments(comment.id, 1)
      }
    }
  }
  useEffect(() => {
    fetchMainComments(info.pageNumber).catch(console.error)
  }, [info.pageNumber])
  return (
    <div className={styles.comments}>
      <div>
        <h2>评论（{info.total}）</h2>
      </div>
      <ul>
        {info.comments.map(comment => (
          <li key={comment.id}>
            <div className={styles.user}>
              <span>
                <img src={comment.user.avatar} alt="" />
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
              <span className={styles.reply}>回复</span>
            </div>
            {childMap[comment.id] && (
              <div className={styles.children}>
                <ul>
                  {childMap[comment.id].comments.map(child => (
                    <li key={child.id}>
                      <div className={styles.user}>
                        <span>
                          <img src={child.user.avatar} alt="" />
                        </span>
                        <span className={styles.name}>{child.user.name}</span>
                      </div>
                      <div className={styles.content}>
                        <div>
                          <p>{child.content}</p>
                        </div>
                      </div>
                      <div className={styles.operate}>
                        <span className={styles.time}>{dayjs(child.createTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                        <span className={styles.reply}>回复</span>
                      </div>
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
      {info.hasMore && (
        <a className={styles.more} onClick={() => setInfo({ ...info, pageNumber: info.pageNumber + 1 })}>
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
