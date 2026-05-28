import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './BottomTabs';
import ProductDetailsScreen from '../screens/product/ProductDetailsScreen';
import CheckoutScreen from '../screens/checkout/CheckoutScreen';
import ReceiptScreen from '../screens/order/ReceiptScreen';
import colors from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.white },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '900' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="MainTabs" component={BottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ title: 'Product Details' }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ headerShown: false, gestureEnabled: false }} />
    </Stack.Navigator>
  );
}
