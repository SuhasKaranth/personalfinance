import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 py-8">
      <div className="flex flex-col md:flex-row bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
        {/* App Briefing Section */}
        <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to FinTrack India</h2>
          <p className="text-gray-700 leading-relaxed">
            FinTrack India is your personal finance companion designed specifically for Indian users. Track your expenses, manage your budget, monitor your savings goals, and stay on top of your debts – all in one intuitive platform. Take control of your financial future with FinTrack India.
          </p>
        </div>

        {/* Login Form Section */}
        <div className="md:w-1/2 md:pl-8 border-t md:border-t-0 md:border-l border-gray-200 pt-8 md:pt-0">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors shadow-md"
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <NavLink to="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </NavLink>
        </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;