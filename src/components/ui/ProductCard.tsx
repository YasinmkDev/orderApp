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
      style={[styles.container, animatedContainerStyle]}
    >
      {/* Image Section */}
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
          {/* Gradient overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)']}
            style={styles.gradient}
          />
        </Animated.View>

        {/* Top-Left Badge (Dietary tag) */}
        {isFood && dietaryTags && dietaryTags.length > 0 && (
          <View style={styles.dietaryBadgeContainer}>
            <DietaryBadge tags={dietaryTags} size="sm" />
          </View>
        )}

        {/* Top-Right Badge (Delivery time) */}
        {isFood && deliveryTime !== undefined && (
          <View style={styles.deliveryTimeBadge}>
            <Clock size={12} color={colors.white} />
            <Text variant="captionSmall" color="primary" weight="semibold">
              {deliveryTime}m
            </Text>
          </View>
        )}

        {/* Favorite button */}
        <View style={styles.favoriteButton}>
          <Heart
            size={16}
            color={isFavorite ? colors.error : colors.white}
            fill={isFavorite ? colors.error : 'transparent'}
          />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.content}>
        {/* Restaurant Name (Food-specific) */}
        {restaurantName && (
          <Text variant="captionSmall" color="secondary">
            {restaurantName}
          </Text>
        )}

        {/* Dish Name */}
        <Text
          variant="titleMedium"
          numberOfLines={2}
          style={styles.name}
        >
          {name}
        </Text>

        {/* Description (Food-specific) */}
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

        {/* Dietary Tags (Food-specific) */}
        {isFood && dietaryTags && dietaryTags.length > 0 && (
          <View style={styles.dietaryTagsContainer}>
            <DietaryBadge tags={dietaryTags} size="sm" />
          </View>
        )}

        {/* Rating + Price Row */}
        <View style={styles.footerRow}>
          {rating !== undefined && (
            <View style={styles.ratingRow}>
              <Star size={12} color={colors.primary} fill={colors.primary} />
              <Text variant="caption" color="brand" weight="semibold">
                {rating.toFixed(1)}
              </Text>
              {reviewCount !== undefined && (
                <Text variant="caption" color="tertiary">
                  ({reviewCount})
                </Text>
              )}
            </View>
          )}

          <Text variant="price" color="brand">
            ${price.toFixed(2)}
          </Text>
        </View>
      </View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 170,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
  },
  imageWrapper: {
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: 200,
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
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
  dietaryBadgeContainer: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  deliveryTimeBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxxs,
  },
  favoriteButton: {
    position: 'absolute',
    bottom: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: spacing.md,
    gap: spacing.xxs,
  },
  name: {
    marginTop: spacing.xxs,
    minHeight: 40,
  },
  description: {
    marginTop: spacing.xs,
  },
  dietaryTagsContainer: {
    marginTop: spacing.xs,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxxs,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
});
