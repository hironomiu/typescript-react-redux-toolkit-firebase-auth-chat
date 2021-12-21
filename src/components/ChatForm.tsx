import { FC, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pushMessage } from '../firebase'
import { setText, selectMessage } from '../features/chat/chatSlice'

export const ChatForm: FC = memo(() => {
  const autoFocus = (el: HTMLTextAreaElement) => (el ? el.focus() : null)

  const dispatch = useDispatch()
  const message = useSelector(selectMessage)
  return (
    <div className="flex items-center mt-5">
      <span className="mr-5">{message.name}</span>
      <textarea
        className="p-2 focus:outline-gray-600 border-solid border-2"
        placeholder="チャットコメント"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          dispatch(setText(e.target.value))
        }}
        value={message.text}
        ref={autoFocus}
      ></textarea>
      <button
        className="mx-2 px-5 bg-gray-300 rounded focus:outline-gray-600 border-solid border-2"
        disabled={!message.name || !message.text}
        onClick={() => {
          pushMessage(message)
          dispatch(setText(''))
        }}
      >
        Post
      </button>
    </div>
  )
})
