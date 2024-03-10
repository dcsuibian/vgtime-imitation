import Layout from '@/components/Layout'
import { EditOutlined, SettingOutlined } from '@ant-design/icons'
import UserManagement from '@/pages/system/UserManagement'
import Contribution from '@/pages/topic/Contribution'
import Login from '@/pages/Login'
import NotFound from '@/pages/NotFound'
import React from 'react'

export type Route = {
  path: string
  element?: React.ReactNode
  children?: Route[]
  name?: string
  icon?: React.ReactNode
}
export const HOME_PATHNAME = '/'
export const LOGIN_PATHNAME = '/login'

const originalRoutes: Route[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        name: '系统管理',
        icon: <SettingOutlined />,
        path: 'system-management',
        children: [
          {
            name: '用户管理',
            path: 'user-management',
            element: <UserManagement />,
          },
        ],
      },
      {
        path: 'topic-management',
        name: '稿件管理',
        icon: <EditOutlined />,
        children: [
          {
            path: 'contribution',
            name: '投稿',
            element: <Contribution />,
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

function processRoute(routes: Route[]): Route[] {
  const result: Route[] = []
  for (const route of routes) {
    const newRoute = { ...route }
    if (newRoute.children) {
      newRoute.children = processRoute(newRoute.children)
    }
    result.push(newRoute)
  }
  return result
}

const routes = processRoute(originalRoutes)
export default routes
