import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { CheckCircle, Package } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<CartStackParamList>;
  route: { params: { orderId: string } };
}

export const ConfirmationScreen: React.FC<Props> = ({ navigation, route }) => {
  const { orderId } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <CheckCircle size={48} color={theme.colors.success} strokeWidth={2} />
        </View>
        <Text variant="h2" style={styles.title}>
          Order Placed
        </Text>
        <Text variant="body" color="secondary" style={styles.description}>
          Your order has been confirmed and is being processed.
        </Text>
        <View style={styles.orderIdContainer}>
          <Text variant="caption" color="secondary">Order ID</Text>
          <Text variant="body" color="primary">{orderId}</Text>
        </View>
        <View style={styles.actions}>
          <Button
            title="View Orders"
            onPress={() => {
              navigation.getParent()?.navigate('OrdersTab', { screen: 'OrdersMain' });
            }}
            style={styles.fullWidthButton}
            size="lg"
          />
          <Button
            title="Continue Shopping"
            onPress={() => {
              navigation.getParent()?.navigate('HomeTab', { screen: 'HomeMain' });
            }}
            variant="outline"
            style={styles.fullWidthButton}
            size="lg"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  iconContainer: {
    marginBottom: theme.spacing.lg,
  },
  title: {
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  description: {
    maxWidth: 300,
    marginBottom: theme.spacing.xl,
    textAlign: 'center',
  },
  orderIdContainer: {
    alignItems: 'center',
    gap: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.xxl,
  },
  actions: {
    width: '100%',
    gap: theme.spacing.md,
  },
  fullWidthButton: {
    width: '100%',
  },
});
