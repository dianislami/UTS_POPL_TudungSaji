const resepList = [
  // --- KELOMPOK 1 ---
  {
    slug: "spaghetti-bolognese-simple",
    title: " Spaghetti Bolognese Simple",
    category: "Makanan", // TAMBAHAN
    author: "Nurul Izzati",
    image: "/assets/images/res1.png",
    servings: 2,
    cookingTime: 25,
    description: "Spaghetti Bolognese simpel dengan cita rasa gurih, asam, dan sedikit manis.",
    ingredients: ["200g spaghetti", "Daging sapi cincang", "Saus tomat", "Keju parmesan"],
    steps: ["Rebus spaghetti", "Tumis bumbu", "Campur saus"]
  },
  {
    slug: "sate-malang-daging-sapi",
    title: " Sate Malang Daging Sapi",
    category: "Makanan", // TAMBAHAN
    author: "Dian Islami",
    image: "/assets/images/res2.png",
    servings: 3,
    cookingTime: 40,
    description: "Sate Malang daging sapi dengan bumbu khas dan tekstur empuk.",
    ingredients: ["Daging sapi", "Kecap manis", "Ketumbar", "Bawang merah"],
    steps: ["Potong daging", "Tusuk sate", "Bakar"]
  },
  {
    slug: "es-doger-super-nyegerin",
    title: " Es Doger Super Nyegerin",
    category: "Minuman", // TAMBAHAN
    author: "Akrimah Usri",
    image: "/assets/images/res3.png",
    servings: 4,
    cookingTime: 15,
    description: "Es Doger khas Bandung yang creamy, manis, dan menyegarkan.",
    ingredients: ["Santan", "Tape ketan", "Tape singkong", "Sirup merah"],
    steps: ["Masak santan", "Susun isian", "Beri es"]
  },
  {
    slug: "bakso-daging-kenyal",
    title: " Bakso Daging Kenyal",
    category: "Makanan", // TAMBAHAN
    author: "Davina Aura",
    image: "/assets/images/res4.png",
    servings: 4,
    cookingTime: 60,
    description: "Bakso daging khas rumahan dengan tekstur kenyal dan kuah kaldu hangat.",
    ingredients: ["Daging giling", "Tapioka", "Bawang putih", "Kaldu sapi"],
    steps: ["Giling daging", "Bentuk bakso", "Rebus"]
  },
  {
    slug: "kue-nastar-lumer",
    title: "Kue Nastar Lumer",
    category: "Dessert", // TAMBAHAN (Bisa juga Cemilan)
    author: "Sarah Amelia",
    image: "/assets/images/nastar.png",
    servings: 30,
    cookingTime: 75,
    description: "Nastar lembut dan lumer dengan isian selai nanas yang legit.",
    ingredients: ["Mentega", "Tepung terigu", "Selai nanas", "Kuning telur"],
    steps: ["Kocok mentega", "Isi adonan", "Panggang"]
  },
  {
    slug: "es-teh-manis-segar",
    title: "Es Teh Manis Segar",
    category: "Minuman", // TAMBAHAN
    author: "Rina Susanti",
    image: "/assets/images/esteh.png",
    servings: 2,
    cookingTime: 10,
    description: "Es teh manis segar ala rumahan.",
    ingredients: ["Teh celup", "Gula pasir", "Es batu", "Lemon"],
    steps: ["Seduh teh", "Beri gula", "Tambahkan es"]
  },
  {
    slug: "pisang-goreng-crispy",
    title: "Pisang Goreng Crispy",
    category: "Cemilan", // TAMBAHAN
    author: "Budi Santoso",
    image: "/assets/images/pisgor.png",
    servings: 4,
    cookingTime: 20,
    description: "Pisang goreng renyah di luar, lembut di dalam.",
    ingredients: ["Pisang kepok", "Tepung terigu", "Tepung beras", "Gula"],
    steps: ["Buat adonan", "Celup pisang", "Goreng"]
  },
  {
    slug: "puding-coklat-dessert",
    title: "Puding Coklat Dessert",
    category: "Dessert", // TAMBAHAN
    author: "Maya Sari",
    image: "/assets/images/puding.png",
    servings: 6,
    cookingTime: 30,
    description: "Puding coklat lembut dengan rasa manis dan aroma coklat kuat.",
    ingredients: ["Agar-agar coklat", "Susu cair", "Coklat bubuk", "Gula"],
    steps: ["Masak bahan", "Cetak", "Dinginkan"]
  },

  // --- KELOMPOK 2 ---
  {
    slug: "dimsum-mentai-enak-cocok-jualan",
    title: " Dimsum Mentai Enak Yang Cocok Untuk Jualan",
    category: "Makanan", // TAMBAHAN
    author: "Cut Renatha",
    image: "/assets/images/beranda1.png",
    servings: 4,
    cookingTime: 45,
    description: "Dimsum ayam lembut dengan topping saus mentai.",
    ingredients: ["Ayam giling", "Udang", "Kulit pangsit", "Mayones"],
    steps: ["Buat adonan", "Kukus", "Torch mentai"]
  },
  {
    slug: "rendang-daging-sapi-empuk",
    title: " Rendang Daging Sapi Empuk dan Kaya Bumbu",
    category: "Makanan", // TAMBAHAN
    author: "Raysha Tazkiya",
    image: "/assets/images/beranda2.png",
    servings: 6,
    cookingTime: 180,
    description: "Rendang daging sapi asli dengan bumbu rempah meresap.",
    ingredients: ["Daging sapi", "Santan", "Rempah lengkap"],
    steps: ["Tumis bumbu", "Masak daging & santan", "Keringkan"]
  },
  {
    slug: "soto-betawi-enak-gurih",
    title: " Soto Betawi Enak, Gurih, dan Super Gampang",
    category: "Makanan", // TAMBAHAN
    author: "Firah Maulida",
    image: "/assets/images/beranda3.png",
    servings: 4,
    cookingTime: 60,
    description: "Soto Betawi dengan kuah susu dan santan gurih.",
    ingredients: ["Daging/Jeroan", "Susu cair", "Santan", "Emping"],
    steps: ["Rebus daging", "Masak kuah", "Sajikan"]
  },
  {
    slug: "sate-taichan-pedas-gurih",
    title: " Sate Taichan, Pedas Gurih dan Bikin Ketagihan!",
    category: "Makanan", // TAMBAHAN
    author: "Khalisa Adzrani",
    image: "/assets/images/beranda4.png",
    servings: 3,
    cookingTime: 30,
    description: "Sate ayam putih dibakar tanpa kecap dengan sambal pedas.",
    ingredients: ["Dada ayam", "Jeruk nipis", "Cabai rawit"],
    steps: ["Marinasi", "Bakar", "Sajikan dengan sambal"]
  },
  {
    slug: "soto-pekalongan-enak-berbuka",
    title: " Soto Pekalongan Enak Yang Cocok Untuk Berbuka",
    category: "Makanan", // TAMBAHAN
    author: "Tinsari Rauhana",
    image: "/assets/images/beranda5.png",
    servings: 4,
    cookingTime: 50,
    description: "Soto khas Pekalongan (Tauto) dengan bumbu tauco.",
    ingredients: ["Daging sandung lamur", "Tauco", "Sohun"],
    steps: ["Rebus daging", "Tumis tauco", "Campur kuah"]
  },
  {
    slug: "ikan-nila-bakar-gurih",
    title: " Ikan Nila Bakar yang Gurih dan Kaya Bumbu",
    category: "Makanan", // TAMBAHAN
    author: "Zalvia Nasya",
    image: "/assets/images/beranda6.png",
    servings: 2,
    cookingTime: 40,
    description: "Ikan nila bakar bumbu kecap pedas manis.",
    ingredients: ["Ikan nila", "Kecap manis", "Mentega"],
    steps: ["Marinasi", "Bakar", "Oles bumbu"]
  },
  {
    slug: "sambal-matah-enak-wangi",
    title: " Sambal Matah Enak yang Wanginya Sampai Satu Rumah",
    category: "Makanan", // Atau Pelengkap (Saya masukkan Cemilan/Side Dish)
    author: "Nadia Maghda",
    image: "/assets/images/beranda7.png",
    servings: 4,
    cookingTime: 10,
    description: "Sambal khas Bali irisan bawang dan serai segar.",
    ingredients: ["Bawang merah", "Serai", "Daun jeruk", "Minyak panas"],
    steps: ["Iris bahan", "Siram minyak panas", "Aduk"]
  },
  {
    slug: "es-campur-mutiara-santan",
    title: " Es Campur Mutiara Kuah Santan Bikin Ketagihan!",
    category: "Minuman", // TAMBAHAN
    author: "Yuyun Nailufar",
    image: "/assets/images/beranda8.png",
    servings: 5,
    cookingTime: 20,
    description: "Minuman segar isian sagu mutiara dan buah kuah santan.",
    ingredients: ["Sagu mutiara", "Cincau", "Santan", "Sirup"],
    steps: ["Tata isian", "Tuang kuah", "Sajikan dingin"]
  },
  {
    slug: "nasi-goreng-spesial-rumahan",
    title: " Nasi Goreng Spesial Ala Rumahan",
    category: "Makanan", // TAMBAHAN
    author: "Dewi Sartika",
    image: "/assets/images/nasgor.png",
    servings: 2,
    cookingTime: 15,
    description: "Nasi goreng kampung spesial dengan telur.",
    ingredients: ["Nasi putih", "Telur", "Kecap manis"],
    steps: ["Tumis bumbu", "Masak nasi", "Sajikan"]
  },
];

export default resepList;