import { useState } from 'react';
import { motion } from 'framer-motion';
import colors from '../color';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const { isLogin, setIsLogin } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLogin(false);  
    navigate('/dashboard');
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <nav
        className="flex justify-between items-center p-4 rounded-lg shadow-md"
        style={{ backgroundColor: colors.primary }}
      >
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold"
          style={{ color: colors.text }}
        >
          Meditation Sessions
        </motion.h1>

        {/* Hamburger Menu for Mobile */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu
            className="text-2xl text-white"
          >
            {isMenuOpen ? '×' : '☰'}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-4">
          {isLogin ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                style={{ backgroundColor: colors.secondary, color: colors.text }}
              >
                Dashboard
              </Link>
              <Link
                to="/my-sessions"
                className="px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                style={{ backgroundColor: colors.secondary, color: colors.text }}
              >
                My Sessions
              </Link>
              <Link
                to="/session-editor"
                className="px-4 py-2 rounded-lg shadow hover:shadow-md transition-all"
                style={{ backgroundColor: colors.accent, color: colors.text }}
              >
                + New Session
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                style={{ backgroundColor: colors.secondary, color: colors.text }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                style={{ backgroundColor: colors.secondary, color: colors.text }}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                style={{ backgroundColor: colors.secondary, color: colors.text }}
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-opacity-90 bg-gray-800 p-4 rounded-b-lg">
            {isLogin ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 text-white hover:bg-opacity-80 transition-colors"
                  style={{ backgroundColor: colors.secondary }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/my-sessions"
                  className="block px-4 py-2 text-white hover:bg-opacity-80 transition-colors"
                  style={{ backgroundColor: colors.secondary }}
                >
                  My Sessions
                </Link>
                <Link
                  to="/session-editor"
                  className="block px-4 py-2 text-white hover:bg-opacity-80 transition-all"
                  style={{ backgroundColor: colors.accent }}
                >
                  + New Session
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-white hover:bg-opacity-80 transition-colors"
                  style={{ backgroundColor: colors.secondary }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-white hover:bg-opacity-80 transition-colors"
                  style={{ backgroundColor: colors.secondary }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-white hover:bg-opacity-80 transition-colors"
                  style={{ backgroundColor: colors.secondary }}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
