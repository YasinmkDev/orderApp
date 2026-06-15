import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  Text as RNText,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  FadeIn,
  FadeInDown,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, shadows } from '../../theme';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';
import { LoadingState } from '../../components/ui/LoadingState';
import { CustomizationPanel, CustomizationState } from '../../components/ui/CustomizationPanel';
import AnimatedPressable from '../../components/ui/AnimatedPressable';
import { useProduct } from '../../hooks';
import { useCartStore } from '../../store/cart';
import { Image } from 'expo-image';
import {
  ArrowLeft,
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Package,
} from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<HomeStackParamList>;
  route: { params: { productId: string } };
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Rating Stars Component
const RatingStars: React.FC<{ rating: number; size?: number }> = ({ rating, size = 16 }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          color={colors.primary}
          fill={star <= Math.floor(rating) ? colors.primary : 'transparent'}
        />
      ))}
    </View>
    <Text variant="caption" weight="semibold" color="brand">
      {rating.toFixed(1)}
    </Text>
  </View>
);

// Feature Item Component
const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  delay: number;
}> = ({ icon, title, subtitle, delay }) => (
  <Animated.View entering={FadeInDown.delay(delay).springify()} style={styles.featureItem}>
    <View style={styles.featureIcon}>{icon}</View>
    <View style={{ flex: 1 }}>
      <Text variant="bodySmall" weight="medium">{title}</Text>
      <Text variant="captionSmall" color="tertiary">{subtitle}</Text>
    </View>
  </Animated.View>
);

export const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { productId } = route.params;
  const { data: product, isLoading } = useProduct(productId);
  const addItem = useCartStore(s => s.addItem);
  const cartItems = useCartStore(s => s.items);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [customization, setCustomization] = useState<CustomizationState | null>(null);

  // Animation values
  const scrollY = useSharedValue(0);

  // Check if product is already in cart
  const inCartQuantity = useMemo(() => {
    const cartItem = cartItems.find(item => item.item.id === productId);
    return cartItem?.quantity || 0;
  }, [cartItems, productId]);

  // Animated header opacity
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 200], [0, 1], Extrapolation.CLAMP);
    return { opacity };
  });

  // Image parallax effect
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollY.value,
      [-100, 0, 100],
      [1.2, 1, 0.9],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [-100, 0, 100],
      [20, 0, -20],
      Extrapolation.CLAMP
    );
    return { transform: [{ scale }, { translateY }] };
  });

  const handleAddToCart = useCallback(() => {
    if (product) addItem(product, quantity);
  }, [product, quantity]);

  const handleQuantityChange = useCallback((delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  }, []);

  if (isLoading) return <LoadingState fullScreen message="Loading product..." />;

  if (!product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        <View style={styles.emptyCenter}>
          <Text variant="body" color="secondary">Product not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const productRating = 4.5 + Math.random() * 0.4;
  const reviewCount = Math.floor(Math.random() * 300) + 50;

  return (
    <View style={styles.container}>
      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        onScroll={(e) => {
          scrollY.value = e.nativeEvent.contentOffset.y;
        }}
        scrollEventThrottle={16}
      >
        {/* Hero Image Section */}
        <Animated.View style={[styles.imageContainer, imageAnimatedStyle]}>
          {product.image ? (
            <Image source={{ uri: product.image }} style={styles.image} contentFit="cover" transition={400} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Package size={48} color={colors.textTertiary} />
            </View>
          )}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.6)']}
            style={styles.imageGradient}
          />

          {/* Back/Actions overlay */}
          <View style={styles.topActions}>
            <AnimatedPressable
              onPress={() => navigation.goBack()}
              style={[styles.iconButton, styles.backButton]}
            >
              <ArrowLeft size={20} color={colors.text} />
            </AnimatedPressable>

            <View style={styles.topActionsRight}>
              <AnimatedPressable
                onPress={() => setIsFavorite(!isFavorite)}
                style={[styles.iconButton, styles.heartButton]}
              >
                <Heart
                  size={20}
                  color={isFavorite ? colors.error : colors.text}
                  fill={isFavorite ? colors.error : 'transparent'}
                />
              </AnimatedPressable>
              <AnimatedPressable style={[styles.iconButton, styles.shareButton]}>
                <Share2 size={20} color={colors.text} />
              </AnimatedPressable>
            </View>
          </View>

          {/* Tags Overlay */}
          {product.isFeatured && (
            <Animated.View entering={FadeIn.delay(200)} style={styles.featuredTag}>
              <LinearGradient
                colors={[colors.primary, colors.secondary]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.featuredTagGradient}
              >
                <Text variant="captionSmall" weight="semibold" color="primary">
                  Featured
                </Text>
              </LinearGradient>
            </Animated.View>
          )}
        </Animated.View>

        {/* Product Info */}
        <View style={styles.content}>
          {/* Category & Name */}
          <Animated.View entering={FadeInDown.delay(100)}>
            {product.categoryName && (
              <View style={styles.categoryChip}>
                <Text variant="caption" weight="semibold" color="brand">
                  {product.categoryName}
                </Text>
              </View>
            )}
            <Text variant="display" style={styles.productName}>
              {product.name}
            </Text>

            {/* Rating & Reviews */}
            <View style={styles.ratingRow}>
              <RatingStars rating={productRating} />
              <Text variant="caption" color="tertiary">
                ({reviewCount} reviews)
              </Text>
            </View>
          </Animated.View>

          {/* Price Section */}
          <Animated.View entering={FadeInDown.delay(200)} style={styles.priceSection}>
            <View>
              <Text variant="hero" color="brand">
                ${product.price.toFixed(2)}
              </Text>
              {product.unit && (
                <Text variant="caption" color="tertiary">
                  per {product.unit}
                </Text>
              )}
            </View>
            <View style={styles.availability}>
              <View style={styles.availabilityDot} />
              <Text variant="captionSmall" color="success">In Stock</Text>
            </View>
          </Animated.View>

          {/* Features */}
          <Animated.View entering={FadeInDown.delay(300)} style={styles.features}>
            <FeatureItem
              icon={<Truck size={18} color={colors.info} />}
              title="Free Delivery"
              subtitle="2-3 business days"
              delay={350}
            />
            <FeatureItem
              icon={<Shield size={18} color={colors.success} />}
              title="Warranty"
              subtitle="1 year warranty"
              delay={400}
            />
            <FeatureItem
              icon={<RotateCcw size={18} color={colors.warning} />}
              title="Easy Returns"
              subtitle="30-day return policy"
              delay={450}
            />
          </Animated.View>

          {/* Description */}
          {product.description && (
            <Animated.View entering={FadeInDown.delay(500)} style={styles.description}>
              <Text variant="heading" style={{ marginBottom: spacing.sm }}>
                Description
              </Text>
              <Text variant="bodyLarge" color="secondary">
                {product.description}
              </Text>
            </Animated.View>
          )}

          {/* Customization Panel */}
          {(product.variants || product.modifierGroups) && (
            <CustomizationPanel
              variants={product.variants}
              modifierGroups={product.modifierGroups}
              basePrice={product.price}
              onCustomizationChange={setCustomization}
            />
          )}

          {/* Add to Cart Section */}
          <Animated.View entering={FadeInDown.delay(600)} style={styles.addToCartSection}>
            {/* Quantity Selector */}
            <View style={styles.quantitySelector}>
              <AnimatedPressable
                onPress={() => handleQuantityChange(-1)}
                style={[styles.quantityButton, quantity === 1 && styles.quantityButtonDisabled]}
              >
                <Minus size={18} color={quantity === 1 ? colors.textTertiary : colors.text} />
              </AnimatedPressable>
              <RNText style={styles.quantityText}>{quantity}</RNText>
              <AnimatedPressable
                onPress={() => handleQuantityChange(1)}
                style={[styles.quantityButton, styles.quantityButtonActive]}
              >
                <Plus size={18} color={colors.black} />
              </AnimatedPressable>
            </View>

            {/* Add to Cart Button */}
            <View style={{ flex: 1 }}>
              <Button
                title={`Add to Cart — $${((customization?.totalPrice || product.price) * quantity).toFixed(2)}`}
                onPress={handleAddToCart}
                size="lg"
                fullWidth
                leftIcon={<ShoppingCart size={20} color={colors.black} />}
              />
            </View>
          </Animated.View>

          {/* Cart Status */}
          {inCartQuantity > 0 && (
            <Animated.View entering={FadeIn} style={styles.cartStatus}>
              <Text variant="caption" color="secondary">
                You have {inCartQuantity} of this item in your cart
              </Text>
              <Pressable onPress={() => navigation.getParent()?.navigate('CartTab')} hitSlop={8}>
                <Text variant="caption" weight="semibold" color="brand">View Cart</Text>
              </Pressable>
            </Animated.View>
          )}

          {/* Bottom padding */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Floating Header */}
      <Animated.View style={[styles.floatingHeader, headerAnimatedStyle]}>
        <SafeAreaView edges={['top']} style={styles.floatingHeaderContent}>
          <Pressable onPress={() => navigation.goBack()} style={styles.floatingBack}>
            <ArrowLeft size={20} color={colors.text} />
          </Pressable>
          <Text variant="titleMedium" numberOfLines={1} style={{ flex: 1, marginHorizontal: spacing.md }}>
            {product.name}
          </Text>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },

  // Image
  imageContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH * 0.85,
    backgroundColor: colors.surfaceElevated,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },

  // Top Actions
  topActions: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.md,
    paddingTop: spacing['3xl'],
  },
  topActionsRight: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backButton: {
    backgroundColor: colors.surface,
    ...shadows.md,
  },
  heartButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  shareButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

  // Featured Tag
  featuredTag: {
    position: 'absolute',
    bottom: spacing.lg,
    left: spacing.lg,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  featuredTagGradient: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },

  // Content
  content: {
    padding: spacing.lg,
    marginTop: -spacing.lg,
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
  },
  categoryChip: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.sm,
  },
  productName: {
    marginBottom: spacing.sm,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },

  // Price
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    backgroundColor: colors.successLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  availabilityDot: {
    width: 8,
    height: 8,
    borderRadius: borderRadius.full,
    backgroundColor: colors.success,
  },

  // Features
  features: {
    marginBottom: spacing.xl,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Description
  description: {
    marginBottom: spacing.xl,
  },

  // Add to Cart
  addToCartSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xxs,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quantityButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md,
    backgroundColor: colors.surfaceElevated,
  },
  quantityButtonActive: {
    backgroundColor: colors.primary,
  },
  quantityButtonDisabled: {
    opacity: 0.5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: spacing.sm,
    color: colors.text,
  },

  // Cart Status
  cartStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginTop: spacing.md,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  emptyCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Floating Header
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...shadows.sm,
  },
  floatingHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    height: 56,
  },
  floatingBack: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.sm,
  },
});
