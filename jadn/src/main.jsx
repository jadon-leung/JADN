import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'


import{
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"

import { GoogleOAuthProvider } from '@react-oauth/google';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/home",
    element: <Home/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId = "160333056268-edmk64mt11fbrovc9m9hb7fdqgpc8vas.apps.googleusercontent.com">
      <RouterProvider router = {router}/>
    </GoogleOAuthProvider>
  </StrictMode>,
)

