import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import authReducer from '../../features/auth/authSlice'
import chatReducer, { setName } from '../../features/chat/chatSlice'
import userReducer from '../../features/user/userSlice'
import { ChatForm } from '../../components/ChatForm'
import { Provider } from 'react-redux'
import userEvent from '@testing-library/user-event'

let store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
  },
})

beforeEach(() => {
  store = configureStore({
    reducer: {
      auth: authReducer,
      chat: chatReducer,
      user: userReducer,
    },
  })
})

describe('ChatForm', () => {
  it('test', () => {
    render(
      <Provider store={store}>
        <ChatForm />
      </Provider>
    )

    expect(screen.getByTestId('profile-img')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveAttribute('disabled')
    userEvent.type(screen.getByRole('textbox'), 'test')
    expect(screen.getByRole('textbox')).toHaveValue('test')
    // sendMessage.nameに設定する
    expect(store.getState().chat.sendMessage.name).toBe('')
    const action = { type: setName.type, payload: 'dummy name' }
    store.dispatch(action)
    expect(store.getState().chat.sendMessage.name).toBe('dummy name')
    expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
  })
})
