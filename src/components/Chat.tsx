import { FC, memo } from 'react'

import { ChatList, ChatForm } from '.'
import useChat from '../hooks/useChat'

export const Chat: FC = memo(() => {
  useChat()
  return (
    <>
      <ChatList />
      <ChatForm />
    </>
  )
})
