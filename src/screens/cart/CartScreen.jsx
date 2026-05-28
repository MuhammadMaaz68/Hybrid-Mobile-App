import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CartItem from '../../components/cart/CartItem';
import CustomButton from '../../components/ui/CustomButton';
import ScreenHeader from '../../components/ui/ScreenHeader';
import EmptyState from '../../components/ui/EmptyState';
import useCart from '../../hooks/useCart';
import colors from '../../theme/colors';
import { formatCurrency } from '../../utils/formatters';

export default function CartScreen({ navigation }) {
  const { cartItems, cartTotal, cartCount, increaseQty, decreaseQty, removeFromCart } = useCart();
  const insets = useSafeAreaInsets();
  const bottomOffset = Math.max(insets.bottom, 24);

  return (
    <SafeAreaView style={styles.screen}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={[styles.content, { paddingBottom: cartItems.length > 0 ? 150 + bottomOffset : 120 }]}
        ListHeaderComponent={
          <ScreenHeader title="Your CoCart" subtitle={`${cartCount} item(s) ready for checkout`} />
        }
        ListEmptyComponent={
          <EmptyState title="Your cart is empty" message="Add items from Home.">
            <CustomButton title="Continue Shopping" onPress={() => navigation.navigate('Home')} />
          </EmptyState>
        }
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() => increaseQty(item.id)}
            onDecrease={() => decreaseQty(item.id)}
            onRemove={() => removeFromCart(item.id)}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {cartItems.length > 0 ? (
        <View style={[styles.summary, { paddingBottom: bottomOffset }]}>
          <View>
            <Text style={styles.summaryLabel}>Total</Text>
            <Text style={styles.total}>{formatCurrency(cartTotal)}</Text>
          </View>
          <CustomButton title="Checkout" onPress={() => navigation.navigate('Checkout')} style={styles.checkout} />
        </View>
      ) : null}
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
  },
  separator: {
    height: 12,
  },
  summary: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
    padding: 16,
    gap: 14,
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  total: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
  },
  checkout: {
    minWidth: 150,
  },
});
