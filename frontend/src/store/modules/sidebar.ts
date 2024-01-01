import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  collapsed: true,
  uri: 'login',
}

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggle(state) {
      state.collapsed = !state.collapsed
    },
    setUri(state, action: PayloadAction<string>) {
      state.uri = action.payload
    },
  },
})

export const { toggle, setUri } = sidebarSlice.actions

export default sidebarSlice.reducer
