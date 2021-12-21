import { FC, memo } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuthentication } from '../features/auth/authSlice'

export const Header: FC = memo(() => {
  const dispatch = useDispatch()
  const isAuthentication = useSelector(selectIsAuthentication)

  return (
    <>
      <header className="flex flex-col">
        <div className="flex justify-center bg-gray-400 w-screen">
          <nav className="flex flex-row justify-between items-center md:w-[80vh] sm:w-[60vh] ">
            <div className="py-6 md:ml-4 sm:ml-1">
              <Link className="p-3 hover:bg-gray-500 rounded" to="/">
                Top
              </Link>
              <Link className="p-3 hover:bg-gray-500 rounded" to="/profile">
                Profile
              </Link>
            </div>
            <div className="py-3 md:mr-4 sm:mr-1">
              {isAuthentication ? (
                <button
                  className=" p-3 hover:bg-gray-500 rounded "
                  onClick={() => dispatch(signOut())}
                >
                  SignOut
                </button>
              ) : null}
            </div>
          </nav>
        </div>
      </header>
    </>
  )
})
