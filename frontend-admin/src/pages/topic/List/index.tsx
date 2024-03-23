import { Card, Col, Pagination, Row } from 'antd'
import { useEffect, useState } from 'react'
import { PageWrapper, Topic } from '@/types'
import { getTopics } from '@/apis/topic.ts'
import styles from './index.module.scss'

export default function List() {
  const [page, setPage] = useState<PageWrapper<Topic>>({
    data: [],
    pageNumber: 1,
    pageSize: 16,
    total: 0,
    totalPages: 0,
  })

  useEffect(() => {
    getTopics({},page.pageNumber, page.pageSize).then(wrapper => {
      setPage(wrapper.result)
    })
  }, [page.pageNumber, page.pageSize])
  return (
    <div className={styles.list}>
      <h1>稿件列表</h1>
      <Row gutter={[12, 10]}>
        {page.data.map(topic => (
          <Col span={6} key={topic.id}>
            <Card hoverable={true} cover={<img alt={topic.title} src={topic.cover} />}>
              <Card.Meta title={topic.title} description={topic.summary} />
            </Card>
          </Col>
        ))}
      </Row>
      <div className={styles['pagination-box']}>
        <Pagination
          current={page.pageNumber}
          pageSize={page.pageSize}
          total={page.total}
          showSizeChanger
          pageSizeOptions={[4, 8, 16, 32]}
          onChange={(p, ps) => {
            setPage({ ...page, pageNumber: p, pageSize: ps })
          }}
        />
      </div>
    </div>
  )
}
