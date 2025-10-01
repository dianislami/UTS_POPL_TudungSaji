import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

function TampilkanResep() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const recipeData = location.state?.recipeData;

  // Redirect jika tidak ada data resep
  useEffect(() => {
    if (!recipeData) {
      navigate('/');
    }
  }, [recipeData, navigate]);

  if (!recipeData) {
    return (
      <div className="min-h-screen bg-[#f7f1df] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Resep tidak ditemukan</h2>
          <Link to="/" className="text-orange-600 hover:underline">
            Kembali ke Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f1df] font-inter text-[#1f1f1f]">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-orange-300 bg-[#f4c988]">
        <div className="flex items-center space-x-2">
          <Link to="/dashboard">
            <img src="/assets/images/Logo.png" alt="Tudung Saji" className="h-[7vh] w-auto min-w-[50px]" />
          </Link>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-center flex-grow">
          Resep <span className="text-orange-600">{recipeData.title}</span>
        </h1>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-semibold">Halo, {user?.name}!</span>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="px-6 py-3 mx-auto max-w-6xl mt-4 flex items-center text-sm text-black space-x-2">
        <Link to="/dashboard" className="font-semibold hover:underline transition">Dashboard</Link>
        <span className="text-gray-400">›</span>
        <Link to="/resep-masakan" className="font-semibold hover:underline transition">Resep Masakan</Link>
        <span className="text-gray-400">›</span>
        <span className="font-semibold text-gray-700">{recipeData.title}</span>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-6">
        {/* Sidebar / Left Column */}
        <aside className="col-span-1 md:border-r md:border-gray-300 md:pr-6">
          {recipeData.image && (
            <img 
              src={recipeData.image} 
              alt={`Foto Resep ${recipeData.title}`} 
              className="rounded-lg mb-6 w-full h-64 object-cover shadow-md" 
            />
          )}

          <h3 className="text-lg font-semibold text-gray-800 mb-3">Bahan-bahan:</h3>
          <p className="text-sm text-gray-700 mb-2">
            Porsi: <span className="font-semibold text-gray-900">{recipeData.servings} Orang</span>
          </p>

          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 pl-1">
            {recipeData.ingredients && recipeData.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </aside>

        {/* Recipe Detail */}
        <section className="col-span-1 md:col-span-3 md:px-4">
          <h2 className="text-2xl font-bold mb-1 text-gray-900">{recipeData.title}</h2>
          <p className="text-sm text-gray-600 mb-4">
            Oleh: <span className="font-medium">{user?.name || 'Admin'}</span>
          </p>

          <p className="text-sm text-gray-700 text-justify leading-relaxed mb-6">
            {recipeData.description}
          </p>

          <div className="mb-6">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Lama Memasak:</strong>
              <span className="font-semibold text-gray-900"> {recipeData.cookingTime} Menit</span>
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Langkah-langkah:</h3>
          </div>

          {/* Steps */}
          <div className="space-y-4">
            {recipeData.steps && recipeData.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 border rounded-md bg-white shadow-sm">
                <span className="flex-shrink-0 h-6 w-6 bg-orange-500 text-white text-sm font-semibold rounded-full flex items-center justify-center">
                  {index + 1}
                </span>
                <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex space-x-4">
            <Link 
              to="/" 
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Kembali ke Dashboard
            </Link>
            <Link 
              to="/tambah-resep" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition duration-300"
            >
              Tambah Resep Baru
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TampilkanResep;