import { FC, useEffect, memo } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkAuthentication,
  selectIsAuthentication,
} from '../features/auth/authSlice'
import { Header, Footer } from './'

export const Layout: FC = memo(() => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthentication = useSelector(selectIsAuthentication)

  useEffect(() => {
    dispatch(checkAuthentication())
  }, [dispatch])

  useEffect(() => {
    if (!isAuthentication) navigate('/login')
  }, [navigate, isAuthentication, dispatch])

  return (
    <div className=" flex flex-col w-screen h-[100vh] bg-gray-100">
      <Header />
      <div className="flex flex-col overflow-y-auto items-center justify-center flex-1 w-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
})
