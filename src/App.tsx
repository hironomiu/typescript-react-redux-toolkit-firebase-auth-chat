import { VFC } from 'react'
import Layout from './components/Layout'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'

const App: VFC = () => {
  return (
    <div>
      <BrowserRouter>
        <Provider store={store}>
          <Layout />
        </Provider>
      </BrowserRouter>
    </div>
  )
}

export default App
