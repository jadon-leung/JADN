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
 
const idConfig = {
  client_id: '160333056268-edmk64mt11fbrovc9m9hb7fdqgpc8vas.apps.googleusercontent.com',
  use_fedcm_for_prompt: true,  // Set this to true to enable FedCM
};

// Initialize FedCM
// async function initializeFedCM() {
//   try {
//     await navigator.credentials.get({
//       identity: {
//         idp: 'https://accounts.google.com',  // Using Google as an Identity Provider
//         client_id: idConfig.client_id,
//         nonce: 'random-nonce',  // Example nonce, adjust as needed
//         useFedCM: idConfig.use_fedcm_for_prompt
//       }
//     });
//     console.log('FedCM initialized successfully');
//   } catch (error) {
//     console.error('Error initializing FedCM:', error);
//   }
// }

// // Call the FedCM initialization function
// initializeFedCM();


