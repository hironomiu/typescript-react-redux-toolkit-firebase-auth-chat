import { FC, memo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsAuthentication } from '../features/auth/authSlice'
import SignOutModal from './modal/SignOutModal'
export const Header: FC = memo(() => {
  const isAuthentication = useSelector(selectIsAuthentication)
  const [isModalOn, setIsModalOn] = useState<boolean>(false)

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
              <div className="py-6 md:mr-4 sm:mr-1">
                <span
                  className="py-3 hover:cursor-pointer hover:border-b-2 hover:border-gray-400"
                  onClick={() => setIsModalOn(true)}
                >
                  SignOut
                </span>
              </div>
              {isModalOn ? (
                <SignOutModal
                  isModalOn={isModalOn}
                  setIsModalOn={setIsModalOn}
                />
              ) : null}
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
