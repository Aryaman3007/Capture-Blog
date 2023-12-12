import React from 'react'
import { useDispatch } from 'react-redux'
import authService from "../../appwrite/auth"
import {logout} from "../../store/authSlice"

const LogoutButton = () => {
    const dispatch = useDispatch()

    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())

        })
    }

  return (
    <button className='rounded-xl font-semibold text-xl inline-block px-6 py-2 duration-200 border border-sky-600 hover:bg-blue-500 hover:text-white' onClick={logoutHandler}>
      Logout
    </button>
  )
}

export default LogoutButton