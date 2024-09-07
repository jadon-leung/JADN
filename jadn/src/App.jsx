import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Initialize Google Identity Services
    if (window.google && !window.signInPromptTriggered){
      google.accounts.id.initialize({
        client_id: '160333056268-edmk64mt11fbrovc9m9hb7fdqgpc8vas.apps.googleusercontent.com', 
        callback: handleCredentialResponse,
        scope: 'https://www.googleapis.com/auth/calendar.events',
        useFedCM: true  
      });
  
      google.accounts.id.prompt();
    }
    
  }, [])

  const handleCredentialResponse = (response) => {
    console.log("token: " + response.credential);
    const t = response.credential
    localStorage.setItem('token', t)
    navigate('/home');  
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
