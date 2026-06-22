import React from 'react'
import './Navbar.css'

function Navbar({session}) {
  return (
    <div className='Navbar'>
        <h1 className='logoMenu'>Stock<span>Flow</span></h1>
        <p>Logado como {session.user.email}</p>
    </div>
  )
}

export default Navbar