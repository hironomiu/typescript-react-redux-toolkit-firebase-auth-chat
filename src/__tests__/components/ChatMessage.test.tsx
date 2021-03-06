import { render, screen } from '@testing-library/react'
import { ChatMessage } from '../../components'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../features/auth/authSlice'
import chatReducer from '../../features/chat/chatSlice'
import userReducer from '../../features/user/userSlice'

let store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
  },
})

describe('ChatMessage', () => {
  const dummyDate = new Date('2022-01-01 00:00:00')

  it('ChatMessage', () => {
    render(
      <Provider store={store}>
        <ChatMessage
          name="dummy name"
          text="dummy text"
          createdAt={Number(dummyDate)}
          photoURL="http://dummy"
        />
      </Provider>
    )
    expect(screen.getByText(/dummy name/i)).toBeInTheDocument()
    expect(screen.getByText(/dummy text/i)).toBeInTheDocument()
    expect(screen.getByText(/2022-01-01 00:00:00/i)).toBeInTheDocument()
    expect(screen.getByTestId('photo-img')).toBeInTheDocument()
    expect(screen.getByTestId('photo-img').getAttribute('src')).toEqual(
      'http://dummy'
    )
  })

  // TODO: photoURLが無い場合のテスト & 設定した場合のテスト

  it('reduxからdefaultURLを取得', () => {
    // TODO: reduxにdefaultURLを設定する
    render(
      <Provider store={store}>
        <ChatMessage
          name="dummy name"
          text="dummy text"
          createdAt={Number(dummyDate)}
          photoURL="http://dummy"
        />
      </Provider>
    )
  })
})
