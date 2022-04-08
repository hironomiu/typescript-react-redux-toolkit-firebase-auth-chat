import { FC, memo, useEffect } from 'react'
import { githubProvider } from '../firebase/firebase'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  selectIsAuthentication,
  authentication,
} from '../features/auth/authSlice'
import Button from './parts/Button'
export const Login: FC = memo((props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuthentication = useSelector(selectIsAuthentication)

  useEffect(() => {
    if (isAuthentication) navigate('/')
    return function cleanup() {}
  }, [isAuthentication, navigate])

  const handleClick = () => {
    dispatch(authentication(githubProvider))
  }

  return (
    <>
      <Button
        title=" GitHub Login!"
        testId="github-login-button"
        handleClick={handleClick}
      />
    </>
  )
})
