import { createContext, useContext, useState, useEffect } from 'react';
import { googleAuthService } from '../services/googleAuth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userMode, setUserMode] = useState('customer'); // 'customer' or 'seller'

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('cultura-user');
    const savedMode = localStorage.getItem('cultura-user-mode');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedMode) {
      setUserMode(savedMode);
    }
    
    setLoading(false);
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('cultura-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cultura-user');
    }
  }, [user]);

  // Save user mode to localStorage
  useEffect(() => {
    localStorage.setItem('cultura-user-mode', userMode);
  }, [userMode]);

  const signInWithGoogle = async (role = 'customer') => {
    try {
      setLoading(true);
      const userData = await googleAuthService.signIn();
      userData.role = role; // Set the selected role
      setUser(userData);
      setUserMode(role);
      return userData;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await googleAuthService.signOut();
      setUser(null);
      setUserMode('customer');
      localStorage.removeItem('cultura-user');
      localStorage.removeItem('cultura-user-mode');
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (mode) => {
    if (user && ['customer', 'seller'].includes(mode)) {
      setUserMode(mode);
    }
  };

  const value = {
    user,
    userMode,
    loading,
    signInWithGoogle,
    signOut,
    switchMode,
    isAuthenticated: !!user,
    isCustomer: userMode === 'customer',
    isSeller: userMode === 'seller'
  };

  return (
    <AuthContext.Provider value={value}>
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