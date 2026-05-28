import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import ProductCard from '../../components/product/ProductCard';
import Loader from '../../components/ui/Loader';
import CustomButton from '../../components/ui/CustomButton';
import ScreenHeader from '../../components/ui/ScreenHeader';
import EmptyState from '../../components/ui/EmptyState';
import useCart from '../../hooks/useCart';
import { getAllProducts, getCategories } from '../../services/productService';
import colors from '../../theme/colors';
import { CATEGORY_ALL } from '../../utils/constants';

export default function HomeScreen({ navigation }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(CATEGORY_ALL);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadProducts = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError('');
      const [productData, categoryData] = await Promise.all([getAllProducts(), getCategories()]);
      setProducts(productData);
      setCategories([CATEGORY_ALL, ...categoryData]);
    } catch (err) {
      setError('Unable to load products. Check your connection and try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === CATEGORY_ALL || product.category === selectedCategory;
      const text = `${product.title} ${product.category}`.toLowerCase();
      return matchesCategory && text.includes(query.trim().toLowerCase());
    });
  }, [products, selectedCategory, query]);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => loadProducts(true)} tintColor={colors.primary} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenHeader title="Discover products" subtitle="Search, filter, and add items to your cart." />
            <TextInput
              value={query}
              onChangeText={setQuery}
              placeholder="Search products"
              placeholderTextColor={colors.muted}
              style={styles.search}
            />
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => setSelectedCategory(item)}
                  style={[styles.chip, selectedCategory === item && styles.chipActive]}
                >
                  <Text style={[styles.chipText, selectedCategory === item && styles.chipTextActive]} numberOfLines={1}>
                    {item === CATEGORY_ALL ? 'All' : item}
                  </Text>
                </Pressable>
              )}
            />
            {error ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{error}</Text>
                <CustomButton title="Retry" onPress={() => loadProducts()} style={styles.retryButton} />
              </View>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          <EmptyState title="No products found" message="Try a different search or category." />
        }
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
            onAdd={() => addToCart(item)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 96,
  },
  header: {
    gap: 14,
    marginBottom: 14,
  },
  search: {
    minHeight: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 15,
  },
  categories: {
    gap: 8,
  },
  chip: {
    maxWidth: 160,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  chipTextActive: {
    color: colors.white,
  },
  productRow: {
    gap: 12,
    marginBottom: 12,
  },
  errorBox: {
    gap: 10,
    borderRadius: 14,
    backgroundColor: '#FFF4F2',
    padding: 14,
  },
  errorText: {
    color: colors.danger,
    fontWeight: '700',
  },
  retryButton: {
    minHeight: 42,
  },
});
