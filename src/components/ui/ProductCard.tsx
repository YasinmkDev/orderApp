import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, spacing, shadows, springs } from '../../theme';
import { Text } from './Text';
import { Image } from 'expo-image';
import { Star, Heart } from 'lucide-react-native';

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
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const imageScale = useSharedValue(0.95);

  React.useEffect(() => {
    opacity.value = withTiming(1, { duration: 300 });
    imageScale.value = withSpring(1, springs.gentle);
  }, []);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: imageScale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, springs.snappy);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springs.bouncy);
  };

  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <AnimatedPressable
      onPress={() => onPress(id)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.container,
        animatedContainerStyle,
      ]}
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

        {/* Badges */}
        {isFeatured && (
          <View style={styles.featuredBadge}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featuredBadgeGradient}
            >
              <Text variant="captionSmall" color="primary" weight="semibold">
                Featured
              </Text>
            </LinearGradient>
          </View>
        )}

        {discount > 0 && (
          <View style={styles.discountBadge}>
            <Text variant="captionSmall" weight="bold" style={{ color: colors.white }}>
              -{discount}%
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
        {category && (
          <Text variant="captionSmall" color="secondary">
            {category}
          </Text>
        )}
        <Text
          variant="titleMedium"
          numberOfLines={2}
          style={styles.name}
        >
          {name}
        </Text>

        {/* Rating */}
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

        {/* Price */}
        <View style={styles.priceRow}>
          <Text variant="price" color="brand">
            ${price.toFixed(2)}
          </Text>
          {originalPrice && (
            <Text variant="bodySmall" color="tertiary" style={styles.originalPrice}>
              ${originalPrice.toFixed(2)}
            </Text>
          )}
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
    height: 160,
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
  featuredBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  featuredBadgeGradient: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.error,
    paddingHorizontal: spacing.xs,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.xs,
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
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxxs,
    marginTop: spacing.xxs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  originalPrice: {
    textDecorationLine: 'line-through',
  },
});
