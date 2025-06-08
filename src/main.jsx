import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import { CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(
  
    <StrictMode>
      <Provider store={store}>
      <CssBaseline/>
        <BrowserRouter>  
          <App />
        </BrowserRouter>
      </Provider>
  </StrictMode>,
 
)
