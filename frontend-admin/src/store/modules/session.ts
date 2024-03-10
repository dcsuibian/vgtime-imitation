import type { Session } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getSession as getSessionApi, login as loginApi, logout as logoutApi } from '@/apis/session'
import { AppDispatch } from '@/store'

const initialState: Session = null

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(_, action: PayloadAction<Session>) {
      return action.payload
    },
    clearSession() {
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
  return await getSessionApi()
}

export default sessionSlice.reducer
