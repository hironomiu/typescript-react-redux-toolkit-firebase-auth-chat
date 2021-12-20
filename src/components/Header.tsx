import { Link } from 'react-router-dom'
import { signOut } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthentication } from '../features/auth/authSlice'

export const Header = () => {
  const dispatch = useDispatch()
  const isAuthentication = useSelector(selectIsAuthentication)
  return (
    <div>
      ヘッダー
      <Link to="/">Top</Link>
      <Link to="/profile">Profile</Link>
      {isAuthentication ? (
        <button onClick={() => dispatch(signOut())}>SignOut</button>
      ) : null}
    </div>
  )
}

// export default Header
