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

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
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
  if (
    error?.response?.data?.errors &&
    Array.isArray(error.response.data.errors) &&
    error.response.data.errors.length > 0
  ) {
    return error.response.data.errors[0].msg || 'Terjadi kesalahan pada server'
  }
  if (error?.response?.data?.message) {
    return error.response.data.message
  }
  if (error?.message) {
    return error.message
  }
  return 'Terjadi kesalahan sistem'
}
