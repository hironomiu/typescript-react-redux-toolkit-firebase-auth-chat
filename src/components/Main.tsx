import { FC, useEffect, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectIsAuthentication,
  selectDisplayName,
  selectUid,
} from '../features/auth/authSlice'
import { getFirebaseUser } from '../features/user/userSlice'
import { setName, setUid, readMessages } from '../features/chat/chatSlice'
import { ChatList, ChatForm } from '.'

export const Main: FC = memo(() => {
  const dispatch = useDispatch()
  const isAuthentication = useSelector(selectIsAuthentication)
  const displayName = useSelector(selectDisplayName)
  const uid = useSelector(selectUid)

  useEffect(() => {
    if (isAuthentication) {
      dispatch(setName(displayName))
      dispatch(setUid(uid))
      dispatch(getFirebaseUser(uid))
    }
  }, [isAuthentication, displayName, dispatch, uid])

  useEffect(() => {
    if (isAuthentication) {
      dispatch(readMessages())
    }
  }, [isAuthentication, dispatch])

  return (
    <>
      <ChatList />
      <ChatForm />
    </>
  )
})
