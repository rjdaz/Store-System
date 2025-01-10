import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import App from './App.jsx'

const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL || '/Store-System/';

createRoot(document.getElementById('root')).render( 
  <StrictMode>
    <BrowserRouter basename={PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
