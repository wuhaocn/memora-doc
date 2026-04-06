import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const RequireAuth = () => {
  const location = useLocation()
  const { isAuthenticated, sessionLoading } = useAuth()

  if (sessionLoading) {
    return <div style={{ padding: '96px 28px', color: '#7c6f64' }}>正在校验登录状态...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}

export default RequireAuth
