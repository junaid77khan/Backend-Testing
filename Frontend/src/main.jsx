import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {Login, Register, Home, Profile, History, Myvideos, Logout, Upload, Video} from './components'

const router = createBrowserRouter(
   createRoutesFromElements(

    <Route path='/' element={<App />}>
       <Route path='' element={<Login/>} />
       <Route path='register' element={<Register/>} />
       <Route path='home' element={<Home/>} />
       <Route path='profile' element={<Profile/>} />
       <Route path='my-videos' element={<Myvideos/>} />
       <Route path='history' element={<History/>} />
       <Route path='logout' element={<Logout/>} />
       <Route path='upload' element={<Upload/>} />
       <Route path='/v/:videoId' element={<Video />}/>
    </Route>
   )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
