import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import { colors, borderRadius, spacing, skeleton } from '../../theme';

interface SkeletonProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius: radius = borderRadius.sm,
  style,
}) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: skeleton.duration, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: skeleton.duration, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const baseColor = colors.surfaceElevated;
    const highlightColor = colors.surfaceHighest;

    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [baseColor, highlightColor]
      ),
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius: radius,
          backgroundColor: colors.surfaceElevated,
        },
        animatedStyle,
        style,
      ]}
    />
  );
};

// Product Card Skeleton
export const ProductCardSkeleton: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={[styles.cardContainer, style]}>
    <Skeleton height={160} borderRadius={borderRadius.lg} />
    <View style={styles.cardContent}>
      <Skeleton width={60} height={12} borderRadius={borderRadius.xs} />
      <Skeleton width="80%" height={16} borderRadius={borderRadius.xs} style={{ marginTop: spacing.xs }} />
      <Skeleton width={50} height={18} borderRadius={borderRadius.xs} style={{ marginTop: spacing.xs }} />
    </View>
  </View>
);

// Category Skeleton
export const CategorySkeleton: React.FC = () => (
  <View style={styles.categoryContainer}>
    <Skeleton width={64} height={64} borderRadius={borderRadius.lg} />
    <Skeleton width={50} height={12} borderRadius={borderRadius.xs} style={{ marginTop: spacing.xxs }} />
  </View>
);

// Order Item Skeleton
export const OrderItemSkeleton: React.FC = () => (
  <View style={styles.orderItem}>
    <Skeleton width={64} height={64} borderRadius={borderRadius.md} />
    <View style={styles.orderContent}>
      <Skeleton width="70%" height={16} borderRadius={borderRadius.xs} />
      <Skeleton width={80} height={12} borderRadius={borderRadius.xs} style={{ marginTop: spacing.xxs }} />
      <Skeleton width={50} height={16} borderRadius={borderRadius.xs} style={{ marginTop: spacing.xs }} />
    </View>
  </View>
);

// Home Screen Skeleton
export const HomeScreenSkeleton: React.FC = () => (
  <View style={styles.homeContainer}>
    {/* Header */}
    <View style={styles.header}>
      <Skeleton width={120} height={24} borderRadius={borderRadius.sm} />
      <View style={styles.headerActions}>
        <Skeleton width={40} height={40} borderRadius={borderRadius.md} />
        <Skeleton width={40} height={40} borderRadius={borderRadius.md} />
      </View>
    </View>

    {/* Search */}
    <Skeleton height={48} borderRadius={borderRadius.lg} style={{ marginTop: spacing.md }} />

    {/* Categories */}
    <View style={styles.sectionGap}>
      <Skeleton width={100} height={20} borderRadius={borderRadius.sm} />
      <View style={styles.categoryRow}>
        {[...Array(5)].map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </View>
    </View>

    {/* Products */}
    <View style={styles.sectionGap}>
      <Skeleton width={80} height={20} borderRadius={borderRadius.sm} />
      <View style={styles.productRow}>
        {[...Array(3)].map((_, i) => (
          <ProductCardSkeleton key={i} style={{ marginRight: spacing.md }} />
        ))}
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  cardContainer: {
    width: 160,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardContent: {
    padding: spacing.sm,
    gap: spacing.xxs,
  },
  categoryContainer: {
    alignItems: 'center',
    width: 72,
    gap: spacing.xxs,
  },
  orderItem: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  orderContent: {
    flex: 1,
    gap: spacing.xxs,
  },
  homeContainer: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sectionGap: {
    marginTop: spacing['3xl'],
  },
  categoryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  productRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
});
