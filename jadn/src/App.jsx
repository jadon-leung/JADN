import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Function to handle the Google Sign-In response
    const handleCredentialResponse = (response) => {
      console.log("token: " + response.credential);
      const t = response.credential;
      localStorage.setItem('token', t);
      navigate('/home');
    };

    // Initialize Google Identity Services
    const initializeGoogleSignIn = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '160333056268-edmk64mt11fbrovc9m9hb7fdqgpc8vas.apps.googleusercontent.com',
          callback: handleCredentialResponse,
          context: 'signin',
          ux_mode: 'popup',
          login_uri: 'http://localhost:5173', // Replace with your login URL
          nonce: '',
          scope: 'https://www.googleapis.com/auth/calendar.events',
          itp_support: true
        });

        window.google.accounts.id.renderButton(
          document.getElementById('g_id_signin'),
          {
            type: 'standard',
            shape: 'rectangular',
            theme: 'outline',
            text: 'signin_with',
            size: 'large',
            logo_alignment: 'left'
          }
        );
      }
    };

    // Load the Google Identity Services script
    const loadGsiScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleSignIn;
      document.body.appendChild(script);
    };

    loadGsiScript();

   
  }, [navigate]);

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
      <h1>JADN: Personal Assistant</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

        <div id="g_id_signin"></div>

        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
