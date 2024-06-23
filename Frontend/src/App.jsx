import React from 'react'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store'

// const storeATLS = (token) => {
//   localStorage.setItem("Access Token" ,JSON.stringify(token))
// }

// const getATLS = () => {
//   return JSON.parse(localStorage.getItem("Access Token"))
// }

// const deleteATLS = () => {
//   localStorage.removeItem("Access Token")
// }

function App() {
  return (
    <div className='scrollbar'>
      <Provider store={store}>
      <Outlet/>
      </Provider>
    </div>
  )
}

export default App
