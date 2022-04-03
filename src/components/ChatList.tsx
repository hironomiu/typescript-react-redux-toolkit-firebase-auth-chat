import { FC, useLayoutEffect, useRef, memo } from 'react'
import { useSelector } from 'react-redux'
import { selectMessages } from '../features/chat/chatSlice'
import { ChatMessage } from '.'

// memo化する際にfunction宣言じゃないと怒られるため
export const ChatList: FC = memo(() => {
  const messages = useSelector(selectMessages)
  const scrollBottomRef = useRef<null | HTMLDivElement>(null)

  // スクロール一番下へ誘導 -> ref={scrollBottomRef} でポジションを確定
  useLayoutEffect(() => {
    if (scrollBottomRef) {
      if (scrollBottomRef.current) {
        scrollBottomRef.current.scrollIntoView()
      }
    }
  }, [messages])

  return (
    <div
      className="mt-5 overflow-auto h-[80vh] w-[80vw] bg-gray-100 rounded"
      data-testid="chat-list-div"
    >
      <div className="p-2">
        {messages[0].key === ''
          ? ''
          : messages?.map((message) => (
              <ChatMessage
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
