import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaCircleArrowLeft } from 'react-icons/fa6'
import { useAuthStore } from '../../store/auth.store'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const navItems = [
    {
      group: 'Menu Utama',
      items: [
        {
          name: 'Dashboard',
          path: '/dashboard',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          )
        },
        {
          name: 'Template UI',
          path: '/template-ui',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          )
        },
        {
          name: 'Integrasi GIS',
          path: '#',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 1-4 6-4 0 0 1 2 2 4 2 1 4 1 4 1-1.343 2.343-2.657 3.657-4.343 5.343z" />
            </svg>
          )
        },
        {
          name: 'Dataset',
          path: '#',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          )
        }
      ]
    },
    {
      group: 'Pengaturan',
      items: [
        {
          name: 'Akun Saya',
          path: '#',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          )
        },
        {
          name: 'API Access',
          path: '#',
          icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )
        }
      ]
    }
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  return (
    <aside
      className={`
        fixed top-0 bottom-0 left-0 z-40 w-72 bg-white border-r-4 border-black flex flex-col shrink-0 transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 h-full
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="p-4 border-b-4 lg:hidden xl:hidden border-black flex items-center justify-between bg-white shrink-0">
        <button
          type="button"
          onClick={onClose}
          className="md:hidden bg-pink-300 border-2 border-black p-1 text-black font-black hover:bg-pink-400 cursor-pointer"
        >
          <FaCircleArrowLeft />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {user && (
          <div className="bg-yellow-100 border-2 border-black p-3 shadow-[2px_2px_0px_0px_#000]">
            <p className="text-[10px] font-black uppercase text-zinc-500">User Login:</p>
            <p className="text-xs font-black uppercase text-black truncate">{user?.username}</p>
            <p className="text-[10px] font-extrabold text-zinc-600 truncate">{user?.email}</p>
          </div>
        )}

        {navItems.map((group, groupIdx) => (
          <div key={groupIdx} className="space-y-1">
            <p className="text-[11px] font-black uppercase text-zinc-500 tracking-wider px-3 mb-2">
              {group.group}
            </p>
            {group.items.map((item, itemIdx) => {
              const isActive = location.pathname === item.path
              return (
                <a
                  key={itemIdx}
                  href={item.path}
                  onClick={onClose}
                  className={`
                    flex items-center gap-3 p-3 font-black uppercase text-xs text-black border-2 transition-all
                    ${isActive
                      ? 'bg-yellow-300 border-black shadow-[3px_3px_0px_0px_#000]'
                      : 'bg-white border-transparent hover:bg-yellow-100 hover:border-black hover:shadow-[2px_2px_0px_0px_#000]'
                    }
                  `}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </a>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t-4 border-black bg-lime-300 shrink-0">
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 p-3 bg-white border-3 border-black font-black uppercase text-xs text-black shadow-[3px_3px_0px_0px_#000] hover:bg-black hover:text-white hover:shadow-[4px_4px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all group cursor-pointer"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Keluar Akun</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar