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

const groceryImage = require('../../../assets/images/header.png');

export default function SignupScreen({ navigation }) {
  const { signup, authLoading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const submit = async () => {
    const nextErrors = {
      name: name.trim() ? '' : 'Name required',
      email: isEmail(email) ? '' : 'Valid email required',
      password: password.length >= 6 ? '' : 'Minimum 6 characters',
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email || nextErrors.password) {
      return;
    }
    try {
      await signup(name, email, password);
    } catch (error) {
      Alert.alert('Signup failed', error.message);
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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Create your shopper profile for faster checkout.</Text>
            <CustomInput label="Full Name" value={name} onChangeText={setName} autoCapitalize="words" error={errors.name} />
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
            <CustomButton title="Create Account" loading={authLoading} onPress={submit} />
            <CustomButton title="Already have an account" variant="ghost" onPress={() => navigation.navigate('Login')} />
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
    height: 276,
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
});
