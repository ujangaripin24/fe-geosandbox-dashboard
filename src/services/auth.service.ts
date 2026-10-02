import { apiClient, extractErrorMessage } from '../middelware/auth.interceptor'

export interface UserProfile {
  uuid: string
  username: string
  email: string
  role: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponseData {
  message: string
  data: {
    token: string
  }
}

export interface ProfileResponseData {
  message: string
  data: UserProfile
}

export const authService = {
  async login(credentials: LoginPayload): Promise<{ token: string; message: string }> {
    try {
      const response = await apiClient.post<LoginResponseData>('/auth/login', credentials)
      return {
        token: response.data.data.token,
        message: response.data.message
      }
    } catch (error: any) {
      throw new Error(extractErrorMessage(error))
    }
  },

  async getProfile(): Promise<UserProfile> {
    try {
      const response = await apiClient.get<ProfileResponseData>('/auth/profile')
      return response.data.data
    } catch (error: any) {
      throw new Error(extractErrorMessage(error))
    }
  },

  async refreshToken(): Promise<string | null> {
    try {
      const response = await apiClient.post('/auth/refresh-token', {})
      return response.data?.data?.token || null
    } catch {
      return null
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout', {})
    } catch {
      // Ignore network errors during logout
    }
  }
}
