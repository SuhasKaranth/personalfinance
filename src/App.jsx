import './App.css'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import { FinanceProvider } from './FinanceContext';
import Header from './components/Header';
import Navigation from './components/Navigation';
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

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-100 font-inter">
        <Header />
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/expenses" element={<PrivateRoute><ExpensesPage /></PrivateRoute>} />
            <Route path="/budgeting" element={<PrivateRoute><Budgeting /></PrivateRoute>} />
            <Route path="/savings" element={<PrivateRoute><SavingsTracker /></PrivateRoute>} />
            <Route path="/debt" element={<PrivateRoute><DebtTracker /></PrivateRoute>} />
            <Route path="/learn" element={<PrivateRoute><FinancialLiteracy /></PrivateRoute>} />
            {/* Fallback for unmatched routes */}
            <Route path="*" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
