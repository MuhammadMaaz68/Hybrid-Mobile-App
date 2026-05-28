import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import BrandLogo from './BrandLogo';
import colors from '../../theme/colors';

export default function Loader({ compact = false }) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <BrandLogo centered />
      <ActivityIndicator size="large" color={colors.primary} />
      <View style={styles.skeleton} />
      <View style={[styles.skeleton, styles.short]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    padding: 24,
  },
  compact: {
    flex: 0,
    paddingVertical: 28,
  },
  skeleton: {
    width: '70%',
    height: 12,
    borderRadius: 12,
    backgroundColor: colors.border,
  },
  short: {
    width: '45%',
  },
});
