import { FC, memo } from 'react'

type Props = {
  name: string
  text: string
  createdAt: number
}

// TODO 切り出す
const formatDate = (dt: Date) => {
  const y = dt.getFullYear()
  const m = ('00' + (dt.getMonth() + 1)).slice(-2)
  const d = ('00' + dt.getDate()).slice(-2)
  const h = ('00' + dt.getHours()).slice(-2)
  const M = ('00' + dt.getMinutes()).slice(-2)
  const s = ('00' + dt.getSeconds()).slice(-2)
  return y + '-' + m + '-' + d + ' ' + h + ':' + M + ':' + s
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
