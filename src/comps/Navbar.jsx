import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuthToken, removeAuthToken } from '../config/api'
import './styles/Navbar.css'

const Navbar = () => {
  const navigate = useNavigate()
  const isAuthenticated = Boolean(getAuthToken())

  const handleLogout = () => {
    removeAuthToken()
    navigate('/')
  }

  return (
    <div className='navbar'>
      <ul>
        <li><a href="/">Home</a></li>
        {isAuthenticated && <li><a href="/problems">Practice</a></li>}
        {isAuthenticated && <li><a href="/addproblem">Craft</a></li>}
        {!isAuthenticated ? (
          <>
            <li><a href="/login">Login</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </>
        ) : (
          <li><p onClick={handleLogout}>Logout</p></li>
        )}
      </ul>
    </div>
  )
}

export default Navbar