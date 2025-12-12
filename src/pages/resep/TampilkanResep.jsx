import { useLocation, Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import resepList from '../../data/reseplist'; 

function TampilkanResep() {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams(); 
  const { user } = useAuth(); // User data sekarang dipakai di Navbar, tapi boleh tetap dipanggil jika butuh
  const [recipeData, setRecipeData] = useState(null);

  // Logic cek dari favorit atau bukan
  const isFromFavorite = location.state?.from === "favorit";

  useEffect(() => {
    const stateRecipeData = location.state?.recipeData;
    
    if (stateRecipeData) {
      setRecipeData(stateRecipeData);
    } 
    else if (slug) {
      const staticRecipe = resepList.find(recipe => recipe.slug === slug);
      if (staticRecipe) {
        setRecipeData(staticRecipe);
      } else {
        navigate('/dashboard');
      }
    } else {
      navigate('/dashboard');
    }
  }, [slug, location.state, navigate]);

  if (!recipeData) {
    return (
      <div className="min-h-screen bg-[#ECE7D4] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Memuat resep...</h2>
        </div>
      </div>
    );
  }

  return (
    // Background disamakan dengan Navbar/Page lain (#ECE7D4)
    <div className="min-h-screen bg-[#ECE7D4] font-inter text-[#1f1f1f] flex flex-col">
      
      {/* 
          HEADER MANUAL DIHAPUS 
          Karena Navbar dari App.js sekarang sudah muncul otomatis di sini
      */}

      <div className="flex-grow">
        
        {/* Breadcrumb */}
        <nav className="px-6 py-3 mx-6 mt-4 flex items-center text-sm text-black space-x-2">
          <Link to="/" className="font-semibold hover:underline transition">Beranda</Link>
          <span className="text-gray-400">/</span>
          
          {/* Logic Breadcrumb */}
          {isFromFavorite ? (
            <Link to="/favorit" className="font-semibold hover:underline transition">Favorit</Link>
          ) : (
            <Link to="/resep-masakan" className="font-semibold hover:underline transition">Resep Masakan</Link>
          )}

          <span className="text-gray-400">/</span>
          <span className="font-semibold text-gray-700">{recipeData.title}</span>
        </nav>

        {/* Judul Besar di Tengah (Optional, agar mirip layout Resep Masakan) */}
        <section className="max-w-6xl mx-auto px-4 py-2 text-center">
          <h2 className="text-3xl font-bold mb-2">
            Resep <span className="text-orange-600">{recipeData.title}</span>
          </h2>
        </section>

        {/* Main Content Card */}
        <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6 py-6 mb-10">
          
          {/* Sidebar / Left Column (Foto & Bahan) */}
          <aside className="col-span-1 md:border-r md:border-gray-300 md:pr-6">
            {recipeData.image && (
              <img 
                src={recipeData.image} 
                alt={`Foto Resep ${recipeData.title}`} 
                className="rounded-lg mb-6 w-full h-64 object-cover shadow-md"
                onError={(e) => { e.target.src = "/assets/images/placeholder.png" }}
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

          {/* Right Column (Detail & Langkah) */}
          <section className="col-span-1 md:col-span-3 md:px-4">
            <div className='flex justify-between items-start'>
                <div>
                    <h2 className="text-2xl font-bold mb-1 text-gray-900">{recipeData.title}</h2>
                    <p className="text-sm text-gray-600 mb-4">
                        Oleh: <span className="font-medium">{recipeData.author || user?.name || 'Admin'}</span>
                    </p>
                </div>
            </div>

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
                <div key={index} className="flex items-start space-x-3 p-3 border rounded-md bg-white shadow-sm hover:shadow-md transition">
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
                to={isFromFavorite ? "/favorit" : "/resep-masakan"} 
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition duration-300 shadow"
              >
                {isFromFavorite ? "Kembali ke Favorit" : "Kembali"}
              </Link>

              <Link 
                to="/tambah-resep" 
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition duration-300 shadow"
              >
                Buat Resep Lain
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default TampilkanResep;