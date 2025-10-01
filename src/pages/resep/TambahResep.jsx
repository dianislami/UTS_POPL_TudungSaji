import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const TambahResep = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    porsi: '',
    lamaMemasak: '',
    gambar: null
  });
  
  const [bahan, setBahan] = useState(['']);
  const [langkah, setLangkah] = useState(['']);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        gambar: file
      }));
      
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBahanChange = (index, value) => {
    const newBahan = [...bahan];
    newBahan[index] = value;
    setBahan(newBahan);
  };

  const handleLangkahChange = (index, value) => {
    const newLangkah = [...langkah];
    newLangkah[index] = value;
    setLangkah(newLangkah);
  };

  const tambahBahan = () => {
    setBahan([...bahan, '']);
  };

  const tambahLangkah = () => {
    setLangkah([...langkah, '']);
  };

  const hapusBahan = (index) => {
    if (bahan.length > 1) {
      const newBahan = bahan.filter((_, i) => i !== index);
      setBahan(newBahan);
    } else {
      setBahan(['']);
    }
  };

  const hapusLangkah = (index) => {
    if (langkah.length > 1) {
      const newLangkah = langkah.filter((_, i) => i !== index);
      setLangkah(newLangkah);
    } else {
      setLangkah(['']);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.judul.trim()) {
      alert('Judul resep harus diisi!');
      return;
    }
    if (!formData.deskripsi.trim()) {
      alert('Deskripsi resep harus diisi!');
      return;
    }
    if (!formData.porsi) {
      alert('Porsi harus diisi!');
      return;
    }
    if (!formData.lamaMemasak) {
      alert('Lama memasak harus diisi!');
      return;
    }
    if (bahan.filter(b => b.trim() !== '').length === 0) {
      alert('Minimal satu bahan harus diisi!');
      return;
    }
    if (langkah.filter(l => l.trim() !== '').length === 0) {
      alert('Minimal satu langkah harus diisi!');
      return;
    }
    
    const recipeData = {
      id: Date.now(), // Simple ID generation
      title: formData.judul,
      description: formData.deskripsi,
      servings: formData.porsi,
      cookingTime: formData.lamaMemasak,
      ingredients: bahan.filter(b => b.trim() !== ''),
      steps: langkah.filter(l => l.trim() !== ''),
      image: imagePreview, // Gunakan preview image sebagai data
      author: user?.name || user?.username || 'Anonymous',
      createdAt: new Date().toISOString()
    };
    
    // Simpan resep ke localStorage
    try {
      const existingRecipes = localStorage.getItem(`recipes_${user?.id || 'user'}`);
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];
      recipes.push(recipeData);
      localStorage.setItem(`recipes_${user?.id || 'user'}`, JSON.stringify(recipes));
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
    
    // Navigasi ke halaman TampilkanResep dengan data resep
    navigate('/tampilkan-resep', { 
      state: { recipeData }
    });
  };

  const handleReset = () => {
    setFormData({
      judul: '',
      deskripsi: '',
      porsi: '',
      lamaMemasak: '',
      gambar: null
    });
    setBahan(['']);
    setLangkah(['']);
    setImagePreview(null);
  };

  return (
    <div className="bg-[#f4ebd6] font-sans min-h-screen">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-orange-300 bg-[#f4c988]">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src="assets/images/Logo.png" alt="Tudung Saji" className="h-[7vh] w-[6vw]" />
          </Link>
        </div>
        <h1 className="text-2xl font-bold">
          Tambah <span className="text-orange-600">Resep</span>
        </h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-3">
            <span className="hover:underline">{user?.firstName || user?.username}</span>
            <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition duration-200 shadow-md">
              {(user?.firstName?.[0] || user?.username?.[0] || 'U').toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="px-6 py-3 mx-6 mt-4 flex items-center text-sm text-black space-x-2">
        <Link to="/" className="font-semibold hover:underline transition">Beranda</Link>
        <span className="text-gray-400">›</span>
        <span className="font-semibold">Tambah Resep</span>
      </nav>

      {/* Form tambah resep */}
      <form onSubmit={handleSubmit} className="px-8 pb-8 mt-4">
        {/* Kolom kiri dan kanan */}
        <div className="flex flex-col md:flex-row gap-5 mb-6">

          {/* Kolom Kiri */}
          <div className="w-full md:w-1/3 bg-white rounded-xl p-5 shadow-md">
            <div className="text-center p-5 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 text-sm mb-5">
              <label htmlFor="gambar" className="cursor-pointer block font-bold">
                📷<br />Foto Resep<br />
                <small className="font-normal">Tambahkan Foto Akhir Masakan</small>
              </label>
              <input 
                type="file" 
                id="gambar" 
                name="gambar" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img 
                  src={imagePreview} 
                  alt="Preview Gambar Resep" 
                  className="w-40 mt-4 mx-auto rounded"
                />
              )}
            </div>

            <label htmlFor="porsi" className="block mb-1 font-bold">Porsi</label>
            <input 
              type="text" 
              id="porsi" 
              name="porsi" 
              value={formData.porsi}
              onChange={handleInputChange}
              placeholder="Contoh: 2 Orang" 
              className="w-full p-2 mb-4 border border-gray-300 rounded-md" 
            />

            <label className="block mb-1 font-bold">Bahan-bahan:</label>
            <div className="space-y-2 mb-2">
              {bahan.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="cursor-move">☰</span>
                  <input 
                    type="text" 
                    value={item}
                    onChange={(e) => handleBahanChange(index, e.target.value)}
                    placeholder="Tulis bahan..." 
                    className="flex-1 p-2 border border-gray-300 rounded-md" 
                  />
                  <button 
                    type="button" 
                    onClick={() => hapusBahan(index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <button 
              type="button" 
              onClick={tambahBahan}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-semibold"
            >
              + Bahan
            </button>
          </div>

          {/* Kolom Kanan */}
          <div className="w-full md:w-2/3 bg-white rounded-xl p-5 shadow-md">
            <label htmlFor="judul" className="block mb-1 font-bold">Judul</label>
            <input 
              type="text" 
              id="judul" 
              name="judul" 
              value={formData.judul}
              onChange={handleInputChange}
              placeholder="Judul Resep" 
              className="w-full p-2 mb-4 border border-gray-300 rounded-md" 
              required
            />

            <label htmlFor="deskripsi" className="block mb-1 font-bold">Deskripsi</label>
            <textarea 
              id="deskripsi" 
              name="deskripsi" 
              value={formData.deskripsi}
              onChange={handleInputChange}
              rows={4} 
              placeholder="Deskripsi Resep" 
              className="w-full p-2 mb-4 border border-gray-300 rounded-md"
            />

            <label htmlFor="lamaMemasak" className="block mb-1 font-bold">Lama Memasak</label>
            <input 
              type="text" 
              id="lamaMemasak" 
              name="lamaMemasak" 
              value={formData.lamaMemasak}
              onChange={handleInputChange}
              placeholder="Contoh: 30 Menit" 
              className="w-full p-2 mb-4 border border-gray-300 rounded-md" 
            />

            <label className="block mb-1 font-bold">Langkah:</label>
            <div className="space-y-2 mb-2">
              {langkah.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="cursor-move">☰</span>
                  <input 
                    type="text" 
                    value={item}
                    onChange={(e) => handleLangkahChange(index, e.target.value)}
                    placeholder={`Langkah ${index + 1}...`}
                    className="flex-1 p-2 border border-gray-300 rounded-md" 
                  />
                  <button 
                    type="button" 
                    onClick={() => hapusLangkah(index)}
                    className="text-red-500 hover:text-red-700 px-2"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <button 
              type="button" 
              onClick={tambahLangkah}
              className="text-blue-600 hover:text-blue-800 text-sm mt-2 font-semibold"
            >
              + Langkah
            </button>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="w-full flex justify-end gap-3">
          <button 
            type="button" 
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md font-bold hover:bg-gray-300 transition duration-150"
          >
            Reset
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 bg-[#b5332e] text-white rounded-md font-bold hover:bg-red-700 transition duration-150"
          >
            Terbitkan
          </button>
        </div>
      </form>
    </div>
  );
};

export default TambahResep;