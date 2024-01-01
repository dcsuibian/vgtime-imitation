'use client'
import styles from './index.module.scss'
import Loading from './Loading'
import Login from './Login'
import Register from './Register'
import UserCenter from './UserCenter'
import useScrollPosition from '@/hooks/useScrollPosition'
import store, { AppDispatch, RootState } from '@/store'
import { toggle } from '@/store/modules/sidebar'
import { Provider, useDispatch, useSelector } from 'react-redux'

function Sidebar() {
  // 顶部上边距
  const scrollPosition = useScrollPosition()
  const paddingTop = (scrollPosition < 32 ? 80 - scrollPosition : 48) + 'px'
  // 侧边栏状态
  const { collapsed, uri } = useSelector((state: RootState) => state.sidebar)
  const dispatch = useDispatch<AppDispatch>()

  let component
  switch (uri) {
    case 'login':
      component = <Login />
      break
    case 'register':
      component = <Register />
      break
    case 'user-center':
      component = <UserCenter />
      break
    case 'loading':
    default:
      component = <Loading />
      break
  }
  return (
    <aside className={styles.sidebar} style={{ paddingTop, backgroundColor: collapsed ? 'transparent' : '#fff' }}>
      <div className={styles.control}>
        <div onClick={() => dispatch(toggle())}></div>
      </div>
      <div className={styles.main} style={{ left: collapsed ? '-450px' : '0' }}>
        <div style={{ paddingTop }}>{component}</div>
      </div>
    </aside>
  )
}

export default function Wrapper() {
  return (
    <Provider store={store}>
      <Sidebar />
    </Provider>
  )
}
