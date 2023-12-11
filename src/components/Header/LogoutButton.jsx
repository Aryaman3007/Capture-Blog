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
    <button className='font-semibold text-xl inline-block px-6 py-2 duration-200 hover:text-orange-800' onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutButton