import { useEffect, useState } from 'react'
import { getUsers } from '@/apis/user.ts'
import { PageWrapper, User } from '@/types'
import { Table, TablePaginationConfig } from 'antd'

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '用户',
    dataIndex: 'name',
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
  return (
    <div>
      <Table dataSource={page.data} columns={columns} rowKey={'id'} pagination={pagination} onChange={onChange} />
    </div>
  )
}
