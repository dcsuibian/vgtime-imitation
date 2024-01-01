import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './modules/session'
import sidebarReducer from './modules/sidebar'

const store = configureStore({
  reducer: {
    session: sessionReducer,
    sidebar: sidebarReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store
