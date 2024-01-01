import type { ResponseWrapper, Session } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '@/store'

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
  dispatch(setSession(wrapper.result))
  return wrapper
}

export const login = (phoneNumber: string, password: string) => async (dispatch: AppDispatch) => {
  const res = await fetch(`/api/session`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      phoneNumber,
      password,
    }),
  })
  if (!res.ok) {
    throw new Error('请求失败')
  }
  const wrapper: ResponseWrapper<Session> = await res.json()
  if (201 !== wrapper.code) {
    throw new Error(wrapper.message)
  }
  dispatch(setSession(wrapper.result))
  return wrapper
}

export const logout = () => async (dispatch: AppDispatch) => {
  const res = await fetch(`/api/session`, {
    method: 'DELETE',
  })
  if (!res.ok) {
    throw new Error('请求失败')
  }
  const wrapper: ResponseWrapper<void> = await res.json()
  if (200 !== wrapper.code) {
    throw new Error(wrapper.message)
  }
  dispatch(clearSession())
  return wrapper
}
export default sessionSlice.reducer
