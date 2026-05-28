import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BrandLogo from './BrandLogo';
import colors from '../../theme/colors';

export default function ScreenHeader({ title, subtitle, showLogo = true, right }) {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        {showLogo ? <BrandLogo /> : null}
        {right ? <View>{right}</View> : null}
      </View>
      <View style={styles.copy}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 16,
    marginBottom: 16,
  },
  topRow: {
    minHeight: 34,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  copy: {
    gap: 5,
  },
  title: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
});
