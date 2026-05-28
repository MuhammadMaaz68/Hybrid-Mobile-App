import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../screens/system/LoadingScreen';

export default function RootNavigator() {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return <LoadingScreen />;
  }

  return <NavigationContainer>{isAuthenticated ? <MainStack /> : <AuthStack />}</NavigationContainer>;
}
