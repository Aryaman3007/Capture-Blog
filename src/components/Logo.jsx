import React from 'react'
import logo from '../images/Logo.png'


function Logo({width = '100%'}) {
  return (
    <img src={logo} style={{width}} alt = 'Logo' />
  )
}

export default Logo