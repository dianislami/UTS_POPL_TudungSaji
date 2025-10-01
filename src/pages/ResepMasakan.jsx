import { useState } from 'react'

function ResepMasakan() {
  const [recipes] = useState([
    { id: 1, img: "beranda1.png", title: "Resep Dimsum Mentai Enak Yang Cocok Untuk Jualan", author: "Cut Renatha" },
    { id: 2, img: "beranda2.png", title: "Resep Rendang Daging Sapi Empuk dan Kaya Bumbu", author: "Raysha Tazkiya" },
    { id: 3, img: "beranda3.png", title: "Resep Soto Betawi Enak, Gurih, dan Super Gampang Buat Idul Fitri", author: "Firah Maulida" },
    { id: 4, img: "beranda4.png", title: "Resep Sate Taichan, Pedas Gurih dan Bikin Ketagihan!", author: "Khalisa Adzrani" },
    { id: 5, img: "beranda5.png", title: "Resep Soto Pekalongan Enak Yang Cocok Untuk Berbuka", author: "Tinsari Rauhana" },
    { id: 6, img: "beranda6.png", title: "Resep Ikan Nila Bakar yang Gurih dan Kaya Bumbu", author: "Zalvia Nasya" },
    { id: 7, img: "beranda7.png", title: "Resep Sambal Matah Enak yang Wanginya Sampai Satu Rumah", author: "Nadia Maghda" },
    { id: 8, img: "beranda8.png", title: "Resep Es Campur Mutiara Kuah Santan Bikin Ketagihan!", author: "Yuyun Nailufar" },
    { id: 9, img: "beranda1.png", title: "Resep Nasi Goreng Spesial Ala Rumahan", author: "Dewi Sartika" }
  ])

  const handleFavoriteClick = (recipeId) => {
    console.log('Added to favorite:', recipeId)
    // Logika untuk menambah ke favorit
  }

  return (
    <div className="bg-[#ECE7D4] min-h-screen flex flex-col">
      {/* Konten Utama */}
      <div className="flex-grow">
        {/* Breadcrumb */}
        <nav className="px-6 py-3 mx-6 mt-4 flex items-center text-sm text-black space-x-2">
          <a href="/" className="font-semibold hover:underline transition">Beranda</a>
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
            Dari hidangan tradisional Indonesia hingga kreasi modern yang menggugah selera, semua resep disajikan lengkap dengan langkah-langkah mudah dan bahan yang mudah didapat.
            Cocok untuk pemula hingga koki rumahan!
          </p>
        </section>

        {/* Grid Resep */}
        <section className="max-w-6xl mx-auto px-4 py-6 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="block bg-white rounded-xl p-3 shadow hover:shadow-lg relative transition-transform duration-200 hover:scale-105 active:scale-95">
                <a href={`/detail-resep/${recipe.id}`}>
                  <img src={`/assets/images/${recipe.img}`} alt={recipe.title} className="rounded-lg w-full h-40 object-cover mb-3" />
                </a>
                <div className="absolute top-4 right-4 flex space-x-2 z-10">
                  <button 
                    onClick={() => handleFavoriteClick(recipe.id)}
                    className="p-1.5 rounded-full bg-white/70 hover:bg-white shadow-sm transition-colors duration-200" 
                    title="Tambah ke favorit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-gray-500 hover:text-red-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                </div>
                <a href={`/detail-resep/${recipe.id}`}>
                  <h3 className="text-sm font-semibold mb-1 leading-snug">{recipe.title}</h3>
                  <p className="text-xs text-gray-700">Oleh {recipe.author}</p>
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default ResepMasakan