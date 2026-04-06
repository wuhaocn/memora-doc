const STORAGE_KEY = 'memora-auth-session'
export const AUTH_SESSION_CHANGED_EVENT = 'memora:auth-session-changed'

const normalizeSessionUser = (session) => {
  if (!session?.userId || !session?.tenantId || !session?.accessToken) {
    return null
  }

  return {
    id: session.userId,
    username: session.username || `user-${session.userId}`,
    nickname: session.displayName || session.username || `用户${session.userId}`,
    email: session.email || `${session.userId}@memora.local`,
    avatar: '',
    status: 1,
    tenantId: session.tenantId,
    tenantName: session.tenantName,
    tenantSlug: session.tenantSlug,
    industry: session.industry,
    planName: session.planName,
    role: session.role,
    accessToken: session.accessToken,
  }
}

const readStoredUser = () => {
  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY)
    if (!rawValue) {
      return null
    }

    const parsed = JSON.parse(rawValue)
    if (!parsed?.id || !parsed?.accessToken) {
      return null
    }

    return parsed
  } catch (error) {
    console.error('读取本地会话失败', error)
    return null
  }
}

const persistUser = (user) => {
  if (!user) {
    return null
  }

  const nextValue = JSON.stringify(user)
  const currentValue = window.localStorage.getItem(STORAGE_KEY)
  if (currentValue === nextValue) {
    return user
  }

  window.localStorage.setItem(STORAGE_KEY, nextValue)
  window.dispatchEvent(new CustomEvent(AUTH_SESSION_CHANGED_EVENT, { detail: user }))
  return user
}

export const hydrateCurrentUser = (session) => {
  const sessionUser = normalizeSessionUser(session)
  if (!sessionUser) {
    return null
  }

  return persistUser(sessionUser)
}

export const clearCurrentUser = () => {
  window.localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new CustomEvent(AUTH_SESSION_CHANGED_EVENT))
}

export const isLoggedIn = () => {
  return !!readStoredUser()
}

export const getCurrentUser = () => {
  return readStoredUser()
}
