import { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  const login = (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock login
        const mockUser = { id: uuidv4(), name: username, email: username }; // Added name and email for Header display
        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock logout
        resolve(true); // Resolve first, then set user to null
      }, 500);
    });
  };

  const register = (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock registration
        const mockUser = { id: uuidv4(), name: username, email: username }; // Added name and email for Header display
        resolve(mockUser);
      }, 1500);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;