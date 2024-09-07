import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {GoogleLogin} from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize Google Identity Services
    google.accounts.id.initialize({
      client_id: '160333056268-edmk64mt11fbrovc9m9hb7fdqgpc8vas.apps.googleusercontent.com', // Your Google Client ID
      callback: handleCredentialResponse,
      useFedCM: true  // Enable FedCM
    });

    // Display the One Tap or FedCM prompt
    google.accounts.id.prompt();
  }, [])

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Store the token or handle it as needed
    navigate('/home');  // Navigate to home after login
  }
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>JADN: Personal Assitant</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        
      </div>

      <div className="sign">
        
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
