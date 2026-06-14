import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, spacing, shadows } from '../../theme';
import { Text } from './Text';
import { Image } from 'expo-image';
import { Star } from 'lucide-react-native';

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
  autoRotateInterval = 2000,
  onItemPress,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const currentIndex = useRef(0);
  const autoRotateTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAutoRotating = useRef(true);

  const opacity = useSharedValue(1);

  const animatedOpacity = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const rotateCarousel = (index: number) => {
    if (scrollViewRef.current && items.length > 0) {
      const screenWidth = 375; // Approximate screen width
      scrollViewRef.current.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
    }
  };

  const autoRotate = () => {
    if (!isAutoRotating.current) return;

    currentIndex.current = (currentIndex.current + 1) % items.length;
    rotateCarousel(currentIndex.current);
  };

  const startAutoRotate = () => {
    if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
    isAutoRotating.current = true;
    autoRotateTimer.current = setInterval(autoRotate, autoRotateInterval);
  };

  const pauseAutoRotate = () => {
    isAutoRotating.current = false;
    if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);

    // Resume after 3 seconds of inactivity
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      startAutoRotate();
    }, 3000);
  };

  useEffect(() => {
    startAutoRotate();

    return () => {
      if (autoRotateTimer.current) clearInterval(autoRotateTimer.current);
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, [autoRotateInterval, items.length]);

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScrollBeginDrag={pauseAutoRotate}
        onScrollEndDrag={startAutoRotate}
        style={styles.scroll}
      >
        {items.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeIn.duration(500)}
            exiting={FadeOut.duration(300)}
            style={[styles.itemContainer, animatedOpacity]}
          >
            {/* Background Image */}
            <Image
              source={{ uri: item.image }}
              style={styles.backgroundImage}
              contentFit="cover"
              transition={300}
            />

            {/* Gradient Overlay */}
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.7)']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.gradientOverlay}
            />

            {/* Floating Labels - Top Right */}
            <View style={styles.topLabels}>
              <View style={styles.ratingBadge}>
                <Star size={14} color={colors.primary} fill={colors.primary} />
                <Text variant="captionSmall" weight="bold" style={styles.ratingText}>
                  {item.rating}
                </Text>
                <Text variant="captionSmall" color="tertiary" style={styles.reviewCount}>
                  ({item.reviewCount})
                </Text>
              </View>

              <View style={styles.timeBadge}>
                <Text variant="captionSmall" weight="semibold" style={styles.timeText}>
                  {item.deliveryTime}m
                </Text>
              </View>
            </View>

            {/* Floating Content - Bottom */}
            <View style={styles.floatingContent}>
              {/* Restaurant Name */}
              <Text variant="caption" style={styles.restaurantName}>
                {item.restaurantName}
              </Text>

              {/* Dish Name */}
              <Text variant="titleMedium" weight="bold" style={styles.dishName} numberOfLines={2}>
                {item.dishName}
              </Text>

              {/* Tags */}
              {item.tags && item.tags.length > 0 && (
                <View style={styles.tagsContainer}>
                  {item.tags.map((tag, tagIndex) => (
                    <View key={tagIndex} style={styles.tag}>
                      <Text variant="captionSmall" weight="semibold" style={styles.tagText}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </Animated.View>
        ))}
      </ScrollView>

      {/* Indicators (Dots) */}
      <View style={styles.indicatorsContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              {
                backgroundColor:
                  index === currentIndex.current ? colors.primary : 'rgba(255,255,255,0.4)',
                width: index === currentIndex.current ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 280,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    ...shadows.lg,
  },
  scroll: {
    width: '100%',
    height: '100%',
  },
  itemContainer: {
    width: 375,
    height: 280,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  topLabels: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'column',
    gap: 8,
    zIndex: 10,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    backdropFilter: 'blur(10px)',
  },
  ratingText: {
    color: colors.white,
  },
  reviewCount: {
    marginLeft: 2,
  },
  timeBadge: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
  },
  timeText: {
    color: colors.white,
  },
  floatingContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 10,
  },
  restaurantName: {
    color: colors.white,
    opacity: 0.9,
    marginBottom: 4,
  },
  dishName: {
    color: colors.white,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: 'rgba(245, 166, 35, 0.8)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    color: colors.white,
  },
  indicatorsContainer: {
    position: 'absolute',
    bottom: 12,
    left: '50%',
    flexDirection: 'row',
    gap: 6,
    transform: [{ translateX: -50 }],
    zIndex: 20,
  },
  indicator: {
    height: 6,
    borderRadius: 3,
  },
});
