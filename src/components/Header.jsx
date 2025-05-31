import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-lg rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold font-inter">FinTrack India</h1>
        {user ? (
          <div className="flex items-center space-x-3">
            <span className="text-sm">Hi, {user.name || user.email}!</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded-md text-sm transition-colors shadow"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="px-3 py-1 bg-blue-700 hover:bg-blue-800 rounded-md text-sm transition-colors shadow"
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};
export default Header;