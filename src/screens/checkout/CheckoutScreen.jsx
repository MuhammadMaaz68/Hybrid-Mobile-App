import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Toast from 'react-native-toast-message';
import CustomButton from '../../components/ui/CustomButton';
import CustomInput from '../../components/ui/CustomInput';
import ScreenHeader from '../../components/ui/ScreenHeader';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import colors from '../../theme/colors';
import { PAYMENT_METHODS } from '../../utils/constants';
import { buildOrderId } from '../../utils/helpers';
import { formatCurrency } from '../../utils/formatters';

export default function CheckoutScreen({ navigation }) {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const [shipping, setShipping] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const updateField = (key, value) => {
    setShipping((current) => ({ ...current, [key]: value }));
  };

  const placeOrder = () => {
    const nextErrors = {
      name: shipping.name.trim() ? '' : 'Name required',
      phone: shipping.phone.trim().length >= 7 ? '' : 'Phone required',
      address: shipping.address.trim() ? '' : 'Address required',
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.phone || nextErrors.address) {
      return;
    }
    if (cartItems.length === 0) {
      Alert.alert('Cart empty', 'Add products before checkout.');
      return;
    }
    setLoading(true);
    const order = {
      id: buildOrderId(),
      items: cartItems,
      total: cartTotal,
      paymentMethod,
      shipping,
      createdAt: new Date().toISOString(),
    };
    setTimeout(() => {
      addOrder(order);
      clearCart();
      setLoading(false);
      Toast.show({ type: 'success', text1: 'Order placed', text2: `Order ${order.id} confirmed.` });
      navigation.replace('Receipt', { order });
    }, 650);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Checkout" subtitle="Confirm shipping, payment, and order details." />
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order summary</Text>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.summaryRow}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.quantity} x {item.title}
              </Text>
              <Text style={styles.itemPrice}>{formatCurrency(item.price * item.quantity)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.total}>{formatCurrency(cartTotal)}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Shipping info</Text>
          <CustomInput label="Full Name" value={shipping.name} onChangeText={(value) => updateField('name', value)} error={errors.name} />
          <CustomInput
            label="Phone"
            value={shipping.phone}
            onChangeText={(value) => updateField('phone', value)}
            keyboardType="phone-pad"
            error={errors.phone}
          />
          <CustomInput
            label="Address"
            value={shipping.address}
            onChangeText={(value) => updateField('address', value)}
            multiline
            error={errors.address}
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.paymentRow}>
            {PAYMENT_METHODS.map((method) => (
              <Pressable
                key={method}
                onPress={() => setPaymentMethod(method)}
                style={[styles.paymentChip, paymentMethod === method && styles.paymentChipActive]}
              >
                <Text style={[styles.paymentText, paymentMethod === method && styles.paymentTextActive]}>{method}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <CustomButton title="Place Order" loading={loading} onPress={placeOrder} />
      </ScrollView>
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
    paddingBottom: 40,
    gap: 14,
  },
  card: {
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 14,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  itemName: {
    flex: 1,
    color: colors.muted,
    fontWeight: '700',
  },
  itemPrice: {
    color: colors.text,
    fontWeight: '900',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  totalLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  total: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  paymentRow: {
    flexDirection: 'row',
    gap: 10,
  },
  paymentChip: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    paddingVertical: 12,
  },
  paymentChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  paymentText: {
    color: colors.muted,
    fontWeight: '900',
  },
  paymentTextActive: {
    color: colors.white,
  },
});
