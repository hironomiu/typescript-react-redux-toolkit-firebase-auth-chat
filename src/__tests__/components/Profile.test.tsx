import { render, screen } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../features/auth/authSlice'
import chatReducer from '../../features/chat/chatSlice'
import userReducer, { setUser } from '../../features/user/userSlice'
import { Provider } from 'react-redux'
import { Profile } from '../../components'
import userEvent from '@testing-library/user-event'

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
    let action = {
      type: setUser.type,
      payload: {
        uid: '',
        name: 'dummy name',
        photoURL: '',
        email: 'dummy@example.com',
        createdAt: 0,
      },
    }
    store.dispatch(action)
    expect(screen.getByText("dummy name's Profile")).toBeInTheDocument()
    expect(screen.getByText('email:dummy@example.com')).toBeInTheDocument()
    expect(screen.getByText(/Profile/)).toBeInTheDocument()
    expect(screen.getByText('アバター画像を登録する')).toBeInTheDocument()
    expect(screen.getByText('no photo image')).toBeInTheDocument()
    // 画像あり
    action = {
      type: setUser.type,
      payload: {
        uid: '',
        name: 'dummy name',
        photoURL: 'http://dummy',
        email: 'dummy@example.com',
        createdAt: 0,
      },
    }
    store.dispatch(action)
    expect(screen.getByTestId('photo-img')).toBeInTheDocument()
    // クリックイベント
    // TODO: 存在しないことのテスト
    // expect(screen.getByText('アップロード'))

    userEvent.click(screen.getByTestId('avatar-registration'))
    expect(screen.getByText('アップロード')).toBeInTheDocument()
    expect(screen.getByText('閉じる')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('close-button'))
    // TODO: 存在しないことのテスト
  })
})
