import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/ui/CustomButton';
import useAuth from '../../hooks/useAuth';
import colors from '../../theme/colors';

export default function WelcomeScreen({ navigation }) {
  const { guestLogin, authLoading } = useAuth();

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.logoBox}>
          <Ionicons name="storefront" size={48} color={colors.white} />
        </View>
        <Text style={styles.brand}>CoCart</Text>
        <View style={styles.copy}>
          <Text style={styles.title}>Welcome to CoCart! Your Smart Shopping Mobile App</Text>
          <Text style={styles.subtitle}>
            Discover a seamless shopping experience with CoCart, your smart grocery cart companion. Effortlessly manage your shopping list, find the best deals, and enjoy a personalized shopping journey. Let's get started!
          </Text>
        </View>
        <View style={styles.dots}>
          <View style={styles.dotActive} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <View style={styles.actions}>
        <CustomButton title="Get Started" onPress={() => navigation.navigate('Login')} />
        <CustomButton title="Create Account" variant="secondary" onPress={() => navigation.navigate('Signup')} />
        <CustomButton title="Continue as Guest" variant="ghost" loading={authLoading} onPress={guestLogin} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoBox: {
    width: 86,
    height: 86,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  brand: {
    marginTop: 18,
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
  },
  copy: {
    marginTop: 78,
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 27,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginTop: 86,
  },
  dotActive: {
    width: 20,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  actions: {
    gap: 10,
  },
});
