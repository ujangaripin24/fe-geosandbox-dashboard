import axios from 'axios'
import { useAuthStore } from '../store/auth.store'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'

export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Type': 'web'
  }
})

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['X-Client-Type'] = 'web'
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor for handling token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const requestUrl = originalRequest?.url || ''

    const isAuthEndpoint =
      requestUrl.includes('/auth/login') ||
      requestUrl.includes('/auth/refresh-token') ||
      requestUrl.includes('/auth/logout')

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      originalRequest._retry = true
      try {
        const refreshRes = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            headers: { 'X-Client-Type': 'web' }
          }
        )
        const newToken = refreshRes.data?.data?.token
        if (newToken) {
          useAuthStore.getState().setToken(newToken)
          originalRequest.headers.Authorization = `Bearer ${newToken}`
          return apiClient(originalRequest)
        }
      } catch (refreshErr) {
        useAuthStore.getState().logout()
      }
    }
    return Promise.reject(error)
  }
)

export const extractErrorMessage = (error: any): string => {
  const data = error?.response?.data
  if (Array.isArray(data) && data.length > 0 && data[0]?.msg) {
    return data[0].msg
  }
  if (
    data?.errors &&
    Array.isArray(data.errors) &&
    data.errors.length > 0
  ) {
    return data.errors[0].msg || 'Terjadi kesalahan pada server'
  }
  if (data?.message) {
    return data.message
  }
  if (error?.message) {
    return error.message
  }
  return 'Terjadi kesalahan sistem'
}
