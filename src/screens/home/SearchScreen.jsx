import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import ProductCard from '../../components/product/ProductCard';
import Loader from '../../components/ui/Loader';
import ScreenHeader from '../../components/ui/ScreenHeader';
import EmptyState from '../../components/ui/EmptyState';
import useCart from '../../hooks/useCart';
import { getAllProducts } from '../../services/productService';
import colors from '../../theme/colors';

export default function SearchScreen({ navigation }) {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const results = useMemo(() => {
    const clean = query.trim().toLowerCase();
    if (!clean) {
      return products;
    }
    return products.filter((product) => `${product.title} ${product.category}`.toLowerCase().includes(clean));
  }, [products, query]);

  if (loading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <ScreenHeader title="Search catalog" subtitle="Find products by title or category." />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Type product name or category"
          placeholderTextColor={colors.muted}
          style={styles.search}
          autoFocus
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <EmptyState title="No matching products" message="Your search will update as you type." />
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
  header: {
    padding: 16,
    gap: 12,
  },
  search: {
    minHeight: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
    color: colors.text,
    fontSize: 15,
  },
  content: {
    padding: 16,
    paddingTop: 0,
    paddingBottom: 96,
  },
  productRow: {
    gap: 12,
    marginBottom: 12,
  },
});
