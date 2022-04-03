import { render, screen } from '@testing-library/react'
import { ChatMessage } from '../components'

describe('ChatMessage', () => {
  it('ChatMessage', () => {
    const dummyDate = new Date('2022-01-01 00:00:00')
    render(
      <ChatMessage
        name="dummy name"
        text="dummy text"
        createdAt={Number(dummyDate)}
      />
    )
    expect(screen.getByText(/dummy name/i)).toBeInTheDocument()
    expect(screen.getByText(/dummy text/i)).toBeInTheDocument()
    expect(screen.getByText(/2022-01-01 00:00:00/i)).toBeInTheDocument()
  })
})
