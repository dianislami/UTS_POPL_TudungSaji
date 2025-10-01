import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { usePopup } from '../contexts/PopupContext'

function Navbar (){
    const location = useLocation()
    const { user, isAuthenticated, logout } = useAuth()
    const { openPopup } = usePopup()
    const [showLogoutPopup, setShowLogoutPopup] = useState(false)

    const handleLogout = () => {
        logout()
        setShowLogoutPopup(false)
    }

    const handleLogoutClick = () => {
        setShowLogoutPopup(true)
    }

    const handleProtectedMenuClick = (e) => {
        if (!isAuthenticated) {
            e.preventDefault()
            openPopup()
        }
    }
    
    return (
        <nav className="bg-orange-200 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <Link to="/">
                <img src="/assets/images/Logo.png" alt="Tudung Saji" className="h-[7vh] w-[6vw]"/>
            </Link>
        </div>

        <div className="flex space-x-6 items-center">
            <Link 
                to="/" 
                className={`text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200 ${
                    location.pathname === '/' ? 'text-orange-600 underline' : ''
                }`}
            >
                Beranda
            </Link>
            <Link 
                to="/resep-masakan"
                onClick={handleProtectedMenuClick}
                className={`text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200 ${
                    location.pathname === '/resep-masakan' ? 'text-orange-600 underline' : ''
                }`}
            >
                Resep Masakan
            </Link>
            <Link 
                to="/tips-masak"
                onClick={handleProtectedMenuClick}
                className={`text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200 ${
                    location.pathname === '/tips-masak' ? 'text-orange-600 underline' : ''
                }`}
            >
                Tips Masak
            </Link>
            {isAuthenticated ? (
                <Link 
                    to="/my-resep"
                    className={`text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200 ${
                        location.pathname === '/my-resep' ? 'text-orange-600 underline' : ''
                    }`}
                >
                    My Resep
                </Link>
            ) : (
                <a href="#about-us" className="text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200">Tentang Kami</a>
            )}
            <Link 
                to="/favorit"
                onClick={handleProtectedMenuClick}
                className={`text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200 ${
                    location.pathname === '/favorit' ? 'text-orange-600 underline' : ''
                }`}
            >
                Favorit
            </Link>
        </div>

        <div className="flex items-center space-x-4 ml-6">
            {isAuthenticated ? (
                <>
                    <Link 
                        to="/profil"
                        className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold hover:scale-105 transition duration-200 shadow-md"
                        title="Edit Profil"
                    >
                        {user?.firstName?.charAt(0) || user?.name?.charAt(0) || user?.username?.charAt(0) || 'U'}
                    </Link>
                    <button 
                        onClick={handleLogoutClick}
                        className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-red-600 transition"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <div className="space-x-2">
                    <Link to="/login">
                        <button className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-orange-600 transition">
                            Register
                        </button>
                    </Link>
                </div>
            )}
        </div>

        {/* Popup Logout */}
        {showLogoutPopup && (
            <div className="fixed inset-0 backdrop-blur-sm bg-orange-100/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
                    {/* Close Button */}
                    <button 
                        onClick={() => setShowLogoutPopup(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path fill="currentColor" fillRule="evenodd" d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm-6.125 31.071L24 28.946l6.125 6.125c.39.39 1.024.39 1.414 0s.39-1.024 0-1.414L25.414 27.532l6.125-6.125c.39-.39.39-1.024 0-1.414s-1.024-.39-1.414 0L24 26.118l-6.125-6.125c-.39-.39-1.024-.39-1.414 0s-.39 1.024 0 1.414l6.125 6.125-6.125 6.125c-.39.39-.39 1.024 0 1.414s1.024.39 1.414 0z"/>
                        </svg>
                    </button>

                    {/* Content */}
                    <div className="text-center">
                        <h3 className="text-xl font-bold mb-4">Konfirmasi Logout</h3>
                        <p className="text-gray-600 mb-6">Apakah Anda yakin ingin keluar dari akun ini?</p>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-4 justify-center">
                            <button 
                                onClick={() => setShowLogoutPopup(false)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition duration-300"
                            >
                                Batal
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition duration-300"
                            >
                                Ya, Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </nav>
    )
}

export default Navbar;