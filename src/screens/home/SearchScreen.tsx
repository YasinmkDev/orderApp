import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../theme';
import { Text } from '../../components/ui/Text';
import { Input } from '../../components/ui/Input';
import { ProductCard } from '../../components/ui/ProductCard';
import { LoadingState } from '../../components/ui/LoadingState';
import { EmptyState } from '../../components/ui/EmptyState';
import { useSearchProducts, useProducts } from '../../hooks';
import { ArrowLeft, Search, X } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';

interface Props {
  navigation: NativeStackNavigationProp<HomeStackParamList>;
}

export const SearchScreen: React.FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const { data: searchResults, isLoading: searchLoading } = useSearchProducts(query);
  const { data: allProducts } = useProducts();

  const handleProductPress = useCallback(
    (id: string) => navigation.navigate('ProductDetail', { productId: id }),
    [navigation],
  );

  const results = query.length > 1 ? searchResults : allProducts;
  const isLoading = query.length > 1 && searchLoading;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft size={20} color={theme.colors.text} />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search products..."
            value={query}
            onChangeText={setQuery}
            autoFocus
            style={styles.searchInput}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={styles.clearButton}>
              <X size={16} color={theme.colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isLoading ? (
        <LoadingState message="Searching..." />
      ) : results && results.length > 0 ? (
        <View style={styles.resultsGrid}>
          {results.map(product => (
            <View key={product.id} style={styles.gridItem}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                imageUri={product.image}
                category={product.categoryName}
                onPress={handleProductPress}
                width="100%"
              />
            </View>
          ))}
        </View>
      ) : query.length > 1 ? (
        <EmptyState
          icon={<Search size={32} color={theme.colors.textTertiary} />}
          title="No results"
          description={`No products found for "${query}"`}
          action={{ label: 'Clear search', onPress: () => setQuery('') }}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flex: 1,
    position: 'relative',
  },
  searchInput: {
    marginBottom: 0,
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    top: 14,
  },
  resultsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    gap: theme.spacing.md,
  },
  gridItem: {
    width: '47%',
  },
});
