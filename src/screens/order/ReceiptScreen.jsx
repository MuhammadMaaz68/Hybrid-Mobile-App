import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/ui/CustomButton';
import BrandLogo from '../../components/ui/BrandLogo';
import colors from '../../theme/colors';
import { formatCurrency, formatDateTime } from '../../utils/formatters';

export default function ReceiptScreen({ route, navigation }) {
  const { order } = route.params || {};

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.success}>
          <BrandLogo centered />
          <View style={styles.checkCircle}>
            <Text style={styles.check}>OK</Text>
          </View>
          <Text style={styles.title}>Order confirmed</Text>
          <Text style={styles.subtitle}>Your order has been placed successfully.</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Order ID</Text>
            <Text style={styles.value}>{order?.id}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{formatDateTime(order?.createdAt ? new Date(order.createdAt) : new Date())}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Payment</Text>
            <Text style={styles.value}>{order?.paymentMethod}</Text>
          </View>
        </View>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Purchased items</Text>
          {order?.items?.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.quantity} x {item.title}
              </Text>
              <Text style={styles.value}>{formatCurrency(item.price * item.quantity)}</Text>
            </View>
          ))}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total amount</Text>
            <Text style={styles.total}>{formatCurrency(order?.total)}</Text>
          </View>
        </View>
        <CustomButton title="Continue Shopping" onPress={() => navigation.replace('MainTabs')} />
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
  success: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 26,
  },
  checkCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.success,
  },
  check: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '900',
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 21,
  },
  card: {
    gap: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  label: {
    color: colors.muted,
    fontWeight: '700',
  },
  value: {
    color: colors.text,
    fontWeight: '900',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  itemName: {
    flex: 1,
    color: colors.muted,
    fontWeight: '700',
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
});
