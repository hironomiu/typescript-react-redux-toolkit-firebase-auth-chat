import { FC, memo } from 'react'

export const Footer: FC = memo(() => {
  return (
    <div className="flex flex-col justify-center items-center w-screen bg-gray-50">
      <footer>
        <span className=" text-lg">Super Chat!!@2021</span>{' '}
      </footer>
    </div>
  )
})
