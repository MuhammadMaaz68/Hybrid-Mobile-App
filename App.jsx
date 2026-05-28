import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { ScanProvider } from './src/context/ScanContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <CartProvider>
          <ScanProvider>
            <StatusBar style="dark" />
            <RootNavigator />
            <Toast />
          </ScanProvider>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
