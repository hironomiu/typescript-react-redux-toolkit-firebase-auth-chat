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
    // 存在しないことのテスト
    expect(screen.queryByTestId('upload-button')).toBeNull()
    expect(screen.queryByTestId('close-button')).toBeNull()

    userEvent.click(screen.getByTestId('avatar-registration'))
    expect(screen.getByText('アップロード')).toBeInTheDocument()
    // TODO: アップロード画像を選択した場合の not disabled についてもテストを考える
    expect(screen.getByTestId('upload-button')).toHaveAttribute('disabled')
    expect(screen.getByText('閉じる')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('close-button'))
    // TODO: 存在しないことのテスト
  })
})
