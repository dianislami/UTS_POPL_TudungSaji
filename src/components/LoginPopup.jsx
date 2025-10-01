import { usePopup } from '../contexts/PopupContext'
import { Link } from 'react-router-dom'

function LoginPopup() {
  const { showPopup, closePopup } = usePopup()

  if (!showPopup) return null

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-orange-100/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md relative">
        <button 
          onClick={closePopup}
          className="absolute top-2 right-2 text-orange-500 text-2xl font-bold hover:text-orange-600"
        >
          &times;
        </button>
        <h2 className="text-center font-semibold text-lg mb-6">Masuk Untuk Melihat Fitur Ini</h2>

        <div className="space-y-3">
          {/* Google */}
          <button className="w-full border rounded-full py-2 flex items-center justify-center space-x-2 hover:bg-gray-100">
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.4-5.7 7.5-10.7 7.5-6.3 0-11.5-5.2-11.5-11.5S18.3 12.5 24.5 12.5c2.8 0 5.4 1 7.4 2.8l6-6C34.6 5.5 29.8 3.5 24.5 3.5 12.7 3.5 3.5 12.7 3.5 24.5S12.7 45.5 24.5 45.5c11.8 0 21.5-9.7 21.5-21.5 0-1.7-.2-3.3-.4-4.5z"/>
              <path fill="#FF3D00" d="M6.3 14.1l6.6 4.8c1.8-4.3 5.9-7.4 10.6-7.4 2.8 0 5.4 1 7.4 2.8l6-6C34.6 5.5 29.8 3.5 24.5 3.5 15.9 3.5 8.6 8.6 6.3 14.1z"/>
              <path fill="#4CAF50" d="M24.5 45.5c5.3 0 10.1-2 13.7-5.3l-6.4-5.4c-2.3 1.6-5.1 2.5-8.3 2.5-5 0-9.3-3.1-11-7.4l-6.6 5.1C8.6 40.4 15.9 45.5 24.5 45.5z"/>
              <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-0.9 2.4-2.6 4.3-4.8 5.6l0.1 0.1 6.4 5.4c-0.4 0.4 6.5-4.8 6.5-13.6 0-1.7-.2-3.3-.4-4.5z"/>
            </svg>
            <span>Login dengan Google</span>
          </button>

          {/* Facebook */}
          <button className="w-full border rounded-full py-2 flex items-center justify-center space-x-2 hover:bg-gray-100">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.342v21.317C0 23.4.6 24 1.342 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.658-4.788 1.324 0 2.463.099 2.794.143v3.24l-1.918.001c-1.504 0-1.794.715-1.794 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.658V1.342C24 .6 23.4 0 22.675 0z"/>
            </svg>
            <span>Login dengan Facebook</span>
          </button>

          {/* Email */}
          <Link to="/login" onClick={closePopup}>
            <button className="w-full border rounded-full py-2 flex items-center justify-center space-x-2 hover:bg-gray-100">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7V9C15 10.1 15.9 11 17 11V20C17 21.1 16.1 22 15 22H9C7.9 22 7 21.1 7 20V11C8.1 11 9 10.1 9 9V7H3V9H5V20C5 22.2 6.8 24 9 24H15C17.2 24 19 22.2 19 20V9H21Z"/>
              </svg>
              <span>Login dengan Email</span>
            </button>
          </Link>
        </div>
        
        <div className="mt-6">
          <Link to="/register" onClick={closePopup}>
            <button className="bg-orange-400 text-white w-full py-2 rounded font-semibold hover:bg-orange-500 transition">
              Daftar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPopup