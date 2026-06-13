import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { LoadingState } from '../../components/ui/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState';
import { useOrders } from '../../hooks';
import { ClipboardList, ChevronRight } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { OrdersStackParamList } from '../../navigation/types';
import { OrderStatus } from '../../types';

interface Props {
  navigation: NativeStackNavigationProp<OrdersStackParamList>;
}

const statusVariant: Record<OrderStatus, 'default' | 'warning' | 'primary' | 'success' | 'danger'> = {
  Pending: 'warning',
  Processing: 'primary',
  Shipped: 'default',
  Delivered: 'success',
  Cancelled: 'danger',
};

export const OrdersScreen: React.FC<Props> = ({ navigation }) => {
  const { data: orders, isLoading } = useOrders();

  if (isLoading) return <LoadingState fullScreen message="Loading orders..." />;

  if (!orders || orders.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text variant="h2">Orders</Text>
        </View>
        <EmptyState
          icon={<ClipboardList size={32} color={theme.colors.textTertiary} />}
          title="No orders yet"
          description="Your order history will appear here"
          action={{ label: 'Start shopping', onPress: () => navigation.getParent()?.navigate('HomeTab') }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Text variant="h2">Orders</Text>
        <Text variant="body" color="secondary">{orders.length} orders</Text>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.orderList}>
          {orders.map(order => (
            <TouchableOpacity
              key={order.id}
              onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
              activeOpacity={0.75}
            >
              <Card padding="md">
                <View style={styles.orderHeader}>
                  <View>
                    <Text variant="caption" color="secondary">#{order.orderNumber || order.id.slice(0, 8)}</Text>
                    <Text variant="bodySmall">{order.date ? new Date(order.date).toLocaleDateString() : 'Recent'}</Text>
                  </View>
                  <Badge label={order.status} variant={statusVariant[order.status] || 'default'} size="sm" />
                </View>
                <View style={styles.orderFooter}>
                  <Text variant="body" color="secondary">
                    {order.lines?.length || 0} item{(order.lines?.length || 0) !== 1 ? 's' : ''}
                  </Text>
                  <View style={styles.orderTotal}>
                    <Text variant="body" weight="medium" color="primary">${order.total.toFixed(2)}</Text>
                    <ChevronRight size={16} color={theme.colors.textTertiary} />
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  container: { flex: 1 },
  orderList: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.md,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  orderTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  bottomPadding: { height: 40 },
});
