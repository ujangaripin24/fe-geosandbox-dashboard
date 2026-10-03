import React, { useEffect } from 'react'
import { useUserStore } from '../store/user.store'

const ProfileComponent: React.FC = () => {
  const { user, profileDetail, isLoading, error } = useUserStore()

  useEffect(() => {
    profileDetail()
  }, [])

  return (
    <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-3 border-black pb-4">
        <div>
          <div className="inline-block bg-yellow-300 border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_#000] mb-2">
            USER PROFILE
          </div>
          <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black leading-tight">
            Profil Pengguna
          </h1>
        </div>
        <button
          type="button"
          onClick={() => profileDetail()}
          disabled={isLoading}
          className="bg-cyan-300 text-black font-black text-sm uppercase border-3 border-black px-5 py-2.5 shadow-[4px_4px_0px_0px_#000] hover:bg-cyan-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
        >
          {isLoading ? 'Memuat...' : 'Refresh Data'}
        </button>
      </div>

      {/* Loading Banner */}
      {isLoading && (
        <div className="bg-yellow-100 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] text-center font-black uppercase text-sm animate-pulse">
          Memuat Detail Profil dari Server...
        </div>
      )}

      {/* Error Alert Banner */}
      {error && !isLoading && (
        <div className="bg-pink-200 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
          <span className="text-xl">⚠️</span>
          <div>
            <p className="font-black text-xs uppercase text-pink-900">Gagal Memuat Profil</p>
            <p className="text-xs font-bold text-black">{error}</p>
          </div>
        </div>
      )}

      {/* User Info Section */}
      {!isLoading && user && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
              <span className="text-[10px] font-black uppercase text-zinc-500">Username</span>
              <p className="text-base font-black text-black">{user.username}</p>
            </div>

            <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
              <span className="text-[10px] font-black uppercase text-zinc-500">Email</span>
              <p className="text-base font-black text-black">{user.email}</p>
            </div>

            <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
              <span className="text-[10px] font-black uppercase text-zinc-500">Nama Depan</span>
              <p className="text-base font-black text-black">{user.firstName}</p>
            </div>

            <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
              <span className="text-[10px] font-black uppercase text-zinc-500">Nama Belakang</span>
              <p className="text-base font-black text-black">{user.lastName}</p>
            </div>

            <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
              <span className="text-[10px] font-black uppercase text-zinc-500">Nomor Telepon</span>
              <p className="text-base font-black text-black">{user.phone}</p>
            </div>

            <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
              <span className="text-[10px] font-black uppercase text-zinc-500">Jenis Kelamin</span>
              <p className="text-base font-black text-black">{user.gender}</p>
            </div>
          </div>

          {/* User Address Detail List if Available */}
          {user.detail && Array.isArray(user.detail) && user.detail.length > 0 && (
            <div className="space-y-3 pt-4 border-t-3 border-black">
              <h3 className="text-lg font-black uppercase text-black">Daftar Alamat Pengguna</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.detail.map((addr: any, idx: number) => (
                  <div key={idx} className="bg-lime-100 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000]">
                    <p className="text-xs font-black uppercase text-black">{addr.address_name || `Alamat #${idx + 1}`}</p>
                    <p className="text-xs font-bold text-zinc-700 mt-1">{addr.full_address || addr.address}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ProfileComponent