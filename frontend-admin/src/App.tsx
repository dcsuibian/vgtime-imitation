import { App as AppProvider, ConfigProvider } from 'antd'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchSession } from '@/store/modules/session.ts'
import { AppDispatch } from '@/store'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
    dispatch(fetchSession())
  },[])
  return <RouterProvider router={router} />
}

export default function Wrapper() {
  return (
    <ConfigProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </ConfigProvider>
  )
}
