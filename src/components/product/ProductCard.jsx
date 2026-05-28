import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../ui/CustomButton';
import colors from '../../theme/colors';
import { formatCurrency } from '../../utils/formatters';

export default function ProductCard({ product, onPress, onAdd }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.category} numberOfLines={1}>
        {product.category}
      </Text>
      <Text style={styles.title} numberOfLines={2}>
        {product.title}
      </Text>
      <View style={styles.row}>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <Text style={styles.rating}>Rate {product.rating?.rate || '4.5'}</Text>
      </View>
      <CustomButton title="Add" onPress={onAdd} style={styles.button} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 294,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 11,
    gap: 9,
    shadowColor: colors.shadow,
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  imageWrap: {
    height: 118,
    borderRadius: 14,
    backgroundColor: colors.surfaceSoft,
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  category: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    minHeight: 42,
    color: colors.text,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  rating: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
  },
  button: {
    minHeight: 38,
    marginTop: 'auto',
  },
});
