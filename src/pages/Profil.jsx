import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Profil() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    alamat: '',
    telepon: '',
    tanggalLahir: '',
    lokasi: '',
    kodePos: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  // Redirect jika tidak login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Load user data ke form
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ')[1] || '',
        email: user.email || '',
        alamat: user.alamat || '',
        telepon: user.telepon || '',
        tanggalLahir: user.tanggalLahir || '',
        lokasi: user.lokasi || '',
        kodePos: user.kodePos || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.firstName.trim()) {
      alert('Nama Pertama harus diisi!');
      return;
    }
    if (!formData.lastName.trim()) {
      alert('Nama Terakhir harus diisi!');
      return;
    }
    if (!formData.email.trim()) {
      alert('Email harus diisi!');
      return;
    }

    // Simulasi update profil (nanti bisa diganti dengan API call)
    try {
      const updatedUser = {
        ...user,
        name: `${formData.firstName} ${formData.lastName}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        alamat: formData.alamat,
        telepon: formData.telepon,
        tanggalLahir: formData.tanggalLahir,
        lokasi: formData.lokasi,
        kodePos: formData.kodePos
      };

      // Update localStorage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setSuccessMessage('Profil berhasil diperbarui!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Gagal memperbarui profil!');
    }
  };

  const handleReset = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ')[1] || '',
        email: user.email || '',
        alamat: user.alamat || '',
        telepon: user.telepon || '',
        tanggalLahir: user.tanggalLahir || '',
        lokasi: user.lokasi || '',
        kodePos: user.kodePos || ''
      });
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null; // atau loading spinner
  }

  return (
    <div className="bg-gray-50 min-h-screen flex items-stretch">
      {/* Tombol Kembali */}
      <Link 
        to="/" 
        className="absolute top-6 left-8 z-10 text-gray-600 hover:text-orange-500 font-medium text-xl transition"
      >
        ← Kembali
      </Link>

      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
          <strong className="font-bold">Sukses!</strong>
          <span className="block sm:inline ml-1">{successMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-1/4 bg-white shadow-lg p-6 pt-10 flex flex-col items-center rounded-r-3xl">
        <div className="w-24 h-24 rounded-full bg-orange-200 flex items-center justify-center mb-4 overflow-hidden">
          {user?.profileImage ? (
            <img src={user.profileImage} alt="Foto Profil" className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl font-bold text-orange-600">
              {user?.firstName?.charAt(0) || user?.name?.charAt(0) || 'U'}
            </span>
          )}
        </div>
        <h2 className="text-lg font-bold text-center">
          {user?.name || `${formData.firstName} ${formData.lastName}`}
        </h2>
        
        <nav className="w-full space-y-4 mt-6">
          <button className="w-full text-left px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-medium cursor-default">
            <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Informasi Pribadi
          </button>
          <button 
            onClick={() => setShowLogoutPopup(true)}
            className="w-full text-left px-4 py-2 rounded-full hover:bg-gray-100 transition"
          >
            <svg className="inline w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Keluar
          </button>
        </nav>

        {/* Popup Logout */}
        {showLogoutPopup && (
          <div className="fixed inset-0 backdrop-blur-sm bg-orange-100/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
              {/* Close Button */}
              <button 
                onClick={() => setShowLogoutPopup(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" fillRule="evenodd" d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm-6.125 31.071L24 28.946l6.125 6.125c.39.39 1.024.39 1.414 0s.39-1.024 0-1.414L25.414 27.532l6.125-6.125c.39-.39.39-1.024 0-1.414s-1.024-.39-1.414 0L24 26.118l-6.125-6.125c-.39-.39-1.024-.39-1.414 0s-.39 1.024 0 1.414l6.125 6.125-6.125 6.125c-.39.39-.39 1.024 0 1.414s1.024.39 1.414 0z"/>
                </svg>
              </button>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">Konfirmasi Logout</h3>
                <p className="text-gray-600 mb-6">Apakah Anda yakin ingin keluar dari akun ini?</p>
                
                {/* Action Buttons */}
                <div className="flex space-x-4 justify-center">
                  <button 
                    onClick={() => setShowLogoutPopup(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition duration-300"
                  >
                    Batal
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
                  >
                    Ya, Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-10">
        <div className="bg-white rounded-3xl shadow-md p-10 w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-6">Data Diri</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Pertama <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Nama Terakhir <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="alamat" className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                <input 
                  type="text" 
                  id="alamat" 
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>

              <div>
                <label htmlFor="telepon" className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                <input 
                  type="text" 
                  id="telepon" 
                  name="telepon"
                  value={formData.telepon}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>

              <div>
                <label htmlFor="tanggalLahir" className="block text-sm font-medium text-gray-700 mb-1">Tanggal Lahir</label>
                <input 
                  type="date" 
                  id="tanggalLahir" 
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>

              <div>
                <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <input 
                  type="text" 
                  id="lokasi" 
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>

              <div>
                <label htmlFor="kodePos" className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                <input 
                  type="text" 
                  id="kodePos" 
                  name="kodePos"
                  value={formData.kodePos}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                />
              </div>
            </div>

            <div className="flex justify-end mt-10 space-x-4">
              <button 
                type="button"
                onClick={handleReset}
                className="border border-orange-500 text-orange-500 px-6 py-2 rounded-full hover:bg-orange-100 transition duration-300"
              >
                Buang Perubahan
              </button>
              <button 
                type="submit"
                className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition duration-300"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profil;