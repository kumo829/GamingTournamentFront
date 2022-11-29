import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeConfig } from './config/theme.config'
import './index.css'
import './i18n';

axios.defaults.baseURL = 'http://localhost:8080';
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
    <React.Suspense fallback={<div>Loading</div>}>
      <ThemeConfig>
        <App />
      </ThemeConfig>
    </React.Suspense>
  </React.StrictMode>
)
