import React from 'react'
import { FaAlignJustify, FaBookmark } from 'react-icons/fa6'

interface HeaderDashboardProps {
  isSidebarOpen?: boolean
  onToggleSidebar?: () => void
}

const HeaderDashboard: React.FC<HeaderDashboardProps> = ({
  isSidebarOpen = false,
  onToggleSidebar
}) => {
  return (
    <header className="bg-white border-b-4 border-black px-4 sm:px-6 h-16 flex items-center justify-between z-20 shrink-0 shadow-[0px_4px_0px_0px_#000] relative">
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
        <a
          href="/login"
          className="flex items-center gap-2 bg-lime-300 text-black border-2 border-black px-3.5 py-1.5 text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0px_0px_#000] hover:bg-lime-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
        >
          <span>Kembali Ke Login</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
        </a>
      </div>
    </header>
  )
}

export default HeaderDashboard