import apiClient from './api';
import { SaleOrder } from '../types';

interface AddOrderPayload {
  customerId: string;
  branchId: string;
  deliveryAddressId?: string;
  couponCode?: string;
  notes?: string;
}

interface AddOrderLinePayload {
  orderId: string;
  itemId: string;
  quantity: number;
  price: number;
}

export const ordersService = {
  addNewOrder: async (payload: AddOrderPayload): Promise<SaleOrder> => {
    const { data } = await apiClient.post<SaleOrder>('/sale-orders/AddNewOrder', payload);
    return data;
  },

  addOrderLine: async (payload: AddOrderLinePayload): Promise<SaleOrder> => {
    const { data } = await apiClient.post<SaleOrder>('/sale-orders/AddNewOrderLine', payload);
    return data;
  },

  getByUserId: async (userId: string): Promise<SaleOrder[]> => {
    const { data } = await apiClient.get<SaleOrder[]>('/sale-orders/GetByUserId', {
      params: { userId },
    });
    return data;
  },
};
