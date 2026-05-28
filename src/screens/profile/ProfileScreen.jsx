import React, { useEffect, useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../components/ui/CustomButton';
import CustomInput from '../../components/ui/CustomInput';
import ScreenHeader from '../../components/ui/ScreenHeader';
import EmptyState from '../../components/ui/EmptyState';
import useAuth from '../../hooks/useAuth';
import useCart from '../../hooks/useCart';
import colors from '../../theme/colors';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import { isEmail } from '../../utils/helpers';

export default function ProfileScreen() {
  const { user, logout, updateProfile, orderHistory } = useAuth();
  const { cartCount, cartTotal, clearCart } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setProfile({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
  }, [user]);

  const handleLogout = () => {
    clearCart();
    logout();
  };

  const updateField = (key, value) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const saveProfile = () => {
    const nextErrors = {
      name: profile.name.trim() ? '' : 'Name required',
      email: isEmail(profile.email) ? '' : 'Valid email required',
      phone: profile.phone.trim().length >= 7 ? '' : 'Phone required',
      address: profile.address.trim() ? '' : 'Address required',
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.email || nextErrors.phone || nextErrors.address) {
      return;
    }
    updateProfile(profile);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setProfile({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="Profile" subtitle="Manage your CoCart session." />
        <View style={styles.card}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user?.name?.charAt(0)?.toUpperCase() || 'S'}</Text>
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          {user?.isGuest ? <Text style={styles.guest}>Guest mode</Text> : null}
          {user?.isDemo ? <Text style={styles.demo}>Demo account</Text> : null}
        </View>
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Profile information</Text>
            <Pressable onPress={() => (isEditing ? cancelEdit() : setIsEditing(true))}>
              <Text style={styles.linkText}>{isEditing ? 'Cancel' : 'Edit'}</Text>
            </Pressable>
          </View>
          <CustomInput label="Full Name" value={profile.name} onChangeText={(value) => updateField('name', value)} editable={isEditing} error={errors.name} />
          <CustomInput label="Email" value={profile.email} onChangeText={(value) => updateField('email', value)} editable={isEditing} keyboardType="email-address" error={errors.email} />
          <CustomInput label="Phone" value={profile.phone} onChangeText={(value) => updateField('phone', value)} editable={isEditing} keyboardType="phone-pad" error={errors.phone} />
          <CustomInput label="Address" value={profile.address} onChangeText={(value) => updateField('address', value)} editable={isEditing} multiline error={errors.address} />
          {isEditing ? <CustomButton title="Save Profile" onPress={saveProfile} /> : null}
        </View>
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{cartCount}</Text>
            <Text style={styles.statLabel}>Cart items</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatCurrency(cartTotal)}</Text>
            <Text style={styles.statLabel}>Cart total</Text>
          </View>
        </View>
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Order history</Text>
          {orderHistory.length === 0 ? (
            <EmptyState title="No orders yet" message="Placed orders will appear here after checkout." />
          ) : (
            orderHistory.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderTop}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderTotal}>{formatCurrency(order.total)}</Text>
                </View>
                <Text style={styles.orderMeta}>
                  {formatDateTime(new Date(order.createdAt))} - {order.paymentMethod}
                </Text>
                <Text style={styles.orderMeta}>{order.items.length} product(s)</Text>
              </View>
            ))
          )}
        </View>
        <CustomButton title="Logout" variant="secondary" onPress={handleLogout} />
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
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 22,
    gap: 8,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  avatarText: {
    color: colors.white,
    fontSize: 30,
    fontWeight: '900',
  },
  name: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  email: {
    color: colors.muted,
    fontWeight: '700',
  },
  guest: {
    color: colors.warning,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  demo: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  sectionCard: {
    gap: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  linkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '900',
  },
  stats: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    padding: 14,
    gap: 4,
  },
  statValue: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  statLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
  orderCard: {
    gap: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    padding: 12,
  },
  orderTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  orderId: {
    flex: 1,
    color: colors.text,
    fontWeight: '900',
  },
  orderTotal: {
    color: colors.primary,
    fontWeight: '900',
  },
  orderMeta: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
  },
});
