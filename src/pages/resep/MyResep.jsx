import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function MyResep() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [reseps, setReseps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // Simulasi data resep dari localStorage
  useEffect(() => {
    loadReseps();
  }, [user]);

  const loadReseps = () => {
    try {
      const userKey = `recipes_${user?.id || 'user'}`;
      const savedRecipes = localStorage.getItem(userKey);
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
      
      const userKey = `recipes_${user?.id || 'user'}`;
      localStorage.setItem(userKey, JSON.stringify(updatedReseps));
      
      setSuccessMessage('Resep berhasil dihapus!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Fungsi Baru untuk Edit
  const handleEditRecipe = (resep, index) => {
    navigate('/tambah-resep', { 
      state: { 
        recipeData: resep, 
        isEdit: true, 
        recipeIndex: index 
      }
    });
  };

  const handleViewRecipe = (resep) => {
    navigate(`/resep/${resep.slug}`, { 
      state: { recipeData: resep }
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
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-bounce" role="alert">
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
          <p className="text-gray-600">Kelola resep yang sudah kamu buat.</p>
        </div>

        {/* Tombol Tambah Resep */}
        {reseps.length > 0 && (
          <div className="flex justify-end mb-4">
            <Link 
              to="/tambah-resep" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Tambah Resep
            </Link>
          </div>
        )}
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-4 py-6 mb-10">
        {reseps.length === 0 ? (
          // Empty State
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <div className="mb-6">
              <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-xl text-gray-800 font-semibold mb-2">Kamu belum punya resep nih.</p>
            <p className="text-gray-500 mb-6">Yuk, mulai bagikan kreasi masakanmu sekarang!</p>
            <Link 
              to="/tambah-resep" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Buat Resep Pertamamu
            </Link>
          </div>
        ) : (
          // Recipe Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {reseps.map((resep, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col hover:shadow-xl transition duration-300 group">
                
                {/* Bagian Klik untuk Lihat Detail */}
                <div 
                  className="cursor-pointer relative flex-grow"
                  onClick={() => handleViewRecipe(resep)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={resep.image} 
                      alt={resep.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      onError={(e) => { e.target.src = "/assets/images/placeholder.png" }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300"></div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 truncate text-gray-800 group-hover:text-orange-600 transition">
                      {resep.title}
                    </h3>
                    
                    <p className="text-xs text-gray-500 mb-3 flex items-center">
                      Oleh {resep.author || user?.name || user?.firstName || 'Anda'}
                    </p>

                    <div className="flex items-center text-xs text-gray-500 space-x-3 mb-2">
                      <span className="bg-gray-100 px-2 py-1 rounded flex items-center">
                         ⏱️ {resep.cookingTime} mnt
                      </span>
                      <span className="bg-gray-100 px-2 py-1 rounded flex items-center">
                         🍽️ {resep.servings} org
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2">
                      {resep.description}
                    </p>
                  </div>
                </div>

                {/* Footer Card: Tombol Aksi (Minimalis di Pojok Kanan) */}
                <div className="px-4 pb-4 pt-0 mt-auto flex justify-end gap-2">
                  
                  {/* Tombol Edit (Hijau - Pensil) */}
                  <button 
                    onClick={() => handleEditRecipe(resep, index)}
                    className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow hover:shadow-md"
                    title="Edit Resep"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>

                  {/* Tombol Hapus (Merah - Sampah) */}
                  <button 
                    onClick={() => handleDeleteRecipe(index)}
                    className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow hover:shadow-md"
                    title="Hapus Resep"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>

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