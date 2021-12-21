import { VFC } from 'react'
import { Layout } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Login, Profile, Main } from './components'

const App: VFC = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Main />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
          </Routes>
          {/* <Layout /> */}
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
