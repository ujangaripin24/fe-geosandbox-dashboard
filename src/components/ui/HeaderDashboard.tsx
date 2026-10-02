import React, { useState } from 'react'
import { FaAlignJustify, FaBookmark, FaX } from 'react-icons/fa6'
import { useAuthStore } from '../../store/auth.store'
import { useNavigate } from 'react-router-dom'

interface HeaderDashboardProps {
  isSidebarOpen?: boolean
  onToggleSidebar?: () => void
}

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({
  isSidebarOpen = false,
  onToggleSidebar
}) => {
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isModalExit, setIsModalExit] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <header className="bg-white border-b-4 border-black px-4 sm:px-6 h-16 flex items-center justify-between z-50 shrink-0 relative">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="md:hidden bg-yellow-300 border-2 border-black p-1.5 shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-400 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {isSidebarOpen ? (
            <FaAlignJustify />
          ) : (
            <FaBookmark />
          )}
        </button>

        <a href="/dashboard" className="flex items-center gap-2.5">
          <div className="h-9 w-9 bg-yellow-300 border-2 border-black flex items-center justify-center font-black text-xl text-black shadow-[2px_2px_0px_0px_#000]">
            G
          </div>
          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-black tracking-tight text-black uppercase leading-none">
              GeoSandbox
            </span>
            <span className="text-[9px] font-extrabold uppercase bg-cyan-300 text-black border border-black px-1 py-0.2 w-max mt-0.5 hidden sm:inline-block">
              DASHBOARD
            </span>
          </div>
        </a>
      </div>

      <div className="flex items-center gap-3">
        <div
          onClick={() => setIsOpenProfile(!isOpenProfile)}
          className="flex items-center bg-purple-300 text-black font-black text-sm uppercase border-3 border-black px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:bg-purple-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer shrink-0"
        >
          <span>{user.username}</span>
        </div>
        {
          isOpenProfile && (
            <>
              <div className="absolute right-20 top-full mt-2 bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] z-20 overflow-hidden">
                <div className="cursor-pointer block px-4 py-2.5 font-bold text-sm hover:bg-lime-300 border-b-2 border-black transition-all">
                  Ekspor Peta PDF
                </div>
                <div className="cursor-pointer block px-4 py-2.5 font-bold text-sm hover:bg-cyan-300 border-b-2 border-black transition-all">
                  Unduh Dataset CSV
                </div>
                <div
                  onClick={() => setIsModalExit(true)}
                  className="cursor-pointer block px-4 py-2.5 font-bold text-sm hover:bg-pink-300 transition-all">
                  Keluar
                </div>
              </div>
            </>
          )}
      </div>
      {
        isModalExit && (
          <>
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[10px_10px_0px_0px_#000] max-w-lg w-full space-y-6 animate-in fade-in zoom-in duration-150">
                <div className="flex items-center justify-between border-b-3 border-black pb-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-xl uppercase">Konfirmasi Tindakan</h3>
                  </div>
                  <button
                    onClick={() => setIsModalExit(false)}
                    className="bg-pink-300 border-2 border-black font-black h-8 w-8 flex items-center justify-center hover:bg-pink-400 transition-all cursor-pointer"
                  >
                    <FaX />
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold leading-relaxed text-zinc-800">
                    Keluar Dari Dashboard?
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t-2 border-black">
                  <button
                    onClick={() => setIsModalExit(false)}
                    className="bg-white text-black font-black text-xs uppercase border-2 border-black px-4 py-2 hover:bg-zinc-100 transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      setIsModalExit(false)
                      handleLogout();
                    }}
                    className="bg-lime-300 text-black font-black text-xs uppercase border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_#000] hover:bg-lime-400 transition-all cursor-pointer"
                  >
                    Ya
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
    </header>
  )
}

export default HeaderDashboard