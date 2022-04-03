import { render, screen } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  it('aa', () => {
    let scrollIntoViewMock = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock
    render(<App />)
    expect(screen.getByText('GitHub Login!')).toBeInTheDocument()
  })
})
