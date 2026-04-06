import httpClient from '../http/axios'

export const authApi = {
  login: async (payload) => {
    return httpClient.post('/api/v1/auth/login', payload)
  },

  getCurrentSession: async () => {
    return httpClient.get('/api/v1/auth/session')
  },
}
