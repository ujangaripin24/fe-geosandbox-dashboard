import React, { useState } from 'react'
import HeaderDashboard from './HeaderDashboard'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-amber-50/30 text-black">
      <HeaderDashboard
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex overflow-hidden relative">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-30 md:hidden"
            aria-hidden="true"
          />
        )}

        <main className="flex-1 overflow-y-auto">
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout