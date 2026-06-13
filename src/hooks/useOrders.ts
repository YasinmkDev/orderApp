import { useQuery } from '@tanstack/react-query';
import { ordersService } from '../services';
import { useAuthStore } from '../store/auth';
import { mockOrders, mockAddresses } from '../data/mockData';

const USE_MOCK = true;

export function useOrders() {
  const userId = useAuthStore(s => s.userId);
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: () => {
      if (USE_MOCK) return mockOrders;
      return ordersService.getByUserId(userId!);
    },
    enabled: true,
  });
}

export function useAddresses() {
  const { data } = useQuery({
    queryKey: ['addresses'],
    queryFn: () => {
      if (USE_MOCK) return mockAddresses;
      return import('../services').then(m => m.customerAddressService.getAllByBranch('1'));
    },
  });
  return { data: data || [] };
}

export function usePaymentTypes() {
  const { data } = useQuery({
    queryKey: ['paymentTypes'],
    queryFn: () => {
      if (USE_MOCK) return [
        { id: 'pt-1', name: 'Cash on Delivery', description: 'Pay when you receive', isCash: true, isCard: false },
        { id: 'pt-2', name: 'Credit Card', description: 'Visa, Mastercard, Amex', isCash: false, isCard: true },
      ];
      return import('../services').then(m => m.paymentTypesService.getAllByBranch('1'));
    },
  });
  return { data: data || [] };
}
