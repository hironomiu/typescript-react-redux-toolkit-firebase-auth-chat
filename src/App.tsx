import { VFC } from 'react'
import { Layout } from './components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import { Login, Profile, Chat } from './components'

const App: VFC = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Chat />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
