import { FC, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkAuthentication } from '../features/auth/authSlice'
import { Login, Header, Main, Footer } from './'

const Layout: FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkAuthentication())
    return function cleanup() {}
  }, [dispatch])

  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default Layout
