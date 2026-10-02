import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../../store/auth.store'

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-amber-50/40 text-black p-4">
      <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000] text-center space-y-4 max-w-sm w-full">
        <div className="inline-block bg-yellow-300 border-3 border-black px-4 py-1.5 font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#000] animate-bounce">
          GEOSANDBOX AUTH
        </div>
        <h2 className="text-2xl font-black uppercase text-black">Memverifikasi Sesi...</h2>
        <div className="w-full bg-zinc-200 border-2 border-black h-4 relative overflow-hidden">
          <div className="bg-cyan-300 h-full w-1/2 animate-pulse border-r-2 border-black" />
        </div>
        <p className="text-xs font-bold text-zinc-600">Mohon tunggu sebentar...</p>
      </div>
    </div>
  )
}

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isInitialized, checkAuth } = useAuthStore()

  useEffect(() => {
    if (!isInitialized) {
      checkAuth()
    }
  }, [isInitialized, checkAuth])

  if (!isInitialized) {
    return <LoadingScreen />
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
