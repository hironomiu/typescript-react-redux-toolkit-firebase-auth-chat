import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkAuthentication } from '../features/auth/authSlice'
import { Header, Footer } from './'

const Layout: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthentication())
  }, [dispatch])

  return (
    <div className="flex flex-col justify-center items-center font-mono w-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
