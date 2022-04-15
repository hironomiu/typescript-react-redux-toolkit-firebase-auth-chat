import React from 'react'
import { FC, memo } from 'react'
import { formatDate } from '../lib/'
import { selectDefaultAvatarURL } from '../features/chat/chatSlice'
import { useSelector } from 'react-redux'

type Props = {
  name: string
  text: string
  createdAt: number
  photoURL: string
}

export const ChatMessage: FC<Props> = memo(
  ({ name, text, photoURL, createdAt }) => {
    const defaultURL = useSelector(selectDefaultAvatarURL)

    const dateTime = new Date(createdAt)
    const output = text.split(/(\n)/).map((item, index) => {
      return (
        <React.Fragment key={index}>
          {item.match(/\n/) ? <br /> : item}
        </React.Fragment>
      )
    })
    return (
      <div className="flex flex-row m-2">
        <img
          className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
          src={photoURL ? photoURL : defaultURL}
          alt=""
          data-testid="photo-img"
        />
        <div className="flex flex-col m-2">
          <span className="text-gray-700 font-bold text-sm">
            {name} {formatDate(dateTime)}
          </span>
          <span className="text-gray-500 text-base">{output}</span>
        </div>
      </div>
    )
  }
)
