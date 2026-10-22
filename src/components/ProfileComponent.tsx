import React, { useEffect, useState } from "react";
import { useUserStore } from "../store/user.store";
import { 
  FaCheck, 
  FaMagnifyingGlass, 
  FaRotate, 
  FaXmark,
  FaArrowLeft,
  FaArrowRight,
  FaShieldHalved
} from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProfileComponent: React.FC = () => {
  const {
    user,
    profileDetail,
    updateDetail,
    isLoading,
    error,
    clearError,
    addUserAddress,
    getHistoryLogin,
    paginationLoginHistory,
    paramsLoginHistory,
    isLoadingLoginHistory,
    errorLoginHistory,
    getLoginHistory,
  } = useUserStore();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    gender: "",
  });

  const [negara, setNegara] = useState("");
  const [address, setAddress] = useState("");
  const [kota, setKota] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kode_pos, setKodePos] = useState("");

  const [savingField, setSavingField] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [isModalAddressOpen, setIsModalAddressOpen] = useState(false);
  const [isModalDeleteAddress, setIsModalDeleteAddress] = useState(false);

  // Filter & Search local state
  const [searchInput, setSearchInput] = useState(paramsLoginHistory.search || "");
  const [sortOrder, setSortOrder] = useState<string>(paramsLoginHistory.sort || "terbaru");
  const [pageSize, setPageSize] = useState<number>(Number(paramsLoginHistory.size) || 10);

  useEffect(() => {
    profileDetail();
    getLoginHistory({ page: 1, size: 10, sort: "terbaru", search: "" });
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        gender: user.gender || "",
      });
    }
  }, [user]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = async (field: keyof typeof formData) => {
    const newValue = formData[field];
    if (user && user[field] === newValue) return;

    try {
      setSavingField(field);
      setSaveSuccess(null);
      await updateDetail({ [field]: newValue });
      setSaveSuccess(`Berhasil mengupdate ${field}!`);
      setTimeout(() => setSaveSuccess(null), 3000);
    } catch {
      // Error ditangani oleh store
    } finally {
      setSavingField(null);
    }
  };

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    try {
      await addUserAddress({ negara, address, kota, provinsi, kode_pos });
      setIsModalAddressOpen(false);
      navigate(0);
    } catch (error) {
      // Error is caught and stored in Zustand error state
    }
  };

  const handleAddressDelete = async (uuid: string) => {
    setIsModalDeleteAddress(true);
    console.log("uuid dari delete", uuid);
  };

  const handleAddressUpdate = async (uuid: string) => {
    console.log("uuid dari detail", uuid);
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    getLoginHistory({
      page: 1,
      search: searchInput.trim(),
      size: pageSize,
      sort: sortOrder,
    });
  };

  const handleResetSearch = () => {
    setSearchInput("");
    getLoginHistory({
      page: 1,
      search: "",
      size: pageSize,
      sort: sortOrder,
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSortOrder(newSort);
    getLoginHistory({
      page: 1,
      sort: newSort,
      size: pageSize,
      search: searchInput.trim(),
    });
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    getLoginHistory({
      page: 1,
      size: newSize,
      sort: sortOrder,
      search: searchInput.trim(),
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > (paginationLoginHistory.totalPages || 1)) return;
    getLoginHistory({
      page: newPage,
      size: pageSize,
      sort: sortOrder,
      search: searchInput.trim(),
    });
  };

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const d = new Date(dateStr);
      return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }).format(d);
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {/* Profil Pengguna Card */}
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
            {isLoading ? "Memuat..." : "Refresh Data"}
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
                  {savingField === "username" && <span className="text-[10px] font-bold text-amber-600 animate-pulse">Menyimpan...</span>}
                </div>
                <input
                  type="text"
                  placeholder="Ketik sesuatu di sini..."
                  value={formData.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  onBlur={() => handleBlur("username")}
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
                  {savingField === "firstName" && <span className="text-[10px] font-bold text-amber-600 animate-pulse">Menyimpan...</span>}
                </div>
                <input
                  type="text"
                  placeholder="Ketik sesuatu di sini..."
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  onBlur={() => handleBlur("firstName")}
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-zinc-500">Nama Belakang</span>
                  {savingField === "lastName" && <span className="text-[10px] font-bold text-amber-600 animate-pulse">Menyimpan...</span>}
                </div>
                <input
                  type="text"
                  placeholder="Ketik sesuatu di sini..."
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  onBlur={() => handleBlur("lastName")}
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-zinc-500">Nomor Telepon</span>
                  {savingField === "phone" && <span className="text-[10px] font-bold text-amber-600 animate-pulse">Menyimpan...</span>}
                </div>
                <input
                  type="text"
                  placeholder="Ketik sesuatu di sini..."
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  onBlur={() => handleBlur("phone")}
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
                />
              </div>

              <div className="bg-zinc-50 border-3 border-black p-4 shadow-[3px_3px_0px_0px_#000] space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-zinc-500">Jenis Kelamin</span>
                  {savingField === "gender" && (
                    <span className="text-[10px] font-bold text-amber-600 animate-pulse">Menyimpan...</span>
                  )}
                </div>
                <select
                  value={formData.gender}
                  onChange={(e) => handleChange("gender", e.target.value)}
                  onBlur={() => handleBlur("gender")}
                  className="w-full bg-white border-3 border-black p-3 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all appearance-none cursor-pointer"
                >
                  <option value="tidak ada" disabled hidden>Tidak Ada</option>
                  <option value="pria">Pria</option>
                  <option value="wanita">Wanita</option>
                </select>
              </div>
            </div>

            {/* User Address Detail List */}
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

      {/* Riwayat Login Card */}
      <div className="bg-white border-4 border-black p-6 sm:p-10 shadow-[8px_8px_0px_0px_#000] relative overflow-hidden space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-3 border-black pb-4">
          <div>
            <div className="inline-block bg-yellow-300 border-2 border-black px-3 py-1 font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_#000] mb-2">
              SECURITY LOG
            </div>
            <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-black leading-tight flex items-center gap-2">
              <FaShieldHalved className="text-xl sm:text-2xl" /> Riwayat Login
            </h2>
          </div>
          <button
            type="button"
            onClick={() => getLoginHistory({ page: 1, size: pageSize, sort: sortOrder, search: searchInput.trim() })}
            disabled={isLoadingLoginHistory}
            className="bg-lime-300 text-black font-black text-sm uppercase border-3 border-black px-5 py-2.5 shadow-[4px_4px_0px_0px_#000] hover:bg-lime-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] transition-all cursor-pointer flex items-center gap-2"
          >
            <FaRotate className={isLoadingLoginHistory ? "animate-spin" : ""} />
            {isLoadingLoginHistory ? "Memuat..." : "Refresh Riwayat"}
          </button>
        </div>

        {errorLoginHistory && (
          <div className="bg-pink-200 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] flex items-center gap-3">
            <span className="text-xl">⚠️</span>
            <div>
              <p className="font-black text-xs uppercase text-pink-900">Gagal Mengambil Riwayat Login</p>
              <p className="text-xs font-bold text-black">{errorLoginHistory}</p>
            </div>
          </div>
        )}

        {/* Filter & Search Bar */}
        <div className="bg-zinc-50 border-3 border-black p-4 shadow-[4px_4px_0px_0px_#000] space-y-3">
          <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Cari IP, status, browser, tanggal..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-white border-3 border-black p-2.5 pr-10 text-sm font-bold text-black placeholder-zinc-400 focus:outline-none focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] transition-all"
              />
              {searchInput && (
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-black font-bold p-1 cursor-pointer"
                  title="Reset pencarian"
                >
                  <FaXmark />
                </button>
              )}
            </div>

            {/* Action Controls */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="submit"
                className="bg-yellow-300 text-black font-black text-xs uppercase border-3 border-black px-4 py-3 shadow-[3px_3px_0px_0px_#000] hover:bg-yellow-400 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <FaMagnifyingGlass /> Cari
              </button>

              {/* Sort Order Selector */}
              <div className="flex items-center gap-1.5 bg-white border-3 border-black px-2 py-1.5 shadow-[2px_2px_0px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-zinc-500">Urut:</span>
                <select
                  value={sortOrder}
                  onChange={handleSortChange}
                  className="text-xs font-black uppercase bg-transparent border-none focus:outline-none cursor-pointer"
                >
                  <option value="terbaru">Terbaru</option>
                  <option value="terlama">Terlama</option>
                </select>
              </div>

              {/* Page Size Selector */}
              <div className="flex items-center gap-1.5 bg-white border-3 border-black px-2 py-1.5 shadow-[2px_2px_0px_0px_#000]">
                <span className="text-[10px] font-black uppercase text-zinc-500">Jumlah:</span>
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="text-xs font-black uppercase bg-transparent border-none focus:outline-none cursor-pointer"
                >
                  <option value={5}>5 Baris</option>
                  <option value={10}>10 Baris</option>
                  <option value={20}>20 Baris</option>
                  <option value={50}>50 Baris</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        {/* Login History Table */}
        <div className="border-3 border-black shadow-[6px_6px_0px_0px_#000] overflow-x-auto bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-yellow-300 border-b-3 border-black text-black text-xs font-black uppercase tracking-wider">
                <th className="py-3 px-4 border-r-2 border-black text-center w-12">No</th>
                <th className="py-3 px-4 border-r-2 border-black w-32">Status</th>
                <th className="py-3 px-4 border-r-2 border-black w-48">Waktu Login</th>
                <th className="py-3 px-4 border-r-2 border-black w-40">IP Address</th>
                <th className="py-3 px-4 border-r-2 border-black">Perangkat & OS</th>
                <th className="py-3 px-4 border-r-2 border-black">Browser</th>
                <th className="py-3 px-4">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black text-sm font-bold text-black">
              {isLoadingLoginHistory ? (
                <tr>
                  <td colSpan={7} className="py-10 text-center bg-yellow-50 animate-pulse font-black uppercase text-sm">
                    Memuat Riwayat Login...
                  </td>
                </tr>
              ) : getHistoryLogin && getHistoryLogin.length > 0 ? (
                getHistoryLogin.map((item, idx) => {
                  const itemIndex = ((Number(paginationLoginHistory.page) || 1) - 1) * pageSize + (idx + 1);
                  const isSuccess = (item.status || "").toUpperCase() === "SUCCESS";

                  return (
                    <tr
                      key={item.uuid || idx}
                      className="hover:bg-yellow-50/70 transition-colors"
                    >
                      <td className="py-3 px-4 border-r-2 border-black text-center font-black text-xs text-zinc-600">
                        {itemIndex}
                      </td>
                      <td className="py-3 px-4 border-r-2 border-black">
                        <span
                          className={`inline-block border-2 border-black px-2.5 py-0.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_#000] ${
                            isSuccess
                              ? "bg-emerald-300 text-black"
                              : "bg-pink-300 text-black"
                          }`}
                        >
                          {item.status || "UNKNOWN"}
                        </span>
                      </td>
                      <td className="py-3 px-4 border-r-2 border-black whitespace-nowrap text-xs font-bold text-zinc-800">
                        {formatDateTime(item.login_at)}
                      </td>
                      <td className="py-3 px-4 border-r-2 border-black font-mono text-xs font-bold text-zinc-800">
                        {item.ip_address || "Unknown"}
                      </td>
                      <td className="py-3 px-4 border-r-2 border-black text-xs">
                        <div className="flex flex-col">
                          <span className="font-black text-black">{item.device || "Desktop"}</span>
                          <span className="text-[11px] font-bold text-zinc-500">{item.os || "Unknown OS"}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 border-r-2 border-black text-xs font-bold text-zinc-800">
                        {item.browser || "Unknown Browser"}
                      </td>
                      <td className="py-3 px-4 text-xs font-bold text-zinc-700">
                        {item.failure_reason ? (
                          <span className="text-rose-700 font-bold">{item.failure_reason}</span>
                        ) : (
                          <span className="text-emerald-700">Berhasil masuk</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center bg-zinc-50">
                    <div className="space-y-2">
                      <p className="text-base font-black uppercase text-zinc-700">
                        Tidak Ada Riwayat Login Ditemukan
                      </p>
                      <p className="text-xs font-bold text-zinc-500">
                        {searchInput ? "Coba ganti kata kunci pencarian Anda." : "Belum ada catatan aktivitas login untuk akun ini."}
                      </p>
                      {searchInput && (
                        <button
                          type="button"
                          onClick={handleResetSearch}
                          className="mt-2 bg-yellow-300 text-black font-black text-xs uppercase border-2 border-black px-3 py-1 shadow-[2px_2px_0px_0px_#000] hover:bg-yellow-400 cursor-pointer"
                        >
                          Reset Pencarian
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t-3 border-black pt-4">
          <div className="text-xs font-black uppercase text-zinc-700">
            Halaman {paginationLoginHistory.page || 1} dari {paginationLoginHistory.totalPages || 1} &bull; Total{" "}
            <span className="underline decoration-2">{paginationLoginHistory.totalData || 0}</span> Riwayat
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange((paginationLoginHistory.page || 1) - 1)}
              disabled={Number(paginationLoginHistory.page || 1) <= 1 || isLoadingLoginHistory}
              className="bg-white text-black font-black text-xs uppercase border-2 border-black px-3 py-2 shadow-[2px_2px_0px_0px_#000] hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <FaArrowLeft /> Sebelumnya
            </button>

            <span className="bg-yellow-300 border-2 border-black px-3 py-1.5 font-black text-xs shadow-[2px_2px_0px_0px_#000]">
              {paginationLoginHistory.page || 1}
            </span>

            <button
              type="button"
              onClick={() => handlePageChange((paginationLoginHistory.page || 1) + 1)}
              disabled={
                Number(paginationLoginHistory.page || 1) >= (paginationLoginHistory.totalPages || 1) ||
                isLoadingLoginHistory
              }
              className="bg-white text-black font-black text-xs uppercase border-2 border-black px-3 py-2 shadow-[2px_2px_0px_0px_#000] hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center gap-1.5"
            >
              Berikutnya <FaArrowRight />
            </button>
          </div>
        </div>
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
                  alert("Tindakan Berhasil!");
                  setIsModalDeleteAddress(false);
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
  );
};

export default ProfileComponent;
