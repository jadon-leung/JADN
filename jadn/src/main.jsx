import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Home from './pages/Home.jsx'
import fs from 'fs/promises';
import path from 'path';
import process from 'process';




import{
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/home",
    element: <Home/>
  }  // Add a closing bracket here
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>
)
 


