function Footer() {
    return (
        <footer className="bg-[#f2e9db] border-t border-gray-300 py-7 relative overflow-hidden">
        {/* Background Kiri dan Kanan */}
            <img src="/assets/images/rempahfoter1.png" alt="Spices Left" className="absolute left-0 top-0 h-full object-cover opacity-80 md:block"/>
            <img src="/assets/images/rempatfot2.png" alt="Spices Right" className="absolute right-0 top-0 h-full object-cover opacity-80 md:block" />

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center text-black space-y-6">

                {/* Semua kolom dibungkus agar sejajar & tengah */}
                <div className="grid grid-cols-3 md:grid-cols-3 gap-8 text-center">

                {/* Menu */}
                <div>
                    <h3 className="font-bold mb-2">Menu</h3>
                    <ul>
                    <li><a href="#">Beranda</a></li>
                    <li><a href="#">Tips Masak</a></li>
                    <li><a href="#">Tentang Kita</a></li>
                    <li><a href="#">Favorit</a></li>
                    <li><a href="#">Resep</a></li>
                    </ul>
                </div>

                {/* Kontak */}
                <div>
                    <h3 className="font-bold mb-2">Kontak</h3>
                    <ul>
                    <li><a href="#">Tentang Kami</a></li>
                    <li><a href="#">Chat Langsung</a></li>
                    </ul>
                </div>

                {/* Hubungi Kami */}
                <div>
                    <h3 className="font-bold mb-2">Hubungi Kami</h3>
                    <div className="flex justify-center space-x-4 mt-2">
                    {/* Instagram */}
                    <a href="#" className="hover:scale-110 transition-transform duration-300">
                        <img src="/assets/images/instagram.png" alt="Instagram" className="w-10 h-10 drop-shadow-lg rounded-lg" />
                    </a>

                    {/* YouTube */}
                    <a href="#" className="hover:scale-110 transition-transform duration-300">
                        <img src="/assets/images/youtube.png" alt="YouTube" className="w-10 h-10 drop-shadow-lg rounded-lg" />
                    </a>

                    {/* WhatsApp */}
                    <a href="#" className="hover:scale-110 transition-transform duration-300">
                        <img src="/assets/images/whatsapp.png" alt="WhatsApp" className="w-10 h-10 drop-shadow-lg rounded-lg" />
                    </a>
                    </div>
                </div>
                </div>

                {/* Copyright */}
                <div className="text-sm text-black font-medium">
                @2025 Tudung <span className="text-orange-500 font-semibold">Saji</span> All Rights Reserved
                </div>
            </div>
        </footer>
    )
}

export default Footer;