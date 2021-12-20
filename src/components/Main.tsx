import React, { FC, useState, useEffect, memo } from 'react'
import { pushContent, messagesRef } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  selectIsAuthentication,
  selectDisplayName,
} from '../features/auth/authSlice'

export const Main: FC = memo(() => {
  const navigate = useNavigate()
  const isAuthentication = useSelector(selectIsAuthentication)
  const displayName = useSelector(selectDisplayName)

  useEffect(() => {
    console.log(isAuthentication)
    if (!isAuthentication) navigate('/login')
    return function cleanup() {}
  }, [navigate, isAuthentication])

  const [message, setMessage] = useState({
    name: displayName,
    text: '',
  })
  const [messages, setMessages] = useState([{ key: '', name: '', text: '' }])
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')

  const setText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value) {
      setMessage((p) => (p = { ...message, text: e.target.value }))
    }
  }

  useEffect(() => {
    if (isAuthentication) {
      setStatus('loading')
      messagesRef.on('value', (snapshot) => {
        const messages = snapshot.val()

        type Message = {
          name: string
          text: string
        }
        const entries: Array<[string, Message]> = Object.entries(messages)

        type NewMessage = {
          key: string
          name: string
          text: string
        }

        const newMessages: Array<NewMessage> = entries.map((data) => {
          const [key, message] = data

          return { key, ...message }
        })
        setMessages(newMessages)
        setStatus('idle')
      })
    }
  }, [isAuthentication])

  if (status === 'loading') return <div>loading</div>

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
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e)}
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
