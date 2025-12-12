import { useState, useEffect } from "react"
import { Link } from "react-router-dom" 

export default function Favorit() {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || []
    setFavorites(saved)
  }, [])

  const handleRemove = (slug) => {
    const updated = favorites.filter(item => item.slug !== slug)
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  return (
    <div className="bg-[#ECE7D4] min-h-screen flex flex-col relative">

      <div className="flex-grow">
        
        {/* Breadcrumb */}
        <nav className="px-6 py-3 mx-6 mt-4 flex items-center text-sm text-black space-x-2">
          <Link to="/" className="font-semibold hover:underline transition">Beranda</Link>
          <span className="text-gray-400">/</span>
          <span className="font-semibold">Favorit</span>
        </nav>

        {/* Judul */}
        <section className="max-w-6xl mx-auto px-4 py-4 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Resep <span className="text-orange-600">Favorit</span>
          </h2>
          <p className="text-gray-600">
            Semua resep yang sudah kamu sukai tersimpan di sini.
          </p>
        </section>

        {/* Grid */}
        <section className="max-w-6xl mx-auto px-4 py-6 mb-10">
          {favorites.length === 0 ? (
            <div className="text-center mt-10">
                <p className="text-gray-600 mb-4">Belum ada resep favorit.</p>
                <Link to="/resep-masakan" className="text-orange-600 font-semibold hover:underline">
                    Cari Resep Sekarang
                </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {favorites.map((recipe, index) => (
                <div 
                  key={recipe.slug || index}
                  className="block bg-white rounded-xl p-3 shadow hover:shadow-xl relative transition-transform duration-200 hover:scale-[1.03] active:scale-95"
                >
                  {/* --- PERUBAHAN DISINI (Link Gambar) --- */}
                  {/* Kita kirim state: { from: "favorit" } */}
                  <Link 
                    to={`/resep/${recipe.slug}`} 
                    state={{ from: "favorit" }} 
                  >
                    <img 
                      src={recipe.image} 
                      alt={recipe.title} 
                      className="rounded-lg w-full h-40 object-cover mb-3"
                      onError={(e) => { e.target.src = "/assets/images/placeholder.png" }}
                    />
                  </Link>

                  {/* Tombol Hapus */}
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={(e) => {
                          e.preventDefault();
                          handleRemove(recipe.slug);
                      }}
                      className="p-1.5 rounded-full bg-white/80 hover:bg-white shadow-md transition duration-200"
                      title="Hapus dari favorit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="w-7 h-7">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 1.01 4.5 2.09C13.09 4.01 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    </button>
                  </div>

                  {/* --- PERUBAHAN DISINI (Link Judul) --- */}
                  <Link 
                    to={`/resep/${recipe.slug}`}
                    state={{ from: "favorit" }}
                  >
                    <h3 className="text-sm font-semibold mb-1 leading-snug hover:text-orange-600 transition">
                      {recipe.title}
                    </h3>
                    <p className="text-xs text-gray-700">Oleh {recipe.author}</p>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  )
}