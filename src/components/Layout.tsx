import { FC, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkAuthentication,
  selectIsAuthentication,
} from '../features/auth/authSlice'
import { Header, Footer } from './'

const Layout: FC = () => {
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
    <div className="flex flex-col justify-center items-center font-mono w-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
