import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FiUser, FiHome, FiUsers, FiLogOut } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="bg-white shadow-lg sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link
              to="/dashboard"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <FiHome className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/contacts"
              className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <FiUsers className="h-5 w-5 mr-2" />
              Contacts
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-700">
              <FiUser className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200"
            >
              <FiLogOut className="h-4 w-4 mr-2" />
              Logout
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
