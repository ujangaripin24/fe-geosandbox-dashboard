import React from 'react'

const MainHeader: React.FC = () => {
  return (
    <header className="bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="h-11 w-11 bg-yellow-300 border-3 border-black flex items-center justify-center font-black text-2xl text-black shadow-[3px_3px_0px_0px_#000] group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:shadow-[5px_5px_0px_0px_#000] transition-all">
            G
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-black uppercase">
              GeoSandbox
            </span>
            <span className="text-[10px] font-bold tracking-widest bg-cyan-300 text-black border border-black px-1.5 py-0.2 w-max">
              DASHBOARD V2
            </span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav aria-label="Global" className="hidden md:block">
          <ul className="flex items-center gap-2 text-sm font-bold">
            <li>
              <a
                className="text-black border-2 border-transparent hover:border-black hover:bg-yellow-300 hover:shadow-[3px_3px_0px_0px_#000] px-3.5 py-2 transition-all block"
                href="#"
              >
                Tentang Kami
              </a>
            </li>
            <li>
              <a
                className="text-black border-2 border-transparent hover:border-black hover:bg-lime-300 hover:shadow-[3px_3px_0px_0px_#000] px-3.5 py-2 transition-all block"
                href="#"
              >
                Layanan
              </a>
            </li>
            <li>
              <a
                className="text-black border-2 border-transparent hover:border-black hover:bg-cyan-300 hover:shadow-[3px_3px_0px_0px_#000] px-3.5 py-2 transition-all block"
                href="#"
              >
                Proyek
              </a>
            </li>
            <li>
              <a
                className="text-black border-2 border-transparent hover:border-black hover:bg-purple-300 hover:shadow-[3px_3px_0px_0px_#000] px-3.5 py-2 transition-all block"
                href="#"
              >
                Kontak
              </a>
            </li>
            <li>
              <a
                className="text-black border-2 border-transparent hover:border-black hover:bg-purple-300 hover:shadow-[3px_3px_0px_0px_#000] px-3.5 py-2 transition-all block"
                href="/atemplate-ui"
              >
                Component UI
              </a>

            </li>
          </ul>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <a
              className="bg-white text-black border-2 border-black font-extrabold px-4 py-2 text-sm shadow-[3px_3px_0px_0px_#000] hover:bg-zinc-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-px active:translate-y-px active:shadow-[2px_2px_0px_0px_#000] transition-all"
              href="/login"
            >
              Masuk
            </a>

            <a
              className="hidden sm:block bg-yellow-300 text-black border-2 border-black font-extrabold px-4 py-2 text-sm shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-px active:translate-y-px active:shadow-[2px_2px_0px_0px_#000] transition-all"
              href="/register"
            >
              Daftar
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="block border-2 border-black bg-white p-2 text-black shadow-[3px_3px_0px_0px_#000] md:hidden hover:bg-yellow-300"
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

export default MainHeader