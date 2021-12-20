import { FC } from 'react'

type Props = {
  name: string
  text: string
}
export const Message: FC<Props> = ({ name, text }) => {
  return (
    <div>
      {name}:{text}
    </div>
  )
}
