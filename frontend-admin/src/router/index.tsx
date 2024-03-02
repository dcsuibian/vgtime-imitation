import type { RouteObject } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'

const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]
const router = createBrowserRouter(routes)
export default router
