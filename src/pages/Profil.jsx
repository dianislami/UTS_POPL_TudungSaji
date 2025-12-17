import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function Profil() {
  const { user, logout, isAuthenticated, updateUserState } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    alamat: '',
    telepon: '',
    tanggalLahir: '',
    lokasi: '',
    kodePos: '',
    profileImage: ''
  });
  
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const loadUserProfile = async () => {
      if (user && user.email) {
        try {
          const API_URL = import.meta.env.VITE_API_URL || 'https://tudungsaji-backend-production.up.railway.app/api';
          const response = await axios.get(`${API_URL}/profile/${user.email}`);
          
          if (response.data.success) {
            const userData = response.data.data;
            
            setFormData({
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              email: userData.email || '',
              alamat: userData.alamat || '',
              telepon: userData.telepon || '',
              tanggalLahir: userData.tanggalLahir ? userData.tanggalLahir.split('T')[0] : '',
              lokasi: userData.lokasi || '',
              kodePos: userData.kodePos || '',
              profileImage: userData.profileImage || ''
            });
          }
        } catch (error) {
          console.error('Error loading profile:', error);
          setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            alamat: user.alamat || '',
            telepon: user.telepon || '',
            tanggalLahir: user.tanggalLahir ? user.tanggalLahir.split('T')[0] : '',
            lokasi: user.lokasi || '',
            kodePos: user.kodePos || '',
            profileImage: user.profileImage || ''
          });
        }
      }
    };

    loadUserProfile();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData(prev => ({ ...prev, profileImage: URL.createObjectURL(file) }));
    }
  };

  const triggerFileInput = () => {
    if (isEditing) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim()) return alert('Email tidak boleh kosong!');

    setIsUploading(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append('email', formData.email);
      dataToSend.append('firstName', formData.firstName);
      dataToSend.append('lastName', formData.lastName);
      dataToSend.append('alamat', formData.alamat);
      dataToSend.append('telepon', formData.telepon);
      dataToSend.append('tanggalLahir', formData.tanggalLahir);
      dataToSend.append('lokasi', formData.lokasi);
      dataToSend.append('kodePos', formData.kodePos);

      if (imageFile) {
        dataToSend.append('profileImage', imageFile);
      }

      const API_URL = import.meta.env.VITE_API_URL || 'https://tudungsaji-backend-production.up.railway.app/api';
      const response = await axios.put(`${API_URL}/profile/update`, dataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        if (updateUserState) updateUserState(response.data.data);
        
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ 
          ...currentUser, 
          ...response.data.data 
        }));

        const refreshResponse = await axios.get(`${API_URL}/profile/${formData.email}`);
        if (refreshResponse.data.success) {
          const userData = refreshResponse.data.data;
          setFormData({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            email: userData.email || '',
            alamat: userData.alamat || '',
            telepon: userData.telepon || '',
            tanggalLahir: userData.tanggalLahir ? userData.tanggalLahir.split('T')[0] : '',
            lokasi: userData.lokasi || '',
            kodePos: userData.kodePos || '',
            profileImage: userData.profileImage || ''
          });
        }

        setSuccessMessage('Profil berhasil diperbarui!');
        setIsEditing(false);
        setImageFile(null);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Gagal update profil: ' + (error.response?.data?.message || error.message));
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = async () => {
    setIsEditing(false);
    setImageFile(null);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://tudungsaji-backend-production.up.railway.app/api';
      const response = await axios.get(`${API_URL}/profile/${user.email}`);
      if (response.data.success) {
        const userData = response.data.data;
        setFormData({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          alamat: userData.alamat || '',
          telepon: userData.telepon || '',
          tanggalLahir: userData.tanggalLahir ? userData.tanggalLahir.split('T')[0] : '',
          lokasi: userData.lokasi || '',
          kodePos: userData.kodePos || '',
          profileImage: userData.profileImage || ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getImageUrl = (img) => {
    if (!img) return null;
    if (img.startsWith('blob:')) return img;
    if (img.startsWith('http')) return img;
    const API_BASE = import.meta.env.VITE_API_URL || 'https://tudungsaji-backend-production.up.railway.app/api';
    const BASE_URL = API_BASE.replace('/api', '');
    return `${BASE_URL}${img}`;
  };

  if (!isAuthenticated) return null;

  return (
    // UBAH: Latar belakang halaman jadi orange-100
    <div className="bg-orange-100 min-h-screen flex items-stretch font-sans">
      <Link to="/" className="absolute top-6 left-8 z-10 text-gray-600 hover:text-orange-600 font-medium text-xl transition">
        ← Kembali
      </Link>

      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg animate-bounce">
          <strong className="font-bold">Sukses!</strong> <span className="block sm:inline ml-1">{successMessage}</span>
        </div>
      )}

      {/* Sidebar tetap putih agar kontras rapi */}
      <aside className="w-1/4 bg-white shadow-lg p-6 pt-10 flex flex-col items-center rounded-r-3xl border-r border-orange-200">
        
        <div 
            className={`relative group w-32 h-32 mb-4 ${isEditing ? 'cursor-pointer' : ''}`} 
            onClick={triggerFileInput}
        >
            <div className={`w-full h-full rounded-full bg-orange-50 flex items-center justify-center overflow-hidden border-4 ${isEditing ? 'border-orange-400' : 'border-orange-100'} shadow-md transition-colors`}>
            {formData.profileImage ? (
                <img src={getImageUrl(formData.profileImage)} alt="Foto" className="w-full h-full object-cover" />
            ) : (
                <span className="text-4xl font-bold text-orange-400">
                {formData.firstName?.charAt(0) || 'U'}
                </span>
            )}
            </div>
            
            {isEditing && (
              <div className="absolute bottom-1 right-1 bg-orange-500 text-white p-2 rounded-full shadow-lg hover:bg-orange-600 transition transform hover:scale-110">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
              </div>
            )}
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} disabled={!isEditing} />
        </div>

        <h2 className="text-xl font-bold text-center capitalize text-gray-800">
          {`${formData.firstName} ${formData.lastName}`}
        </h2>
        <p className="text-sm text-gray-500 mb-6">{formData.email}</p>
        
        <nav className="w-full space-y-3">
          <button className="w-full text-left px-6 py-3 rounded-xl bg-orange-50 text-orange-600 font-bold border-l-4 border-orange-500 shadow-sm cursor-default">
            Informasi Pribadi
          </button>
          <button onClick={() => setShowLogoutPopup(true)} className="w-full text-left px-6 py-3 rounded-xl text-gray-600 hover:bg-orange-50 transition font-medium">
            Keluar
          </button>
        </nav>

        {showLogoutPopup && (
          <div className="fixed inset-0 backdrop-blur-sm bg-orange-100/30 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md relative border border-orange-100">
              <h3 className="text-xl font-bold mb-4 text-center text-gray-800">Konfirmasi Logout</h3>
              <p className="text-gray-600 mb-6 text-center">Apakah Anda yakin ingin keluar dari akun ini?</p>
              <div className="flex space-x-4 justify-center">
                <button onClick={() => setShowLogoutPopup(false)} className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-6 py-2 rounded-lg font-medium transition duration-300">Batal</button>
                <button onClick={handleLogout} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300">Ya, Logout</button>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* UBAH: Latar main tetap orange-100 */}
      <main className="flex-grow flex items-center justify-center p-10 bg-orange-100">
        <div className="bg-white rounded-3xl shadow-xl p-12 w-full max-w-4xl border border-orange-100">
          <div className="flex justify-between items-center mb-8 border-b border-orange-100 pb-4">
            <h2 className="text-3xl font-bold text-gray-800">Data Diri</h2>
            
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition shadow-md flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Ubah Profil
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {[
                { label: 'Nama Depan', name: 'firstName', req: true },
                { label: 'Nama Belakang', name: 'lastName', req: true },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    {field.label} {field.req && <span className="text-orange-500">*</span>}
                  </label>
                  {/* UBAH: Kolom input jadi pastel orange */}
                  <input 
                    type="text" 
                    name={field.name} 
                    value={formData[field.name]} 
                    onChange={handleInputChange} 
                    disabled={!isEditing}
                    className={`w-full border rounded-xl px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-orange-400 
                      ${!isEditing 
                        ? 'bg-orange-100/50 text-gray-600 border-orange-100 cursor-not-allowed' 
                        : 'bg-orange-50 border-orange-200 text-gray-800'}`}
                  />
                </div>
              ))}

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Email (Tidak bisa diubah)</label>
                {/* UBAH: Email input jadi pastel orange gelap */}
                <input 
                  type="email" 
                  value={formData.email} 
                  disabled 
                  className="w-full border border-orange-200/50 bg-orange-200/50 rounded-xl px-5 py-3 text-gray-600 cursor-not-allowed"
                />
              </div>

              {[
                { label: 'Alamat', name: 'alamat' },
                { label: 'Nomor Telepon', name: 'telepon' },
                { label: 'Lokasi', name: 'lokasi' },
                { label: 'Kode Pos', name: 'kodePos' },
              ].map((field) => (
                <div key={field.name} className={field.name === 'alamat' ? 'md:col-span-2' : ''}>
                  <label className="block text-sm font-bold text-gray-700 mb-2">{field.label}</label>
                  {/* UBAH: Kolom input jadi pastel orange */}
                  <input 
                    type="text" 
                    name={field.name} 
                    value={formData[field.name]} 
                    onChange={handleInputChange} 
                    disabled={!isEditing}
                    className={`w-full border rounded-xl px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-orange-400 
                      ${!isEditing 
                        ? 'bg-orange-100/50 text-gray-600 border-orange-100 cursor-not-allowed' 
                        : 'bg-orange-50 border-orange-200 text-gray-800'}`}
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Tanggal Lahir</label>
                {/* UBAH: Kolom input jadi pastel orange */}
                <input 
                    type="date" 
                    name="tanggalLahir" 
                    value={formData.tanggalLahir} 
                    onChange={handleInputChange} 
                    disabled={!isEditing}
                    className={`w-full border rounded-xl px-5 py-3 transition focus:outline-none focus:ring-2 focus:ring-orange-400 
                      ${!isEditing 
                        ? 'bg-orange-100/50 text-gray-600 border-orange-100 cursor-not-allowed' 
                        : 'bg-orange-50 border-orange-200 text-gray-800 cursor-pointer'}`}
                />
              </div>

            </div>

            {isEditing && (
              <div className="flex justify-end mt-12 space-x-4 animate-fade-in-up">
                <button type="button" onClick={handleCancel} className="border-2 border-orange-500 text-orange-600 px-8 py-3 rounded-full font-bold hover:bg-orange-50 transition duration-300">
                  Batal
                </button>
                <button 
                  type="submit" 
                  disabled={isUploading} 
                  className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 shadow-lg hover:shadow-orange-500/30 transition duration-300 disabled:opacity-50"
                >
                  {isUploading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default Profil;