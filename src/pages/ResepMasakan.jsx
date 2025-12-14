import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom' 
import resepList from '../data/reseplist' 

function ResepMasakan() {
  const [recipes] = useState(resepList)
  const [favorites, setFavorites] = useState([])
  
  // State notifikasi disamakan dengan Dashboard
  const [showNotif, setShowNotif] = useState({ show: false, message: '' })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(saved)
  }, [])

  // Logic Toggle Favorit (Tambah/Hapus) - Sama seperti Dashboard
  const handleFavoriteClick = (recipeSlug) => {
    const recipe = recipes.find(r => r.slug === recipeSlug)
    let updatedFavorites = [...favorites]
    const isAlreadyFav = updatedFavorites.some(r => r.slug === recipeSlug)

    if (isAlreadyFav) {
      // Hapus dari favorit
      updatedFavorites = updatedFavorites.filter(r => r.slug !== recipeSlug)
      setShowNotif({ show: true, message: '❌ Dihapus dari favorit' })
    } else {
      // Tambah ke favorit
      updatedFavorites.push({ ...recipe, isFavorited: true })
      setShowNotif({ show: true, message: '❤️ Ditambahkan ke favorit' })
    }

    // Simpan ke State & LocalStorage
    setFavorites(updatedFavorites)
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites))

    // Hilangkan notifikasi setelah 2 detik
    setTimeout(() => setShowNotif({ show: false, message: '' }), 2000)
  }

  const isFavorited = (slug) => {
    return favorites.some(r => r.slug === slug)
  }

  return (
    <div className="bg-[#ECE7D4] min-h-screen flex flex-col relative">

      {/* NOTIFIKASI POPUP (Style disamakan dengan Dashboard) */}
      {showNotif.show && (
        <div className="fixed top-24 right-6 bg-black/80 text-white px-4 py-2 rounded-lg shadow-xl z-50 animate-bounce transition-all">
          {showNotif.message}
        </div>
      )}

      <div className="flex-grow">
        {/* Breadcrumb */}
        <nav className="px-6 py-3 mx-6 mt-4 flex items-center text-sm text-black space-x-2">
          <Link to="/" className="font-semibold hover:underline transition">Beranda</Link>
          <span className="text-gray-400">/</span>
          <span className="font-semibold">Resep Masakan</span>
        </nav>

        {/* Judul & Deskripsi */}
        <section className="max-w-6xl mx-auto px-4 py-4 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Resep <span className="text-orange-600">Masakan</span>
          </h2>
          <p className="text-gray-600">
            Temukan berbagai resep masakan lezat dan praktis untuk setiap kesempatan.
          </p>
        </section>

        {/* Grid Resep */}
        <section className="max-w-6xl mx-auto px-4 py-6 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {recipes.map((recipe, index) => (
              <div key={index} className="block bg-white rounded-xl p-3 shadow hover:shadow-xl relative transition-transform duration-200 hover:scale-[1.03] active:scale-95 group">
                
                {/* Link ke TampilkanResep */}
                <Link to={`/resep/${recipe.slug}`}>
                  <div className="relative overflow-hidden rounded-lg mb-3">
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" 
                      onError={(e) => { e.target.src = "/assets/images/placeholder.png" }}
                    />
                  </div>
                </Link>

                {/* Tombol Favorite */}
                <div className="absolute top-4 right-4 flex space-x-2 z-10">
                  <button
                    onClick={(e) => {
                        e.preventDefault(); 
                        handleFavoriteClick(recipe.slug);
                    }}
                    className="p-1.5 rounded-full bg-white/80 hover:bg-white shadow transition duration-200 active:scale-95"
                    title={isFavorited(recipe.slug) ? "Hapus Favorit" : "Tambah Favorit"}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 transition-colors duration-300"
                      fill={isFavorited(recipe.slug) ? "red" : "none"}
                      stroke={isFavorited(recipe.slug) ? "red" : "currentColor"}
                      strokeWidth="1.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 
                          2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 
                          3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </button>
                </div>

                <Link to={`/resep/${recipe.slug}`}>
                  <h3 className="text-sm font-semibold mb-1 leading-snug hover:text-orange-600 transition">{recipe.title}</h3>
                  <p className="text-xs text-gray-700">Oleh {recipe.author}</p>
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default ResepMasakan