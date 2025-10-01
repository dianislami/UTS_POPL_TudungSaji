import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Call backend API
      const response = await authAPI.login(formData);
      
      if (response.success) {
        // Use AuthContext login function
        login(response.user, response.token);
        
        // Redirect to dashboard
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#f2e9da] min-h-screen">
      {/* Background Illustration (Optional Overlay) */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30 z-0" style={{backgroundImage: "url('your-image-url.jpg')"}}></div>

      {/* Main Container */}
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-md w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src="/assets/images/Logo.png" alt="Logo" className="mx-auto w-16 mb-2" />
            <h2 className="text-xl font-semibold tracking-wide">SIGN <span className="text-red-500">IN</span></h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">E-Mail</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-orange-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" 
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input 
                type="password" 
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-orange-100 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400" 
              />
            </div>

            {/* Login Button */}
            <div className="text-center pt-4">
              <button 
                type="submit"
                disabled={isLoading}
                className="block w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md font-semibold text-center transition-colors"
              >
                {isLoading ? 'Signing In...' : 'SIGN IN'}
              </button>
            </div>

            {/* Register Link */}
            <p className="text-center text-sm mt-4 text-gray-600">
              Don't have an account?
              <Link to="/register" className="text-orange-500 hover:underline ml-1">Create Account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;