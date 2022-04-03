import { render, screen } from '@testing-library/react'
import { Footer } from '../../components/Footer'

test('renders learn react link', () => {
  render(<Footer />)
  const linkElement = screen.getByText(/Super Chat!!@2022/i)
  expect(linkElement).toBeInTheDocument()
})
