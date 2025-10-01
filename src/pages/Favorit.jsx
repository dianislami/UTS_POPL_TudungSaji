import { useState } from 'react'

function Favorit() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([
    {
      id: 1,
      img: "fav1.png",
      title: "Resep Spaghetti Bolognese Simple",
      author: "Nurul Izzati",
      isFavorited: true
    },
    {
      id: 2,
      img: "fav2.png",
      title: "Resep Sate Malang Daging Sapi Empuk dan Kaya Bumbu",
      author: "Dian Islami",
      isFavorited: true
    },
    {
      id: 3,
      img: "fav3.png",
      title: "Resep Es Doger Super Nyegerin",
      author: "Akrimah Usri",
      isFavorited: true
    },
    {
      id: 4,
      img: "res4.png",
      title: "Resep Bakso Daging Kenyal",
      author: "Davina Aura",
      isFavorited: true
    }
  ])

  const handleRemoveFavorite = (recipeId) => {
    setFavoriteRecipes(prev => prev.filter(recipe => recipe.id !== recipeId))
  }

  return (
    <div className="bg-[#ECE7D4] font-sans text-black min-h-screen flex flex-col">

      <div className="flex-grow">
        {/* Breadcrumb */}
        <nav className="px-6 py-3 mx-6 mt-4 flex items-center text-sm text-black space-x-2">
          <a href="/" className="font-semibold hover:underline transition">Beranda</a>
          <span className="text-gray-400">›</span>
          <span className="font-semibold">Favorit</span>
        </nav>

        {/* Judul Halaman */}
        <section className="max-w-6xl mx-auto px-4 py-4 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Menu <span className="text-orange-600">Favorit</span>
          </h2>
          <p className="text-gray-600">
            Temukan resep-resep pilihan yang paling kamu suka. Praktis, enak, dan jadi favorit banyak orang!
          </p>
        </section>

        {/* Grid Resep Favorit */}
        <div className="px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20">
          {favoriteRecipes.length > 0 ? (
            favoriteRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-[#FFF7EC] rounded-xl shadow p-3 flex flex-col h-full justify-between">
                <img 
                  src={`/assets/images/${recipe.img}`} 
                  alt={recipe.title} 
                  className="rounded-lg w-full h-40 object-cover" 
                />
                <div className="mt-3">
                  <div className="font-semibold">{recipe.title}</div>
                  <p className="text-sm text-gray-600">Oleh {recipe.author}</p>
                </div>
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleRemoveFavorite(recipe.id)}
                    className="text-red-500 text-xl hover:text-red-700 transition"
                    title="Hapus dari favorit"
                  >
                    ❤
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">💔</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Belum Ada Favorit</h3>
              <p className="text-gray-500">Mulai tambahkan resep ke favorit untuk melihatnya di sini</p>
              <a 
                href="/resep-masakan" 
                className="inline-block mt-4 px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
              >
                Cari Resep
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Favorit