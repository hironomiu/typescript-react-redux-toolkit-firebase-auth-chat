import { FC, useLayoutEffect, useRef, memo } from 'react'
import { useSelector } from 'react-redux'
import { selectMessages } from '../features/chat/chatSlice'
import { Message } from '.'

export const ChatList: FC = memo(() => {
  const messages = useSelector(selectMessages)
  const scrollBottomRef = useRef<null | HTMLDivElement>(null)

  // スクロール一番下へ誘導 -> ref={scrollBottomRef} でポジションを確定
  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView()
  }, [messages])

  return (
    <div className="mt-5 overflow-auto h-[80vh] md:w-[60vh] sm:w-[55vh] bg-gray-100 rounded">
      <div className="p-2">
        {messages[0].key === ''
          ? ''
          : messages?.map((message) => (
              <Message
                key={message.key}
                name={message.name}
                text={message.text}
                createdAt={message.createdAt}
              />
            ))}
        <div ref={scrollBottomRef}></div>
      </div>
    </div>
  )
})
