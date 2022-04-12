import React from 'react'
import { FC, memo } from 'react'
import { formatDate } from '../lib/'

type Props = {
  name: string
  text: string
  createdAt: number
  photoURL: string
}

export const ChatMessage: FC<Props> = memo(
  ({ name, text, photoURL, createdAt }) => {
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
        {/* TODO: photoURLが空だった場合に表示するデフォルトの画像の設定 */}
        <img
          className="inline-block h-14 w-14 rounded-full ring-2 ring-white"
          src={photoURL}
          alt=""
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
