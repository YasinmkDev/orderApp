import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { LoadingState } from '../../components/ui/LoadingState';
import { useCartStore } from '../../store/cart';
import { useAuthStore } from '../../store/auth';
import { ordersService, paymentsService } from '../../services';
import { ArrowLeft, MapPin, CreditCard, CheckCircle, ChevronRight } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<CartStackParamList>;
}

type Step = 'address' | 'payment' | 'review';

const STEPS: { key: Step; label: string; icon: React.ReactNode }[] = [
  { key: 'address', label: 'Address', icon: <MapPin size={18} color={theme.colors.primary} /> },
  { key: 'payment', label: 'Payment', icon: <CreditCard size={18} color={theme.colors.primary} /> },
  { key: 'review', label: 'Review', icon: <CheckCircle size={18} color={theme.colors.primary} /> },
];

export const CheckoutScreen: React.FC<Props> = ({ navigation }) => {
  const [step, setStep] = useState<Step>('address');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Address state
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

  const items = useCartStore(s => s.items);
  const getSubtotal = useCartStore(s => s.getSubtotal);
  const getTax = useCartStore(s => s.getTax);
  const getTotal = useCartStore(s => s.getTotal);
  const clearCart = useCartStore(s => s.clearCart);
  const userId = useAuthStore(s => s.userId);

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  const currentStepIndex = STEPS.findIndex(s => s.key === step);

  const canProceed = useCallback(() => {
    if (step === 'address') return address.trim().length > 0 && city.trim().length > 0;
    return true;
  }, [step, address, city]);

  const handleNext = useCallback(() => {
    if (step === 'address') setStep('payment');
    else if (step === 'payment') setStep('review');
  }, [step]);

  const handleBack = useCallback(() => {
    if (step === 'payment') setStep('address');
    else if (step === 'review') setStep('payment');
    else navigation.goBack();
  }, [step, navigation]);

  const handlePlaceOrder = useCallback(async () => {
    if (!userId) return;
    setIsSubmitting(true);
    try {
      const order = await ordersService.addNewOrder({
        customerId: userId,
        branchId: '1',
        notes: `Deliver to: ${address}, ${city} ${zipCode}`,
      });

      for (const item of items) {
        await ordersService.addOrderLine({
          orderId: order.id,
          itemId: item.item.id,
          quantity: item.quantity,
          price: item.item.price,
        });
      }

      if (paymentMethod === 'cash') {
        await paymentsService.addCashPayment({ orderId: order.id, amount: total });
      } else {
        await paymentsService.addCardPayment({ orderId: order.id, amount: total });
      }

      await paymentsService.finishOrder(order.id);
      clearCart();
      navigation.navigate('CheckoutConfirmation', { orderId: order.id });
    } catch (err) {
      Alert.alert('Order Failed', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [userId, items, address, city, zipCode, paymentMethod, total, clearCart, navigation]);

  if (isSubmitting) {
    return <LoadingState fullScreen message="Placing your order..." />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <ArrowLeft size={22} color={theme.colors.text} />
        </TouchableOpacity>
        <Text variant="h3">Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Step Indicator */}
      <View style={styles.stepIndicator}>
        {STEPS.map((s, i) => (
          <React.Fragment key={s.key}>
            <View style={styles.stepItem}>
              <View style={[
                styles.stepCircle,
                i <= currentStepIndex && styles.stepCircleActive,
                i < currentStepIndex && styles.stepCircleCompleted,
              ]}>
                {i < currentStepIndex ? (
                  <CheckCircle size={18} color="#FFF" />
                ) : (
                  <Text variant="caption" style={{ color: i <= currentStepIndex ? '#FFF' : theme.colors.textTertiary }}>
                    {i + 1}
                  </Text>
                )}
              </View>
              <Text variant="caption" color={i <= currentStepIndex ? 'primary' : 'tertiary'}>
                {s.label}
              </Text>
            </View>
            {i < STEPS.length - 1 && (
              <View style={[styles.stepLine, i < currentStepIndex && styles.stepLineActive]} />
            )}
          </React.Fragment>
        ))}
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {step === 'address' && (
          <View style={styles.stepContent}>
            <Text variant="h2" style={styles.stepTitle}>Delivery Address</Text>
            <Text variant="body" color="secondary" style={styles.stepSubtitle}>
              Where should we deliver your order?
            </Text>
            <Input
              label="Street Address"
              placeholder="123 Main Street, Apt 4"
              value={address}
              onChangeText={setAddress}
            />
            <View style={styles.row}>
              <View style={styles.half}>
                <Input
                  label="City"
                  placeholder="City"
                  value={city}
                  onChangeText={setCity}
                />
              </View>
              <View style={styles.half}>
                <Input
                  label="ZIP Code"
                  placeholder="12345"
                  value={zipCode}
                  onChangeText={setZipCode}
                  keyboardType="numeric"
                />
              </View>
            </View>
          </View>
        )}

        {step === 'payment' && (
          <View style={styles.stepContent}>
            <Text variant="h2" style={styles.stepTitle}>Payment Method</Text>
            <Text variant="body" color="secondary" style={styles.stepSubtitle}>
              Choose how you'd like to pay
            </Text>
            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'cash' && styles.paymentOptionActive]}
              onPress={() => setPaymentMethod('cash')}
              activeOpacity={0.7}
            >
              <View style={styles.paymentLeft}>
                <View style={[styles.paymentIcon, paymentMethod === 'cash' && styles.paymentIconActive]}>
                  <Text variant="h3" color={paymentMethod === 'cash' ? 'primary' : 'secondary'}>$</Text>
                </View>
                <View>
                  <Text variant="body" weight="medium">Cash on Delivery</Text>
                  <Text variant="caption" color="secondary">Pay when your order arrives</Text>
                </View>
              </View>
              <View style={[styles.radio, paymentMethod === 'cash' && styles.radioActive]}>
                {paymentMethod === 'cash' && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.paymentOption, paymentMethod === 'card' && styles.paymentOptionActive]}
              onPress={() => setPaymentMethod('card')}
              activeOpacity={0.7}
            >
              <View style={styles.paymentLeft}>
                <View style={[styles.paymentIcon, paymentMethod === 'card' && styles.paymentIconActive]}>
                  <CreditCard size={20} color={paymentMethod === 'card' ? theme.colors.primary : theme.colors.textSecondary} />
                </View>
                <View>
                  <Text variant="body" weight="medium">Card Payment</Text>
                  <Text variant="caption" color="secondary">Pay with credit or debit card</Text>
                </View>
              </View>
              <View style={[styles.radio, paymentMethod === 'card' && styles.radioActive]}>
                {paymentMethod === 'card' && <View style={styles.radioDot} />}
              </View>
            </TouchableOpacity>
          </View>
        )}

        {step === 'review' && (
          <View style={styles.stepContent}>
            <Text variant="h2" style={styles.stepTitle}>Review Order</Text>
            <Text variant="body" color="secondary" style={styles.stepSubtitle}>
              Confirm your order details
            </Text>

            {/* Delivery Info */}
            <Card padding="md" style={styles.reviewCard}>
              <View style={styles.reviewCardHeader}>
                <MapPin size={16} color={theme.colors.primary} />
                <Text variant="caption" weight="medium">Delivery Address</Text>
                <TouchableOpacity onPress={() => setStep('address')}>
                  <Text variant="caption" color="primary">Edit</Text>
                </TouchableOpacity>
              </View>
              <Text variant="body" color="secondary">{address}, {city} {zipCode}</Text>
            </Card>

            {/* Payment Info */}
            <Card padding="md" style={styles.reviewCard}>
              <View style={styles.reviewCardHeader}>
                <CreditCard size={16} color={theme.colors.primary} />
                <Text variant="caption" weight="medium">Payment</Text>
                <TouchableOpacity onPress={() => setStep('payment')}>
                  <Text variant="caption" color="primary">Edit</Text>
                </TouchableOpacity>
              </View>
              <Text variant="body" color="secondary">
                {paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card Payment'}
              </Text>
            </Card>

            {/* Items */}
            <Card padding="md" style={styles.reviewCard}>
              <Text variant="caption" weight="medium" style={{ marginBottom: theme.spacing.md }}>Order Items</Text>
              {items.map(item => (
                <View key={item.item.id} style={styles.reviewItem}>
                  <Text variant="body" numberOfLines={1} style={{ flex: 1 }}>
                    {item.quantity}x {item.item.name}
                  </Text>
                  <Text variant="body" weight="medium">${(item.item.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}
            </Card>

            {/* Totals */}
            <Card padding="md" style={styles.reviewCard}>
              <View style={styles.reviewItem}>
                <Text variant="body" color="secondary">Subtotal</Text>
                <Text variant="body">${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.reviewItem}>
                <Text variant="body" color="secondary">Tax</Text>
                <Text variant="body">${tax.toFixed(2)}</Text>
              </View>
              <View style={[styles.reviewItem, { marginTop: theme.spacing.sm, paddingTop: theme.spacing.sm, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: theme.colors.border }]}>
                <Text variant="h3" weight="semibold">Total</Text>
                <Text variant="h3" weight="semibold" color="primary">${total.toFixed(2)}</Text>
              </View>
            </Card>
          </View>
        )}
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomBar}>
        <Button
          title={step === 'review' ? `Place Order  ·  $${total.toFixed(2)}` : 'Continue'}
          onPress={step === 'review' ? handlePlaceOrder : handleNext}
          style={styles.fullWidthButton}
          size="lg"
          disabled={!canProceed()}
          loading={isSubmitting}
        />
      </View>
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
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    gap: theme.spacing.xs,
  },
  stepItem: {
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: theme.colors.primary,
  },
  stepCircleCompleted: {
    backgroundColor: theme.colors.success,
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.xxl,
  },
  stepLineActive: {
    backgroundColor: theme.colors.success,
  },
  container: { flex: 1 },
  stepContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 120,
  },
  stepTitle: {
    marginBottom: theme.spacing.xs,
  },
  stepSubtitle: {
    marginBottom: theme.spacing.xl,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  half: { flex: 1 },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
  },
  paymentOptionActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentIconActive: {
    backgroundColor: '#FFFFFF',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: theme.colors.primary,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.primary,
  },
  reviewCard: {
    marginBottom: theme.spacing.md,
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xs,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: theme.colors.border,
  },
  fullWidthButton: {
    width: '100%',
  },
});
