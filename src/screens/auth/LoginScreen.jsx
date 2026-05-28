import React, { useState } from 'react';
import {
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CustomButton from '../../components/ui/CustomButton';
import CustomInput from '../../components/ui/CustomInput';
import useAuth from '../../hooks/useAuth';
import colors from '../../theme/colors';
import { isEmail } from '../../utils/helpers';
import { DEMO_ACCOUNT } from '../../context/AuthContext';

const groceryImage = require('../../../assets/images/header.png');

export default function LoginScreen({ navigation }) {
  const { login, guestLogin, demoLogin, authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const submit = async () => {
    const nextErrors = {
      email: isEmail(email) ? '' : 'Valid email required',
      password: password.length >= 6 ? '' : 'Minimum 6 characters',
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) {
      return;
    }
    try {
      await login(email, password);
    } catch (error) {
      Alert.alert('Login failed', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <ImageBackground source={groceryImage} style={styles.hero} imageStyle={styles.heroImage}>
            <Pressable onPress={() => navigation.goBack()} style={styles.closeButton}>
              <Ionicons name="close" size={18} color={colors.white} />
            </Pressable>
          </ImageBackground>
          <View style={styles.sheet}>
            <Text style={styles.title}>Sign In</Text>
            <Text style={styles.subtitle}>Welcome back to your smart grocery cart.</Text>
            {/* <View style={styles.demoBox}>
              <Text style={styles.demoTitle}>Demo account</Text>
              <Text style={styles.demoText}>
                {DEMO_ACCOUNT.email} / {DEMO_ACCOUNT.password}
              </Text>
            </View> */}
            <CustomInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="info@example.com"
              error={errors.email}
            />
            <CustomInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="Password"
              error={errors.password}
            />
            <Pressable>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </Pressable>
            <CustomButton title="Sign In" loading={authLoading} onPress={submit} />
            <CustomButton title="Login with Demo Account" variant="secondary" loading={authLoading} onPress={demoLogin} />
            <CustomButton title="Create an Account" variant="secondary" onPress={() => navigation.navigate('Signup')} />
            <CustomButton title="Continue as Guest" variant="ghost" loading={authLoading} onPress={guestLogin} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  hero: {
    height: 302,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    marginRight: 16,
    backgroundColor: 'rgba(15, 23, 42, 0.58)',
  },
  sheet: {
    flex: 1,
    marginTop: -28,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: colors.white,
    padding: 16,
    paddingTop: 22,
    gap: 13,
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
  },
  demoBox: {
    borderRadius: 14,
    backgroundColor: colors.surfaceSoft,
    padding: 12,
    gap: 3,
  },
  demoTitle: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '900',
  },
  demoText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  forgot: {
    alignSelf: 'center',
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    marginVertical: 4,
  },
});
