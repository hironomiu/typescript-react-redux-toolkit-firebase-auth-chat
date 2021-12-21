import { FC, memo } from 'react'

type Props = {
  name: string
  text: string
  createdAt: string
}

export const Message: FC<Props> = memo(({ name, text, createdAt }) => {
  const dateTime = new Date(createdAt)
  return (
    <div className="flex flex-col m-2">
      <span className="text-gray-700 font-bold text-sm">
        {name} {dateTime.toDateString()}
      </span>
      <span className="text-gray-500 text-base">{text}</span>
    </div>
  )
})
