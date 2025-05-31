import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { FinanceProvider } from './FinanceContext';
import Header from './components/Header';
import SideMenu from './components/SideMenu';
import Footer from './components/Footer';
import PrivateRoute from './PrivateRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import ExpensesPage from './pages/ExpensesPage';
import Budgeting from './pages/Budgeting';
import SavingsTracker from './pages/SavingsTracker';
import DebtTracker from './pages/DebtTracker';
import FinancialLiteracy from './pages/FinancialLiteracy';
import { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100 font-inter">
        <Header />
        <div className="flex flex-grow"> {/* Use flex-grow to take available space */}
          {user && <Navigation />}
          <main className={`flex-grow ${user ? 'ml-0 md:ml-64' : ''} container mx-auto px-4 py-8`}>
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <LoginPage />} />
              <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <RegisterPage />} />
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/expenses" element={<PrivateRoute><ExpensesPage /></PrivateRoute>} />
              <Route path="/budgeting" element={<PrivateRoute><Budgeting /></PrivateRoute>} />
              <Route path="/savings" element={<PrivateRoute><SavingsTracker /></PrivateRoute>} />
              <Route path="/debt" element={<PrivateRoute><DebtTracker /></PrivateRoute>} />
              <Route path="/literacy" element={<PrivateRoute><FinancialLiteracy /></PrivateRoute>} />
              {/* Fallback for unmatched routes */}
              {/* <Route path="*" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
               <Route path="*" element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
