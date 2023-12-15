import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import PacmanLoader from 'react-spinners/PacmanLoader'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 6000)
  }, [])

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return (
    !loading ?
      <div className='w-full min-h-screen flex flex-wrap content-between bg-slate-200'>
        <div className='w-full block'>
          <Header />
          <main>
            <Outlet />
          </main>
        </div>
        <div className='w-full'>
          <Footer />
        </div>
      </div>
      :
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
        }}
      >
        <PacmanLoader css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100vh',
        }} size={25} color={'#36d7b7'} loading={loading} />
      </div>
  );
}

export default App