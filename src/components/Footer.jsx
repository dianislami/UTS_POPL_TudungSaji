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
                    <a href="#" className="hover:scale-110 transition">
                        <svg fill="url(#igGradient)" viewBox="0 0 24 24" className="w-8 h-8">
                        <defs>
                            <linearGradient id="igGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#feda75" />
                            <stop offset="50%" stopColor="#d62976" />
                            <stop offset="100%" stopColor="#4f5bd5" />
                            </linearGradient>
                        </defs>
                        <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2a3 3 0 013 3v10a3 3 0 01-3 3H7a3 3 0 01-3-3V7a3 3 0 013-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-1.25a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z"/>
                        </svg>
                    </a>

                    {/* YouTube */}
                    <a href="#" className="hover:scale-110 transition">
                        <svg fill="#FF0000" viewBox="0 0 24 24" className="w-8 h-8">
                        <path d="M23.498 6.186a2.898 2.898 0 00-2.04-2.04C19.768 3.5 12 3.5 12 3.5s-7.768 0-9.458.646a2.898 2.898 0 00-2.04 2.04A30.187 30.187 0 000 12a30.187 30.187 0 00.502 5.814 2.898 2.898 0 002.04 2.04C4.232 20.5 12 20.5 12 20.5s7.768 0 9.458-.646a2.898 2.898 0 002.04-2.04A30.187 30.187 0 0024 12a30.187 30.187 0 00-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                        </svg>
                    </a>

                    {/* WhatsApp */}
                    <a href="#" className="hover:scale-110 transition">
                        <svg fill="#25D366" viewBox="0 0 24 24" className="w-8 h-8">
                        <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.62-6.003C.122 5.312 5.388 0 12.061 0c3.179 0 6.167 1.237 8.413 3.488a11.78 11.78 0 013.48 8.404c-.003 6.673-5.376 12.093-12.05 12.093a12.42 12.42 0 01-5.594-1.357L.057 24zM6.403 20.388c1.676.995 3.276 1.591 5.658 1.592 5.448 0 9.89-4.442 9.894-9.89.002-2.636-1.026-5.112-2.891-6.974C16.2 2.255 13.793 1.229 11.067 1.229 5.614 1.229 1.175 5.671 1.172 11.121c0 2.024.538 3.624 1.527 5.3l-.999 3.662 3.703-.995zm11.387-5.465c-.176-.088-1.037-.512-1.198-.57-.161-.059-.278-.088-.395.088-.117.176-.454.57-.557.688-.102.117-.205.132-.38.044-.176-.088-.743-.274-1.416-.873a5.36 5.36 0 01-.995-1.17c-.102-.176-.011-.271.077-.359.079-.078.176-.205.264-.308.088-.103.117-.176.176-.293.058-.117.029-.22-.015-.308-.044-.088-.395-.95-.54-1.3-.141-.34-.285-.293-.395-.293h-.338c-.117 0-.308.044-.47.22-.161.176-.617.603-.617 1.465s.633 1.7.72 1.818c.088.117 1.24 1.89 3.003 2.646.42.181.748.288 1.003.37.42.133.802.114 1.104.069.337-.05 1.037-.423 1.183-.832.146-.41.146-.762.103-.832-.044-.07-.161-.117-.338-.205z"/>
                        </svg>
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