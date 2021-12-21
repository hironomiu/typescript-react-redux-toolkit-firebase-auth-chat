import { FC, useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectIsAuthentication,
  selectDisplayName,
} from '../features/auth/authSlice'
import { setName, readMessages } from '../features/chat/chatSlice'
import { ChatList, ChatForm } from '.'

export const Main: FC = memo(() => {
  const dispatch = useDispatch()
  const isAuthentication = useSelector(selectIsAuthentication)
  const displayName = useSelector(selectDisplayName)

  useEffect(() => {
    if (isAuthentication) dispatch(setName(displayName))
  }, [isAuthentication, displayName, dispatch])

  useEffect(() => {
    if (isAuthentication) {
      dispatch(readMessages())
    }
  }, [isAuthentication, dispatch])

  return (
    <div className="flex flex-col justify-center h-[80vh] md:w-[60vh] sm:w-[55vh]">
      <ChatList />
      <ChatForm />
    </div>
  )
})
