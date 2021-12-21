import { FC, memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pushMessage } from '../firebase'
import { setText, selectMessage } from '../features/chat/chatSlice'

export const ChatForm: FC = memo(() => {
  const autoFocus = (el: HTMLTextAreaElement) => (el ? el.focus() : null)
  const dispatch = useDispatch()
  const message = useSelector(selectMessage)
  // 日本語入力判定用
  const [isJapaneseInput, setIsJapaneseInput] = useState(false)

  return (
    <div className="flex items-center mt-5 ">
      <span className="mr-5">{message.name}</span>
      <textarea
        className="p-2 focus:outline-gray-600 border-solid border-2"
        placeholder="チャットコメント"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          console.log(e.target.enterKeyHint)
          dispatch(setText(e.target.value))
        }}
        // CMD + Enter , CTRL + Enetr 対応(ただし日本語入力中は不可)
        onKeyDown={(e) => {
          if (
            ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) &&
            e.key === 'Enter' &&
            !isJapaneseInput
          ) {
            if (message.text.length !== 0) {
              pushMessage(message)
              dispatch(setText(''))
            }
          }
        }}
        // 日本語入力開始
        onCompositionStart={() => {
          setIsJapaneseInput(true)
        }}
        // 日本語入力終了
        onCompositionEnd={() => {
          setIsJapaneseInput(false)
        }}
        value={message.text}
        ref={autoFocus}
      ></textarea>
      <button
        className="mx-2 px-5 bg-gray-300 rounded focus:outline-gray-600 border-solid border-2 disabled:bg-gray-50 disabled:text-white"
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
