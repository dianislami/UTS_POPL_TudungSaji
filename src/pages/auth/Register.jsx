import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    try {
      // Call backend API
      const response = await authAPI.register(formData);
      
      if (response.success) {
        // Use AuthContext login function
        login(response.user, response.token);
        
        setSuccess('Registration successful! Redirecting...');
        
        // Redirect to dashboard after success
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
      console.error('Registration error:', err);
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
        <div className="bg-white bg-opacity-80 p-8 rounded-xl shadow-md w-full max-w-2xl">
          {/* Logo */}
          <div className="text-center mb-6">
            <img src="/assets/images/Logo.png" alt="Logo" className="mx-auto w-16 mb-2" />
            <h2 className="text-xl font-semibold tracking-wide">CREATE <span className="text-red-500">ACCOUNT</span></h2>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-orange-100 rounded-md focus:outline-none" 
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-orange-100 rounded-md focus:outline-none" 
                />
              </div>
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input 
                type="text" 
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-orange-100 rounded-md focus:outline-none" 
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">E-Mail</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-orange-100 rounded-md focus:outline-none" 
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
                className="w-full px-4 py-2 bg-orange-100 rounded-md focus:outline-none" 
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">Confirm Password</label>
              <input 
                type="password" 
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-orange-100 rounded-md focus:outline-none" 
              />
            </div>

            {/* Register Button */}
            <div className="text-center pt-4">
              <button 
                type="submit"
                disabled={isLoading}
                className="block w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md font-semibold text-center transition-colors"
              >
                {isLoading ? 'Creating Account...' : 'REGISTER'}
              </button>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm mt-4 text-gray-600">
              Already have an account?
              <Link to="/login" className="text-orange-500 hover:underline ml-1">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;