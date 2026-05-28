import React, { createContext, useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';
import { isEmail } from '../utils/helpers';

export const AuthContext = createContext(null);

export const DEMO_ACCOUNT = {
  email: 'demo@cocart.com',
  password: 'demo123',
  name: 'Demo Shopper',
  phone: '+92 300 1234567',
  address: 'CoCart Demo Store, Karachi',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [authLoading, setAuthLoading] = useState(false);

  const login = async (email, password) => {
    setAuthLoading(true);
    if (!isEmail(email) || !password || password.length < 6) {
      setAuthLoading(false);
      throw new Error('Enter a valid email and a password with at least 6 characters.');
    }
    const nextUser = {
      name: email.split('@')[0],
      email: email.trim().toLowerCase(),
      phone: '',
      address: '',
      isGuest: false,
    };
    setUser(nextUser);
    setOrderHistory([]);
    setAuthLoading(false);
    Toast.show({ type: 'success', text1: 'Login success', text2: 'Welcome back to CoCart.' });
  };

  const signup = async (name, email, password) => {
    setAuthLoading(true);
    if (!name.trim() || !isEmail(email) || !password || password.length < 6) {
      setAuthLoading(false);
      throw new Error('Enter your name, a valid email, and a password with at least 6 characters.');
    }
    const nextUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: '',
      address: '',
      isGuest: false,
    };
    setUser(nextUser);
    setOrderHistory([]);
    setAuthLoading(false);
    Toast.show({ type: 'success', text1: 'Signup success', text2: 'Your account is ready.' });
  };

  const guestLogin = async () => {
    setAuthLoading(true);
    const nextUser = {
      name: 'Guest Shopper',
      email: 'guest@smartshop.local',
      phone: '',
      address: '',
      isGuest: true,
    };
    setUser(nextUser);
    setOrderHistory([]);
    setAuthLoading(false);
    Toast.show({ type: 'success', text1: 'Guest mode', text2: 'You can shop without an account.' });
  };

  const demoLogin = async () => {
    setAuthLoading(true);
    setUser({
      name: DEMO_ACCOUNT.name,
      email: DEMO_ACCOUNT.email,
      phone: DEMO_ACCOUNT.phone,
      address: DEMO_ACCOUNT.address,
      isGuest: false,
      isDemo: true,
    });
    setOrderHistory([]);
    setAuthLoading(false);
    Toast.show({ type: 'success', text1: 'Demo login', text2: 'You are signed in with the demo account.' });
  };

  const updateProfile = (profile) => {
    setUser((current) => ({
      ...current,
      name: profile.name.trim(),
      email: profile.email.trim().toLowerCase(),
      phone: profile.phone.trim(),
      address: profile.address.trim(),
    }));
    Toast.show({ type: 'success', text1: 'Profile updated', text2: 'Your information has been saved.' });
  };

  const addOrder = (order) => {
    setOrderHistory((orders) => [order, ...orders]);
  };

  const logout = () => {
    setUser(null);
    setOrderHistory([]);
    Toast.show({ type: 'success', text1: 'Logged out', text2: 'See you next time.' });
  };

  const value = useMemo(
    () => ({
      user,
      orderHistory,
      authLoading,
      login,
      signup,
      guestLogin,
      demoLogin,
      logout,
      updateProfile,
      addOrder,
      isAuthenticated: Boolean(user),
    }),
    [user, orderHistory, authLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
