import React from 'react'

const MainFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t-4 border-black text-black">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          {/* Brand & Newsletter Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-yellow-300 border-3 border-black flex items-center justify-center font-black text-xl text-black shadow-[3px_3px_0px_0px_#000]">
                G
              </div>
              <span className="text-2xl font-black tracking-tight uppercase">
                GeoSandbox
              </span>
            </div>

            <p className="text-sm font-bold leading-relaxed max-w-sm">
              Platform dashboard geospasial modern untuk analisis data peta, statistik wilayah, dan pemetaan interaktif real-time.
            </p>

            {/* Newsletter Subscription Box */}
            <div className="bg-yellow-100 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-3">
              <h3 className="font-black text-base uppercase">Dapatkan Info Terbaru</h3>
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Masukkan email Anda..."
                  className="w-full bg-white border-2 border-black p-2.5 text-sm font-bold focus:outline-none focus:bg-white focus:shadow-[2px_2px_0px_0px_#000] transition-all"
                />
                <button
                  type="submit"
                  className="bg-lime-300 text-black border-2 border-black font-black px-4 py-2.5 text-sm shadow-[3px_3px_0px_0px_#000] hover:bg-lime-400 hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-px active:translate-y-px transition-all shrink-0"
                >
                  Langganan
                </button>
              </form>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <p className="font-black text-lg uppercase underline decoration-3 decoration-yellow-400 underline-offset-4">
              Perusahaan
            </p>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <a href="#" className="hover:bg-yellow-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:bg-yellow-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Karir & Tim
                </a>
              </li>
              <li>
                <a href="#" className="hover:bg-yellow-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Mitra & Partner
                </a>
              </li>
              <li>
                <a href="#" className="hover:bg-yellow-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Blog Geo
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <p className="font-black text-lg uppercase underline decoration-3 decoration-lime-400 underline-offset-4">
              Layanan
            </p>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <a href="#" className="hover:bg-lime-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Analisis Geospasial
                </a>
              </li>
              <li>
                <a href="#" className="hover:bg-lime-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Peta Interaktif
                </a>
              </li>
              <li>
                <a href="#" className="hover:bg-lime-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Integrasi API GIS
                </a>
              </li>
              <li>
                <a href="#" className="hover:bg-lime-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Konsultasi Data
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-4">
            <p className="font-black text-lg uppercase underline decoration-3 decoration-cyan-400 underline-offset-4">
              Bantuan
            </p>
            <ul className="space-y-2 text-sm font-bold">
              <li>
                <a href="#" className="hover:bg-cyan-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Pusat Bantuan
                </a>
              </li>
              <li>
                <a href="#" className="hover:bg-cyan-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Dokumentasi API
                </a>
              </li>
              <li>
                <a href="#" className="hover:bg-cyan-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Kebijakan Privasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:bg-cyan-300 border border-transparent hover:border-black px-1.5 py-0.5 inline-block transition-all">
                  Syarat & Ketentuan
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t-3 border-black flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-black uppercase">
            © {new Date().getFullYear()} GeoSandbox Dashboard. All rights reserved.
          </p>

          {/* Social Badges */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="bg-yellow-300 text-black border-2 border-black p-2 shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] transition-all font-black text-xs"
              aria-label="GitHub"
            >
              GH
            </a>
            <a
              href="#"
              className="bg-cyan-300 text-black border-2 border-black p-2 shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] transition-all font-black text-xs"
              aria-label="Twitter"
            >
              TW
            </a>
            <a
              href="#"
              className="bg-purple-300 text-black border-2 border-black p-2 shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] transition-all font-black text-xs"
              aria-label="Discord"
            >
              DC
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MainFooter