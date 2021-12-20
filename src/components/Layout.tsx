import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkAuthentication } from '../features/auth/authSlice'
import { Header, Footer } from './'

const Layout: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthentication())
    return function cleanup() {}
  }, [dispatch])

  return (
    <div>
      <Header></Header>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  )
}

export default Layout
