import React, { useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Text as RNText,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
  FadeInDown,
  FadeOut,
  Layout,
  SlideInRight,
} from 'react-native-reanimated';
import { theme, colors, spacing, borderRadius, shadows, springs } from '../../theme';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { QuantitySelector } from '../../components/ui/QuantitySelector';
import { EmptyState } from '../../components/ui/EmptyState';
import { OrderItemSkeleton } from '../../components/ui/Skeleton';
import { useCartStore } from '../../store/cart';
import { Image } from 'expo-image';
import { ShoppingBag, Trash2, Minus, Plus, ChevronRight, Tag, Truck, Shield } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CartStackParamList } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<CartStackParamList>;
}

// Cart Item Component
const CartItem: React.FC<{
  item: { item: any; quantity: number };
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
  index: number;
}> = ({ item, onIncrease, onDecrease, onRemove, index }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const itemTotal = item.item.price * item.quantity;

  return (
    <Animated.View
      entering={SlideInRight.delay(index * 100).springify()}
      exiting={FadeOut}
      layout={Layout.springify()}
      style={styles.cartItem}
    >
      {/* Image */}
      <Animated.View style={[styles.itemImageWrapper, animatedStyle]}>
        {item.item.image ? (
          <Image source={{ uri: item.item.image }} style={styles.itemImage} contentFit="cover" transition={200} />
        ) : (
          <View style={styles.itemImagePlaceholder}>
            <ShoppingBag size={24} color={colors.textTertiary} />
          </View>
        )}
      </Animated.View>

      {/* Details */}
      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <View style={{ flex: 1 }}>
            <Text variant="titleMedium" numberOfLines={2}>
              {item.item.name}
            </Text>
            {item.item.categoryName && (
              <Text variant="caption" color="secondary" style={{ marginTop: spacing.xxs }}>
                {item.item.categoryName}
              </Text>
            )}
          </View>
          <Pressable onPress={onRemove} hitSlop={8}>
            <Trash2 size={18} color={colors.textTertiary} />
          </Pressable>
        </View>

        {/* Price and Quantity */}
        <View style={styles.itemFooter}>
          <View style={styles.quantityControl}>
            <Pressable
              onPress={onDecrease}
              style={styles.quantityButton}
              hitSlop={8}
            >
              <Minus size={16} color={colors.text} />
            </Pressable>
            <RNText style={styles.quantityText}>{item.quantity}</RNText>
            <Pressable
              onPress={onIncrease}
              style={[styles.quantityButton, styles.quantityButtonActive]}
              hitSlop={8}
            >
              <Plus size={16} color={colors.black} />
            </Pressable>
          </View>
          <Text variant="price" color="brand">
            ${itemTotal.toFixed(2)}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export const CartScreen: React.FC<Props> = ({ navigation }) => {
  const items = useCartStore(s => s.items);
  const updateQuantity = useCartStore(s => s.updateQuantity);
  const removeItem = useCartStore(s => s.removeItem);
  const clearCart = useCartStore(s => s.clearCart);
  const getSubtotal = useCartStore(s => s.getSubtotal);
  const getTax = useCartStore(s => s.getTax);
  const getTotal = useCartStore(s => s.getTotal);

  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();
  const savings = items.length > 0 ? subtotal * 0.05 : 0;
  const deliveryFee = items.length > 0 ? 4.99 : 0;
  const finalTotal = total + deliveryFee - savings;

  const handleCheckout = useCallback(() => {
    navigation.navigate('Checkout');
  }, [navigation]);

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.header}>
          <Text variant="display">Your Cart</Text>
        </View>
        <EmptyState
          icon={<ShoppingBag size={48} color={colors.textTertiary} />}
          title="Your cart is empty"
          description="Start adding some amazing products!"
          action={{
            label: 'Browse products',
            onPress: () => navigation.getParent()?.navigate('HomeTab'),
          }}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <Animated.View entering={FadeIn} style={styles.header}>
        <View>
          <Text variant="display">Your Cart</Text>
          <Text variant="caption" color="secondary">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </Text>
        </View>
        <Pressable onPress={clearCart} hitSlop={8}>
          <Text variant="captionMedium" color="error">Clear all</Text>
        </Pressable>
      </Animated.View>

      {/* Cart Items */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Items List */}
        <View style={styles.itemsList}>
          {items.map((cartItem, index) => (
            <CartItem
              key={cartItem.item.id}
              item={cartItem}
              index={index}
              onIncrease={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
              onDecrease={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
              onRemove={() => removeItem(cartItem.item.id)}
            />
          ))}
        </View>

        {/* Promo Code */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.promoCard}>
          <View style={styles.promoContent}>
            <View style={styles.promoIcon}>
              <Tag size={18} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text variant="body" weight="medium">Have a promo code?</Text>
              <Text variant="caption" color="tertiary">Enter code for discounts</Text>
            </View>
            <ChevronRight size={20} color={colors.textTertiary} />
          </View>
        </Animated.View>

        {/* Order Summary */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.summary}>
          <Text variant="heading" style={{ marginBottom: spacing.lg }}>
            Order Summary
          </Text>

          {/* Subtotal */}
          <View style={styles.summaryRow}>
            <Text variant="body" color="secondary">Subtotal</Text>
            <Text variant="body">${subtotal.toFixed(2)}</Text>
          </View>

          {/* Tax */}
          <View style={styles.summaryRow}>
            <Text variant="body" color="secondary">Tax</Text>
            <Text variant="body">${tax.toFixed(2)}</Text>
          </View>

          {/* Delivery */}
          <View style={styles.summaryRow}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
              <Text variant="body" color="secondary">Delivery</Text>
              <Truck size={14} color={colors.textTertiary} />
            </View>
            <Text variant="body">${deliveryFee.toFixed(2)}</Text>
          </View>

          {/* Savings */}
          {savings > 0 && (
            <View style={styles.summaryRow}>
              <Text variant="body" color="success">Discount (5%)</Text>
              <Text variant="body" color="success">-${savings.toFixed(2)}</Text>
            </View>
          )}

          {/* Total */}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text variant="heading" weight="semibold">Total</Text>
            <Text variant="priceLarge" color="brand">${finalTotal.toFixed(2)}</Text>
          </View>

          {/* Trust Badges */}
          <View style={styles.trustBadges}>
            <View style={styles.trustBadge}>
              <Shield size={14} color={colors.success} />
              <Text variant="captionSmall" color="success">Secure checkout</Text>
            </View>
            <View style={styles.trustBadge}>
              <Truck size={14} color={colors.info} />
              <Text variant="captionSmall" color="info">Free returns</Text>
            </View>
          </View>
        </Animated.View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Checkout Footer */}
      <Animated.View entering={FadeInDown.delay(500)} style={styles.footer}>
        <View style={styles.footerContent}>
          <View style={styles.footerTotal}>
            <Text variant="caption" color="secondary">Total amount</Text>
            <Text variant="display" color="brand">${finalTotal.toFixed(2)}</Text>
          </View>
          <Button
            title="Checkout"
            onPress={handleCheckout}
            size="lg"
            fullWidth
            rightIcon={<ChevronRight size={20} color={colors.black} />}
            style={styles.checkoutButton}
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
  },

  // Cart Items
  itemsList: {
    gap: spacing.md,
    marginTop: spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  itemImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceElevated,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.lg,
    padding: spacing.xxs,
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
  },
  quantityButtonActive: {
    backgroundColor: colors.primary,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: spacing.sm,
    color: colors.text,
  },

  // Promo Card
  promoCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.primaryMedium,
    marginTop: spacing.xl,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.md,
  },
  promoIcon: {
    width: 40,
    height: 40,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Summary
  summary: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginTop: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  totalRow: {
    marginTop: spacing.md,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginBottom: 0,
  },
  trustBadges: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.lg,
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  trustBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
    gap: spacing.lg,
  },
  footerTotal: {
    alignItems: 'flex-start',
  },
  checkoutButton: {
    flex: 1,
  },
});
