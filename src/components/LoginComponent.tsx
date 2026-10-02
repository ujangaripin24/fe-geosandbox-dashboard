import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'

const LoginComponent: React.FC = () => {
  const navigate = useNavigate()
  const {
    login,
    logout,
    checkAuth,
    isAuthenticated,
    user,
    isLoading,
    isInitialized,
    error,
    clearError
  } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    if (!isInitialized) {
      checkAuth()
    }
  }, [isInitialized, checkAuth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch {
      // Error is caught and stored in Zustand error state
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-amber-50/40 text-black">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Left Column: Login Form or Authenticated Session Card */}
        <div className="w-full lg:w-1/2 bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_#000] flex flex-col justify-between space-y-6">
          <div>
            {/* Header / Brand */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-yellow-300 border-3 border-black flex items-center justify-center font-black text-2xl text-black shadow-[3px_3px_0px_0px_#000]">
                  G
                </div>
                <div>
                  <span className="text-2xl font-black tracking-tight uppercase block leading-none">
                    GeoSandbox
                  </span>
                  <span className="text-[11px] font-extrabold uppercase bg-cyan-300 text-black border border-black px-1.5 py-0.5 mt-1 inline-block">
                    Portal Masuk
                  </span>
                </div>
              </div>
            </div>

            {/* IF USER IS ALREADY LOGGED IN: Replace Form with Active Session View */}
            {isAuthenticated && user ? (
              <div className="space-y-6 animate-in fade-in zoom-in duration-200">
                <div className="bg-lime-200 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-2">
                  <div className="inline-block bg-black text-white px-2 py-0.5 font-black text-[10px] uppercase">
                    ✓ SESI AKTIF TERVERIFIKASI
                  </div>
                  <h2 className="text-2xl font-black uppercase text-black">
                    Anda Sudah Login!
                  </h2>
                  <p className="text-xs font-bold text-zinc-700">
                    Sesi login Anda sedang aktif dengan informasi akun berikut:
                  </p>
                </div>

                {/* Profile Card Info */}
                <div className="bg-white border-3 border-black p-5 shadow-[4px_4px_0px_0px_#000] space-y-3">
                  <div className="flex justify-between items-center border-b-2 border-black pb-2">
                    <span className="text-xs font-black text-zinc-500 uppercase">Username:</span>
                    <span className="text-sm font-black text-black">{user.username}</span>
                  </div>
                  <div className="flex justify-between items-center border-b-2 border-black pb-2">
                    <span className="text-xs font-black text-zinc-500 uppercase">Email:</span>
                    <span className="text-sm font-black text-black">{user.email}</span>
                  </div>
                  <div className="flex justify-between items-center border-b-2 border-black pb-2">
                    <span className="text-xs font-black text-zinc-500 uppercase">Role:</span>
                    <span className="text-xs font-black uppercase bg-purple-300 border border-black px-2 py-0.5">
                      {user.role}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-zinc-500 uppercase">Status Akun:</span>
                    <span className="text-xs font-black uppercase bg-lime-300 border border-black px-2 py-0.5">
                      {user.isActive ? 'Aktif' : 'Non-Aktif'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3 pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/dashboard')}
                    className="w-full bg-yellow-300 text-black font-black text-sm uppercase tracking-wider border-3 border-black p-3.5 shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Lanjut Ke Dashboard</span>
                    <span>➔</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoading}
                    className="w-full bg-pink-300 text-black font-black text-sm uppercase tracking-wider border-3 border-black p-3 shadow-[4px_4px_0px_0px_#000] hover:bg-pink-400 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
                  >
                    {isLoading ? 'Mengeluarkan Sesi...' : 'Keluar / Logout Sesi Ini'}
                  </button>
                </div>
              </div>
            ) : (
              /* IF USER IS NOT LOGGED IN: Show standard Login Form */
              <div>
                <h1 className="text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
                  Selamat Datang!
                </h1>
                <p className="mt-2 text-sm font-bold text-zinc-700">
                  Masukkan kredensial Anda untuk mengakses dashboard.
                </p>

                {/* Backend Error Alert Banner */}
                {error && (
                  <div className="mt-4 bg-pink-200 border-3 border-black p-3.5 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
                    <span className="text-xl">⚠️</span>
                    <div>
                      <p className="font-black text-xs uppercase text-pink-900">Gagal Masuk</p>
                      <p className="text-xs font-bold text-black">{error}</p>
                    </div>
                  </div>
                )}

                {/* Login Form */}
                <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-black uppercase tracking-wider text-black">
                      Alamat Email / Username
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nama@domain.com"
                      className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black uppercase tracking-wider text-black">
                        Kata Sandi
                      </label>
                      <a
                        href="#"
                        className="text-xs font-black uppercase text-black underline decoration-2 decoration-purple-500 hover:bg-purple-200 px-1 transition-all"
                      >
                        Lupa Password?
                      </a>
                    </div>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                    />
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center space-x-2 pt-1">
                    <input
                      id="remember-me-neo"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-5 w-5 bg-white border-2 border-black rounded-none text-black focus:ring-0 focus:ring-offset-0 cursor-pointer accent-black"
                    />
                    <label
                      htmlFor="remember-me-neo"
                      className="text-xs font-extrabold uppercase text-black cursor-pointer select-none"
                    >
                      Ingat Sesi Saya
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-cyan-300 text-black font-black text-base uppercase tracking-wider border-3 border-black p-3.5 shadow-[4px_4px_0px_0px_#000] hover:bg-cyan-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <span>Memproses...</span>
                    ) : (
                      <>
                        <span>Masuk Ke Dashboard</span>
                        <span>➔</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Social Divider */}
                <div className="relative my-6 text-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t-2 border-black" />
                  </div>
                  <span className="relative bg-white border-2 border-black px-3 py-0.5 text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_0px_#000]">
                    Atau Masuk Melalui
                  </span>
                </div>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 bg-white border-3 border-black p-2.5 font-black text-xs uppercase text-black shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-px active:translate-y-px transition-all cursor-pointer"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 bg-white border-3 border-black p-2.5 font-black text-xs uppercase text-black shadow-[3px_3px_0px_0px_#000] hover:bg-purple-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-px active:translate-y-px transition-all cursor-pointer"
                  >
                    GitHub
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Register Link */}
          {!isAuthenticated && (
            <div className="pt-6 border-t-2 border-black text-center">
              <p className="text-xs font-extrabold uppercase text-black">
                Belum punya akun?{' '}
                <a
                  href="/register"
                  className="bg-yellow-300 border border-black px-2 py-1 font-black underline hover:bg-yellow-400 transition-all inline-block ml-1 shadow-[2px_2px_0px_0px_#000]"
                >
                  Daftar Akun Baru
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Neo-Brutalist Banner Showcase */}
        <div className="hidden lg:flex lg:w-1/2 bg-white border-4 border-black p-10 shadow-[10px_10px_0px_0px_#000] flex-col justify-between relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-lime-300 border-2 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000] rotate-3">
            VERSI 2.4 READY
          </div>

          <div className="my-auto space-y-6 text-center">
            <div className="inline-block bg-yellow-300 border-3 border-black px-4 py-1.5 font-black text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#000] -rotate-1">
              🚀 DASHBOARD GEOSPASIAL
            </div>

            <h2 className="text-4xl xl:text-5xl font-black uppercase tracking-tight text-black leading-none">
              Visualisasi Peta & Data Real-Time
            </h2>

            <div className="bg-purple-200 border-3 border-black p-5 shadow-[5px_5px_0px_0px_#000] rotate-1">
              <p className="text-sm font-extrabold text-black leading-relaxed">
                Platform terpadu untuk pemetaan lokasi, analisis data spasial, dan monitoring statistik secara langsung dan interaktif.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="bg-cyan-200 border-2 border-black p-3 text-center shadow-[3px_3px_0px_0px_#000]">
                <p className="text-2xl font-black text-black">100%</p>
                <p className="text-[10px] font-black uppercase text-black">Real-Time</p>
              </div>
              <div className="bg-lime-200 border-2 border-black p-3 text-center shadow-[3px_3px_0px_0px_#000]">
                <p className="text-2xl font-black text-black">50K+</p>
                <p className="text-[10px] font-black uppercase text-black">Data Peta</p>
              </div>
              <div className="bg-yellow-200 border-2 border-black p-3 text-center shadow-[3px_3px_0px_0px_#000]">
                <p className="text-2xl font-black text-black">99.9%</p>
                <p className="text-[10px] font-black uppercase text-black">Uptime</p>
              </div>
            </div>
          </div>

          <div className="border-t-3 border-black pt-4 flex items-center justify-between text-xs font-black uppercase">
            <span className="bg-black text-white px-2 py-0.5">GEOSANDBOX INC</span>
            <span>SECURE ENCRYPTED 🔒</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginComponent
