import apiClient from './api';
import { PaymentType, CustomerAddress } from '../types';

interface CashPaymentPayload {
  orderId: string;
  amount: number;
}

interface CardPaymentPayload {
  orderId: string;
  amount: number;
  cardNumber?: string;
  lastFour?: string;
}

export const paymentsService = {
  addCashPayment: async (payload: CashPaymentPayload) => {
    const { data } = await apiClient.post('/payment/AddPaymentTypeCash', payload);
    return data;
  },

  addCardPayment: async (payload: CardPaymentPayload) => {
    const { data } = await apiClient.post('/payment/AddPaymentTypeCard', payload);
    return data;
  },

  finishOrder: async (orderId: string) => {
    const { data } = await apiClient.post('/payment/FinishOrder', { orderId });
    return data;
  },
};

export const paymentTypesService = {
  getAllByBranch: async (branchId: string): Promise<PaymentType[]> => {
    const { data } = await apiClient.get<PaymentType[]>('/payment-type/GetAllByBranch', {
      params: { branchId },
    });
    return data;
  },
};

export const customerAddressService = {
  getAllByBranch: async (branchId: string): Promise<CustomerAddress[]> => {
    const { data } = await apiClient.get<CustomerAddress[]>('/customer-address/GetAllByBranch', {
      params: { branchId },
    });
    return data;
  },

  add: async (address: Omit<CustomerAddress, 'id'>): Promise<CustomerAddress> => {
    const { data } = await apiClient.post<CustomerAddress>('/customer-address/Add', address);
    return data;
  },
};
