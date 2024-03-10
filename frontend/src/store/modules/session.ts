import type { Session } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '@/store'
import { getSession as getSessionApi, login as loginApi, logout as logoutApi } from '@/apis/client/session'

const initialState: Session = null

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<Session>) {
      return action.payload
    },
    clearSession(state) {
      return initialState
    },
  },
})

export const { setSession, clearSession } = sessionSlice.actions

export const fetchSession = () => async (dispatch: AppDispatch) => {
  const wrapper = await getSessionApi()
  dispatch(setSession(wrapper.result))
  return wrapper
}

export const login = (phoneNumber: string, password: string) => async (dispatch: AppDispatch) => {
  const wrapper = await loginApi(phoneNumber, password)
  dispatch(setSession(wrapper.result))
  return wrapper
}

export const logout = () => async (dispatch: AppDispatch) => {
  await logoutApi()
  dispatch(clearSession())
  return  await getSessionApi()
}
export default sessionSlice.reducer
