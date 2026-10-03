import { create } from 'zustand'
import { authService, type LoginPayload, type RegisterPayload, type UserProfile } from '../services/auth.service'

interface AuthState {
    token: string | null
    user: UserProfile | null
    isAuthenticated: boolean
    isLoading: boolean
    isInitialized: boolean
    error: string | null
    message: string | null

    setToken: (token: string | null) => void
    setUser: (user: UserProfile | null) => void
    clearError: () => void
    login: (credentials: LoginPayload) => Promise<void>
    checkAuth: () => Promise<void>
    logout: () => Promise<void>
    registerUser: (credentials: RegisterPayload) => Promise<string>
}

export const useAuthStore = create<AuthState>((set, get) => ({
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isInitialized: false,
    error: null,
    message: null,

    setToken: (token: string | null) => set({ token, isAuthenticated: !!token }),
    setUser: (user: UserProfile | null) => set({ user }),
    clearError: () => set({ error: null }),

    login: async (credentials: LoginPayload) => {
        set({ isLoading: true, error: null })
        try {
            const { token } = await authService.login(credentials)
            set({ token, isAuthenticated: true })

            const profile = await authService.getProfile()
            set({ user: profile, isLoading: false, isInitialized: true, error: null })
        } catch (err: any) {
            set({
                error: err.message || 'Login gagal',
                isLoading: false,
                isAuthenticated: false,
                token: null,
                user: null
            })
            throw err
        }
    },

    checkAuth: async () => {
        const state = get()
        if (state.isInitialized && state.user) return

        set({ isLoading: true })
        try {
            const profile = await authService.getProfile()
            set({
                user: profile,
                isAuthenticated: true,
                isInitialized: true,
                isLoading: false,
                error: null
            })
        } catch {
            try {
                const newToken = await authService.refreshToken()
                if (newToken) {
                    set({ token: newToken, isAuthenticated: true })
                    const profile = await authService.getProfile()
                    set({
                        user: profile,
                        isAuthenticated: true,
                        isInitialized: true,
                        isLoading: false,
                        error: null
                    })
                    return
                }
            } catch {
                // Refresh token failed as well
            }

            set({
                token: null,
                user: null,
                isAuthenticated: false,
                isInitialized: true,
                isLoading: false,
                error: null
            })
        }
    },

    logout: async () => {
        set({ isLoading: true })
        try {
            await authService.logout()
        } finally {
            set({
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                isInitialized: true,
                error: null
            })
        }
    },

    registerUser: async (credentials: RegisterPayload) => {
        set({ isLoading: true, error: null })
        try {
            const response = await authService.registerUser(credentials)
            set({ isLoading: false, isInitialized: true, error: null })
            return response
        } catch (err: any) {
            set({
                error: err.message || 'Register gagal',
                isLoading: false,
                isAuthenticated: false,
                token: null,
                user: null
            })
            throw err
        }
    }

}))
