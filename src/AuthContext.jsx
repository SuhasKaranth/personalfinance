import { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock login
        const mockUser = { id: uuidv4(), username };
        setUser(mockUser);
        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock logout
        setUser(null);
        resolve(true);
      }, 500);
    });
  };

  const register = (username, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock registration
        const mockUser = { id: uuidv4(), username };
        setUser(mockUser);
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