import React, { FC, useEffect, memo } from 'react'
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
  selectReadMessagesStatus,
  setReadMessageStatus,
} from '../features/chat/chatSlice'

export const Main: FC = memo(() => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthentication = useSelector(selectIsAuthentication)
  const displayName = useSelector(selectDisplayName)
  const message = useSelector(selectMessage)
  const messages = useSelector(selectMessages)
  const readMessagesStatus = useSelector(selectReadMessagesStatus)

  useEffect(() => {
    if (!isAuthentication) navigate('/login')
    else dispatch(setName(displayName))
  }, [navigate, isAuthentication, displayName, dispatch])

  useEffect(() => {
    if (isAuthentication) {
      dispatch(readMessages())
    }
  }, [isAuthentication, dispatch])

  if (
    readMessagesStatus !== 'idle'
    // ||
    // (messages.length === 1 && messages[0].key === '')
  )
    return <div>loading</div>

  return (
    <div>
      <div>
        {messages.map((message) => (
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
