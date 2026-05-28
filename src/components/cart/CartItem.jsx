import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../theme/colors';
import { formatCurrency } from '../../utils/formatters';

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.price}>{formatCurrency(item.price)}</Text>
        <View style={styles.controls}>
          <View style={styles.stepper}>
            <Pressable onPress={onDecrease} style={styles.stepButton}>
              <Text style={styles.stepText}>-</Text>
            </Pressable>
            <Text style={styles.qty}>{item.quantity}</Text>
            <Pressable onPress={onIncrease} style={styles.stepButton}>
              <Text style={styles.stepText}>+</Text>
            </Pressable>
          </View>
          <Pressable onPress={onRemove}>
            <Text style={styles.remove}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 12,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 14,
    backgroundColor: colors.surfaceSoft,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  title: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 19,
  },
  price: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '900',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  stepButton: {
    width: 34,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSoft,
  },
  stepText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  qty: {
    minWidth: 34,
    textAlign: 'center',
    color: colors.text,
    fontWeight: '800',
  },
  remove: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '800',
  },
});
