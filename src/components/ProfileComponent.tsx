import React, { useEffect } from 'react'
import { useUserStore } from '../store/user.store'
import { FaCheck } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const ProfileComponent: React.FC = () => {
  const {
    user,
    profileDetail,
    updateDetail,
    isLoading,
    error,
    clearError,
    addUserAddress
  } = useUserStore()
  const navigate = useNavigate()
  const [formData, setFormData] = React.useState({
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    gender: ''
  });

  const [negara, setNegara] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [kota, setKota] = React.useState('')
  const [provinsi, setProvinsi] = React.useState('')
  const [kode_pos, setKodePos] = React.useState('')

  const [savingField, setSavingField] = React.useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = React.useState<string | null>(null);
  const [isModalAddressOpen, setIsModalAddressOpen] = React.useState(false);
  const [isModalDeleteAddress, setIsModalDeleteAddress] = React.useState(false);

  useEffect(() => {
    profileDetail()
  }, [])

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        phone: user.phone || '',
        gender: user.gender || ''
      })
    }
  }, [user])

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBlur = async (field: keyof typeof formData) => {
    const newValue = formData[field]
    if (user && user[field] === newValue) return

    try {
      setSavingField(field)
      setSaveSuccess(null)
      await updateDetail({ [field]: newValue })
      setSaveSuccess(`Berhasil mengupdate ${field}!`)
      setTimeout(() => setSaveSuccess(null), 3000)
    } catch {
      // Error ditangani oleh store
    } finally {
      setSavingField(null)
    }
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    clearError()
    console.log("data masuk")
    try {
      await addUserAddress({ negara, address, kota, provinsi, kode_pos });
      setIsModalAddressOpen(false)
      navigate(0)
    } catch (error) {
      // Error is caught and stored in Zustand error state
    }
  }

  const handleAddressDelete = async (uuid: string) => {
    setIsModalDeleteAddress(true)
    console.log("uuid dari delete", uuid)
  }

  const handleAddressUpdate = async (uuid: string) => {
    console.log("uuid dari detail", uuid)
  }

  return (
    <div>
      <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden space-y-6">
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

        {saveSuccess && (
          <div className="bg-lime-200 border-3 border-black p-3 shadow-[4px_4px_0px_0px_#000] font-black uppercase text-xs text-lime-900">
            {saveSuccess}
          </div>
        )}

        {isLoading && !savingField && (
          <div className="bg-yellow-100 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] text-center font-black uppercase text-sm animate-pulse">
            Memuat Detail Profil dari Server...
          </div>
        )}

        {error && !isLoading && (
          <div className="bg-pink-200 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-black text-xs uppercase text-pink-900">Gagal Memuat / Mengupdate Profil</p>
              <p className="text-xs font-bold text-black">{error}</p>
            </div>
          </div>
        )}

        {!isLoading && user && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-zinc-500">Username</span>
                  {savingField === 'username' && <span className="text-[10px] font-bold text-amber-600 animate-pulse">Menyimpan...</span>}
                </div>
                <input
                  type="text"
                  placeholder="Ketik sesuatu di sini..."
                  value={formData.username}
                  onChange={(e) => handleChange('username', e.target.value)}
                  onBlur={() => handleBlur('username')}
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <span className="text-[10px] font-black uppercase text-zinc-500">Email</span>
                <p className="text-base font-black text-black">{user.email}</p>
              </div>

              <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-zinc-500">Nama Depan</span>
                  {savingField === 'firstName' && <span className="text-[10px] font-bold text-amber-600 animate-pulse">Menyimpan...</span>}
                </div>
                <input
                  type="text"
                  placeholder="Ketik sesuatu di sini..."
                  value={formData.firstName}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-zinc-500">Nama Belakang</span>
                  {savingField === 'lastName' && <span className="text-[10px] font-bold text-amber-600 animate-pulse">Menyimpan...</span>}
                </div>
                <input
                  type="text"
                  placeholder="Ketik sesuatu di sini..."
                  value={formData.lastName}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-zinc-500">Nomor Telepon</span>
                  {savingField === 'phone' && <span className="text-[10px] font-bold text-amber-600 animate-pulse">Menyimpan...</span>}
                </div>
                <input
                  type="text"
                  placeholder="Ketik sesuatu di sini..."
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  onBlur={() => handleBlur('phone')}
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-zinc-500">Jenis Kelamin</span>
                  {savingField === 'gender' && (
                    <span className="text-[10px] font-bold text-amber-600 animate-pulse">Menyimpan...</span>
                  )}
                </div>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange('gender', e.target.value)}
                  onBlur={() => handleBlur('gender')}
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all appearance-none cursor-pointer"
                >
                  <option value="tidak ada" disabled hidden>Tidak Ada</option>
                  <option value="pria">Pria</option>
                  <option value="wanita">Wanita</option>
                </select>
              </div>

            </div>

            {/* User Address Detail List if Available */}
            <div className="space-y-3 pt-4 border-t-3 border-black">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black uppercase text-black">Daftar Alamat Pengguna</h3>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => setIsModalAddressOpen(true)}
                    className="bg-cyan-300 text-black font-black text-sm uppercase border-3 border-black px-5 py-2.5 shadow-[4px_4px_0px_0px_#000] hover:bg-cyan-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
                  >
                    Tambah Alamat
                  </button>
                </div>
              </div>
              {user.detail && Array.isArray(user.detail) && user.detail.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {user.detail.map((addr: any, idx: number) => (
                    <div key={idx} className="bg-lime-100 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000]">
                      <div className="flex justify-between items-center">
                        <p className="text-xs font-black uppercase text-black">{`Alamat #${idx + 1}`}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddressUpdate(addr.uuid)}
                            className="bg-cyan-300 text-black font-black text-sm uppercase border-3 border-black p-2 shadow-[4px_4px_0px_0px_#000] hover:bg-cyan-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleAddressDelete(addr.uuid)}
                            className="bg-red-300 text-black font-black text-sm uppercase border-3 border-black p-2 shadow-[4px_4px_0px_0px_#000] hover:bg-red-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-zinc-700 mt-1">{addr.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal Popup Tambah Alamat Container */}
      {isModalAddressOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[10px_10px_0px_0px_#000] w-full space-y-6 animate-in fade-in zoom-in duration-150 overflow-y-auto max-h-[80vh]">
            <div className="flex items-center justify-between border-b-3 border-black pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-yellow-300 border-2 border-black px-2 py-0.5 font-black text-xs uppercase">MODAL</span>
                <h3 className="font-black text-xl uppercase">Tambah Alamat</h3>
              </div>
              <button
                onClick={() => setIsModalAddressOpen(false)}
                className="bg-pink-300 border-2 border-black font-black h-8 w-8 flex items-center justify-center hover:bg-pink-400 transition-all cursor-pointer"
              >
                <FaCheck />
              </button>
            </div>

            <div className="space-y-2">
              <form onSubmit={handleAddressSubmit}>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase text-black">Negara</label>
                  <input
                    type="text"
                    value={negara}
                    onChange={(e) => setNegara(e.target.value)}
                    placeholder="Ketik sesuatu di sini..."
                    className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase text-black">Alamat</label>
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ketik sesuatu di sini..."
                    className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase text-black">Kota</label>
                  <input
                    type="text"
                    value={kota}
                    onChange={(e) => setKota(e.target.value)}
                    placeholder="Ketik sesuatu di sini..."
                    className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase text-black">Provinsi</label>
                  <input
                    type="text"
                    value={provinsi}
                    onChange={(e) => setProvinsi(e.target.value)}
                    placeholder="Ketik sesuatu di sini..."
                    className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black uppercase text-black">Kode Pos</label>
                  <input
                    type="text"
                    value={kode_pos}
                    onChange={(e) => setKodePos(e.target.value)}
                    placeholder="Ketik sesuatu di sini..."
                    className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                  />
                </div>
              </form>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t-2 border-black">
              <button
                onClick={() => setIsModalAddressOpen(false)}
                className="bg-white text-black font-black text-xs uppercase border-2 border-black px-4 py-2 hover:bg-zinc-100 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleAddressSubmit}
                className="bg-lime-300 text-black font-black text-xs uppercase border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_#000] hover:bg-lime-400 transition-all cursor-pointer"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Popup Delete Alamat Container */}
      {isModalDeleteAddress && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black p-6 sm:p-8 shadow-[10px_10px_0px_0px_#000] max-w-lg w-full space-y-6 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b-3 border-black pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-yellow-300 border-2 border-black px-2 py-0.5 font-black text-xs uppercase">MODAL</span>
                <h3 className="font-black text-xl uppercase">Konfirmasi Tindakan</h3>
              </div>
              <button
                onClick={() => setIsModalDeleteAddress(false)}
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
                onClick={() => setIsModalDeleteAddress(false)}
                className="bg-white text-black font-black text-xs uppercase border-2 border-black px-4 py-2 hover:bg-zinc-100 transition-all cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  alert('Tindakan Berhasil!')
                  setIsModalDeleteAddress(false)
                }}
                className="bg-lime-300 text-black font-black text-xs uppercase border-2 border-black px-4 py-2 shadow-[2px_2px_0px_0px_#000] hover:bg-lime-400 transition-all cursor-pointer"
              >
                Ya, Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileComponent