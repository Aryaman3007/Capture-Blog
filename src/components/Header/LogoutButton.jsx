import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { useSelector } from 'react-redux'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const authStatus = useSelector((state) => state.auth.status)

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
    !authStatus
  }

  return (
    <button className='mr-8 rounded-xl font-semibold text-xl inline-block text-slate-200 px-6 py-2 duration-200 border border-sky-600 hover:bg-blue-500 hover:text-white' onClick={logoutHandler}>
      Logout
    </button>
  )
}

export default LogoutButton
