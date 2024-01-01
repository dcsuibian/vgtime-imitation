import type { Session } from '@/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  },
})

export const { setSession } = sessionSlice.actions

export default sessionSlice.reducer
