import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/ui/CustomButton';
import Loader from '../../components/ui/Loader';
import ProductCard from '../../components/product/ProductCard';
import ScreenHeader from '../../components/ui/ScreenHeader';
import useCart from '../../hooks/useCart';
import { getAllProducts, getSingleProduct } from '../../services/productService';
import colors from '../../theme/colors';
import { formatCurrency } from '../../utils/formatters';

export default function ProductDetailsScreen({ route, navigation }) {
  const { addToCart } = useCart();
  const { productId } = route.params || {};
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [detail, allProducts] = await Promise.all([getSingleProduct(productId), getAllProducts()]);
        setProduct(detail);
        setRelated(allProducts.filter((item) => item.category === detail.category && item.id !== detail.id).slice(0, 4));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [productId]);

  const totalPrice = useMemo(() => Number(product?.price || 0) * quantity, [product, quantity]);

  if (loading || !product) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <ScreenHeader title="Product details" subtitle="Review the item before adding it to your cart." />
      <View style={styles.imageCard}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
      </View>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.title}>{product.title}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>
        <Text style={styles.rating}>Rating {product.rating?.rate || '4.5'} ({product.rating?.count || 0})</Text>
      </View>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.quantityCard}>
        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.stepper}>
          <Pressable onPress={() => setQuantity((value) => Math.max(1, value - 1))} style={styles.stepButton}>
            <Text style={styles.stepText}>-</Text>
          </Pressable>
          <Text style={styles.qty}>{quantity}</Text>
          <Pressable onPress={() => setQuantity((value) => value + 1)} style={styles.stepButton}>
            <Text style={styles.stepText}>+</Text>
          </Pressable>
        </View>
      </View>
      <CustomButton title={`Add to Cart - ${formatCurrency(totalPrice)}`} onPress={() => addToCart(product, quantity)} />
      {related.length > 0 ? (
        <View style={styles.related}>
          <Text style={styles.sectionTitle}>Related products</Text>
          <View style={styles.relatedGrid}>
            {related.map((item) => (
              <View key={item.id} style={styles.relatedItem}>
                <ProductCard
                  product={item}
                  onPress={() => navigation.push('ProductDetails', { productId: item.id })}
                  onAdd={() => addToCart(item)}
                />
              </View>
            ))}
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 14,
  },
  imageCard: {
    height: 310,
    borderRadius: 18,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  category: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 31,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  price: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '900',
  },
  rating: {
    color: colors.warning,
    fontWeight: '800',
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
  },
  quantityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
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
    width: 42,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceSoft,
  },
  stepText: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '900',
  },
  qty: {
    minWidth: 42,
    textAlign: 'center',
    color: colors.text,
    fontWeight: '900',
  },
  related: {
    gap: 12,
    marginTop: 10,
  },
  relatedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  relatedItem: {
    width: '48%',
  },
});
