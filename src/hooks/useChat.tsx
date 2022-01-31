import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectIsAuthentication,
  selectDisplayName,
  selectUid,
} from '../features/auth/authSlice'
import { getFirebaseUser } from '../features/user/userSlice'
import { setName, setUid, readMessages } from '../features/chat/chatSlice'

const useChat = () => {
  const dispatch = useDispatch()
  const isAuthentication = useSelector(selectIsAuthentication)
  const displayName = useSelector(selectDisplayName)
  const uid = useSelector(selectUid)
  console.log('useChat uid:', uid)

  useEffect(() => {
    if (isAuthentication) {
      dispatch(setName(displayName))
      dispatch(setUid(uid))
      console.log('uid:', uid)
      dispatch(getFirebaseUser(uid))
    }
  }, [isAuthentication, displayName, dispatch, uid])

  useEffect(() => {
    if (isAuthentication) {
      dispatch(readMessages())
    }
  }, [isAuthentication, dispatch])

  return
}

export default useChat
