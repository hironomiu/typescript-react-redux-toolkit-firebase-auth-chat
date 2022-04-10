import { render, screen } from '@testing-library/react'
import { Header } from '../../components'
import { configureStore } from '@reduxjs/toolkit'
import authReducer, { signIn } from '../../features/auth/authSlice'
import chatReducer from '../../features/chat/chatSlice'
import userReducer from '../../features/user/userSlice'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

let store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
  },
})
describe('Header', () => {
  it('未ログイン状態', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    )
    expect(screen.getByText('Super Chat!!!')).toBeInTheDocument()
  })
  it('ログイン状態', () => {
    const action = {
      type: signIn.type,
      payload: {
        isAuthentication: true,
      },
    }
    store.dispatch(action)
    // BrowserRouterが必要。(Error: Uncaught [Error: useHref() may be used only in the context of a <Router> component.]で怒られる)
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    )
    expect(screen.getByText(/Top/)).toBeInTheDocument()
    expect(screen.getByText(/Profile/)).toBeInTheDocument()
    expect(screen.getByText(/SignOut/)).toBeInTheDocument()
  })
})
