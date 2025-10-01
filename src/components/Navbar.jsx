import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { usePopup } from '../contexts/PopupContext'

function Navbar (){
    const location = useLocation()
    const { user, isAuthenticated, logout } = useAuth()
    const { openPopup } = usePopup()

    const handleLogout = () => {
        logout()
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
            <a href="#about-us" className="text-black font-medium hover:text-orange-600 hover:underline underline-offset-4 transition-all duration-200">Tentang Kami</a>
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
                    <span className="text-black font-medium">
                        Hello, {user?.firstName || user?.username}!
                    </span>
                    <button 
                        onClick={handleLogout}
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
        </nav>
    )
}

export default Navbar;