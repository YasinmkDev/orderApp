import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  FadeIn,
  FadeInDown,
  FadeInRight,
  Layout,
} from 'react-native-reanimated';
import { theme, colors, spacing, borderRadius, shadows } from '../../theme';
import { Text } from '../../components/ui/Text';
import { ProductCard } from '../../components/ui/ProductCard';
import { HomeScreenSkeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { useProducts, useCategories } from '../../hooks';
import { useCartStore } from '../../store/cart';
import { useAuthStore } from '../../store/auth';
import { Search, ShoppingBag, Bell, ChevronRight, Sparkles, TrendingUp, Clock, Star } from 'lucide-react-native';
import { Image } from 'expo-image';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HERO_HEIGHT = 280;

interface Props {
  navigation: NativeStackNavigationProp<HomeStackParamList>;
}

// Animated components
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// Hero Section Component
const HeroSection: React.FC<{
  onSearchPress: () => void;
  customerName: string;
}> = ({ onSearchPress, customerName }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View entering={FadeInDown.delay(100).springify()} style={styles.heroContainer}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.heroGradient}
      >
        {/* Decorative circles */}
        <View style={styles.decorativeCircle1} />
        <View style={styles.decorativeCircle2} />

        <View style={styles.heroContent}>
          <Animated.View entering={FadeInDown.delay(200)}>
            <View style={styles.greetingRow}>
              <Sparkles size={16} color={colors.black} />
              <Text variant="caption" color="primary">Good evening</Text>
            </View>
            <Text variant="display" color="primary" style={styles.heroTitle}>
              Hey, {customerName || 'there'}!
            </Text>
            <Text variant="bodyLarge" color="primary" style={styles.heroSubtitle}>
              Discover amazing products just for you
            </Text>
          </Animated.View>

          <AnimatedPressable
            entering={FadeInDown.delay(300)}
            onPress={onSearchPress}
            onPressIn={() => scale.value = withSpring(0.98)}
            onPressOut={() => scale.value = withSpring(1)}
            style={[styles.searchBar, animatedStyle]}
          >
            <Search size={18} color={colors.textSecondary} />
            <Text variant="body" color="tertiary" style={styles.searchPlaceholder}>
              Search products...
            </Text>
          </AnimatedPressable>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

// Category Chip Component
const CategoryChip: React.FC<{
  category: { id: string; name: string; image?: string; itemCount?: number };
  onPress: () => void;
  index: number;
}> = ({ category, onPress, index }) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      entering={FadeInRight.delay(100 + index * 50).springify()}
      onPress={onPress}
      onPressIn={() => scale.value = withSpring(0.94)}
      onPressOut={() => scale.value = withSpring(1)}
      style={[styles.categoryChip, animatedStyle]}
    >
      <View style={styles.categoryImageWrapper}>
        {category.image ? (
          <Image source={{ uri: category.image }} style={styles.categoryImage} contentFit="cover" />
        ) : (
          <View style={styles.categoryIconPlaceholder}>
            <Text variant="titleMedium" color="brand">{category.name.charAt(0)}</Text>
          </View>
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.categoryGradient}
        />
      </View>
      <Text variant="captionMedium" weight="medium" style={styles.categoryName}>
        {category.name}
      </Text>
      {category.itemCount && (
        <Text variant="captionSmall" color="tertiary">
          {category.itemCount} items
        </Text>
      )}
    </AnimatedPressable>
  );
};

// Section Header Component
const SectionHeader: React.FC<{
  title: string;
  subtitle?: string;
  action?: { label: string; onPress: () => void };
  icon?: React.ReactNode;
}> = ({ title, subtitle, action, icon }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionHeaderLeft}>
      {icon}
      <View>
        <Text variant="headingLarge">{title}</Text>
        {subtitle && (
          <Text variant="caption" color="secondary">{subtitle}</Text>
        )}
      </View>
    </View>
    {action && (
      <Pressable onPress={action.onPress} style={styles.seeAllButton}>
        <Text variant="caption" color="brand">{action.label}</Text>
        <ChevronRight size={16} color={colors.primary} />
      </Pressable>
    )}
  </View>
);

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { data: products, isLoading: productsLoading, refetch } = useProducts();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const customer = useAuthStore(s => s.customer);
  const cartItemCount = useCartStore(s => s.getItemCount());

  const handleProductPress = useCallback(
    (id: string) => navigation.navigate('ProductDetail', { productId: id }),
    [navigation],
  );

  const featuredProducts = products?.filter(p => p.isFeatured) || [];
  const popularProducts = products?.slice(0, 10) || [];
  const recommendedProducts = products?.slice(6, 16) || [];

  if (productsLoading && categoriesLoading) {
    return <HomeScreenSkeleton />;
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <HeroSection
          onSearchPress={() => navigation.navigate('Search')}
          customerName={customer?.name?.split(' ')[0] || ''}
        />

        {/* Quick Stats */}
        <Animated.View entering={FadeInDown.delay(400)} style={styles.quickStats}>
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: colors.primaryLight }]}>
              <TrendingUp size={18} color={colors.primary} />
            </View>
            <View>
              <Text variant="bodySmall" weight="semibold">24</Text>
              <Text variant="captionSmall" color="tertiary">Trending</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: colors.successLight }]}>
              <Clock size={18} color={colors.success} />
            </View>
            <View>
              <Text variant="bodySmall" weight="semibold">2-3h</Text>
              <Text variant="captionSmall" color="tertiary">Delivery</Text>
            </View>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={[styles.statIcon, { backgroundColor: colors.secondaryLight }]}>
              <Star size={18} color={colors.secondary} />
            </View>
            <View>
              <Text variant="bodySmall" weight="semibold">4.9</Text>
              <Text variant="captionSmall" color="tertiary">Rating</Text>
            </View>
          </View>
        </Animated.View>

        {/* Categories */}
        {categories && categories.length > 0 && (
          <Animated.View entering={FadeInDown.delay(500)} style={styles.section}>
            <SectionHeader
              title="Categories"
              subtitle="Browse by category"
              action={{ label: 'See all', onPress: () => {} }}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesScroll}
            >
              {categories.map((cat, index) => (
                <CategoryChip
                  key={cat.id}
                  category={cat}
                  onPress={() => {}}
                  index={index}
                />
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <Animated.View entering={FadeInDown.delay(600)} style={styles.section}>
            <SectionHeader
              title="Featured"
              subtitle="Hand-picked for you"
              action={{ label: 'View all', onPress: () => {} }}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsScroll}
              decelerationRate="fast"
              snapToInterval={185}
            >
              {featuredProducts.map((product, index) => (
                <Animated.View
                  key={product.id}
                  entering={FadeInRight.delay(index * 100)}
                  layout={Layout.springify()}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUri={product.image}
                    category={product.categoryName}
                    isFeatured={product.isFeatured}
                    rating={4.5 + Math.random() * 0.4}
                    reviewCount={Math.floor(Math.random() * 200) + 50}
                    onPress={handleProductPress}
                  />
                </Animated.View>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* Popular Products Grid */}
        {popularProducts.length > 0 && (
          <Animated.View entering={FadeInDown.delay(700)} style={styles.section}>
            <SectionHeader
              title="Popular Right Now"
              subtitle="Best sellers this week"
            />
            <View style={styles.productGrid}>
              {popularProducts.slice(0, 6).map((product, index) => (
                <Animated.View
                  key={product.id}
                  entering={FadeInRight.delay(index * 50)}
                  style={styles.gridItem}
                  layout={Layout.springify()}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUri={product.image}
                    category={product.categoryName}
                    rating={4.3 + Math.random() * 0.6}
                    reviewCount={Math.floor(Math.random() * 150) + 30}
                    onPress={handleProductPress}
                  />
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        )}

        {/* Recommended */}
        {recommendedProducts.length > 0 && (
          <Animated.View entering={FadeInDown.delay(800)} style={styles.section}>
            <SectionHeader
              title="Recommended"
              subtitle="Based on your preferences"
              action={{ label: 'See more', onPress: () => {} }}
            />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsScroll}
            >
              {recommendedProducts.map((product, index) => (
                <Animated.View
                  key={product.id}
                  entering={FadeInRight.delay(index * 50)}
                  layout={Layout.springify()}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUri={product.image}
                    category={product.categoryName}
                    rating={4.2 + Math.random() * 0.7}
                    reviewCount={Math.floor(Math.random() * 100) + 20}
                    onPress={handleProductPress}
                  />
                </Animated.View>
              ))}
            </ScrollView>
          </Animated.View>
        )}

        {/* Bottom padding for tab bar */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <Animated.View entering={FadeInDown.delay(500)} style={styles.floatingCart}>
          <Pressable
            onPress={() => navigation.getParent()?.navigate('CartTab')}
            style={styles.floatingCartButton}
          >
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.floatingCartGradient}
            >
              <ShoppingBag size={20} color={colors.black} />
              <Text variant="captionMedium" weight="semibold" color="primary">
                {cartItemCount} items
              </Text>
            </LinearGradient>
          </Pressable>
        </Animated.View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  // Hero Section
  heroContainer: {
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    ...shadows.lg,
  },
  heroGradient: {
    height: HERO_HEIGHT,
    padding: spacing.xl,
    position: 'relative',
    overflow: 'hidden',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -60,
    right: -30,
    width: 150,
    height: 150,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -40,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  heroContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
    marginBottom: spacing.xs,
    backgroundColor: 'rgba(0,0,0,0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: borderRadius.full,
  },
  heroTitle: {
    color: colors.black,
    marginTop: spacing.xxs,
  },
  heroSubtitle: {
    color: 'rgba(0,0,0,0.7)',
    marginTop: spacing.xxs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.white,
    borderRadius: borderRadius.xl,
    paddingHorizontal: spacing.md,
    height: 50,
    ...shadows.md,
  },
  searchPlaceholder: {
    flex: 1,
  },

  // Quick Stats
  quickStats: {
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginTop: spacing.xl,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: spacing.sm,
  },

  // Sections
  section: {
    marginTop: spacing['3xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },

  // Categories
  categoriesScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  categoryChip: {
    width: 100,
    alignItems: 'center',
    gap: spacing.xs,
  },
  categoryImageWrapper: {
    width: 80,
    height: 80,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: colors.surfaceElevated,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
  },
  categoryGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
  },
  categoryIconPlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primaryLight,
  },
  categoryName: {
    textAlign: 'center',
  },

  // Products
  productsScroll: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  gridItem: {
    width: (SCREEN_WIDTH - spacing.lg * 2 - spacing.md) / 2,
  },

  // Floating Cart
  floatingCart: {
    position: 'absolute',
    bottom: 90,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  floatingCartButton: {
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    ...shadows.xl,
  },
  floatingCartGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },

  bottomPadding: {
    height: 120,
  },
});
