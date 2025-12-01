import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from'./store/store.js'
import { BrowserRouter } from "react-router-dom";
import { client } from './appwrite/appwrite.js';

// Ping Appwrite backend server to verify setup
client.ping();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
