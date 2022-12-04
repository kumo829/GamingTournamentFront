import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RouterLayout from './common/RouterLayout'
import HomePage from './pages/home'
import Login from './pages/login'

const AppRouter: React.FC<{}> = () => {
  return (
        <Routes>
            <Route path="/" element={<RouterLayout />}>
            <Route path="/" element={<Login />} />
                <Route path="/home" element={<HomePage></HomePage>} />
            </Route>
            <Route path="*" element={<p>Not Found</p>} />
        </Routes>
  )
}

export default AppRouter
