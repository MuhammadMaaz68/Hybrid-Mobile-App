import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';

export default function BrandLogo({ size = 'regular', centered = false }) {
  const large = size === 'large';

  return (
    <View style={[styles.wrap, centered && styles.centered]}>
      <View style={[styles.mark, large && styles.markLarge]}>
        <View style={[styles.handle, large && styles.handleLarge]} />
        <View style={[styles.basketTop, large && styles.basketTopLarge]} />
        <View style={[styles.basketMid, large && styles.basketMidLarge]} />
        <View style={[styles.basketBase, large && styles.basketBaseLarge]} />
        <View style={[styles.wheelOne, large && styles.wheelLarge]} />
        <View style={[styles.wheelTwo, large && styles.wheelLarge]} />
      </View>
      <Text style={[styles.wordmark, large && styles.wordmarkLarge]}>CoCart</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  centered: {
    justifyContent: 'center',
  },
  mark: {
    width: 33,
    height: 28,
    position: 'relative',
  },
  markLarge: {
    width: 48,
    height: 40,
  },
  handle: {
    position: 'absolute',
    top: 1,
    left: 0,
    width: 10,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.primary,
    transform: [{ rotate: '12deg' }],
  },
  handleLarge: {
    width: 15,
    height: 4,
  },
  basketTop: {
    position: 'absolute',
    top: 5,
    left: 8,
    width: 24,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  basketTopLarge: {
    top: 7,
    left: 12,
    width: 35,
    height: 4,
  },
  basketMid: {
    position: 'absolute',
    top: 12,
    left: 11,
    width: 18,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  basketMidLarge: {
    top: 17,
    left: 16,
    width: 26,
    height: 4,
  },
  basketBase: {
    position: 'absolute',
    top: 19,
    left: 14,
    width: 12,
    height: 3,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  basketBaseLarge: {
    top: 27,
    left: 20,
    width: 18,
    height: 4,
  },
  wheelOne: {
    position: 'absolute',
    bottom: 0,
    left: 13,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  wheelTwo: {
    position: 'absolute',
    bottom: 0,
    left: 25,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
  wheelLarge: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  wordmark: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  wordmarkLarge: {
    fontSize: 34,
  },
});
