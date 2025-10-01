import { useState } from 'react'

function TipsMasak() {
  const [tips] = useState([
    { 
      id: 1, 
      img: "tips1.png", 
      title: "5 Cara Menggoreng Ayam Agar Enak: Beda Resep, Beda Juga Triknya",
      link: "https://kumparan.com/tips-dan-trik/5-cara-menggoreng-ayam-agar-empuk-dan-matang-sempurna-20xjOTYpphx"
    },
    { 
      id: 2, 
      img: "tips2.png", 
      title: "9 Teh Herbal Tingkatkan Stamina Tubuh",
      link: "#"
    },
    { 
      id: 3, 
      img: "tips3.png", 
      title: "Tips Memilih Daging Berkualitas di Pasar Tradisional",
      link: "#"
    },
    { 
      id: 4, 
      img: "tips4.png", 
      title: "Cara Tepat Menyimpan Lauk Goreng Agar Tetap Renyah",
      link: "#"
    },
    { 
      id: 5, 
      img: "tips5.png", 
      title: "Resep Simpel Olahan Tahu yang Bikin Nagih",
      link: "#"
    },
    { 
      id: 6, 
      img: "tips6.png", 
      title: "Trik Memasak Nasi Goreng Tanpa Minyak Berlebih",
      link: "#"
    }
  ])

  return (
    <div className="bg-[#ECE7D4] min-h-screen flex flex-col">
      {/* Wrapper konten utama */}
      <div className="flex-grow">
        {/* Breadcrumb */}
        <nav className="px-6 py-3 mx-6 mt-4 flex items-center text-sm text-black space-x-2">
          <a href="/" className="font-semibold hover:underline transition">Beranda</a>
          <span className="text-gray-400">›</span>
          <span className="font-semibold">Tips Masak</span>
        </nav>

        {/* Judul & Deskripsi */}
        <section className="max-w-6xl mx-auto px-4 py-4 text-center">
          <h2 className="text-2xl font-bold mb-2">
            Tips <span className="text-orange-600">Masak</span>
          </h2>
          <p className="text-gray-600">
            Simak beraneka ragam tips masak dan resep singkat yang akan menjadi inspirasi untuk mengembangkan kemampuan masakmu setiap harinya.
          </p>
        </section>

        {/* Grid Tips */}
        <section className="max-w-6xl mx-auto px-4 py-6 mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {tips.map((tip) => (
              <a 
                key={tip.id}
                href={tip.link} 
                target={tip.link !== "#" ? "_blank" : undefined}
                rel={tip.link !== "#" ? "noopener noreferrer" : undefined}
                className="transform hover:scale-[1.02] transition duration-300"
              >
                <div className="h-full rounded-xl overflow-hidden shadow-md hover:shadow-lg bg-white flex flex-col">
                  <img 
                    src={`/assets/images/${tip.img}`} 
                    alt={tip.title} 
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-3 flex-grow flex items-end">
                    <p className="font-medium min-h-[60px]">{tip.title}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default TipsMasak