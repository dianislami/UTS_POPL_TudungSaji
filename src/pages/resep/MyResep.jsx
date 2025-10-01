import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function MyResep() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reseps, setReseps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // Simulasi data resep dari localStorage atau bisa dari API
  useEffect(() => {
    loadReseps();
  }, []);

  const loadReseps = () => {
    try {
      // Ambil resep dari localStorage (nanti bisa diganti dengan API call)
      const savedRecipes = localStorage.getItem(`recipes_${user?.id || 'user'}`);
      if (savedRecipes) {
        setReseps(JSON.parse(savedRecipes));
      }
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecipe = (index) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus resep ini?')) {
      const updatedReseps = reseps.filter((_, i) => i !== index);
      setReseps(updatedReseps);
      
      // Simpan ke localStorage
      localStorage.setItem(`recipes_${user?.id || 'user'}`, JSON.stringify(updatedReseps));
      
      setSuccessMessage('Resep berhasil dihapus!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const handleViewRecipe = (recipe) => {
    navigate('/tampilkan-resep', { 
      state: { recipeData: recipe }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECE7D4] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Memuat resep...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ECE7D4] font-inter">
      {/* Breadcrumb */}
      <nav className="px-6 py-3 mx-6 flex items-center text-sm text-black space-x-2">
        <Link to="/dashboard" className="font-semibold hover:underline transition">Dashboard</Link>
        <span className="text-gray-400">›</span>
        <span className="font-semibold text-gray-700">ResepKu</span>
      </nav>

      {/* Success Message */}
      {successMessage && (
        <div className="max-w-6xl mx-auto px-4 mt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Sukses!</strong>
            <span className="block sm:inline ml-1">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="max-w-6xl mx-auto px-4 py-4">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold mb-2">
            Resep<span className="text-orange-600">Ku</span>
          </h2>
          <p className="text-gray-600">Nikmati Kembali Masakan Mu!</p>
        </div>

        {/* Tombol Tambah Resep - hanya muncul jika ada resep */}
        {reseps.length > 0 && (
          <div className="flex justify-end mb-4">
            <Link 
              to="/tambah-resep" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              + Tambah Resep Baru
            </Link>
          </div>
        )}
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        {reseps.length === 0 ? (
          // Empty State
          <div className="text-center py-10">
            <div className="mb-6">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-xl text-gray-700 mb-2">Kamu belum punya resep nih.</p>
            <p className="text-gray-500 mb-6">Yuk, mulai bagikan kreasi masakanmu!</p>
            <Link 
              to="/tambah-resep" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
            >
              Buat Resep Pertamamu
            </Link>
          </div>
        ) : (
          // Recipe Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {reseps.map((resep, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition duration-300">
                <div 
                  className="cursor-pointer"
                  onClick={() => handleViewRecipe(resep)}
                >
                  {resep.image ? (
                    <img 
                      src={resep.image} 
                      alt={resep.title} 
                      className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                      <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="p-4 flex flex-col flex-grow">
                  <h3 
                    className="font-bold text-lg mb-2 truncate cursor-pointer hover:text-orange-600 transition"
                    title={resep.title}
                    onClick={() => handleViewRecipe(resep)}
                  >
                    {resep.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-1">Porsi: {resep.servings} orang</p>
                  <p className="text-gray-600 text-sm mb-3">Waktu: {resep.cookingTime} menit</p>
                  <p className="text-gray-700 text-sm mb-3 flex-grow">{resep.description?.substring(0, 100)}...</p>

                  <div className="mt-auto flex justify-between items-center space-x-2">
                    <button 
                      onClick={() => handleViewRecipe(resep)}
                      className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded transition duration-300"
                    >
                      Lihat
                    </button>
                    <button 
                      onClick={() => handleDeleteRecipe(index)}
                      className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded transition duration-300"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MyResep;