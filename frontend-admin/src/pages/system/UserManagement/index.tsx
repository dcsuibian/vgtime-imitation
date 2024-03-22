import { useEffect, useState } from 'react'
import { editUserPartially, getUsers } from '@/apis/user.ts'
import { PageWrapper, User } from '@/types'
import { Avatar, Button, Form, Input, Modal, Radio, Select, Table, TablePaginationConfig } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { ColumnsType } from 'antd/es/table'

const originalColumns: ColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '用户',
    dataIndex: 'name',
    render(text, record) {
      return (
        <>
          <Avatar src={record.avatar} />
          <span>{text}</span>
        </>
      )
    },
  },
  {
    title: '性别',
    dataIndex: 'gender',
  },
  {
    title: '角色',
    dataIndex: 'role',
  },
  {
    title: '电话号码',
    dataIndex: 'phoneNumber',
  },
  {
    title: '电子邮箱',
    dataIndex: 'email',
  },
]

export default function UserManagement() {
  const [page, setPage] = useState<PageWrapper<User>>({
    data: [],
    pageNumber: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  })
  const [modalOpen, setModalOpen] = useState(false)
  const { user } = useSelector((state: RootState) => state.session)
  const [form] = Form.useForm<User>()
  let columns
  if ('管理员' === user.role) {
    // 只有管理员才能对用户进行操作
    columns = [
      ...originalColumns,
      {
        title: '操作',
        key: 'action',
        render: (_: string, record: User) => {
          if ('管理员' === record.role) {
            // 无法对管理员进行任何操作
            return null
          } else {
            return (
              <Button
                type="link"
                onClick={() => {
                  form.setFieldsValue(record)
                  setModalOpen(true)
                }}
              >
                编辑
              </Button>
            )
          }
        },
      },
    ]
  } else {
    columns = originalColumns
  }

  useEffect(() => {
    getUsers(page.pageNumber, page.pageSize).then(wrapper => {
      setPage(wrapper.result)
    })
  }, [page.pageNumber, page.pageSize])
  const pagination = {
    pageSize: page.pageSize,
    current: page.pageNumber,
    total: page.total,
  }
  const onChange = (pagination: TablePaginationConfig) => {
    setPage({
      ...page,
      pageNumber: pagination.current,
      pageSize: pagination.pageSize,
    })
  }
  const onOk = async () => {
    const values = await form.validateFields()
    console.log('values', values)
    const wrapper = await editUserPartially(values)
    const newValues = wrapper.result
    const newData = [...page.data]
    for (let i = 0; i < page.data.length; i++) {
      if (page.data[i].id === newValues.id) {
        newData[i] = newValues
        break
      }
    }
    setPage({
      ...page,
      data: newData,
    })
    setModalOpen(false)
  }
  return (
    <div>
      <Table dataSource={page.data} columns={columns} rowKey="id" pagination={pagination} onChange={onChange} />
      <Modal title="编辑用户" width={800} open={modalOpen} onOk={onOk} onCancel={() => setModalOpen(false)}>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 10 }} form={form}>
          <Form.Item name="id" label="ID">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="name" label="用户名">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码">
            <Input placeholder="不填即不修改" />
          </Form.Item>
          <Form.Item name="role" label="角色">
            <Select
              options={[
                { label: '新闻编辑', value: '新闻编辑' },
                { label: '普通用户', value: '普通用户' },
              ]}
            />
          </Form.Item>
          <Form.Item name="phoneNumber" label="电话号码">
            <Input />
          </Form.Item>
          <Form.Item name="avatar" label="头像">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="电子邮箱">
            <Input />
          </Form.Item>
          <Form.Item name="gender" label="性别">
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
              <Radio value="保密">保密</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
