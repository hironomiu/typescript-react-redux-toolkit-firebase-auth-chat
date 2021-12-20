import React, { FC, useEffect, memo, useState } from 'react'
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

export const Main: FC = memo(() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  return (
    <div>
      <div>
        {messages[0].key === ''
          ? 'empty'
          : messages?.map((message) => (
              <div key={message.key}>
                {message.name}:{message.text}
              </div>
            ))}
      </div>
      <div>
        <span>{message.name}</span>
        <textarea
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            dispatch(setText(e.target.value))
          }}
          defaultValue={message.text}
        ></textarea>

        <button
          disabled={!message.name || !message.text}
          onClick={() => pushContent(message)}
        >
          push
        </button>
      </div>
    </div>
  )
})
