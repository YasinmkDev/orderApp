import apiClient from './api';
import { Customer, Coupon } from '../types';

export const customersService = {
  getById: async (id: string): Promise<Customer> => {
    const { data } = await apiClient.get<Customer>('/customer/GetById', { params: { id } });
    return data;
  },

  update: async (customer: Partial<Customer> & { id: string }): Promise<Customer> => {
    const { data } = await apiClient.post<Customer>('/customer/Update', customer);
    return data;
  },
};

export const couponsService = {
  getAllByBranch: async (branchId: string): Promise<Coupon[]> => {
    const { data } = await apiClient.get<Coupon[]>('/coupon/GetAllByBranch', {
      params: { branchId },
    });
    return data;
  },
};
