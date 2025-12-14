import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import resepList from '../data/reseplist';

const Dashboard = () => {
  const { user } = useAuth();

  // State untuk Search & Filter
  const [inputValue, setInputValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Kategori');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [displayedRecipes, setDisplayedRecipes] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // State untuk Favorit
  const [favorites, setFavorites] = useState([]);
  const [showNotif, setShowNotif] = useState({ show: false, message: '' });

  const categories = ['Kategori', 'Makanan', 'Minuman', 'Cemilan', 'Dessert'];

  // 1. Load Data Resep (Shuffle) & Load Favorit dari LocalStorage
  useEffect(() => {
    // Load Resep
    const shuffleArray = (array) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };
    const shuffledRecipes = shuffleArray(resepList);
    setRecipes(shuffledRecipes);
    setDisplayedRecipes(shuffledRecipes);

    // Load Favorites dari LocalStorage
    const savedFavs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavs);
  }, []);

  // --- LOGIC FAVORIT (LOVE) ---
  const handleFavoriteClick = (recipe) => {
    let updatedFavorites = [...favorites];
    const isAlreadyFav = updatedFavorites.some(r => r.slug === recipe.slug);

    if (isAlreadyFav) {
      // Hapus dari favorit
      updatedFavorites = updatedFavorites.filter(r => r.slug !== recipe.slug);
      setShowNotif({ show: true, message: '❌ Dihapus dari favorit' });
    } else {
      // Tambah ke favorit
      updatedFavorites.push({ ...recipe, isFavorited: true });
      setShowNotif({ show: true, message: '❤️ Ditambahkan ke favorit' });
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Hide notif after 2 seconds
    setTimeout(() => setShowNotif({ show: false, message: '' }), 2000);
  };

  const isFavorited = (slug) => {
    return favorites.some(r => r.slug === slug);
  };

  // --- LOGIC SEARCH ---
  const handleSearchTrigger = () => {
    if (inputValue.trim() === '' && selectedCategory === 'Kategori') {
      setIsSearchActive(false);
      setDisplayedRecipes(recipes);
      return;
    }

    setIsSearchActive(true);
    let filtered = recipes;

    if (selectedCategory !== 'Kategori') {
      filtered = filtered.filter(recipe => recipe.category === selectedCategory);
    }

    if (inputValue.trim() !== '') {
      const lowerQuery = inputValue.toLowerCase();
      filtered = filtered.filter(recipe =>
        recipe.title.toLowerCase().includes(lowerQuery) ||
        recipe.author.toLowerCase().includes(lowerQuery)
      );
    }

    setDisplayedRecipes(filtered);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchTrigger();
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleReset = () => {
    setInputValue('');
    setSelectedCategory('Kategori');
    setIsSearchActive(false);
    setDisplayedRecipes(recipes);
  };

  return (
    <div className="bg-[#ECE7D4] font-sans min-h-screen pb-10 relative" style={{fontFamily: "'Inter', sans-serif"}}>
      
      {/* NOTIFIKASI POPUP */}
      {showNotif.show && (
        <div className="fixed top-24 right-6 bg-black/80 text-white px-4 py-2 rounded-lg shadow-xl z-50 animate-bounce transition-all">
          {showNotif.message}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-80" style={{backgroundImage: "url('/assets/images/cover.jpg')"}}>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 bg-gradient-to-r from-white/60 via-white/40 to-transparent">
          
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 drop-shadow-sm">
              Selamat Datang, {user?.firstName || user?.name || 'Pengguna'}! 👋
            </h1>
            <p className="text-gray-700 font-medium">Mari temukan resep masakan favorit Anda</p>
          </div>

          {/* Search Bar Container */}
          <div className="w-full max-w-5xl mx-auto">
            <div className="flex items-center bg-white rounded-full shadow-lg px-2 py-2">
              
              {/* Dropdown Kategori */}
              <div className="relative">
                <button 
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition"
                >
                  <span className="text-sm font-bold mr-2">{selectedCategory}</span>
                  <svg className={`w-4 h-4 transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showCategoryDropdown && (
                  <div className="absolute top-full mt-2 left-0 bg-white rounded-xl shadow-xl py-2 min-w-[160px] z-50 border border-gray-100">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full text-left px-4 py-2.5 hover:bg-gray-50 transition-colors text-sm ${selectedCategory === category ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700'}`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="w-px h-8 bg-gray-300 mx-4"></div>

              {/* Input Text */}
              <input 
                type="text" 
                placeholder="Temukan di Resep kami..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown} 
                className="flex-grow text-gray-700 placeholder-gray-400 focus:outline-none bg-transparent text-base" 
              />
              
              {/* Tombol Search Icon */}
              <button 
                onClick={handleSearchTrigger}
                className="p-3 rounded-full hover:bg-gray-100 transition active:scale-95 text-orange-500 mr-1"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-8">
            <Link to="/tambah-resep" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-md transition-transform hover:scale-105">
              Tambah Resep
            </Link>
          </div>
        </div>
      </section>

      {/* --- BAGIAN KATEGORI --- */}
      {!isSearchActive && (
        <section className="px-6 md:px-12 py-8 w-full">
            <h3 className="text-xl font-bold mb-6 text-gray-800">Apa yang kamu cari?</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <a href="https://kumparan.com/berita-terkini/40-macam-bumbu-dapur-dan-fungsinya-23psys3Ak0Y" 
                className="block transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95"
                target="_blank" rel="noopener noreferrer">
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <img src="/assets/images/3.png" alt="Bumbu" className="w-full h-48 object-cover" />
                <div className="p-4 bg-orange-500 text-white text-center font-bold text-base">
                    Jenis-jenis Bumbu
                </div>
                </div>
            </a>

            <div className="block transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer">
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <img src="/assets/images/image.png" alt="Alat Masak" className="w-full h-48 object-cover" />
                <div className="p-4 bg-orange-500 text-white text-center font-bold text-base">
                    Alat Masak
                </div>
                </div>
            </div>

            <div className="block transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer">
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <img src="/assets/images/gizi.png" alt="Kandungan Gizi" className="w-full h-48 object-cover" />
                <div className="p-4 bg-orange-500 text-white text-center font-bold text-base">
                    Jenis Kandungan Gizi
                </div>
                </div>
            </div>

            <div className="block transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 active:scale-95 cursor-pointer">
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
                <img src="/assets/images/daging.png" alt="Daging" className="w-full h-48 object-cover" />
                <div className="p-4 bg-orange-500 text-white text-center font-bold text-base">
                    Jenis Daging
                </div>
                </div>
            </div>

            </div>
        </section>
      )}

      {/* --- BAGIAN HASIL RESEP --- */}
      <section className="px-6 md:px-12 py-8 w-full">
        <div className="flex justify-between items-end mb-6">
            <div>
                <h3 className="text-xl font-bold text-gray-800">
                    {isSearchActive ? 'Hasil Pencarian' : 'Resep Makanan'}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                    {isSearchActive ? 'Menampilkan resep sesuai kata kuncimu' : 'Ayo Masak!'}
                </p>
            </div>
            
            {isSearchActive && (
                <button 
                    onClick={handleReset}
                    className="text-orange-600 hover:text-orange-700 text-sm font-bold underline"
                >
                    Reset & Tampilkan Semua
                </button>
            )}
        </div>

        {/* Info Filter Box */}
        {(isSearchActive && (inputValue || selectedCategory !== 'Kategori')) && (
          <div className="mb-8 bg-white border-l-4 border-orange-500 rounded-r-lg p-4 shadow-sm">
            <p className="text-gray-700">
              Ditemukan <span className="font-bold text-orange-600">{displayedRecipes.length}</span> resep
              {selectedCategory !== 'Kategori' && <span> kategori <span className="font-semibold">{selectedCategory}</span></span>}
              {inputValue && <span> dengan kata kunci "<span className="font-semibold">{inputValue}</span>"</span>}
            </p>
          </div>
        )}

        {displayedRecipes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-16 text-center mx-auto max-w-2xl">
            <p className="text-gray-600 text-xl font-medium mb-2">Yah, resep tidak ditemukan 😔</p>
            <p className="text-gray-500 mb-8">Coba gunakan kata kunci lain atau reset pencarian.</p>
            <button 
              onClick={handleReset}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow transition-colors"
            >
              Kembali ke Menu Utama
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {displayedRecipes.map((recipe, index) => (
              <div 
                key={index} 
                className="transform hover:scale-[1.02] transition duration-300 block h-full group relative"
              >
                {/* 
                  Wrapper Link dipisah dari tombol favorite
                  agar tombol favorite bisa diklik tanpa pindah halaman
                */}
                <Link to={`/resep/${recipe.slug}`} className="block h-full">
                  <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 h-full flex flex-col">
                    
                    {/* Gambar */}
                    <div className="relative overflow-hidden">
                      <img 
                        src={recipe.image} 
                        alt={recipe.title} 
                        className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" 
                        onError={(e) => { e.target.src = "/assets/images/placeholder.png" }}
                      />
                      
                      {/* Badge Kategori (Kiri Atas) */}
                      <div className="absolute top-3 left-3 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-orange-600 shadow-sm z-10">
                         {recipe.category || "Resep"}
                      </div>
                    </div>

                    {/* Konten */}
                    <div className="p-5 flex flex-col flex-grow">
                      <h4 className="font-bold text-lg text-gray-800 line-clamp-2 mb-1 leading-snug group-hover:text-orange-600 transition-colors">
                          {recipe.title}
                      </h4>
                      <p className="text-xs text-gray-500 mb-4 font-medium">Oleh {recipe.author}</p>
                      
                      <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-semibold">
                          <span className='flex items-center bg-gray-100 px-2 py-1 rounded'>
                              ⏱️ {recipe.cookingTime} mnt
                          </span>
                          <span className='flex items-center bg-gray-100 px-2 py-1 rounded'>
                              🍽️ {recipe.servings} org
                          </span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* --- TOMBOL LOVE / FAVORIT (Kanan Atas) --- */}
                {/* Ditaruh di luar Link tapi di dalam relative parent agar posisi pas */}
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Supaya tidak masuk ke link detail
                    handleFavoriteClick(recipe);
                  }}
                  className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition duration-200 active:scale-95 group-hover:opacity-100"
                  title={isFavorited(recipe.slug) ? "Hapus Favorit" : "Tambah Favorit"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 transition-colors duration-300"
                    fill={isFavorited(recipe.slug) ? "red" : "none"}
                    stroke={isFavorited(recipe.slug) ? "red" : "currentColor"}
                    strokeWidth="2"
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
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;