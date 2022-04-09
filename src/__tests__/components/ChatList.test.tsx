import { render, screen, cleanup } from '@testing-library/react'
import { ChatList } from '../../components/ChatList'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../features/auth/authSlice'
import chatReducer, { setMessages } from '../../features/chat/chatSlice'
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
    expect(screen.getByTestId('chat-list-main-div')).toBeInTheDocument()
    expect(screen.getByTestId('chat-list-div')).toBeInTheDocument()
    const element: HTMLDivElement = screen.getByTestId('chat-list-div')
    expect(element.nodeValue).toBeNull()
    // messagesをモック
    const action = {
      type: setMessages.type,
      payload: [
        {
          key: '1',
          uid: 'dummy uid 1',
          name: 'dummy name 1',
          text: 'dummy text 1',
          createdAt: 1643641200000,
        },
        {
          key: '2',
          uid: 'dummy uid 2',
          name: 'dummy name 2',
          text: 'dummy text 2',
          createdAt: 1646060400000,
        },
      ],
    }
    store.dispatch(action)
    // const messages = store.getState().chat.messages
    expect(
      screen.getByText('dummy name 1 2022-02-01 00:00:00')
    ).toBeInTheDocument()
    expect(screen.getByText('dummy text 1')).toBeInTheDocument()
    expect(
      screen.getByText('dummy name 2 2022-03-01 00:00:00')
    ).toBeInTheDocument()
    expect(screen.getByText('dummy text 2')).toBeInTheDocument()
  })
})
