import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import authReducer from '../features/auth/authSlice'
import chatReducer from '../features/chat/chatSlice'
import userReducer from '../features/user/userSlice'
import { ChatForm } from '../components/ChatForm'
import { Provider } from 'react-redux'

let store: any

beforeEach(() => {
  store = configureStore({
    reducer: {
      auth: authReducer,
      chat: chatReducer,
      user: userReducer,
    },
  })
})

// TODO 書き足す
describe('ChatForm', () => {
  it('test', () => {
    render(
      <Provider store={store}>
        <ChatForm />
      </Provider>
    )
    expect(screen.getByTestId('profile-img')).toBeInTheDocument()
  })
})
