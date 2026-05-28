import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import colors from '../../theme/colors';

export default function CustomButton({ title, onPress, variant = 'primary', loading = false, disabled = false, style }) {
  const isDisabled = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.secondary,
        variant === 'ghost' && styles.ghost,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? <ActivityIndicator color={variant === 'primary' ? colors.white : colors.primary} /> : null}
      {!loading ? (
        <Text style={[styles.text, variant !== 'primary' && styles.secondaryText]} numberOfLines={1}>
          {title}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 2,
  },
  secondary: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    shadowOpacity: 0,
  },
  ghost: {
    backgroundColor: 'transparent',
    shadowOpacity: 0,
  },
  disabled: {
    opacity: 0.65,
  },
  pressed: {
    transform: [{ scale: 0.99 }],
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryText: {
    color: colors.primary,
  },
});
