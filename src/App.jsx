import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'

import { AuthProvider } from './contexts/AuthContext';
import { PopupProvider } from './contexts/PopupContext';
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import HomeRouter from './components/HomeRouter';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPopup from './components/LoginPopup';

function AppContent() {
  const location = useLocation();
  
  // Pages auth yang tidak menampilkan navbar dan footer
  const authPages = ['/login', '/register'];
  // Pages yang tidak menampilkan navbar dan footer
  const noLayoutPages = ['/login', '/register', '/tambah-resep'];
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