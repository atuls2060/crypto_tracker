import React from 'react'
import { Route, Routes } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import HomePage from '../pages/HomePage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import CryptoDetailPage from '../pages/CryptoDetailPage'
import WatchListPage from '../pages/WatchListPage'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/cryptodetail/:id' element={<CryptoDetailPage />} />
      <Route path='/watchlist' element={<PrivateRoute><WatchListPage /></PrivateRoute>} />
    </Routes>
  )
}

export default AllRoutes