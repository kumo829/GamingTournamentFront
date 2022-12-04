import React, { ReactElement } from 'react'
import { HashRouter } from 'react-router-dom'
import './App.css'
import AppRouter from './Router'

function App (): ReactElement {
  return (
    <HashRouter>
      <AppRouter />
    </HashRouter>
  )
}

export default App
