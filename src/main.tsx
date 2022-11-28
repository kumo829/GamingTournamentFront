import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeConfig } from './config/theme.config'
import './index.css'

axios.defaults.baseURL = 'https://robocode.mozcalti.com'; // prod
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

axios.interceptors.request.use(
    request => {
        if (!request.headers?.Authorization && sessionStorage.getItem("token")) {
            request.headers!.Authorization = sessionStorage.getItem("token");
        }

        return request;
    },
    error => Promise.reject(error)
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeConfig>
      <App />
    </ThemeConfig>
  </React.StrictMode>
)
