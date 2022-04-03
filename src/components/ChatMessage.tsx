import { FC, memo } from 'react'
import { formatDate } from '../lib/'

type Props = {
  name: string
  text: string
  createdAt: number
}

export const ChatMessage: FC<Props> = memo(({ name, text, createdAt }) => {
  const dateTime = new Date(createdAt)
  return (
    <div className="flex flex-col m-2">
      <span className="text-gray-700 font-bold text-sm">
        {name} {formatDate(dateTime)}
      </span>
      <span className="text-gray-500 text-base">{text}</span>
    </div>
  )
})
