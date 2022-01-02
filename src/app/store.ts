import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import chatReducer from '../features/chat/chatSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
