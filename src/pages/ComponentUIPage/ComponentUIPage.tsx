import React, { useState } from 'react'

const ComponentUIPage: React.FC = () => {
  // State for Modal Preview
  const [isModalOpen, setIsModalOpen] = useState(false)
  // State for Dropdown Preview
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  // State for Select Dropdown
  const [selectedOption, setSelectedOption] = useState('Opsi 1: Peta Geospasial')

  return (
    <div className="bg-amber-50/30 text-black min-h-screen py-10 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* ========================================================================= */}
        {/* HERO HEADER */}
        {/* ========================================================================= */}
        <div className="bg-white border-4 border-black p-8 sm:p-12 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden">
          <div className="inline-block bg-yellow-300 border-3 border-black px-4 py-1.5 font-black text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#000] -rotate-1 mb-4">
            🎨 DESIGN SYSTEM & UI KIT TEMPLATE
          </div>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-black leading-tight">
            Panduan Komponen Neo-Brutalism
          </h1>
          <p className="mt-3 text-base sm:text-lg font-bold text-zinc-700 max-w-3xl leading-relaxed">
            Halaman contoh ini berisi templat resmi untuk komponen **Neo-Brutalism** di GeoSandbox Dashboard. Anda dapat langsung mencontoh class Tailwind, warna, border, dan shadow di bawah ini untuk membuat halaman baru.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="bg-cyan-200 border-2 border-black px-3 py-1 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
              Warna Utama: White (#FFFFFF)
            </span>
            <span className="bg-lime-200 border-2 border-black px-3 py-1 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
              Border: 2px / 3px / 4px Solid Black
            </span>
            <span className="bg-purple-200 border-2 border-black px-3 py-1 font-extrabold text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
              Shadow: [4px_4px_0px_0px_#000]
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 1: PALET WARNA (COLOR PALETTE) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b-3 border-black pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className="bg-yellow-300 border-2 border-black px-2 py-0.5 text-base">01</span> Palet Warna Khas
            </h2>
            <span className="text-xs font-black uppercase bg-black text-white px-2 py-1">Color Tokens</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* White Primary */}
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-2">
              <div className="h-12 w-full bg-white border-2 border-black" />
              <p className="font-black text-xs uppercase">Primary White</p>
              <p className="text-[11px] font-mono font-bold text-zinc-500">bg-white</p>
            </div>
            {/* Neo Yellow */}
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-2">
              <div className="h-12 w-full bg-yellow-300 border-2 border-black" />
              <p className="font-black text-xs uppercase">Neo Yellow</p>
              <p className="text-[11px] font-mono font-bold text-zinc-500">bg-yellow-300</p>
            </div>
            {/* Neo Lime */}
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-2">
              <div className="h-12 w-full bg-lime-300 border-2 border-black" />
              <p className="font-black text-xs uppercase">Neo Lime</p>
              <p className="text-[11px] font-mono font-bold text-zinc-500">bg-lime-300</p>
            </div>
            {/* Neo Cyan */}
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-2">
              <div className="h-12 w-full bg-cyan-300 border-2 border-black" />
              <p className="font-black text-xs uppercase">Neo Cyan</p>
              <p className="text-[11px] font-mono font-bold text-zinc-500">bg-cyan-300</p>
            </div>
            {/* Neo Purple */}
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-2">
              <div className="h-12 w-full bg-purple-300 border-2 border-black" />
              <p className="font-black text-xs uppercase">Neo Purple</p>
              <p className="text-[11px] font-mono font-bold text-zinc-500">bg-purple-300</p>
            </div>
            {/* Neo Pink */}
            <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-2">
              <div className="h-12 w-full bg-pink-300 border-2 border-black" />
              <p className="font-black text-xs uppercase">Neo Pink</p>
              <p className="text-[11px] font-mono font-bold text-zinc-500">bg-pink-300</p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: TOMBOL (BUTTONS) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b-3 border-black pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className="bg-cyan-300 border-2 border-black px-2 py-0.5 text-base">02</span> Tombol (Buttons)
            </h2>
            <span className="text-xs font-black uppercase bg-black text-white px-2 py-1">Interactive Elements</span>
          </div>

          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary Yellow Button */}
              <button className="bg-yellow-300 text-black font-black text-sm uppercase border-3 border-black px-5 py-2.5 shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer">
                Primary Button
              </button>

              {/* Secondary White Button */}
              <button className="bg-white text-black font-black text-sm uppercase border-3 border-black px-5 py-2.5 shadow-[4px_4px_0px_0px_#000] hover:bg-zinc-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer">
                Secondary Button
              </button>

              {/* Success Lime Button */}
              <button className="bg-lime-300 text-black font-black text-sm uppercase border-3 border-black px-5 py-2.5 shadow-[4px_4px_0px_0px_#000] hover:bg-lime-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer">
                Action Lime
              </button>

              {/* Danger Pink Button */}
              <button className="bg-pink-300 text-black font-black text-sm uppercase border-3 border-black px-5 py-2.5 shadow-[4px_4px_0px_0px_#000] hover:bg-pink-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer">
                Danger Pink
              </button>

              {/* Disabled Button */}
              <button disabled className="bg-zinc-200 text-zinc-500 font-black text-sm uppercase border-3 border-zinc-400 px-5 py-2.5 shadow-[3px_3px_0px_0px_#a1a1aa] cursor-not-allowed">
                Disabled State
              </button>
            </div>

            {/* Sizes & Icon Buttons */}
            <div className="pt-4 border-t-2 border-black flex flex-wrap items-center gap-4">
              <span className="font-black text-xs uppercase text-zinc-500 mr-2">Variasi Ukuran:</span>
              <button className="bg-cyan-300 text-black font-black text-xs uppercase border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#000] transition-all">
                Small (S)
              </button>
              <button className="bg-cyan-300 text-black font-black text-sm uppercase border-3 border-black px-5 py-2.5 shadow-[4px_4px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] transition-all">
                Medium (M)
              </button>
              <button className="bg-cyan-300 text-black font-black text-base uppercase border-4 border-black px-7 py-3.5 shadow-[6px_6px_0px_0px_#000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#000] transition-all">
                Large (L) ➔
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: BREADCRUMBS & BADGES */}
        {/* ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Breadcrumbs Showcase */}
          <div className="space-y-4">
            <div className="border-b-3 border-black pb-2">
              <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                <span className="bg-lime-300 border-2 border-black px-2 py-0.5 text-sm">03</span> Breadcrumb Navigation
              </h2>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000]">
              <nav className="flex flex-wrap items-center gap-2 font-black text-xs uppercase">
                <a href="#" className="bg-yellow-300 border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-400 transition-all">
                  🏠 Beranda
                </a>
                <span className="font-extrabold text-black">➔</span>
                <a href="#" className="bg-cyan-300 border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_#000] hover:bg-cyan-400 transition-all">
                  Dashboard
                </a>
                <span className="font-extrabold text-black">➔</span>
                <span className="bg-white border-2 border-black px-3 py-1.5 shadow-[2px_2px_0px_0px_#000] text-zinc-500">
                  Komponen UI
                </span>
              </nav>
            </div>
          </div>

          {/* Badges Showcase */}
          <div className="space-y-4">
            <div className="border-b-3 border-black pb-2">
              <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                <span className="bg-purple-300 border-2 border-black px-2 py-0.5 text-sm">04</span> Badges / Tags
              </h2>
            </div>

            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] flex flex-wrap gap-3 items-center">
              <span className="bg-yellow-300 border-2 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
                BARU
              </span>
              <span className="bg-lime-300 border-2 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
                AKTIF
              </span>
              <span className="bg-cyan-300 border-2 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
                INFO
              </span>
              <span className="bg-pink-300 border-2 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000]">
                ERROR
              </span>
              <span className="bg-purple-300 border-2 border-black px-3 py-1 font-black text-xs uppercase shadow-[2px_2px_0px_0px_#000] -rotate-3">
                TAG MIRING
              </span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: KARTU (CARDS & METRICS) */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b-3 border-black pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className="bg-pink-300 border-2 border-black px-2 py-0.5 text-base">05</span> Kartu (Cards & Metrics)
            </h2>
            <span className="text-xs font-black uppercase bg-black text-white px-2 py-1">Layout Containers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Standard White Card */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] space-y-3">
              <div className="bg-yellow-300 border-2 border-black px-2.5 py-1 font-black text-xs uppercase inline-block">
                KARTU STANDAR
              </div>
              <h3 className="text-xl font-black uppercase text-black">Analisis Wilayah</h3>
              <p className="text-xs font-bold text-zinc-600 leading-relaxed">
                Kartu konten standar menggunakan background putih bersih dengan border hitam 4px dan shadow tajam 6px.
              </p>
              <button className="bg-black text-white font-black text-xs uppercase px-4 py-2 hover:bg-zinc-800 transition-all">
                Detail Data ➔
              </button>
            </div>

            {/* Metric / Stat Card 1 */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-xs font-black uppercase text-zinc-500">Total Pengguna</span>
                <div className="h-9 w-9 bg-cyan-300 border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#000]">
                  👥
                </div>
              </div>
              <p className="text-4xl font-black text-black">12,450</p>
              <p className="text-xs font-bold text-lime-600 bg-lime-100 border border-black px-2 py-0.5 inline-block">
                ▲ +14% bulan ini
              </p>
            </div>

            {/* Metric / Stat Card 2 */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_#000] space-y-3 relative overflow-hidden">
              <div className="flex justify-between items-start">
                <span className="text-xs font-black uppercase text-zinc-500">Data Peta Terproses</span>
                <div className="h-9 w-9 bg-purple-300 border-2 border-black flex items-center justify-center font-black shadow-[2px_2px_0px_0px_#000]">
                  🗺️
                </div>
              </div>
              <p className="text-4xl font-black text-black">8,921</p>
              <p className="text-xs font-bold text-cyan-600 bg-cyan-100 border border-black px-2 py-0.5 inline-block">
                ● 100% Real-time Sync
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: INPUT FORM & DROPDOWN */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b-3 border-black pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className="bg-orange-300 border-2 border-black px-2 py-0.5 text-base">06</span> Form Inputs & Dropdown
            </h2>
            <span className="text-xs font-black uppercase bg-black text-white px-2 py-1">User Input Controls</span>
          </div>

          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Text Input */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-black">Input Teks</label>
                <input
                  type="text"
                  placeholder="Ketik sesuatu di sini..."
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              {/* Native Select Dropdown */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-black">Select Dropdown</label>
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all cursor-pointer"
                >
                  <option>Opsi 1: Peta Geospasial</option>
                  <option>Opsi 2: Laporan Statistik</option>
                  <option>Opsi 3: Integrasi Data API</option>
                </select>
              </div>

              {/* Checkboxes & Radios */}
              <div className="space-y-2">
                <label className="block text-xs font-black uppercase text-black">Checkbox & Radio</label>
                <div className="flex flex-wrap gap-6 items-center pt-1">
                  <label className="flex items-center gap-2 font-bold text-sm cursor-pointer select-none">
                    <input type="checkbox" defaultChecked className="h-5 w-5 bg-white border-2 border-black accent-black cursor-pointer" />
                    Pilihan A
                  </label>
                  <label className="flex items-center gap-2 font-bold text-sm cursor-pointer select-none">
                    <input type="radio" name="demo-radio" defaultChecked className="h-5 w-5 bg-white border-2 border-black accent-black cursor-pointer" />
                    Radio 1
                  </label>
                  <label className="flex items-center gap-2 font-bold text-sm cursor-pointer select-none">
                    <input type="radio" name="demo-radio" className="h-5 w-5 bg-white border-2 border-black accent-black cursor-pointer" />
                    Radio 2
                  </label>
                </div>
              </div>

              {/* Custom Interactive Dropdown Component */}
              <div className="space-y-2 relative">
                <label className="block text-xs font-black uppercase text-black">Custom Interactive Dropdown Menu</label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-yellow-300 border-3 border-black p-3 font-black text-sm uppercase text-black flex items-center justify-between shadow-[4px_4px_0px_0px_#000] hover:bg-yellow-400 transition-all cursor-pointer"
                >
                  <span>Pilih Tindakan Quick Menu</span>
                  <span>{isDropdownOpen ? '▲' : '▼'}</span>
                </button>

                {isDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] z-20 overflow-hidden">
                    <a href="#" className="block px-4 py-2.5 font-bold text-sm hover:bg-lime-300 border-b-2 border-black transition-all">
                      ➔ Ekspor Peta PDF
                    </a>
                    <a href="#" className="block px-4 py-2.5 font-bold text-sm hover:bg-cyan-300 border-b-2 border-black transition-all">
                      ➔ Unduh Dataset CSV
                    </a>
                    <a href="#" className="block px-4 py-2.5 font-bold text-sm hover:bg-pink-300 transition-all">
                      ➔ Hapus Cache
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: MODAL SHOWCASE */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b-3 border-black pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className="bg-yellow-300 border-2 border-black px-2 py-0.5 text-base">07</span> Modal Dialog Popup
            </h2>
            <span className="text-xs font-black uppercase bg-black text-white px-2 py-1">Overlay Component</span>
          </div>

          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[6px_6px_0px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-black text-lg uppercase">Uji Coba Component Modal</h3>
              <p className="text-xs font-bold text-zinc-600 mt-1">
                Klik tombol di samping untuk membuka pop-up dialog bergaya Neo-Brutalism.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-purple-300 text-black font-black text-sm uppercase border-3 border-black px-6 py-3 shadow-[4px_4px_0px_0px_#000] hover:bg-purple-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer shrink-0"
            >
              Buka Modal Popup 🚀
            </button>
          </div>

          {/* Actual Modal Popup Container */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
              <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[10px_10px_0px_0px_#000] max-w-lg w-full space-y-6 animate-in fade-in zoom-in duration-150">
                <div className="flex items-center justify-between border-b-3 border-black pb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-yellow-300 border-2 border-black px-2 py-0.5 font-black text-xs uppercase">MODAL</span>
                    <h3 className="font-black text-xl uppercase">Konfirmasi Tindakan</h3>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-pink-300 border-2 border-black font-black h-8 w-8 flex items-center justify-center hover:bg-pink-400 transition-all cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold leading-relaxed text-zinc-800">
                    Ini adalah contoh tampilan **Modal Neo-Brutalism**. Memiliki border 4px hitam tebal dan bayangan solid 10px yang menonjol.
                  </p>
                  <div className="bg-amber-100 border-2 border-black p-3 text-xs font-bold">
                    💡 **Tips:** Anda dapat menggunakan modal ini untuk konfirmasi hapus data, form input cepat, atau notifikasi penting.
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t-2 border-black">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="bg-white text-black font-black text-xs uppercase border-2 border-black px-4 py-2 hover:bg-zinc-100 transition-all cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      alert('Tindakan Berhasil!')
                      setIsModalOpen(false)
                    }}
                    className="bg-lime-300 text-black font-black text-xs uppercase border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_#000] hover:bg-lime-400 transition-all cursor-pointer"
                  >
                    Ya, Lanjutkan
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 7: NOTIFIKASI & ALERTS */}
        {/* ========================================================================= */}
        <section className="space-y-4">
          <div className="border-b-3 border-black pb-2 flex items-center justify-between">
            <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
              <span className="bg-lime-300 border-2 border-black px-2 py-0.5 text-base">08</span> Notifikasi & Alert Banners
            </h2>
            <span className="text-xs font-black uppercase bg-black text-white px-2 py-1">Feedback Banners</span>
          </div>

          <div className="space-y-4">
            {/* Success Alert */}
            <div className="bg-lime-200 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">✅</span>
                <div>
                  <p className="font-black text-sm uppercase">Berhasil Menyimpan Data!</p>
                  <p className="text-xs font-bold text-zinc-700">Perubahan konfigurasi peta Anda telah diperbarui secara otomatis.</p>
                </div>
              </div>
              <span className="font-black text-xs uppercase bg-black text-white px-2 py-1">Sukses</span>
            </div>

            {/* Warning Alert */}
            <div className="bg-yellow-200 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">⚠️</span>
                <div>
                  <p className="font-black text-sm uppercase">Peringatan Kuota Data!</p>
                  <p className="text-xs font-bold text-zinc-700">Penggunaan API geospasial Anda telah mencapai 85% batas bulanan.</p>
                </div>
              </div>
              <span className="font-black text-xs uppercase bg-black text-white px-2 py-1">Peringatan</span>
            </div>

            {/* Error Alert */}
            <div className="bg-pink-200 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">❌</span>
                <div>
                  <p className="font-black text-sm uppercase">Koneksi Server Terputus!</p>
                  <p className="text-xs font-bold text-zinc-700">Gagal menghubungkan ke database server GIS. Silakan coba lagi.</p>
                </div>
              </div>
              <span className="font-black text-xs uppercase bg-black text-white px-2 py-1">Gagal</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default ComponentUIPage