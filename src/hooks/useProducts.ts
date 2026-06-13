import { useQuery } from '@tanstack/react-query';
import { productsService, categoriesService } from '../services';
import { useAuthStore } from '../store/auth';
import { mockProducts, mockCategories } from '../data/mockData';

const BRANCH_ID = '1'; // Default branch
const USE_MOCK = true;

export function useProducts() {
  return useQuery({
    queryKey: ['products', BRANCH_ID],
    queryFn: () => {
      if (USE_MOCK) return mockProducts;
      return productsService.getAllByBranch(BRANCH_ID);
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      if (USE_MOCK) return mockProducts.find(p => p.id === id) || mockProducts[0];
      return productsService.getById(id);
    },
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories', BRANCH_ID],
    queryFn: () => {
      if (USE_MOCK) return mockCategories;
      return categoriesService.getAllByBranch(BRANCH_ID);
    },
  });
}

export function useSearchProducts(query: string) {
  return useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => {
      if (USE_MOCK) {
        const q = query.toLowerCase();
        return mockProducts.filter(p =>
          p.name.toLowerCase().includes(q) ||
          (p.categoryName?.toLowerCase().includes(q) ?? false)
        );
      }
      return productsService.search(query, BRANCH_ID);
    },
    enabled: query.length > 1,
  });
}
