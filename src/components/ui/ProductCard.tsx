import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import AnimatedPressable from './AnimatedPressable';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, spacing, shadows, springs } from '../../theme';
import { Text } from './Text';
import { Image } from 'expo-image';
import { Star, Heart, Clock } from 'lucide-react-native';
import { DietaryBadge } from './DietaryBadge';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUri?: string;
  category?: string;
  rating?: number;
  reviewCount?: number;
  isFeatured?: boolean;
  isFavorite?: boolean;
  onPress: (id: string) => void;
  // Food-specific props
  restaurantName?: string;
  shortDescription?: string;
  dietaryTags?: ('vegan' | 'vegetarian' | 'spicy' | 'glutenFree')[];
  deliveryTime?: number;
  // Width and style overrides for dynamic layouts (e.g., grids vs lists)
  width?: number | string;
  style?: any;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  imageUri,
  category,
  rating,
  reviewCount,
  isFeatured,
  isFavorite,
  onPress,
  restaurantName,
  shortDescription,
  dietaryTags,
  deliveryTime,
  width,
  style,
}) => {
  const opacity = useSharedValue(0);
  const imageScale = useSharedValue(0.95);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    imageScale.value = withSpring(1, springs.gentle);
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const isFood = restaurantName !== undefined;

  return (
    <AnimatedPressable
      onPress={() => onPress(id)}
      style={[
        styles.container,
        width !== undefined ? { width } : styles.defaultWidth,
        style,
        animatedContainerStyle,
      ]}
    >
      {/* Image Section with overlays */}
      <View style={styles.imageWrapper}>
        <Animated.View style={[styles.imageContainer, animatedImageStyle]}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.image}
              contentFit="cover"
              transition={300}
            />
          ) : (
            <View style={styles.placeholder}>
              <Text variant="caption" color="tertiary">No image</Text>
            </View>
          )}
          {/* Subtle gradient overlay to enhance visual readability of HUD elements */}
          <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'transparent', 'rgba(0,0,0,0.6)']}
            style={styles.gradient}
          />
        </Animated.View>

        {/* Top-Left Badge (Dietary tag - limit to first to avoid card clutter) */}
        {isFood && dietaryTags && dietaryTags.length > 0 && (
          <View style={styles.dietaryBadgeContainer}>
            <DietaryBadge tags={[dietaryTags[0]]} size="sm" />
          </View>
        )}

        {/* Top-Right Badge (Delivery time) */}
        {isFood && deliveryTime !== undefined && (
          <View style={styles.deliveryBadge}>
            <Clock size={10} color={colors.primary} />
            <Text variant="captionSmall" color="brand" weight="semibold">
              {deliveryTime}m
            </Text>
          </View>
        )}

        {/* Bottom-Left Badge (Vibrant Star Rating) */}
        {rating !== undefined && (
          <View style={styles.ratingBadge}>
            <Star size={10} color={colors.primary} fill={colors.primary} />
            <Text variant="captionSmall" color="brand" weight="bold">
              {rating.toFixed(1)}
            </Text>
            {reviewCount !== undefined && (
              <Text variant="captionSmall" style={styles.reviewCountText}>
                ({reviewCount})
              </Text>
            )}
          </View>
        )}

        {/* Bottom-Right Glassmorphic Favorite button */}
        <View style={styles.favoriteButton}>
          <Heart
            size={12}
            color={isFavorite ? colors.error : colors.white}
            fill={isFavorite ? colors.error : 'transparent'}
          />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Restaurant / Category Name */}
        {restaurantName && (
          <Text
            variant="captionSmall"
            color="brand"
            numberOfLines={1}
            style={styles.restaurantText}
            weight="semibold"
          >
            {restaurantName.toUpperCase()}
          </Text>
        )}

        {/* Dish Name */}
        <Text
          variant="body"
          weight="semibold"
          numberOfLines={1}
          style={styles.name}
        >
          {name}
        </Text>

        {/* Description */}
        {shortDescription && (
          <Text 
            variant="bodySmall" 
            color="tertiary" 
            numberOfLines={1}
            style={styles.description}
          >
            {shortDescription}
          </Text>
        )}

        {/* Pricing & Discount Row */}
        <View style={styles.priceRow}>
          <Text variant="price" color="secondary" style={styles.priceText}>
            ${price.toFixed(2)}
          </Text>
          {originalPrice && originalPrice > price && (
            <View style={styles.discountContainer}>
              <Text variant="captionSmall" color="tertiary" style={styles.originalPrice}>
                ${originalPrice.toFixed(2)}
              </Text>
              <Text variant="captionSmall" color="success" weight="bold" style={styles.discountLabel}>
                {discount}% OFF
              </Text>
            </View>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  defaultWidth: {
    width: 170,
  },
  imageWrapper: {
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: 115,
    backgroundColor: colors.surfaceElevated,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  dietaryBadgeContainer: {
    position: 'absolute',
    top: spacing.xxs,
    left: spacing.xxs,
  },
  deliveryBadge: {
    position: 'absolute',
    top: spacing.xxs,
    right: spacing.xxs,
    backgroundColor: 'rgba(10, 10, 15, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  ratingBadge: {
    position: 'absolute',
    bottom: spacing.xxs,
    left: spacing.xxs,
    backgroundColor: 'rgba(10, 10, 15, 0.75)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  reviewCountText: {
    color: 'rgba(255, 255, 255, 0.65)',
    fontSize: 9,
    fontWeight: 'normal',
  },
  favoriteButton: {
    position: 'absolute',
    bottom: spacing.xxs,
    right: spacing.xxs,
    width: 22,
    height: 22,
    backgroundColor: 'rgba(10, 10, 15, 0.65)',
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  content: {
    padding: spacing.xs,
    gap: 2,
  },
  restaurantText: {
    fontSize: 9,
    letterSpacing: 0.8,
    color: colors.primary,
    marginBottom: 1,
  },
  name: {
    fontSize: 13,
    lineHeight: 16,
    color: colors.text,
  },
  description: {
    fontSize: 10,
    color: colors.textTertiary,
    marginTop: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xxs,
  },
  priceText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.secondary,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    fontSize: 9,
    color: colors.textTertiary,
  },
  discountLabel: {
    fontSize: 9,
    color: colors.success,
  },
});
