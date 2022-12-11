import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeConfig } from './config/theme.config'
import './index.css'
import './i18n'
import './api/api.conf'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading</div>}>
      <ThemeConfig>
        <App />
      </ThemeConfig>
    </React.Suspense>
  </React.StrictMode>
)
