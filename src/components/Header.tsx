import { Link } from 'react-router-dom'
import { signOut } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthentication } from '../features/auth/authSlice'

export const Header = () => {
  const dispatch = useDispatch()
  const isAuthentication = useSelector(selectIsAuthentication)
  return (
    <>
      <header className="flex flex-col h-[10vh]">
        <nav className="flex flex-row justify-between items-center md:w-[60vh] bg-gray-400">
          <div className="flex-row ml-4">
            <Link className=" mx-2 " to="/">
              Top
            </Link>
            <Link className=" mx-2 " to="/profile">
              Profile
            </Link>
          </div>
          <div className="py-5 mr-4">
            {isAuthentication ? (
              <button className=" mx-2 " onClick={() => dispatch(signOut())}>
                SignOut
              </button>
            ) : null}
          </div>
        </nav>
      </header>
    </>
  )
}

// export default Header
