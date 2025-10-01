import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';

const HomeRouter = () => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#ECE7D4]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If authenticated, show Dashboard; if not, show LandingPage
  return isAuthenticated ? <Dashboard /> : <LandingPage />;
};

export default HomeRouter;