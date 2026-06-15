import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, useWindowDimensions, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
  Extrapolation,
  withSpring,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, spacing, shadows } from '../../theme';
import { Text } from './Text';
import { Image } from 'expo-image';
import { Star, Clock, ChefHat, Flame, Sparkles } from 'lucide-react-native';

interface CarouselItem {
  id: string;
  image: string;
  restaurantName: string;
  dishName: string;
  rating: number;
  reviewCount: number;
  deliveryTime: number;
  tags?: string[];
}

interface FeaturedCarouselHeroProps {
  items: CarouselItem[];
  autoRotateInterval?: number;
  onItemPress?: (itemId: string) => void;
}

const defaultItems: CarouselItem[] = [
  {
    id: 'hero-1',
    image: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurantName: 'Trattoria Roma',
    dishName: 'Spicy Thai Basil',
    rating: 4.8,
    reviewCount: 342,
    deliveryTime: 25,
    tags: ['Spicy', 'Popular'],
  },
  {
    id: 'hero-2',
    image: 'https://images.pexels.com/photos/2082063/pexels-photo-2082063.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurantName: 'Pasta Paradise',
    dishName: 'Margherita Pizza',
    rating: 4.9,
    reviewCount: 521,
    deliveryTime: 30,
    tags: ['Vegetarian', 'Fresh'],
  },
  {
    id: 'hero-3',
    image: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurantName: 'Green Haven',
    dishName: 'Buddha Bowl',
    rating: 4.7,
    reviewCount: 218,
    deliveryTime: 20,
    tags: ['Vegan', 'Healthy'],
  },
  {
    id: 'hero-4',
    image: 'https://images.pexels.com/photos/3535149/pexels-photo-3535149.jpeg?auto=compress&cs=tinysrgb&w=600',
    restaurantName: 'Ocean Blue',
    dishName: 'Grilled Salmon',
    rating: 4.9,
    reviewCount: 467,
    deliveryTime: 35,
    tags: ['Premium', 'Fresh'],
  },
];

export const FeaturedCarouselHero: React.FC<FeaturedCarouselHeroProps> = ({
  items = defaultItems,
  autoRotateInterval = 3000,
  onItemPress,
}) => {
  const { width: windowWidth } = useWindowDimensions();
  
  // Calculate carousel responsive boundaries
  const CONTAINER_PADDING = spacing.lg;
  // Subtract containers and reveal 12% of the next card on active screen
  const CARD_WIDTH = Math.floor(windowWidth * 0.84);
  const CARD_GAP = spacing.md;
  const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;
  
  // Outer margin to align perfect snapping with inset centering
  const SIDE_INSET = (windowWidth - CARD_WIDTH) / 2;

  const scrollViewRef = useRef<Animated.ScrollView>(null);
  const scrollX = useSharedValue(0);
  const isAutoRotating = useSharedValue(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reanimated scroll event handler
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
    onBeginDrag: () => {
      isAutoRotating.value = false;
    },
    onEndDrag: () => {
      isAutoRotating.value = true;
    },
  });

  // Safe Index tracking computed on the fly
  const activeIndex = useDerivedValue(() => {
    const rawVal = scrollX.value / SNAP_INTERVAL;
    return Math.min(Math.max(Math.round(rawVal), 0), items.length - 1);
  });

  // Rotation triggers
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!isAutoRotating.value || items.length === 0) return;
      
      const currentIdx = Math.round(scrollX.value / SNAP_INTERVAL);
      const nextIdx = (currentIdx + 1) % items.length;
      
      scrollViewRef.current?.scrollTo({
        x: nextIdx * SNAP_INTERVAL,
        animated: true,
      });
    }, autoRotateInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, SNAP_INTERVAL, autoRotateInterval]);

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.outerContainer}>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIDE_INSET,
          paddingVertical: spacing.xs,
        }}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        disableIntervalMomentum
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        style={styles.scroll}
      >
        {items.map((item, index) => {
          // Calculate dynamic animated transformations based on scroll offset
          const animatedCardStyle = useAnimatedStyle(() => {
            const inputRange = [
              (index - 1) * SNAP_INTERVAL,
              index * SNAP_INTERVAL,
              (index + 1) * SNAP_INTERVAL,
            ];

            const scale = interpolate(
              scrollX.value,
              inputRange,
              [0.93, 1.0, 0.93],
              Extrapolation.CLAMP
            );

            const rotation = interpolate(
              scrollX.value,
              inputRange,
              [-1.5, 0, 1.5],
              Extrapolation.CLAMP
            );

            const translateY = interpolate(
              scrollX.value,
              inputRange,
              [8, 0, 8],
              Extrapolation.CLAMP
            );

            return {
              transform: [
                { scale },
                { rotateZ: `${rotation}deg` },
                { translateY },
              ],
            };
          });

          const animatedImageStyle = useAnimatedStyle(() => {
            const inputRange = [
              (index - 1) * SNAP_INTERVAL,
              index * SNAP_INTERVAL,
              (index + 1) * SNAP_INTERVAL,
            ];

            // Subtle parallax zoom shift inside image container
            const translateX = interpolate(
              scrollX.value,
              inputRange,
              [-18, 0, 18],
              Extrapolation.CLAMP
            );

            const scale = interpolate(
              scrollX.value,
              inputRange,
              [1.15, 1.0, 1.15],
              Extrapolation.CLAMP
            );

            return {
              transform: [{ translateX }, { scale }],
            };
          });

          const isHot = item.rating >= 4.8;

          return (
            <Pressable
              key={item.id}
              onPress={() => onItemPress?.(item.id)}
              style={{ width: CARD_WIDTH, marginRight: CARD_GAP }}
            >
              <Animated.View style={[styles.card, animatedCardStyle]}>
                {/* Background Food Image Wrapper */}
                <View style={styles.imageMask}>
                  <Animated.View style={[styles.parallaxContainer, animatedImageStyle]}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.image}
                      contentFit="cover"
                      transition={400}
                    />
                  </Animated.View>

                  {/* Top Overlay Glowing Highlights */}
                  <LinearGradient
                    colors={['rgba(10, 10, 15, 0.85)', 'rgba(10, 10, 15, 0.2)', 'rgba(10, 10, 15, 0.95)']}
                    locations={[0, 0.45, 1]}
                    style={styles.absoluteGradient}
                  />
                </View>

                {/* Left Tag Overlays / Floating Tags */}
                <View style={styles.floatingTagHeader}>
                  {isHot ? (
                    <View style={[styles.pillBadge, { backgroundColor: colors.secondary }]}>
                      <Flame size={12} color={colors.white} fill={colors.white} />
                      <Text variant="captionSmall" weight="bold" color="primary">TRENDING</Text>
                    </View>
                  ) : (
                    <View style={styles.pillBadgeStandard}>
                      <ChefHat size={12} color={colors.primary} />
                      <Text variant="captionSmall" weight="semibold" color="brand">SPECIALLY CRAFTED</Text>
                    </View>
                  )}
                </View>

                {/* Ultimate Overlay HUD on Card Body */}
                <View style={styles.floatingContent}>
                  {/* Category Indicator with Glow */}
                  <View style={styles.categoryAndScoreRow}>
                    <Text variant="captionSmall" weight="bold" style={styles.restaurantName} numberOfLines={1}>
                      {item.restaurantName.toUpperCase()}
                    </Text>
                    
                    {/* Glowing Star rating */}
                    <View style={styles.hudRating}>
                      <Star size={11} color={colors.primary} fill={colors.primary} />
                      <Text variant="captionSmall" weight="bold" color="primary">
                        {item.rating.toFixed(1)}
                      </Text>
                    </View>
                  </View>

                  {/* Title text */}
                  <Text variant="headingLarge" weight="bold" style={styles.dishName} numberOfLines={1}>
                    {item.dishName}
                  </Text>

                  {/* Micro attributes panel with elegant clock and counts */}
                  <View style={styles.microStats}>
                    <View style={styles.microItem}>
                      <Clock size={12} color={colors.textSecondary} />
                      <Text variant="bodySmall" color="secondary" weight="semibold">
                        {item.deliveryTime} mins delivery
                      </Text>
                    </View>

                    <View style={styles.microDivider} />

                    <View style={styles.microItem}>
                      <Sparkles size={11} color={colors.primary} />
                      <Text variant="bodySmall" color="tertiary">
                        {item.reviewCount}+ ratings
                      </Text>
                    </View>
                  </View>

                  {/* Horizontal pill tags */}
                  {item.tags && item.tags.length > 0 && (
                    <View style={styles.bottomTagsRow}>
                      {item.tags.map((tag, tagIdx) => (
                        <View key={tagIdx} style={styles.bottomTag}>
                          <Text variant="captionSmall" color="brand" weight="semibold" style={styles.bottomTagText}>
                            {tag}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </Animated.View>
            </Pressable>
          );
        })}
      </Animated.ScrollView>

      {/* Morphing Liquid Indicator Track */}
      <View style={styles.navigationTrack}>
        {items.map((_, index) => {
          const animatedDotStyle = useAnimatedStyle(() => {
            const inputRange = [
              (index - 1) * SNAP_INTERVAL,
              index * SNAP_INTERVAL,
              (index + 1) * SNAP_INTERVAL,
            ];

            const dotWidth = interpolate(
              scrollX.value,
              inputRange,
              [8, 20, 8],
              Extrapolation.CLAMP
            );

            const opacityVal = interpolate(
              scrollX.value,
              inputRange,
              [0.35, 1.0, 0.35],
              Extrapolation.CLAMP
            );

            const bgValue = interpolate(
              scrollX.value,
              inputRange,
              [0, 1, 0],
              Extrapolation.CLAMP
            );

            return {
              width: dotWidth,
              opacity: opacityVal,
              backgroundColor: bgValue > 0.5 ? colors.primary : 'rgba(255,255,255,0.4)',
            };
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dotIndicator, animatedDotStyle]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xs,
  },
  scroll: {
    width: '100%',
  },
  card: {
    height: 250,
    backgroundColor: '#161622',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    position: 'relative',
    ...shadows.lg,
  },
  imageMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
  },
  parallaxContainer: {
    width: '120%',
    height: '100%',
    position: 'absolute',
    left: '-10%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  absoluteGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  floatingTagHeader: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    zIndex: 10,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    ...shadows.sm,
  },
  pillBadgeStandard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(10, 10, 15, 0.85)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  floatingContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    zIndex: 10,
  },
  categoryAndScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.primary,
  },
  hudRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(245, 166, 35, 0.12)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(245, 166, 35, 0.25)',
  },
  dishName: {
    color: colors.white,
    fontSize: 20,
    lineHeight: 26,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  microStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: 8,
  },
  microItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  microDivider: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  bottomTagsRow: {
    flexDirection: 'row',
    gap: 5,
    marginTop: 8,
  },
  bottomTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  bottomTagText: {
    fontSize: 9,
    color: colors.textSecondary,
  },
  navigationTrack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: spacing.md,
  },
  dotIndicator: {
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
});
