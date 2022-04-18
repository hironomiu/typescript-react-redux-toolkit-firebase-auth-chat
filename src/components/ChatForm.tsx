import { FC, memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { pushMessage } from '../firebase/firebase'
import {
  setText,
  setPhotoURL,
  selectSendMessage,
} from '../features/chat/chatSlice'
import { selectUser } from '../features/user/userSlice'
import Button from './parts/Button'

export const ChatForm: FC = memo(() => {
  const autoFocus = (el: HTMLTextAreaElement) => (el ? el.focus() : null)
  const dispatch = useDispatch()
  const sendMessage = useSelector(selectSendMessage)
  const user = useSelector(selectUser)

  // 日本語入力判定用
  const [isJapaneseInput, setIsInputJapanese] = useState(false)

  // リロード時のphotoURLの空対策
  // TODO: auth,chat,userで各々ユーザ情報を所有しているのがここら辺で大変になってきているのでここ含め整理する
  useEffect(() => {
    dispatch(setPhotoURL(user.photoURL))
  }, [dispatch, user])

  const handleClick = () => {
    // TODO: リロード時などにuserが空になりuser.photoURLが取れない対応(リロード時の認証チェックと同じタイミングでuserを再設定する)
    dispatch(setPhotoURL(user.photoURL))
    pushMessage(sendMessage)
    dispatch(setText(''))
  }

  return (
    <div className="flex items-center my-5 ">
      {/* Tailwindでアバターの表示 */}
      <div className="flex -space-x-2 overflow-hidden flex-col px-4">
        <img
          className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
          src={user.photoURL}
          alt=""
          data-testid="profile-img"
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
      <Button
        title="Post"
        testId=""
        handleClick={handleClick}
        disabled={!sendMessage.name || !sendMessage.text}
        styles="mx-2 py-2 px-5 bg-gray-200 font-bold rounded focus:outline-gray-600 border-solid border-2 hover:bg-black hover:text-white hover:font-bold disabled:bg-gray-50 disabled:text-white"
      />
    </div>
  )
})
