import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

// eslint-disable-next-line no-undef
if(process.env.NOD_ENV ==='production') disableReactDevTools();  

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
