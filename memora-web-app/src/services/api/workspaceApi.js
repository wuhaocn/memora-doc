import httpClient from '../http/axios'

export const workspaceApi = {
  getCurrentDashboard: async () => {
    return httpClient.get('/api/v1/workspaces/current/dashboard')
  },
}
