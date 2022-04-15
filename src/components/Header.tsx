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
      <header className="bg-white w-screen">
        <nav className="flex flex-row justify-between ">
          {isAuthentication ? (
            <>
              <div className="py-6 md:ml-4 sm:ml-1">
                <span className="py-3 px-4">Super Chat!!!</span>
                <Link
                  className="py-3 px-4 hover:border-b-2 hover:border-gray-400"
                  to="/"
                >
                  Top
                </Link>
                <Link
                  className="py-3 px-4 hover:border-b-2 hover:border-gray-400"
                  to="/profile"
                >
                  Profile
                </Link>
              </div>
              <div className="py-3 md:mr-4 sm:mr-1">
                <button
                  className="p-3 hover:border-b-2 hover:border-gray-400"
                  onClick={() => dispatch(signOut())}
                >
                  SignOut
                </button>
              </div>
            </>
          ) : (
            <div className="py-6 md:ml-4 sm:ml-1">
              <span className="p-3">Super Chat!!!</span>
            </div>
          )}
        </nav>
      </header>
    </>
  )
})
