import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="bg-[#ECE7D4] font-sans" style={{fontFamily: "'Inter', sans-serif"}}>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-72" style={{backgroundImage: "url('assets/images/cover.jpg')"}}>
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 bg-gradient-to-r from-white/70 via-white/50 to-transparent">
          {/* Welcome Message */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Selamat Datang, {user?.firstName || user?.username}! 👋
            </h1>
            <p className="text-gray-600">Mari temukan resep masakan favorit Anda</p>
          </div>

          {/* Search bar */}
          <div className="w-full max-w-2xl mx-auto">
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

          {/* Tombol di bawah search bar */}
          <div className="flex space-x-4 mt-6">
            <Link to="/tambah-resep" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm text-center transition-colors">
              Tambah Resep
            </Link>
          </div>
        </div>
      </section>

      {/* Kategori */}
      <section className="p-6">
        <h3 className="text-xl font-semibold mb-4">Apa yang kamu cari?</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {/* Kategori: Bumbu */}
          <a href="https://kumparan.com/berita-terkini/40-macam-bumbu-dapur-dan-fungsinya-23psys3Ak0Y" 
             className="block transform transition-all duration-300 hover:shadow-lg active:scale-95"
             target="_blank" rel="noopener noreferrer">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src="assets/images/3.png" alt="Bumbu" className="w-full h-52 object-cover" />
              <div className="p-3 bg-orange-400 text-white text-center font-semibold hover:bg-orange-600 transition duration-300">
                Jenis-jenis Bumbu
              </div>
            </div>
          </a>

          {/* Kategori: Alat Masak */}
          <div className="block transform transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src="assets/images/image.png" alt="Alat Masak" className="w-full h-52 object-cover" />
              <div className="p-3 bg-orange-400 text-white text-center font-semibold hover:bg-orange-600 transition duration-300">
                Alat Masak
              </div>
            </div>
          </div>

          {/* Kategori: Gizi */}
          <div className="block transform transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src="assets/images/gizi.png" alt="Kandungan Gizi" className="w-full h-52 object-cover" />
              <div className="p-3 bg-orange-400 text-white text-center font-semibold hover:bg-orange-600 transition duration-300">
                Jenis Kandungan Gizi
              </div>
            </div>
          </div>

          {/* Kategori: Daging */}
          <div className="block transform transition-all duration-300 hover:shadow-lg active:scale-95 cursor-pointer">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src="assets/images/daging.png" alt="Daging" className="w-full h-52 object-cover" />
              <div className="p-3 bg-orange-400 text-white text-center font-semibold hover:bg-orange-600 transition duration-300">
                Jenis Daging
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Resep Terkini */}
      <section className="p-6">
        <h3 className="text-xl font-semibold mb-2">Riwayat Resep</h3>
        <p className="mb-4">Ayo Masak!</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          {/* Card Resep */}
          <Link to="/resep/spaghetti" className="transform hover:scale-105 transition duration-300">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img src="assets/images/res1.png" alt="Spaghetti" className="w-full h-52 object-cover" />
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-base">Resep Spaghetti Bolognese Simple</h4>
                <p className="text-sm text-gray-500">Oleh Nurul Izzati</p>
              </div>
            </div>
          </Link>

          <Link to="/resep/sate" className="transform hover:scale-105 transition duration-300">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img src="assets/images/res2.png" alt="Sate" className="w-full h-52 object-cover" />
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-base">Resep Sate Malang Daging Sapi</h4>
                <p className="text-sm text-gray-500">Oleh Dian Islami</p>
              </div>
            </div>
          </Link>

          <Link to="/resep/es-doger" className="transform hover:scale-105 transition duration-300">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img src="assets/images/res3.png" alt="Es Doger" className="w-full h-52 object-cover" />
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-base">Resep Es Doger Super Nyegerin</h4>
                <p className="text-sm text-gray-500">Oleh Akrimah Usri</p>
              </div>
            </div>
          </Link>

          <Link to="/resep/bakso" className="transform hover:scale-105 transition duration-300">
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <img src="assets/images/res4.png" alt="Bakso" className="w-full h-52 object-cover" />
              <div className="p-4 space-y-1">
                <h4 className="font-bold text-base">Resep Bakso Daging Kenyal</h4>
                <p className="text-sm text-gray-500">Oleh Davina Aura</p>
              </div>
            </div>
          </Link>

        </div>
      </section>
    </div>
  );
};

export default Dashboard;