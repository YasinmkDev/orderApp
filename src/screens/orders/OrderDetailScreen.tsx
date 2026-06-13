import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LoadingState } from '../../components/ui/LoadingState';
import { useOrders } from '../../hooks';
import { ArrowLeft, MapPin, CreditCard, Package } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OrdersStackParamList } from '../../navigation/types';
import { OrderStatus } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<OrdersStackParamList>;
  route: { params: { orderId: string } };
}

const statusVariant: Record<OrderStatus, 'default' | 'warning' | 'primary' | 'success' | 'danger'> = {
  Pending: 'warning',
  Processing: 'primary',
  Shipped: 'default',
  Delivered: 'success',
  Cancelled: 'danger',
};

export const OrderDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { orderId } = route.params;
  const { data: orders, isLoading } = useOrders();
  const order = orders?.find(o => o.id === orderId);

  if (isLoading) return <LoadingState fullScreen message="Loading order..." />;

  if (!order) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.center}>
          <Text variant="body" color="secondary">Order not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <Text variant="h3">Order Details</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Card padding="lg" style={styles.statusCard}>
          <View style={styles.statusRow}>
            <View style={styles.statusLeft}>
              <Package size={20} color={theme.colors.textSecondary} />
              <View>
                <Text variant="body">Order #{order.orderNumber || order.id.slice(0, 8)}</Text>
                <Text variant="caption" color="secondary">
                  {order.date ? new Date(order.date).toLocaleDateString() : 'Recent'}
                </Text>
              </View>
            </View>
            <Badge label={order.status} variant={statusVariant[order.status] || 'default'} size="sm" />
          </View>
        </Card>

        {order.deliveryAddress && (
          <Card padding="md" style={styles.section}>
            <View style={styles.sectionHeader}>
              <MapPin size={16} color={theme.colors.textSecondary} />
              <Text variant="caption" color="secondary">Delivery Address</Text>
            </View>
            <Text variant="body" color="secondary">
              {order.deliveryAddress.address}, {order.deliveryAddress.city}
            </Text>
          </Card>
        )}

        <Card padding="md" style={styles.section}>
          <Text variant="caption" color="secondary" style={styles.sectionLabel}>Items</Text>
          {order.lines?.map(line => (
            <View key={line.id} style={styles.lineItem}>
              <View style={styles.lineInfo}>
                <Text variant="body" numberOfLines={1} style={styles.lineName}>
                  {line.quantity}x {line.itemName}
                </Text>
                <Text variant="body" weight="medium">${line.total.toFixed(2)}</Text>
              </View>
            </View>
          ))}
        </Card>

        <Card padding="md" style={styles.section}>
          <View style={styles.totalRow}>
            <Text variant="body" color="secondary">Subtotal</Text>
            <Text variant="body">${order.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text variant="body" color="secondary">Tax</Text>
            <Text variant="body">${order.tax.toFixed(2)}</Text>
          </View>
          {order.discount > 0 && (
            <View style={styles.totalRow}>
              <Text variant="body" color="success">Discount</Text>
              <Text variant="body" color="success">-${order.discount.toFixed(2)}</Text>
            </View>
          )}
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text variant="body" weight="semibold">Total</Text>
            <Text variant="body" weight="semibold" color="primary">${order.total.toFixed(2)}</Text>
          </View>
        </Card>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerSpacer: { width: 40 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  container: { flex: 1, paddingHorizontal: theme.spacing.lg },
  statusCard: { marginBottom: theme.spacing.md },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  section: { marginBottom: theme.spacing.md },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  sectionLabel: {
    marginBottom: theme.spacing.md,
  },
  lineItem: {
    paddingVertical: theme.spacing.xs,
  },
  lineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  lineName: {
    flex: 1,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  grandTotal: {
    marginTop: theme.spacing.sm,
    paddingTop: theme.spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
    marginBottom: 0,
  },
  bottomPadding: { height: 40 },
});
