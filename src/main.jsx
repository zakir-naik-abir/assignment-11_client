import ReactDOM from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import React from 'react'
import AuthProvider from './Providers/AuthProvider'
import { router } from './routes/Routes'
import {Toaster} from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <RouterProvider router={router} />
        <Toaster></Toaster>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)