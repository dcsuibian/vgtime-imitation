import type { ResponseWrapper, Session } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '@/store'
import { login as loginApi, logout as logoutApi } from '@/apis/client/session'

const initialState: Session = {
  user: null,
}

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
  const res = await fetch(`/api/session`)
  if (!res.ok) {
    throw new Error('请求失败')
  }
  const wrapper: ResponseWrapper<Session> = await res.json()
  if (200 === wrapper.code) {
    dispatch(setSession(wrapper.result))
  }
  return wrapper
}

export const login = (phoneNumber: string, password: string) => async (dispatch: AppDispatch) => {
  const wrapper = await loginApi(phoneNumber, password)
  if (201 !== wrapper.code) {
    throw new Error(wrapper.message)
  }
  dispatch(setSession(wrapper.result))
  return wrapper
}

export const logout = () => async (dispatch: AppDispatch) => {
  const wrapper = await logoutApi()
  if (200 !== wrapper.code) {
    throw new Error(wrapper.message)
  }
  dispatch(clearSession())
  return wrapper
}
export default sessionSlice.reducer
