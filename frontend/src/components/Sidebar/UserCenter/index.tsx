import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { logout } from '@/store/modules/session'
import { setUri } from '@/store/modules/sidebar'

export default function UserCenter() {
  const { user } = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch<AppDispatch>()
  const handleLogout = () => {
    dispatch(logout()).then(() => dispatch(setUri('login')))
  }
  return (
    <div>
      <h1>{user?.name}</h1>
      <button type="button" onClick={handleLogout}>
        退出
      </button>
    </div>
  )
}
