import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
  interpolateColor,
} from 'react-native-reanimated';
import { colors, borderRadius, spacing, skeleton, shadows } from '../../theme';
import { Text } from './Text';
import { Sparkles, UtensilsCrossed, TrendingUp, Clock, Star, Bell, ShoppingBag, Search } from 'lucide-react-native';

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
  const shimmerProgress = useSharedValue(0);
  const pulseProgress = useSharedValue(0);

  useEffect(() => {
    // Elegant sweeping gloss shine shimmer animation
    shimmerProgress.value = withRepeat(
      withTiming(1, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
      -1,
      false
    );

    // Subtle gentle pulsate for additional breathing movement
    pulseProgress.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 1500, easing: Easing.inOut(Easing.ease) })
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
        pulseProgress.value,
        [0, 1],
        [baseColor, highlightColor]
      ),
    };
  });

  const shimmerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -200 + shimmerProgress.value * 450,
        },
      ],
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
          overflow: 'hidden',
          position: 'relative',
        },
        animatedStyle,
        style,
      ]}
    >
      <Animated.View style={[styles.shimmerLine, shimmerStyle]}>
        <LinearGradient
          colors={['transparent', 'rgba(255, 255, 255, 0.04)', 'rgba(255, 255, 255, 0.12)', 'rgba(255, 255, 255, 0.04)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </Animated.View>
  );
};

// Majestic Hero Carousel Loading Banner
export const CarouselHeroSkeleton: React.FC = () => {
  return (
    <View style={styles.carouselHeroWrapper}>
      <Skeleton height={280} borderRadius={28} />
      
      {/* Overlay details indicating premium menu options */}
      <View style={styles.heroOverlayContent}>
        <View style={styles.heroTagsRow}>
          <Skeleton width={70} height={20} borderRadius={10} style={styles.heroTagPill} />
          <Skeleton width={80} height={20} borderRadius={10} style={styles.heroTagPill} />
        </View>
        <Skeleton width="45%" height={24} borderRadius={6} style={styles.heroTitleLine} />
        <Skeleton width="75%" height={14} borderRadius={4} style={styles.heroSubtitleLine} />
        
        {/* Floating action row loader */}
        <View style={styles.heroMetadataRow}>
          <Skeleton width={110} height={12} borderRadius={4} />
          <Skeleton width={90} height={12} borderRadius={4} />
        </View>
      </View>

      {/* Decorative Dots */}
      <View style={styles.carouselIndicatorDots}>
        <View style={[styles.indicatorDot, styles.activeIndicatorDot]} />
        <View style={styles.indicatorDot} />
        <View style={styles.indicatorDot} />
        <View style={styles.indicatorDot} />
      </View>
    </View>
  );
};

// Enhanced Product Card Skeleton (Matching newly updated luxury styles)
export const ProductCardSkeleton: React.FC<{ style?: ViewStyle }> = ({ style }) => (
  <View style={[styles.cardContainer, style]}>
    <View style={styles.cardImageWrapper}>
      <Skeleton height={110} borderRadius={16} />
      {/* Small top right circle mimic badge */}
      <View style={styles.cardFavoriteSimulate}>
        <Skeleton width={22} height={22} borderRadius={11} />
      </View>
    </View>
    <View style={styles.cardContent}>
      <Skeleton width={60} height={9} borderRadius={2} />
      <Skeleton width="100%" height={14} borderRadius={3} style={{ marginTop: spacing.xxs }} />
      <Skeleton width="80%" height={10} borderRadius={3} style={{ marginTop: spacing.xxs }} />
      
      <View style={styles.cardFooter}>
        <Skeleton width={45} height={14} borderRadius={4} />
        <View style={styles.cartBtnPlaceholder}>
          <Skeleton width={20} height={20} borderRadius={10} />
        </View>
      </View>
    </View>
  </View>
);

// High-definition Premium Food Category Card Skeleton
export const CategorySkeleton: React.FC = () => (
  <View style={styles.categoryCardSkeleton}>
    <View style={styles.categoryImgPlaceholder}>
      <Skeleton width="100%" height={85} borderRadius={16} />
      {/* Top absolute count badge placeholder */}
      <View style={styles.categoryBadgePlaceholder}>
        <Skeleton width={18} height={12} borderRadius={6} />
      </View>
    </View>
    <View style={styles.categoryDetails}>
      <Skeleton width="75%" height={11} borderRadius={4} style={{ marginTop: 4 }} />
      <View style={styles.categoryRowFooter}>
        <Skeleton width="40%" height={8} borderRadius={3} />
        <Skeleton width={14} height={14} borderRadius={7} />
      </View>
    </View>
  </View>
);

// Order Item Skeleton
export const OrderItemSkeleton: React.FC = () => (
  <View style={styles.orderItem}>
    <Skeleton width={64} height={64} borderRadius={12} />
    <View style={styles.orderContent}>
      <Skeleton width="70%" height={14} borderRadius={4} />
      <Skeleton width={80} height={10} borderRadius={3} style={{ marginTop: spacing.xxs }} />
      <Skeleton width={50} height={14} borderRadius={4} style={{ marginTop: spacing.xs }} />
    </View>
  </View>
);

// Dynamic fully polished home loading view
export const HomeScreenSkeleton: React.FC = () => (
  <View style={styles.wholeWrapper}>
    {/* Animated visual header */}
    <View style={styles.header}>
      <View style={styles.headerTitleArea}>
        <View style={styles.logoLogo}>
          <UtensilsCrossed size={16} color={colors.primary} />
        </View>
        <View style={styles.headerTextGroup}>
          <Text variant="heading" weight="bold" style={styles.luxBrandText}>Gourmet</Text>
          <Text variant="captionSmall" color="secondary" style={styles.brandSub}>PREMIUM DELIVERY</Text>
        </View>
      </View>
      <View style={styles.headerActions}>
        <View style={styles.iconCircleMock}>
          <Bell size={14} color={colors.textTertiary} />
        </View>
        <View style={styles.iconCircleMock}>
          <ShoppingBag size={14} color={colors.textTertiary} />
        </View>
      </View>
    </View>

    <ScrollView style={styles.scrollBlock} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollPadding}>
      {/* Carousel skeleton */}
      <CarouselHeroSkeleton />

      {/* Styled luxury Search bar input */}
      <View style={styles.searchBarBox}>
        <View style={styles.searchInnerMock}>
          <Search size={15} color={colors.textTertiary} />
          <Skeleton width="60%" height={12} borderRadius={4} style={{ marginLeft: 6 }} />
        </View>
      </View>

      {/* Categories block representation */}
      <View style={styles.sectionHeaderLine}>
        <View>
          <Text variant="heading" weight="semibold">Menu Categories</Text>
          <Text variant="captionSmall" color="tertiary">Freshly updated selections</Text>
        </View>
        <Skeleton width={55} height={12} borderRadius={4} />
      </View>
      
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
        {[...Array(5)].map((_, i) => (
          <CategorySkeleton key={i} />
        ))}
      </ScrollView>

      {/* Featured list block */}
      <View style={styles.sectionHeaderLine}>
        <View>
          <Text variant="heading" weight="semibold">Chef's Curations</Text>
          <Text variant="captionSmall" color="tertiary">Premium choices today</Text>
        </View>
        <Skeleton width={55} height={12} borderRadius={4} />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.productScroll}>
        {[...Array(3)].map((_, i) => (
          <ProductCardSkeleton key={i} style={{ marginRight: spacing.md }} />
        ))}
      </ScrollView>

      {/* Extra spacing details at direct bottom */}
      <View style={styles.loaderStatusRow}>
        <Sparkles size={14} color={colors.primary} style={styles.spinnerIcon} />
        <Text variant="caption" color="secondary">Preparing culinary list...</Text>
      </View>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  wholeWrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollBlock: {
    flex: 1,
  },
  scrollPadding: {
    paddingBottom: spacing.xl,
  },
  logoLogo: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(245,166,35,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'rgba(245,166,35,0.15)',
  },
  luxBrandText: {
    fontSize: 15,
    letterSpacing: 0.5,
    color: colors.white,
    lineHeight: 18,
  },
  brandSub: {
    fontSize: 8,
    letterSpacing: 1.2,
    fontWeight: '700',
    color: colors.primary,
  },
  shimmerLine: {
    width: '120%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 10,
  },
  carouselHeroWrapper: {
    position: 'relative',
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    height: 280,
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  heroOverlayContent: {
    position: 'absolute',
    left: spacing.lg,
    bottom: spacing.lg,
    right: spacing.lg,
    zIndex: 2,
    gap: spacing.xxs,
  },
  heroTagsRow: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginBottom: spacing.xs,
  },
  heroTagPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  heroTitleLine: {
    marginBottom: 4,
  },
  heroSubtitleLine: {
    marginBottom: spacing.sm,
  },
  heroMetadataRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xxs,
  },
  carouselIndicatorDots: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
  },
  indicatorDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  activeIndicatorDot: {
    width: 14,
    backgroundColor: colors.primary,
  },
  cardContainer: {
    width: 165,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    padding: 6,
    ...shadows.md,
  },
  cardImageWrapper: {
    height: 110,
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  cardFavoriteSimulate: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 3,
  },
  cardContent: {
    padding: spacing.xs,
    gap: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  cartBtnPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  categoryCardSkeleton: {
    width: 115,
    borderRadius: 20,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
    padding: 6,
    ...shadows.md,
  },
  categoryImgPlaceholder: {
    width: '100%',
    height: 85,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryBadgePlaceholder: {
    position: 'absolute',
    top: 6,
    right: 6,
    zIndex: 3,
  },
  categoryDetails: {
    marginTop: spacing.xs,
    paddingHorizontal: 2,
    gap: 2,
  },
  categoryRowFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 2,
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.02)',
  },
  headerTitleArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTextGroup: {
    gap: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconCircleMock: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.04)',
  },
  searchBarBox: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  searchInnerMock: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: 16,
    paddingHorizontal: spacing.sm,
    height: 44,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
  },
  sectionHeaderLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  categoryScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  productScroll: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.xs,
  },
  loaderStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: spacing['3xl'],
    marginBottom: spacing.xl,
  },
  spinnerIcon: {
    opacity: 0.8,
  },
});
