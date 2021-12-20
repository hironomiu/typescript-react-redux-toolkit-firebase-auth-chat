import React, { FC, useEffect, memo, useRef, useLayoutEffect } from 'react'
import { pushContent } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectIsAuthentication,
  selectDisplayName,
} from '../features/auth/authSlice'
import {
  setName,
  setText,
  selectMessage,
  selectMessages,
  readMessages,
} from '../features/chat/chatSlice'
import { Message } from '.'

export const Main: FC = memo(() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const scrollBottomRef = useRef<null | HTMLDivElement>(null)
  const isAuthentication = useSelector(selectIsAuthentication)
  const displayName = useSelector(selectDisplayName)
  const message = useSelector(selectMessage)
  const messages = useSelector(selectMessages)

  useEffect(() => {
    if (!isAuthentication) navigate('/login')
    else dispatch(setName(displayName))
  }, [navigate, isAuthentication, displayName, dispatch])

  useEffect(() => {
    if (isAuthentication) {
      dispatch(readMessages())
    }
  }, [isAuthentication, dispatch])

  // スクロール一番下へ誘導 -> ref={scrollBottomRef} でポジションを確定
  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView()
  }, [messages])

  const autoFocus = (el: HTMLTextAreaElement) => (el ? el.focus() : null)

  return (
    <div className="flex flex-col justify-center h-[80vh] md:w-[60vh] sm:w-[55vh]">
      <div
        id="chat"
        className="overflow-auto h-[80vh] md:w-[60vh] sm:w-[55vh] bg-gray-100 rounded"
      >
        <div className="p-2">
          {messages[0].key === ''
            ? ''
            : messages?.map((message) => (
                <Message
                  key={message.key}
                  name={message.name}
                  text={message.text}
                />
              ))}
          <div ref={scrollBottomRef}></div>
        </div>
      </div>
      <div className="flex items-center mt-5">
        <span className="mr-5">{message.name}</span>
        <textarea
          className="p-2"
          placeholder="チャットコメント"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(setText(e.target.value))
          }}
          defaultValue={message.text}
          ref={autoFocus}
        ></textarea>

        <button
          className="mx-2 px-5 bg-gray-300 rounded"
          disabled={!message.name || !message.text}
          onClick={() => pushContent(message)}
        >
          Post
        </button>
      </div>
    </div>
  )
})
