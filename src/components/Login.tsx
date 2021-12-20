import { FC, memo, useEffect } from 'react'
import { githubProvider } from '../firebase'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectIsAuthentication,
  authentication,
} from '../features/auth/authSlice'

export const Login: FC = memo((props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthentication = useSelector(selectIsAuthentication)

  useEffect(() => {
    if (isAuthentication) navigate('/')
    return function cleanup() {}
  }, [isAuthentication, navigate])

  return (
    <div>
      <button onClick={() => dispatch(authentication(githubProvider))}>
        GitHub
      </button>
    </div>
  )
})
