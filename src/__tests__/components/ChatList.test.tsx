import { render, screen, cleanup } from '@testing-library/react'
import { ChatList } from '../../components/ChatList'
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

afterEach(() => {
  cleanup()
})
// TODO messagesをモックしてテストを書く
describe('ChatList', () => {
  it('ChatList', () => {
    let scrollIntoViewMock = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
    // 上で回避 TypeError: _scrollBottomRef$curr.scrollIntoView is not a function
    render(
      <Provider store={store}>
        <ChatList />
      </Provider>
    )
    expect(screen.getByTestId('chat-list-div')).toBeInTheDocument()
  })
})
