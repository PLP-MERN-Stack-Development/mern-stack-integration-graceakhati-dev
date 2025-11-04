import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-amber-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold text-pink-200 hover:text-pink-100 transition-colors">
            Her Blog
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {/* Home Link - Always visible */}
            <Link
              to="/"
              className="text-pink-100 hover:text-pink-200 transition-colors font-medium"
            >
              Home
            </Link>

            {/* Create Post - Only when authenticated */}
            {isAuthenticated && (
              <Link
                to="/create"
                className="text-pink-100 hover:text-pink-200 transition-colors font-medium"
              >
                Create Post
              </Link>
            )}

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  {/* User Name */}
                  <span className="text-pink-100">
                    Welcome, <span className="font-semibold text-pink-200">{user?.username}</span>
                  </span>
                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Login Link */}
                  <Link
                    to="/login"
                    className="text-pink-100 hover:text-pink-200 transition-colors font-medium"
                  >
                    Login
                  </Link>
                  {/* Register Link */}
                  <Link
                    to="/register"
                    className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors shadow-md"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

