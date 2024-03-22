import { Button, Card, Col, Form, Input, Row, Select } from 'antd'
import { useState } from 'react'
import MarkdownIt from 'markdown-it'
import styles from './index.module.scss'
import { Topic } from '@/types'
import { addTopic } from '@/apis/topic.ts'
import { useNavigate } from 'react-router-dom'
import { HOME_PATHNAME } from '@/config/routes.tsx'

const md = new MarkdownIt()

export default function Contribution() {
  const [topic, setTopic] = useState<{
    title: Topic['title']
    summary: Topic['summary']
    content: Topic['content']
    cover: Topic['cover']
    type: Topic['type']
    status: Topic['status']
  }>({
    title: '',
    summary: '',
    content: '',
    cover: '',
    type: '新闻',
    status: 'draft',
  })
  const navigate = useNavigate()
  const html = md.render(topic.content)

  const onDraft = async () => {
    await addTopic({
      ...topic,
      status: 'draft',
    })
    navigate(HOME_PATHNAME)
  }
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} xl={12}>
          <Card title="文章">
            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="vertical">
              <Form.Item label="类型">
                <Select
                  defaultValue={topic.type}
                  options={[
                    { label: '新闻', value: '新闻' },
                    { label: '攻略', value: '攻略' },
                    { label: '评测', value: '评测' },
                    { label: '文化', value: '文化' },
                    { label: '漫画', value: '漫画' },
                  ]}
                />
              </Form.Item>
              <Form.Item label="标题">
                <Input value={topic.title} onChange={e => setTopic({ ...topic, title: e.target.value })} />
              </Form.Item>
              <Form.Item label="摘要">
                <Input value={topic.summary} onChange={e => setTopic({ ...topic, summary: e.target.value })} />
              </Form.Item>
              <Form.Item label="封面">
                <Input value={topic.cover} onChange={e => setTopic({ ...topic, cover: e.target.value })} />
              </Form.Item>
              <Form.Item label="内容">
                <Input.TextArea value={topic.content} onChange={e => setTopic({ ...topic, content: e.target.value })} />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} xl={12}>
          <Card title="预览" className={styles.preview}>
            <article>
              <h1 className={styles.title}>{topic.title}</h1>
              <div className={styles.summary}>
                <p>{topic.summary}</p>
              </div>
              <div className={styles.content} dangerouslySetInnerHTML={{ __html: html }}></div>
            </article>
          </Card>
        </Col>
        <div className={styles.footer}>
          <Button type="default" onClick={onDraft}>
            保存草稿
          </Button>
        </div>
      </Row>
    </>
  )
}
