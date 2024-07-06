import React from 'react'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { Header } from './components'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className='scrollbar'>
      <Provider store={store}>
        <Outlet/>
        <ToastContainer/>
      </Provider>
    </div>
  )
}

export default App
