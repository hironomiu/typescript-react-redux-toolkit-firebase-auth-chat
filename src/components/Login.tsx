import { FC, memo, useEffect } from 'react'
import { githubProvider } from '../firebase/firebase'
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
    <>
      <button
        className="mx-2 py-2 px-5 bg-gray-300 rounded focus:outline-gray-600 border-solid border-2"
        onClick={() => dispatch(authentication(githubProvider))}
        data-testid="github-login-button"
      >
        GitHub Lgoin!
      </button>
    </>
  )
})
