import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  useWindowDimensions,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  Layout,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { colors, borderRadius, spacing, shadows } from '../../theme';
import { Text } from '../../components/ui/Text';
import { ProductCard } from '../../components/ui/ProductCard';
import { useProducts, useCategories } from '../../hooks';
import { ArrowLeft, SlidersHorizontal, Search, Star, Sliders, Check, Flame, Leaf, Award } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { HomeStackParamList } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'CategoryDetail'>;
  route: RouteProp<HomeStackParamList, 'CategoryDetail'>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const CategoryScreen: React.FC<Props> = ({ navigation, route }) => {
  const { categoryId, categoryName: initialCategoryName } = route.params;
  const { width: windowWidth } = useWindowDimensions();

  // Load backend data
  const { data: products, isLoading: productsLoading, refetch: refetchProducts } = useProducts();
  const { data: categories, refetch: refetchCategories } = useCategories();

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refetchProducts(),
        refetchCategories ? refetchCategories() : Promise.resolve(),
      ]);
    } catch (error) {
      console.error('Error refreshing category data:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refetchProducts, refetchCategories]);

  // Find the active main category
  const activeCategory = useMemo(() => {
    return categories?.find(c => c.id === categoryId);
  }, [categories, categoryId]);

  const categoryName = activeCategory?.name || initialCategoryName || 'Category';

  // State controls for filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedDiet, setSelectedDiet] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'rating' | 'priceAsc' | 'priceDesc' | 'default'>('default');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);

  // Dynamic Subcategory lists based on products in this category
  const subCategories = useMemo(() => {
    if (!products) return [];
    
    // Filter to products belonging to this category
    const categoryProducts = products.filter(p => p.categoryId === categoryId || p.categoryName?.toLowerCase() === categoryName.toLowerCase());
    
    // Extract unique category names/sub-categories
    const subs = new Set<string>();
    categoryProducts.forEach(p => {
      if (p.categoryName) {
        subs.add(p.categoryName);
      }
    });
    return Array.from(subs);
  }, [products, categoryId, categoryName]);

  // Handle filtering logic
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = products.filter(p => {
      // Matches parent category id, or categoryName match
      if (categoryId === 'all') return true;
      return p.categoryId === categoryId || p.categoryName?.toLowerCase() === categoryName.toLowerCase();
    });

    // Subcategory Filter
    if (selectedSubCategory) {
      result = result.filter(p => p.categoryName === selectedSubCategory);
    }

    // Search query filter
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Dietary tag filter
    if (selectedDiet) {
      result = result.filter(p => p.dietaryTags?.includes(selectedDiet as any));
    }

    // Sorting block
    if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'priceAsc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceDesc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, categoryId, categoryName, selectedSubCategory, searchQuery, selectedDiet, sortBy]);

  const handleProductPress = useCallback(
    (id: string) => {
      navigation.navigate('ProductDetail', { productId: id });
    },
    [navigation]
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Visual Elegant Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={18} color={colors.white} />
        </Pressable>

        <Text variant="headingLarge" weight="bold" style={styles.headerTitle}>
          {categoryName}
        </Text>

        <Pressable 
          onPress={() => setShowFiltersPanel(!showFiltersPanel)} 
          style={[styles.filterIconButton, showFiltersPanel && styles.activeFilterGroup]}
        >
          <SlidersHorizontal size={18} color={showFiltersPanel ? colors.black : colors.white} />
        </Pressable>
      </View>

      {/* Floating Animated Banner Background inside scroll */}
      <View style={styles.bannerContainer}>
        <LinearGradient
          colors={['rgba(255,166,35,0.06)', 'transparent']}
          style={StyleSheet.absoluteFill}
        />
        {activeCategory?.description && (
          <Animated.View entering={FadeIn.delay(100)} style={styles.bannerContent}>
            <Text variant="bodySmall" color="secondary" style={styles.bannerDescription}>
              {activeCategory.description} — Discover {filteredProducts.length} curated specialties
            </Text>
          </Animated.View>
        )}
      </View>

      {/* Top Search Filter In-Category */}
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <Search size={16} color={colors.textTertiary} />
          <TextInput
            placeholder={`Search within ${categoryName}...`}
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>
      </View>

      {/* Dynamic Drawer Category Filters Panel */}
      {showFiltersPanel && (
        <Animated.View entering={FadeInDown.springify()} style={styles.expandedFilters}>
          <View style={styles.filterTitleRow}>
            <Sliders size={14} color={colors.primary} />
            <Text variant="heading" weight="bold">Preference Filters</Text>
          </View>
          
          <View style={styles.filtersBlock}>
            {/* Sorting Actions */}
            <Text variant="captionSmall" color="secondary" style={styles.filterLabel}>SORTED BY</Text>
            <View style={styles.filterRow}>
              {[
                { key: 'default', label: 'Recommended' },
                { key: 'rating', label: 'Top Rated' },
                { key: 'priceAsc', label: 'Price: Low' },
                { key: 'priceDesc', label: 'Price: High' },
              ].map(opt => (
                <Pressable
                  key={opt.key}
                  onPress={() => setSortBy(opt.key as any)}
                  style={[styles.filterPill, sortBy === opt.key && styles.activePill]}
                >
                  <Text 
                    variant="captionSmall" 
                    weight="medium" 
                    color={sortBy === opt.key ? 'primary' : 'secondary'}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </View>

            {/* Dietary Preference Action */}
            <Text variant="captionSmall" color="secondary" style={styles.filterLabel}>DIETARY REQS</Text>
            <View style={styles.filterRow}>
              {[
                { key: 'spicy', label: '🌶️ Spicy' },
                { key: 'vegetarian', label: '🥗 Veg' },
                { key: 'vegan', label: '🌱 Vegan' },
                { key: 'glutenFree', label: '🌾 Gluten Free' },
              ].map(opt => (
                <Pressable
                  key={opt.key}
                  onPress={() => setSelectedDiet(selectedDiet === opt.key ? null : opt.key)}
                  style={[styles.filterPill, selectedDiet === opt.key && styles.activePill]}
                >
                  <Text 
                    variant="captionSmall" 
                    weight="medium" 
                    color={selectedDiet === opt.key ? 'primary' : 'secondary'}
                  >
                    {opt.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </Animated.View>
      )}

      {/* Horizontal Sub-Category List */}
      {subCategories.length > 0 && (
        <View style={styles.subCategoryListWrapper}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subCategoryScroll}>
            <Pressable
              onPress={() => setSelectedSubCategory(null)}
              style={[styles.subCategoryChip, !selectedSubCategory && styles.activeSubCategoryChip]}
            >
              <Text 
                variant="caption" 
                weight="semibold"
                color={!selectedSubCategory ? 'primary' : 'secondary'}
              >
                All Dishes
              </Text>
            </Pressable>
            {subCategories.map((sub, idx) => (
              <Pressable
                key={idx}
                onPress={() => setSelectedSubCategory(sub)}
                style={[styles.subCategoryChip, selectedSubCategory === sub && styles.activeSubCategoryChip]}
              >
                <Text 
                  variant="caption" 
                  weight="semibold"
                  color={selectedSubCategory === sub ? 'primary' : 'secondary'}
                >
                  {sub}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Grid of Results */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={[
          styles.listContainer,
          filteredProducts.length === 0 && { flexGrow: 1, justifyContent: 'center' }
        ]}
        columnWrapperStyle={filteredProducts.length > 0 ? styles.columnWrapper : undefined}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        renderItem={({ item, index }) => (
          <Animated.View
            entering={FadeInDown.delay(index * 60).springify()}
            layout={Layout.springify()}
            style={styles.gridItemWrapper}
          >
            <ProductCard
              id={item.id}
              name={item.name}
              price={item.price}
              imageUri={item.image}
              category={item.categoryName}
              rating={item.rating || 4.5}
              reviewCount={item.reviewCount || 120}
              onPress={handleProductPress}
              restaurantName={item.restaurantName}
              shortDescription={item.shortDescription}
              dietaryTags={item.dietaryTags}
              deliveryTime={item.deliveryTime}
              width="100%"
            />
          </Animated.View>
        )}
        ListEmptyComponent={
          <Animated.View entering={FadeIn} style={styles.emptyContainer}>
            <View style={styles.emptyCircle}>
              <Sliders size={32} color={colors.textTertiary} />
            </View>
            <Text variant="titleMedium" weight="bold" color="secondary">
              No Specialties Found
            </Text>
            <Text variant="bodySmall" color="tertiary" style={styles.emptyText}>
              Try clearing filters or adjusting your search queries to discover tasty options.
            </Text>
            <Pressable 
              onPress={() => {
                setSearchQuery('');
                setSelectedSubCategory(null);
                setSelectedDiet(null);
                setSortBy('default');
              }}
              style={styles.clearAllButton}
            >
              <Text variant="caption" weight="bold" color="primary">Reset Filters</Text>
            </Pressable>
          </Animated.View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  headerTitle: {
    fontSize: 18,
    color: colors.white,
  },
  filterIconButton: {
    width: 38,
    height: 38,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  activeFilterGroup: {
    backgroundColor: colors.primary,
  },
  bannerContainer: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerContent: {
    paddingVertical: spacing.xxs,
  },
  bannerDescription: {
    fontSize: 11,
    lineHeight: 15,
    fontStyle: 'italic',
  },
  searchBarWrapper: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.sm,
    height: 42,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    marginLeft: spacing.xs,
    color: colors.text,
    fontSize: 13,
    padding: 0,
  },
  subCategoryListWrapper: {
    paddingVertical: spacing.xs,
  },
  subCategoryScroll: {
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  subCategoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activeSubCategoryChip: {
    backgroundColor: 'rgba(245, 166, 35, 0.12)',
    borderColor: colors.primary,
  },
  listContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  columnWrapper: {
    gap: spacing.md,
  },
  gridItemWrapper: {
    flex: 1,
    marginBottom: spacing.md,
    maxWidth: '48.5%', // Keep grids in perfect boundaries
  },
  expandedFilters: {
    backgroundColor: colors.surfaceElevated,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  filtersBlock: {
    gap: spacing.sm,
  },
  filterLabel: {
    fontSize: 9,
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  filterPill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  activePill: {
    backgroundColor: 'rgba(245, 166, 35, 0.12)',
    borderColor: colors.primary,
  },
  emptyContainer: {
    flex: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  emptyCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.xs,
    marginHorizontal: spacing.md,
    lineHeight: 18,
  },
  clearAllButton: {
    marginTop: spacing.md,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: borderRadius.lg,
    backgroundColor: 'rgba(245, 166, 35, 0.12)',
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
