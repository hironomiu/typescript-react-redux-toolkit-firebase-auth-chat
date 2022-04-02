import { FC, memo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pushMessage } from '../firebase/firebase'
import { setText, selectSendMessage } from '../features/chat/chatSlice'
import { selectUser } from '../features/user/userSlice'

export const ChatForm: FC = memo(() => {
  const autoFocus = (el: HTMLTextAreaElement) => (el ? el.focus() : null)
  const dispatch = useDispatch()
  const sendMessage = useSelector(selectSendMessage)
  const user = useSelector(selectUser)

  // 日本語入力判定用
  const [isJapaneseInput, setIsInputJapanese] = useState(false)

  return (
    <div className="flex items-center my-5 ">
      {/* Tailwindでアバターの表示 */}
      <div className="flex -space-x-2 overflow-hidden flex-col px-4">
        <img
          className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
          src={user.photoURL}
          alt=""
        />
        <span className="pl-1"> {sendMessage.name}</span>
      </div>

      <textarea
        className="p-2 focus:outline-gray-600 border-solid border-2"
        placeholder="チャットコメント"
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          dispatch(setText(e.target.value))
        }}
        // CMD + Enter , CTRL + Enetr 対応(ただし日本語入力中は不可)
        onKeyDown={(e) => {
          if (
            ((e.ctrlKey && !e.metaKey) || (!e.ctrlKey && e.metaKey)) &&
            e.key === 'Enter' &&
            !isJapaneseInput
          ) {
            if (sendMessage.text.length !== 0) {
              pushMessage(sendMessage)
              dispatch(setText(''))
            }
          }
        }}
        // 日本語入力開始
        onCompositionStart={() => {
          setIsInputJapanese(true)
        }}
        // 日本語入力終了
        onCompositionEnd={() => {
          setIsInputJapanese(false)
        }}
        value={sendMessage.text}
        ref={autoFocus}
      ></textarea>
      <button
        className="mx-2 px-5 bg-gray-300 rounded focus:outline-gray-600 border-solid border-2 disabled:bg-gray-50 disabled:text-white"
        disabled={!sendMessage.name || !sendMessage.text}
        onClick={() => {
          pushMessage(sendMessage)
          dispatch(setText(''))
        }}
      >
        Post
      </button>
    </div>
  )
})
