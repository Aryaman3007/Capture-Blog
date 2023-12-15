import React from 'react'
import logo from '../images/Capture-logos_white.png'


function Logo({width = '100%'}) {
  return (
    <img src={logo} style={{width}} alt = 'Logo' />
  )
}

export default Logo