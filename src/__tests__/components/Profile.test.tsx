import { render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../features/auth/authSlice'
import chatReducer from '../../features/chat/chatSlice'
import userReducer from '../../features/user/userSlice'
import { Provider } from 'react-redux'
import { Profile } from '../../components'

let store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
  },
})

describe('Profile', () => {
  it('Profile', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    )
  })
})
