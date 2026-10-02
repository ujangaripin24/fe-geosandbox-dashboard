import React from 'react'
import { useAuthStore } from '../store/auth.store'

const DashboardComponent: React.FC = () => {
  const { user } = useAuthStore()

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
        <div className="inline-block bg-yellow-300 border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_#000] -rotate-1 mb-3">
          📊 DASHBOARD GEOSPASIAL
        </div>
        <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black">
          Selamat Datang, {user?.username || 'Analis Geospasial'}!
        </h1>
        <p className="mt-2 text-sm font-bold text-zinc-700 max-w-2xl leading-relaxed">
          Sesi autentikasi Anda terverifikasi secara real-time. Kelola dataset geografis, konfigurasi peta, dan laporan statistik Anda dalam satu tempat.
        </p>

        {/* User Badges */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-black uppercase">
          <span className="bg-cyan-200 border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_#000]">
            Email: {user?.email || '-'}
          </span>
          <span className="bg-purple-200 border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_#000]">
            Role: {user?.role || 'user'}
          </span>
          <span className="bg-lime-200 border-2 border-black px-2.5 py-1 shadow-[2px_2px_0px_0px_#000]">
            Status: {user?.isActive ? 'AKTIF' : 'NON-AKTIF'}
          </span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_#000] space-y-2">
          <p className="text-xs font-black uppercase text-zinc-500">Total Layer Peta</p>
          <p className="text-3xl font-black text-black">24</p>
          <span className="text-[10px] font-black uppercase bg-lime-300 border border-black px-2 py-0.5 inline-block">
            ▲ Updated Today
          </span>
        </div>

        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_#000] space-y-2">
          <p className="text-xs font-black uppercase text-zinc-500">API Requests</p>
          <p className="text-3xl font-black text-black">142.8K</p>
          <span className="text-[10px] font-black uppercase bg-cyan-300 border border-black px-2 py-0.5 inline-block">
            ● 99.9% Success
          </span>
        </div>

        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_#000] space-y-2">
          <p className="text-xs font-black uppercase text-zinc-500">Sesi Aktif</p>
          <p className="text-3xl font-black text-black">1</p>
          <span className="text-[10px] font-black uppercase bg-yellow-300 border border-black px-2 py-0.5 inline-block">
            🔒 Cookie Web Client
          </span>
        </div>

        <div className="bg-white border-4 border-black p-5 shadow-[6px_6px_0px_0px_#000] space-y-2">
          <p className="text-xs font-black uppercase text-zinc-500">Access Token Status</p>
          <p className="text-xl font-black text-lime-600 truncate">Valid / Active</p>
          <span className="text-[10px] font-black uppercase bg-purple-300 border border-black px-2 py-0.5 inline-block">
            In-Memory Zustand
          </span>
        </div>
      </div>

      {/* Quick Profile Summary Card */}
      <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_#000] space-y-4">
        <div className="flex items-center justify-between border-b-3 border-black pb-3">
          <h2 className="text-xl font-black uppercase tracking-tight text-black">
            Detail Informasi Profil User
          </h2>
          <span className="bg-yellow-300 border-2 border-black px-3 py-1 text-xs font-black uppercase shadow-[2px_2px_0px_0px_#000]">
            VERIFIED USER
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold">
          <div className="bg-zinc-50 border-2 border-black p-3 space-y-1">
            <span className="text-zinc-500 uppercase block text-[10px] font-black">UUID Pengguna</span>
            <span className="font-mono text-black text-sm block truncate">{user?.uuid || '-'}</span>
          </div>

          <div className="bg-zinc-50 border-2 border-black p-3 space-y-1">
            <span className="text-zinc-500 uppercase block text-[10px] font-black">Username</span>
            <span className="text-black text-sm block">{user?.username || '-'}</span>
          </div>

          <div className="bg-zinc-50 border-2 border-black p-3 space-y-1">
            <span className="text-zinc-500 uppercase block text-[10px] font-black">Alamat Email</span>
            <span className="text-black text-sm block">{user?.email || '-'}</span>
          </div>

          <div className="bg-zinc-50 border-2 border-black p-3 space-y-1">
            <span className="text-zinc-500 uppercase block text-[10px] font-black">Waktu Pendaftaran</span>
            <span className="text-black text-sm block">
              {user?.createdAt ? new Date(user.createdAt).toLocaleString('id-ID') : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardComponent