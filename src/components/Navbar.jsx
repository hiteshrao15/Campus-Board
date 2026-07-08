import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NotificationBell from './NotificationBell'

export default function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'aurora'
    return window.localStorage.getItem('campusboard-theme') || 'aurora'
  })

  useEffect(() => {
    document.body.dataset.theme = theme
    window.localStorage.setItem('campusboard-theme', theme)
  }, [theme])

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        CampusBoard
      </Link>

      {user && (
        <div className="navbar-right">
          <label className="theme-switcher" aria-label="Theme selector">
            <span aria-hidden="true">🎨</span>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="aurora">Aurora</option>
              <option value="midnight">Midnight</option>
              <option value="sunset">Sunset</option>
              <option value="forest">Forest</option>
            </select>
          </label>
          <NotificationBell userId={user.id} />
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  )
}
