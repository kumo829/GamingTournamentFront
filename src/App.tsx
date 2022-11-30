import { BrowserRouter, HashRouter } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import AppRouter from './Router'

function App() {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  )
}

export default App
