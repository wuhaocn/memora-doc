import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authApi } from '../services/api/authApi'
import { clearRememberedKnowledgeBase } from '../utils/knowledgeBaseRoute'
import { AUTH_SESSION_CHANGED_EVENT, clearCurrentUser, getCurrentUser, hydrateCurrentUser, isLoggedIn } from '../utils/user'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getCurrentUser())
  const [sessionLoading, setSessionLoading] = useState(true)

  const refreshCurrentSession = async () => {
    if (!isLoggedIn()) {
      setCurrentUser(null)
      return null
    }

    try {
      const response = await authApi.getCurrentSession()
      if (response.code !== 200) {
        return null
      }

      return hydrateCurrentUser(response.data)
    } catch (error) {
      console.error('同步当前会话失败', error)
      clearCurrentUser()
      return null
    }
  }

  useEffect(() => {
    const handleSessionChanged = () => {
      setCurrentUser(getCurrentUser())
    }

    window.addEventListener(AUTH_SESSION_CHANGED_EVENT, handleSessionChanged)
    return () => {
      window.removeEventListener(AUTH_SESSION_CHANGED_EVENT, handleSessionChanged)
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    const bootstrapSession = async () => {
      if (!isLoggedIn()) {
        if (!cancelled) {
          setSessionLoading(false)
        }
        return
      }

      await refreshCurrentSession()
      if (!cancelled) {
        setSessionLoading(false)
      }
    }

    bootstrapSession()

    return () => {
      cancelled = true
    }
  }, [])

  const login = async ({ username, password }) => {
    const response = await authApi.login({ username, password })
    if (response.code !== 200) {
      throw new Error(response.message || '登录失败')
    }

    const nextUser = hydrateCurrentUser(response.data)
    setCurrentUser(nextUser)
    return nextUser
  }

  const logout = () => {
    clearRememberedKnowledgeBase()
    clearCurrentUser()
    setCurrentUser(null)
  }

  const contextValue = useMemo(() => ({
    currentUser,
    sessionLoading,
    isAuthenticated: !!currentUser?.accessToken,
    login,
    logout,
    refreshCurrentSession,
  }), [currentUser, sessionLoading])

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
