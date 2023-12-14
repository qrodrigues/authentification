import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import App from './App'
import { UserProvider } from './providers/UserContext'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
    <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>
  </BrowserRouter>,
)