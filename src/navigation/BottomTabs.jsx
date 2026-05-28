import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/home/HomeScreen';
import SearchScreen from '../screens/home/SearchScreen';
import CartScreen from '../screens/cart/CartScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import useCart from '../hooks/useCart';
import colors from '../theme/colors';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Home: ['home-outline', 'home'],
  Search: ['search-outline', 'search'],
  Cart: ['cart-outline', 'cart'],
  Profile: ['person-outline', 'person'],
};

export default function BottomTabs() {
  const { cartCount } = useCart();
  const insets = useSafeAreaInsets();
  const bottomPadding = Math.max(insets.bottom, 24);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: [styles.tabBar, { height: 60 + bottomPadding, paddingBottom: bottomPadding }],
        tabBarLabelStyle: styles.label,
        tabBarItemStyle: styles.item,
        tabBarIcon: ({ color, focused }) => (
          <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
            <Ionicons name={focused ? tabIcons[route.name][1] : tabIcons[route.name][0]} size={20} color={color} />
            {route.name === 'Cart' && cartCount > 0 ? (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
              </View>
            ) : null}
          </View>
        ),
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  item: {
    paddingVertical: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 0,
  },
  iconWrap: {
    width: 34,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },
  iconWrapActive: {
    backgroundColor: colors.surfaceSoft,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -12,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.accent,
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
  },
});
