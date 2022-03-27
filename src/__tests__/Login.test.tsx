import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Login } from '../components/Login'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../app/store'
describe('Login', () => {
  it('render test cases', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    )
    expect(screen.getByText('GitHub Lgoin!')).toBeInTheDocument()
  })
})
