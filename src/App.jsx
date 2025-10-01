import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

import { AuthProvider } from './contexts/AuthContext';
import { PopupProvider } from './contexts/PopupContext';
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HomeRouter from './components/HomeRouter';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPopup from './components/LoginPopup';
import ResepMasakan from './pages/ResepMasakan';
import TipsMasak from './pages/TipsMasak';
import Favorit from './pages/Favorit';
import TambahResep from './pages/resep/TambahResep';
import TampilkanResep from './pages/resep/TampilkanResep';
import MyResep from './pages/resep/MyResep';
import Profil from './pages/Profil';

function AppContent() {
  const location = useLocation();
  
  // Pages auth yang tidak menampilkan navbar dan footer
  const authPages = ['/login', '/register'];
  // Pages yang tidak menampilkan navbar dan footer
  const noLayoutPages = ['/login', '/register', '/tambah-resep', '/tampilkan-resep', '/profil'];
  const isAuthPage = authPages.includes(location.pathname);
  const isNoLayoutPage = noLayoutPages.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isNoLayoutPage && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeRouter />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tips-masak" element={<ProtectedRoute><TipsMasak /></ProtectedRoute>} />
          <Route path="/favorit" element={<ProtectedRoute><Favorit /></ProtectedRoute>} />
          <Route path="/resep-masakan" element={<ProtectedRoute><ResepMasakan /></ProtectedRoute>} />
          <Route path="/tambah-resep" element={<ProtectedRoute><TambahResep /></ProtectedRoute>} />
          <Route path="/tampilkan-resep" element={<ProtectedRoute><TampilkanResep /></ProtectedRoute>} />
          <Route path="/my-resep" element={<ProtectedRoute><MyResep /></ProtectedRoute>} />
          <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
        </Routes>
      </main>
    
      {!isNoLayoutPage && <Footer />}
      
      {/* Login Popup - Global */}
      <LoginPopup />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PopupProvider>
        <Router>
          <AppContent />
        </Router>
      </PopupProvider>
    </AuthProvider>
  )
}

export default App