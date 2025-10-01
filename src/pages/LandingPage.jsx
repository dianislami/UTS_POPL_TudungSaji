import { useState } from 'react'
import AboutUs from '../components/AboutUs'

function LandingPage() {
  const [showPopup, setShowPopup] = useState(false)

  const handleFavoritClick = (e) => {
    e.preventDefault()
    setShowPopup(true)
  }

  const closePopup = () => {
    setShowPopup(false)
  }

  return (
    <>
      {/* Popup Login */}
      {showPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-orange-100/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
            <button 
              onClick={closePopup}
              className="absolute top-2 right-2 text-orange-500 text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-center font-semibold text-lg mb-6">Masuk Untuk Melihat Fitur Ini</h2>

            <div className="space-y-3">
              {/* Google */}
              <button className="w-full border rounded-full py-2 flex items-center justify-center space-x-2 hover:bg-gray-100">
                <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.4-5.7 7.5-10.7 7.5-6.3 0-11.5-5.2-11.5-11.5S18.3 12.5 24.5 12.5c2.8 0 5.4 1 7.4 2.8l6-6C34.6 5.5 29.8 3.5 24.5 3.5 12.7 3.5 3.5 12.7 3.5 24.5S12.7 45.5 24.5 45.5c11.8 0 21.5-9.7 21.5-21.5 0-1.7-.2-3.3-.4-4.5z"/>
                  <path fill="#FF3D00" d="M6.3 14.1l6.6 4.8c1.8-4.3 5.9-7.4 10.6-7.4 2.8 0 5.4 1 7.4 2.8l6-6C34.6 5.5 29.8 3.5 24.5 3.5 15.9 3.5 8.6 8.6 6.3 14.1z"/>
                  <path fill="#4CAF50" d="M24.5 45.5c5.3 0 10.1-2 13.7-5.3l-6.4-5.4c-2.3 1.6-5.1 2.5-8.3 2.5-5 0-9.3-3.1-11-7.4l-6.6 5.1C8.6 40.4 15.9 45.5 24.5 45.5z"/>
                  <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-0.9 2.4-2.6 4.3-4.8 5.6l0.1 0.1 6.4 5.4c-0.4 0.4 6.5-4.8 6.5-13.6 0-1.7-.2-3.3-.4-4.5z"/>
                </svg>
                <span>Login dengan Google</span>
              </button>

              {/* Facebook */}
              <button className="w-full border rounded-full py-2 flex items-center justify-center space-x-2 hover:bg-gray-100">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.342v21.317C0 23.4.6 24 1.342 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.324 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.658V1.342C24 .6 23.4 0 22.675 0z"/>
                </svg>
                <span>Login dengan Facebook</span>
              </button>

              {/* Email */}
              <button className="w-full border rounded-full py-2 flex items-center justify-center space-x-2 hover:bg-gray-100">
                <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5zm0 2c-3.866 0-7 3.134-7 7a1 1 0 102 0c0-2.757 2.243-5 5-5s5 2.243 5 5a1 1 0 102 0c0-3.866-3.134-7-7-7z"/>
                </svg>
                <span>Login dengan Email</span>
              </button>
            </div>
            <div className="mt-6">
              <button className="bg-orange-400 text-white w-full py-2 rounded font-semibold hover:bg-orange-500 transition">
                Daftar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 md:px-10 py-10 bg-orange-200 text-center">
        {/* Search Bar */}
        <div className="w-full max-w-2xl mb-6">
          <div className="flex items-center bg-white rounded-full shadow px-4 py-2">
            {/* Button Kategori */}
            <button className="flex items-center bg-orange-500 text-white px-4 py-2 rounded-full">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
              </svg>
              <span className="text-sm font-medium">Kategori</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Garis Pemisah */}
            <div className="w-px h-6 bg-gray-300 mx-3"></div>

            {/* Input */}
            <div className="flex items-center flex-grow">
              <input type="text" placeholder="Temukan di Resep kami"
                className="flex-grow text-sm text-gray-700 placeholder-gray-400 focus:outline-none" />
              <svg className="w-5 h-5 text-orange-500 ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M4 3h1v7a2 2 0 004 0V3h1v7a2 2 0 004 0V3h1v9a4 4 0 01-4 4v5m-4-5a4 4 0 01-4-4V3z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 mt-6 w-full max-w-6xl">
          {/* Teks */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-black text-3xl md:text-5xl font-bold leading-tight mb-4">
              Temui Cara Mudah<br />
              Untuk Membuat<br />
              Makanan Favorit Anda
            </h1>
            <p className="text-black text-base md:text-lg mb-6 leading-relaxed">
              Menyediakan berbagai resep yang paling teruji.<br className="hidden md:inline" />
              Membantu kamu menemukan cara mudah memasak.
            </p>
            <button className="bg-[#F68300] text-white font-semibold text-sm md:text-base px-6 py-3 rounded-full transition duration-300 hover:bg-orange-600 active:scale-95 active:shadow-inner">
              Pelajari Selengkapnya
            </button>
          </div>

          {/* Gambar Bertumpuk */}
          <div className="relative w-full md:w-1/2 h-[300px] md:h-[400px] flex justify-center items-center">
            <img src="/assets/images/dis1.png" alt="Makanan 1" className="absolute w-30 h-28 md:w-55 md:h-40 rounded-full bottom-60 left-60" />
            <img src="/assets/images/dis2.png" alt="Makanan 2" className="absolute w-36 h-20 md:w-55 md:h-60 rounded-full top-10 right-20" />
            <img src="/assets/images/dis3.png" alt="Makanan 3" className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bottom-35 right-66" />
            <img src="/assets/images/komen1.png" alt="Makanan 4" className="absolute w-20 h-20 md:w-36 md:h-27 bottom-20 left-80" />
            <img src="/assets/images/komen2.png" alt="Makanan 5" className="absolute w-24 h-16 md:w-32 md:h-20 top-60 left-30" />
          </div>
        </div>
      </section>

      {/* Resep Terkini */}
      <section className="px-6 py-12 bg-[#F9F5F0]">
        <h2 className="text-3xl font-bold text-black mb-2">Resep Populer Minggu Ini</h2>
        <p className="text-gray-600 text-sm mb-8">Coba Resep Favorit Minggu Ini!</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Recipe Cards */}
          {[
            { img: "beranda1.png", title: "Resep Dimsum Mentai Enak Yang Cocok Untuk Jualan", author: "Cut Renatha" },
            { img: "beranda2.png", title: "Resep Rendang Daging Sapi Empuk dan Kaya Bumbu", author: "Raysha Tazkiya" },
            { img: "beranda3.png", title: "Resep Soto Betawi Enak, Gurih, dan Super Gampang Buat Idul Fitri", author: "Firah Maulida" },
            { img: "beranda4.png", title: "Resep Sate Taichan, Pedas Gurih dan Bikin Ketagihan!", author: "Khalisa Adzrani" },
            { img: "beranda5.png", title: "Resep Soto Pekalongan Enak Yang Cocok Untuk Berbuka", author: "Tinsari Rauhana" },
            { img: "beranda6.png", title: "Resep Ikan Nila Bakar yang Gurih dan Kaya Bumbu", author: "Zalvia Nasya" },
            { img: "beranda7.png", title: "Resep Sambal Matah Enak yang Wanginya Sampai Satu Rumah", author: "Nadia Maghda" },
            { img: "beranda8.png", title: "Resep Es Campur Mutiara Kuah Santan Bikin Ketagihan!", author: "Yuyun Nailufar" }
          ].map((recipe, index) => (
            <div key={index} className="bg-[#F4F0E5] rounded-xl p-3 shadow hover:shadow-md relative transition-transform duration-200 hover:scale-105 active:scale-95">
              <img src={`/assets/images/${recipe.img}`} alt={recipe.title} className="rounded-lg w-full h-40 object-cover mb-3" />
              <div className="absolute bottom-3 right-3 flex space-x-2">
                <button>
                  <svg className="w-5 h-5 text-gray-700 hover:text-black" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                  </svg>
                </button>
                <button onClick={handleFavoritClick}>
                  <svg className="w-5 h-5 text-gray-700 hover:text-black" fill="none" stroke="currentColor" strokeWidth="2"
                    viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                  </svg>
                </button>
              </div>
              <h3 className="text-sm font-semibold mb-1 leading-snug">{recipe.title}</h3>
              <p className="text-xs text-gray-700">Oleh {recipe.author}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="px-6 py-2 bg-[#E3DBCC] text-black rounded-full font-medium hover:bg-[#d4c9b7] transition">
            Lebih Banyak
          </button>
        </div>
      </section>

      {/* 'About Us' Section */}
      <AboutUs />
    </>
  )
}

export default LandingPage
