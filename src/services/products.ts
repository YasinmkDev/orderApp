import apiClient from './api';
import { Item, Category } from '../types';

interface GetItemsParams {
  branchId?: string;
  categoryId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

export const productsService = {
  getAllByBranch: async (branchId: string): Promise<Item[]> => {
    const { data } = await apiClient.get<Item[]>('/items/GetAllByBranch', {
      params: { branchId },
    });
    return data;
  },

  getById: async (id: string): Promise<Item> => {
    const { data } = await apiClient.get<Item>(`/items/GetById`, {
      params: { id },
    });
    return data;
  },

  search: async (query: string, branchId?: string): Promise<Item[]> => {
    const { data } = await apiClient.get<Item[]>('/items/SearchItem', {
      params: { search: query, branchId },
    });
    return data;
  },

  getByDynamicFilter: async (filters: Record<string, any>): Promise<Item[]> => {
    const { data } = await apiClient.post<Item[]>('/items/GetByDynamicFilter', filters);
    return data;
  },
};

export const categoriesService = {
  getAllByBranch: async (branchId: string): Promise<Category[]> => {
    const { data } = await apiClient.get<Category[]>('/item_categories/GetAllByBranch', {
      params: { branchId },
    });
    return data;
  },
};
