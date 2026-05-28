import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';

export default function EmptyState({ title, message, children }) {
  return (
    <View style={styles.empty}>
      <View style={styles.dot} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 72,
    paddingHorizontal: 20,
    gap: 10,
  },
  dot: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.surfaceSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'center',
  },
  message: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});
