function Navbar (){
    return (
        <nav className="bg-orange-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <img src="/assets/images/Logo.png" alt="Tudung Saji" className="h-[7vh] w-[6vw]"/>
        </div>

        <div className="flex space-x-6 items-center">
            <a href="#" id="berandaBtn" className="text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200">Beranda</a>
            <a href="#" id="resepMasakanBtn" className="text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200">Resep Masakan</a>
            <a href="#" id="tipsMasakBtn" className="text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200">Tips Masak</a>
            <a href="#about-us" className="text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200">Tentang Kami</a>
            <a href="#" id="favoritBtn" className="text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200">Favorit</a>
        </div>

        <a href="/login" className="inline-block">
            <button className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm ml-6 hover:bg-gray-100 transition">
            Login / Register
            </button>
        </a>
        </nav>
    )
}

export default Navbar;