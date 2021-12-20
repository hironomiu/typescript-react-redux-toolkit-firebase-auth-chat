import { FC } from 'react'

type Props = {
  name: string
  text: string
}
export const Message: FC<Props> = ({ name, text }) => {
  return (
    <div className="flex flex-col m-2">
      <span className="text-gray-700 font-bold">{name}</span>
      <span className="text-gray-500">{text}</span>
    </div>
  )
}
