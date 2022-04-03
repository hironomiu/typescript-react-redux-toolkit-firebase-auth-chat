import { render, screen } from '@testing-library/react'
import { Header } from '../../components'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../../features/auth/authSlice'
import chatReducer from '../../features/chat/chatSlice'
import userReducer from '../../features/user/userSlice'
import { Provider } from 'react-redux'
let store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
  },
})
describe('Header', () => {
  it('Header', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    expect(screen.getByText('Super Chat!!!')).toBeInTheDocument()
  })
})
