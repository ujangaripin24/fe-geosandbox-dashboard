import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store'

const RegisterComponent: React.FC = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confPassword, setConfPassword] = useState('')
  const [currentSlider, setCurrentSlider] = useState<number>(0)
  const [localError, setLocalError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const { registerUser, isLoading, error, clearError } = useAuthStore()

  const adsData = [
    {
      title: "Peta Interaktif Modern",
      imgUrl: "https://unsplash.com",
      desc: "Kelola dan visualisasikan data spasial Anda secara dinamis dengan performa tinggi."
    },
    {
      title: "Kolaborasi Global",
      imgUrl: "https://unsplash.com",
      desc: "Terhubung langsung dengan ribuan surveyor dan analis data di seluruh dunia."
    },
    {
      title: "Analitik Spasial Akurat",
      imgUrl: "https://unsplash.com",
      desc: "Dapatkan laporan dan hasil kalkulasi geografis instan dalam hitungan detik."
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    setLocalError(null)
    setSuccessMsg(null)

    if (password !== confPassword) {
      setLocalError('Konfirmasi kata sandi tidak cocok')
      return
    }

    try {
      const msg = await registerUser({ username, email, password, confPassword })
      setSuccessMsg(msg || 'Pendaftaran akun berhasil! Silakan masuk.')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch {
      // Error handled in store
    }
  }

  const activeError = localError || error

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-8 lg:p-12 bg-amber-50/40 text-black">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 items-stretch">

        {/* Left Column: Register Form Card */}
        <div className="w-full lg:w-1/2 bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_#000] flex flex-col justify-between space-y-6">
          <div>
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
                    Pendaftaran Akun
                  </span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black uppercase text-black tracking-tight">
              Daftar Akun Baru
            </h1>
            <p className="mt-2 text-sm font-bold text-zinc-700">
              Buat akun Anda untuk mulai mengelola dashboard geospasial.
            </p>

            {/* Success Alert Banner */}
            {successMsg && (
              <div className="mt-4 bg-lime-200 border-3 border-black p-3.5 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <p className="font-black text-xs uppercase text-lime-900">Registrasi Berhasil</p>
                  <p className="text-xs font-bold text-black">{successMsg}</p>
                </div>
              </div>
            )}

            {/* Error Alert Banner */}
            {activeError && !successMsg && (
              <div className="mt-4 bg-pink-200 border-3 border-black p-3.5 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-black text-xs uppercase text-pink-900">Gagal Mendaftar</p>
                  <p className="text-xs font-bold text-black">{activeError}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="username"
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  Email
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

              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-black uppercase tracking-wider text-black">
                  Konfirmasi Kata Sandi
                </label>
                <input
                  type="password"
                  required
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-cyan-300 text-black font-black text-base uppercase tracking-wider border-3 border-black p-3.5 shadow-[4px_4px_0px_0px_#000] hover:bg-cyan-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Mendaftarkan Akun...</span>
                ) : (
                  <>
                    <span>Daftar Akun Sekarang</span>
                    <span>➔</span>
                  </>
                )}
              </button>
            </form>

            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-black" />
              </div>
              <span className="relative bg-white border-2 border-black px-3 py-0.5 text-[11px] font-black uppercase text-black shadow-[2px_2px_0px_0px_#000]">
                Atau Masuk Melalui
              </span>
            </div>

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

          <div className="pt-6 border-t-2 border-black text-center">
            <p className="text-xs font-extrabold uppercase text-black">
              Sudah punya akun?{' '}
              <a
                href="/login"
                className="bg-yellow-300 border border-black px-2 py-1 font-black underline hover:bg-yellow-400 transition-all inline-block ml-1 shadow-[2px_2px_0px_0px_#000]"
              >
                Login
              </a>
            </p>
          </div>
        </div>

        {/* Right Column: Showcase Slider */}
        <div className="hidden lg:flex lg:w-1/2 bg-white border-4 border-black p-10 shadow-[10px_10px_0px_0px_#000] flex-col justify-between relative overflow-hidden">
          <div className="flex-1">
            <span className="bg-purple-300 border-2 absolute top-5 right-10 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000] -rotate-6">
              GEOSANDBOX
            </span>
          </div>
          <div className="w-full h-64 border-4 border-black shadow-[4px_4px_0px_0px_#000] bg-zinc-100 overflow-hidden relative flex items-center justify-center p-6 bg-linear-to-br from-yellow-100 to-cyan-100">
            <div className="text-center space-y-2">
              <span className="text-4xl">🗺️</span>
              <h3 className="text-xl font-black uppercase text-black">{adsData[currentSlider].title}</h3>
              <p className="text-xs font-bold text-zinc-700">{adsData[currentSlider].desc}</p>
            </div>
          </div>

          <div className="mt-8 space-y-3 flex-1">
            <h2 className="text-2xl font-black uppercase tracking-tight text-black bg-cyan-300 inline-block px-2 border-2 border-black shadow-[2px_2px_0px_0px_#000]">
              {adsData[currentSlider].title}
            </h2>
            <p className="text-sm font-bold text-zinc-800 leading-relaxed pt-2">
              {adsData[currentSlider].desc}
            </p>
          </div>

          <div className="flex items-center justify-between pt-6 border-t-4 border-black mt-auto">
            <div className="flex gap-2">
              {adsData.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentSlider(index)}
                  className={`h-4 w-4 border-2 border-black transition-all cursor-pointer ${currentSlider === index ? 'bg-black scale-110' : 'bg-white'
                    }`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentSlider((prev) => (prev === 0 ? adsData.length - 1 : prev - 1))}
                className="bg-white border-3 border-black p-2 font-black text-sm shadow-[2px_2px_0px_0px_#000] hover:bg-zinc-100 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-px active:translate-y-px cursor-pointer"
              >
                ⬅
              </button>
              <button
                type="button"
                onClick={() => setCurrentSlider((prev) => (prev === adsData.length - 1 ? 0 : prev + 1))}
                className="bg-yellow-300 border-3 border-black p-2 font-black text-sm shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-400 hover:shadow-[3px_3px_0px_0px_#000] active:translate-x-px active:translate-y-px cursor-pointer"
              >
                ➔
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterComponent